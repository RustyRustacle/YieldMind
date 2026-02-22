// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/IXCMYieldReader.sol";

/**
 * @title XCMYieldReader
 * @notice Stores yield data from Bifrost parachain. In production, this would be updated
 *         by a relayer that listens to XCM messages. For hackathon, a trusted relayer
 *         (owner) can call updateRates.
 */
contract XCMYieldReader is IXCMYieldReader {
    address public owner;
    uint256 public vdotApy;
    uint256 public dotStakingRate;
    uint256 public usdcLendingRate;

    event RatesUpdated(uint256 vdotApy, uint256 dotRate, uint256 usdcRate);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
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

    function updateRates(uint256 _vdotApy, uint256 _dotRate, uint256 _usdcRate) external override onlyOwner {
        vdotApy = _vdotApy;
        dotStakingRate = _dotRate;
        usdcLendingRate = _usdcRate;
        emit RatesUpdated(_vdotApy, _dotRate, _usdcRate);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero address");
        owner = newOwner;
    }
}