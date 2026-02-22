# YieldMind Architecture

## High-Level Overview
YieldMind consists of:
- **YieldVault**: ERC-4626 vault holding user funds.
- **AIScorer**: On-chain scoring model using XCM and Chainlink data.
- **XCMYieldReader**: Stores Bifrost yield rates (updated by a relayer).
- **RebalanceExecutor**: Interacts with external protocols (Bifrost, etc.).
- **GaslessForwarder**: Meta-transactions for gas-free deposits.

## Data Flow
1. Relayer updates XCMYieldReader with latest APY from Bifrost.
2. AIScorer reads rates and computes best strategy.
3. Anyone can call `triggerRebalance` on the vault (rate-limited).
4. RebalanceExecutor executes the strategy (minting/redeeming vDOT, etc.).

## Security
- ReentrancyGuard on vault functions.
- TWAP oracle protection (planned).
- Slippage controls in RebalanceExecutor.
- Governance via OpenGov (weights adjustable).