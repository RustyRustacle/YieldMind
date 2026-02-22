// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../interfaces/IXCMYieldReader.sol";

contract MockXCMYieldReader is IXCMYieldReader {
    uint256 public vdotApy;
    uint256 public dotStakingRate;
    uint256 public usdcLendingRate;

    constructor(uint256 _vdotApy, uint256 _dotRate, uint256 _usdcRate) {
        vdotApy = _vdotApy;
        dotStakingRate = _dotRate;
        usdcLendingRate = _usdcRate;
    }

    function getVDOTApy() external view override returns (uint256) {
        return vdotApy;
    }

    function getDOTStakingRate() external view override returns (uint256) {
        return dotStakingRate;
    }

    function getUSDCLendingRate() external view override returns (uint256) {
        return usdcLendingRate;
    }

    function updateRates(
        uint256 _vdotApy,
        uint256 _dotRate,
        uint256 _usdcRate
    ) external override {
        vdotApy = _vdotApy;
        dotStakingRate = _dotRate;
        usdcLendingRate = _usdcRate;
    }
}
