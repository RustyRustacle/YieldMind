// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/IXCMYieldReader.sol";
import "./interfaces/IChainlinkOracle.sol";

/**
 * @title AIScorer
 * @notice On-chain deterministic scoring model. Computes a yield opportunity score
 *         for each strategy based on current APY rates and weights.
 */
contract AIScorer {
    IXCMYieldReader public xcmReader;
    IChainlinkOracle public dotPriceOracle; // used for volatility penalty (simplified)

    // Weights (in basis points, e.g., 4000 = 40.00%)
    uint256 public w_vdot = 4000; // 40.00%
    uint256 public w_dot = 3500; // 35.00%
    uint256 public w_usdc = 2500; // 25.00%

    // Penalty coefficients (basis points)
    uint256 public volatilityPenaltyCoeff = 100; // 1%
    uint256 public liquidityRiskCoeff = 50; // 0.5%

    address public governance;

    event WeightsUpdated(uint256 wVdot, uint256 wDot, uint256 wUsdc);

    modifier onlyGovernance() {
        require(msg.sender == governance, "not governance");
        _;
    }

    constructor(address _xcmReader, address _dotPriceOracle) {
        xcmReader = IXCMYieldReader(_xcmReader);
        dotPriceOracle = IChainlinkOracle(_dotPriceOracle);
        governance = msg.sender;
    }

    function setGovernance(address _newGov) external onlyGovernance {
        require(_newGov != address(0), "zero address");
        governance = _newGov;
    }

    function setWeights(
        uint256 _wVdot,
        uint256 _wDot,
        uint256 _wUsdc
    ) external onlyGovernance {
        require(_wVdot + _wDot + _wUsdc == 10000, "weights must sum to 10000");
        w_vdot = _wVdot;
        w_dot = _wDot;
        w_usdc = _wUsdc;
        emit WeightsUpdated(_wVdot, _wDot, _wUsdc);
    }

    function getBestStrategy()
        external
        view
        returns (uint8 strategy, uint256 score)
    {
        uint256 vdotApy = xcmReader.getVDOTApy();
        uint256 dotRate = xcmReader.getDOTStakingRate();
        uint256 usdcRate = xcmReader.getUSDCLendingRate();

        // Simple volatility proxy: absolute change in DOT price (mock)
        uint256 volatility = _computeVolatilityPenalty();
        uint256 liquidityRisk = _computeLiquidityRisk();

        uint256 vdotScore = (vdotApy * w_vdot) / 10000;
        uint256 dotScore = (dotRate * w_dot) / 10000;
        uint256 usdcScore = (usdcRate * w_usdc) / 10000;

        // Apply penalties equally (simplified)
        vdotScore = vdotScore > volatility ? vdotScore - volatility : 0;
        dotScore = dotScore > liquidityRisk ? dotScore - liquidityRisk : 0;
        usdcScore = usdcScore; // no penalty for USDC lending

        if (vdotScore >= dotScore && vdotScore >= usdcScore) {
            return (0, vdotScore); // 0 = vDOT strategy
        } else if (dotScore >= usdcScore) {
            return (1, dotScore); // 1 = DOT staking
        } else {
            return (2, usdcScore); // 2 = USDC lending
        }
    }

    // Mock volatility calculation â€“ in reality would use TWAP or oracle
    function _computeVolatilityPenalty() internal pure returns (uint256) {
        // Placeholder: returns 10 bps (0.1%)
        return 10;
    }

    function _computeLiquidityRisk() internal pure returns (uint256) {
        // Placeholder: returns 5 bps
        return 5;
    }
}
