// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../RebalanceExecutor.sol";

contract MockBifrost is IBifrostSLP {
    function mint(uint256 /*amount*/) external pure override returns (uint256) {
        return 0;
    }

    function redeem(
        uint256 /*shares*/
    ) external pure override returns (uint256) {
        return 0;
    }
}
