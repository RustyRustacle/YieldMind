# Security Model

## Threat Mitigations
- **Reentrancy**: OpenZeppelin ReentrancyGuard on all external functions.
- **Oracle Manipulation**: Chainlink price feeds with TWAP (15 min) – to be implemented.
- **Slippage**: RebalanceExecutor enforces 1% max slippage.
- **Access Control**: Only vault can call executeStrategy.
- **Rate Limiting**: Rebalance allowed once per 6 hours.
- **XCM Validation**: XCMYieldReader only accepts updates from trusted relayer (owner).

## Audits
- Informal SWC checklist included in repository.
- Planned external audit by Polkadot Assurance Legion (Q2 2026).