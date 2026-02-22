// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/metatx/ERC2771Forwarder.sol";

/**
 * @title GaslessForwarder
 * @notice EIP-2771 forwarder for meta-transactions.
 *         Integrates with 0xGasless relayer.
 */
contract GaslessForwarder is ERC2771Forwarder {
    constructor() ERC2771Forwarder("GaslessForwarder") {}
}
