// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IXCMYieldReader {
    function getVDOTApy() external view returns (uint256); // basis points (e.g., 750 = 7.5%)
    function getDOTStakingRate() external view returns (uint256);
    function getUSDCLendingRate() external view returns (uint256);
    function updateRates(uint256 vdotApy, uint256 dotRate, uint256 usdcRate) external;
}