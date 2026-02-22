// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./AIScorer.sol";
import "./RebalanceExecutor.sol";

/**
 * @title YieldVault
 * @notice ERC-4626 vault that automatically rebalances between yield strategies
 *         based on AI scoring.
 */
contract YieldVault is ERC4626, ReentrancyGuard, Ownable {
    AIScorer public scorer;
    RebalanceExecutor public rebalanceExecutor;
    uint256 public lastRebalance;
    uint256 public constant REBALANCE_INTERVAL = 6 hours;
    uint256 public constant REBALANCE_THRESHOLD = 200; // 2% in basis points

    event Rebalanced(uint8 indexed strategy, uint256 score, uint256 timestamp);

    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol,
        address _scorer,
        address _rebalanceExecutor
    ) ERC4626(_asset) ERC20(_name, _symbol) Ownable(msg.sender) {
        scorer = AIScorer(_scorer);
        rebalanceExecutor = RebalanceExecutor(_rebalanceExecutor);
        lastRebalance = block.timestamp;
    }

    function triggerRebalance() external nonReentrant {
        require(
            block.timestamp >= lastRebalance + REBALANCE_INTERVAL,
            "Too soon"
        );
        (uint8 bestStrategy, uint256 score) = scorer.getBestStrategy();

        // Optional: only rebalance if score delta exceeds threshold
        // For simplicity, always rebalance

        rebalanceExecutor.executeStrategy(bestStrategy, totalAssets());
        lastRebalance = block.timestamp;
        emit Rebalanced(bestStrategy, score, block.timestamp);
    }

    // Override necessary functions to integrate with rebalance executor
    function _deposit(
        address caller,
        address receiver,
        uint256 assets,
        uint256 shares
    ) internal override {
        super._deposit(caller, receiver, assets, shares);
        // Auto-invest after deposit? Could trigger rebalance or just hold.
    }

    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    ) internal override {
        super._withdraw(caller, receiver, owner, assets, shares);
        // On withdrawal, we might need to liquidate some positions.
    }
}
