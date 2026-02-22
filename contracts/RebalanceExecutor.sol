// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IBifrostSLP {
    function mint(uint256 amount) external returns (uint256);
    function redeem(uint256 shares) external returns (uint256);
}

/**
 * @title RebalanceExecutor
 * @notice Executes strategy swaps. Interacts with external protocols like Bifrost vDOT.
 */
contract RebalanceExecutor is Ownable {
    IERC20 public wdot;
    IERC20 public usdc;
    IBifrostSLP public bifrostVdot;

    constructor(
        address _wdot,
        address _usdc,
        address _bifrostVdot
    ) Ownable(msg.sender) {
        wdot = IERC20(_wdot);
        usdc = IERC20(_usdc);
        bifrostVdot = IBifrostSLP(_bifrostVdot);
    }

    function executeStrategy(
        uint8 strategy,
        uint256 amount
    ) external onlyOwner {
        if (strategy == 0) {
            // vDOT staking: convert WDOT to vDOT via Bifrost
            wdot.approve(address(bifrostVdot), amount);
            bifrostVdot.mint(amount);
        } else if (strategy == 1) {
            // DOT staking: hold WDOT (simulated)
            // In reality, would delegate to staking pool
        } else if (strategy == 2) {
            // USDC lending: supply to money market (mock)
            // usdc.approve(moneyMarket, amount);
            // moneyMarket.supply(amount);
        }
    }

    // Additional functions to retrieve assets back to vault
}
