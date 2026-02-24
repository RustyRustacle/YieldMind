<div align="center">

<img src="https://img.shields.io/badge/Polkadot_Hub-E91E8C?style=for-the-badge&logo=polkadot&logoColor=white" />
<img src="https://img.shields.io/badge/Solidity-0.8.24-363636?style=for-the-badge&logo=solidity&logoColor=white" />
<img src="https://img.shields.io/badge/ERC--4626-Vault_Standard-6C3FC5?style=for-the-badge" />
<img src="https://img.shields.io/badge/OpenZeppelin-5.x-4E5EE4?style=for-the-badge&logo=openzeppelin&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" />
<img src="https://img.shields.io/badge/Tests-34%20Passing-22C55E?style=for-the-badge" />

<br /><br />

```
██╗   ██╗██╗███████╗██╗     ██████╗ ███╗   ███╗██╗███╗   ██╗██████╗
╚██╗ ██╔╝██║██╔════╝██║     ██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗
 ╚████╔╝ ██║█████╗  ██║     ██║  ██║██╔████╔██║██║██╔██╗ ██║██║  ██║
  ╚██╔╝  ██║██╔══╝  ██║     ██║  ██║██║╚██╔╝██║██║██║╚██╗██║██║  ██║
   ██║   ██║███████╗███████╗██████╔╝██║ ╚═╝ ██║██║██║ ╚████║██████╔╝
   ╚═╝   ╚═╝╚══════╝╚══════╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝
```

### AI-Powered Yield Intelligence Protocol on Polkadot Hub

*The first on-chain AI agent that dynamically rebalances LST-backed yield strategies*
*using real-time Polkadot staking signals — built entirely in Solidity on Polkadot Hub EVM*

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-yieldmindpolkadot.vercel.app-E91E8C?style=flat-square)](https://yieldmindpolkadot.vercel.app)
[![Testnet](https://img.shields.io/badge/🔗_Deployed_on-Polkadot_Hub_Testnet-6C3FC5?style=flat-square)](https://blockscout.polkadot-hub-testnet.parity.io)
[![Docs](https://img.shields.io/badge/📄_Architecture-docs-0F9D58?style=flat-square)](docs/ARCHITECTURE.md)
[![Security](https://img.shields.io/badge/🔒_Security-Model-1565C0?style=flat-square)](docs/SECURITY.md)

</div>

---

## 🚀 Live Demo

**[https://yieldmindpolkadot.vercel.app/](https://yieldmindpolkadot.vercel.app/)**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [AI Scoring Model](#-ai-scoring-model)
- [Smart Contract Reference](#-smart-contract-reference)
- [Quick Start](#-quick-start)
- [Testing](#-testing)
- [Testnet Deployment](#-testnet-deployment)
- [XCM Relayer](#-xcm-relayer)
- [Frontend](#-frontend)
- [Project Structure](#-project-structure)
- [Security Model](#-security-model)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧠 Overview

**YieldMind** solves the biggest UX problem in Polkadot DeFi: **fragmented yield across parachains**.

With hundreds of millions in staked DOT spread across Bifrost vDOT, native staking, and USDC money markets, retail users must manually bridge, swap, and rebalance across parachains — losing yield windows and paying gas multiple times.

YieldMind replaces this with a **single ERC-4626 vault** that autonomously manages yield optimization:

```
User deposits WDOT → AI scores 3 strategies → Auto-rebalance every 6h → User earns optimized yield
```

### Core Value Propositions

| Feature | Description |
|---|---|
| **Single-Deposit UX** | Deposit once, earn optimized yield across 3 strategies |
| **On-Chain AI Scoring** | Deterministic, verifiable scoring — no off-chain black boxes |
| **XCM-Native Data** | Real-time yield data from Bifrost via cross-chain messaging |
| **Gasless First Deposit** | EIP-2771 meta-transactions eliminate gas barrier for new users |
| **Fully Composable** | ERC-4626 standard — integrates with any DeFi protocol |

> **Track**: EVM Smart Contract — Polkadot Hub
> **Categories**: DeFi / Stablecoin-enabled dApps + AI-powered dApps
> **Network**: Polkadot Hub Testnet (Chain ID: `420420417`)

---

## ⚙️ System Architecture

```
                          ┌──────────────────────┐
                          │     USER WALLET      │
                          │  (MetaMask/Talisman) │
                          └──────────┬───────────┘
                                     │
                    ┌────────────────▼────────────────┐
                    │   GASLESS FORWARDER (EIP-2771)  │
                    │   Meta-tx relay for onboarding  │
                    └────────────────┬────────────────┘
                                     │
              ┌──────────────────────▼──────────────────────┐
              │              YIELD VAULT (ERC-4626)         │
              │                                             │
              │  • deposit(WDOT) → mint ymWDOT shares      │
              │  • redeem(ymWDOT) → withdraw WDOT           │
              │  • triggerRebalance() → every 6 hours       │
              │  • ReentrancyGuard protected                │
              └───────┬─────────────────────────┬──────────┘
                      │                         │
           ┌──────────▼──────────┐   ┌──────────▼──────────┐
           │    AI SCORER        │   │  REBALANCE EXECUTOR  │
           │                     │   │                      │
           │  YOS = Σ(w_i × r_i)│   │  Strategy 0: vDOT    │
           │       - penalties   │   │  Strategy 1: DOT     │
           │                     │   │  Strategy 2: USDC    │
           │  Deterministic &    │   │                      │
           │  fully on-chain     │   │  Only vault can call │
           └──────────┬──────────┘   └──────────────────────┘
                      │
           ┌──────────▼──────────┐   ┌──────────────────────┐
           │  XCM YIELD READER   │   │  CHAINLINK ORACLE    │
           │                     │   │                      │
           │  vDOT APY (Bifrost) │   │  DOT/USD price feed  │
           │  DOT staking rate   │   │  Volatility proxy    │
           │  USDC lending rate  │   │                      │
           │                     │   │                      │
           │  Updated by relayer │   │  8 decimal precision │
           │  every 6 hours      │   │                      │
           └─────────────────────┘   └──────────────────────┘
```

### Data Flow

1. **Relayer** pushes yield rates from Bifrost → `XCMYieldReader` every 6 hours
2. **AIScorer** reads rates + DOT price oracle → computes Yield Opportunity Score (YOS)
3. **YieldVault.triggerRebalance()** asks scorer for best strategy → delegates to `RebalanceExecutor`
4. **RebalanceExecutor** executes the strategy transition (vDOT mint / DOT stake / USDC lend)

---

## 🤖 AI Scoring Model

The "AI" in YieldMind is a **deterministic, trustless, auditable** on-chain scoring function. No off-chain LLMs, no oracles that can be manipulated — just pure math, verifiable by anyone.

### Yield Opportunity Score (YOS) Formula

```
YOS_i = (rate_i × weight_i) / 10000  −  risk_penalty_i
```

### Default Parameters

| Parameter | vDOT (Strategy 0) | DOT (Strategy 1) | USDC (Strategy 2) |
|---|---|---|---|
| **Weight** | 4000 (40%) | 3500 (35%) | 2500 (25%) |
| **Risk Penalty** | 10 bps (volatility) | 5 bps (liquidity) | 0 bps |
| **Data Source** | Bifrost XCM | Native staking rate | Lending pool rate |

### Scoring Example

Given rates: vDOT = 7.50%, DOT = 7.00%, USDC = 5.00%

| Strategy | Rate (bps) | Weight | Raw Score | Penalty | **YOS** |
|---|---|---|---|---|---|
| Bifrost vDOT | 750 | 4000 | 300 | 10 | **290** ← winner |
| DOT Staking | 700 | 3500 | 245 | 5 | **240** |
| USDC Lending | 500 | 2500 | 125 | 0 | **125** |

> **Governance**: Weights are adjustable via `AIScorer.setWeights()` — must always sum to 10000 bps. In production, controlled by DAO multisig or OpenGov.

### Rebalance Constraints

| Constraint | Value | Purpose |
|---|---|---|
| `REBALANCE_INTERVAL` | 6 hours | Prevents flash-loan manipulation |
| `REBALANCE_THRESHOLD` | 200 bps (2%) | Minimum score delta to justify gas cost |

---

## 📜 Smart Contract Reference

### Core Contracts

| Contract | LOC | Description |
|---|---|---|
| [`YieldVault.sol`](contracts/YieldVault.sol) | 73 | ERC-4626 vault — user entry/exit, rebalance orchestrator |
| [`AIScorer.sol`](contracts/AIScorer.sol) | 99 | On-chain YOS engine — weighted scoring with risk penalties |
| [`XCMYieldReader.sol`](contracts/XCMYieldReader.sol) | 52 | Yield data store — relayer-updated with Bifrost rates |
| [`RebalanceExecutor.sol`](contracts/RebalanceExecutor.sol) | 51 | Strategy executor — vault-only access, Bifrost SLP integration |
| [`GaslessForwarder.sol`](contracts/GaslessForwarder.sol) | 14 | EIP-2771 meta-tx forwarder — OpenZeppelin `ERC2771Forwarder` |

### Mock Contracts (Testing & Testnet)

| Contract | Purpose |
|---|---|
| [`MockERC20.sol`](contracts/mocks/MockERC20.sol) | Generic ERC-20 with configurable decimals + `mint()` faucet |
| [`MockXCMYieldReader.sol`](contracts/mocks/MockXCMYieldReader.sol) | XCM rate simulation without access control |
| [`MockChainlinkOracle.sol`](contracts/mocks/MockChainlinkOracle.sol) | Configurable DOT/USD price feed |
| [`MockBifrost.sol`](contracts/mocks/MockBifrost.sol) | Bifrost SLP stub for vDOT mint/redeem |

### Interfaces

| Interface | Used By |
|---|---|
| [`IXCMYieldReader.sol`](contracts/interfaces/IXCMYieldReader.sol) | AIScorer, XCMYieldReader, MockXCMYieldReader |
| [`IChainlinkOracle.sol`](contracts/interfaces/IChainlinkOracle.sol) | AIScorer, MockChainlinkOracle |

### Contract Dependency Graph

```
YieldVault (ERC-4626)
    ├── reads ──► AIScorer
    │                ├── reads ──► IXCMYieldReader (rates)
    │                └── reads ──► IChainlinkOracle (DOT price)
    ├── calls ──► RebalanceExecutor (onlyOwner = vault)
    │                ├── uses ──► WDOT (ERC-20)
    │                ├── uses ──► USDC (ERC-20)
    │                └── calls ──► IBifrostSLP (vDOT mint/redeem)
    └── asset ──► WDOT (ERC-20)

GaslessForwarder (ERC2771Forwarder) ── standalone meta-tx relay
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | v18+ (LTS recommended) | [nodejs.org](https://nodejs.org) |
| npm | v8+ | Bundled with Node.js |
| Git | Any | [git-scm.com](https://git-scm.com) |
| MetaMask | Latest | [metamask.io](https://metamask.io) |

### Installation

```bash
# Clone
git clone https://github.com/RustyRustacle/YieldMind.git
cd YieldMind

# Install smart contract dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your private key
```

### Environment Variables

```dotenv
# .env
PRIVATE_KEY=your_64_hex_char_private_key        # Deployer wallet (0x prefix optional)
POLKADOT_HUB_RPC_URL=https://eth-rpc-testnet.polkadot.io/    # Primary testnet RPC
RELAYER_PRIVATE_KEY=your_relayer_key             # XCM relayer wallet
```

> 🔐 **Security**: Always use a dedicated testnet wallet. Never reuse mainnet keys for development.

### Compile

```bash
npx hardhat compile
# Output: Compiled 41 Solidity files successfully (evm target: paris)
```

---

## 🧪 Testing

### Run All Tests

```bash
npx hardhat test
```

### Test Output

```
  AIScorer (2 tests)
    ✔ should return best strategy based on weights
    ✔ should allow governance to update weights

  YieldMind — Full Integration Flow (29 tests)
    Step 1:  Deployment & Wiring ............. 5 tests
    Step 2:  Token Minting ................... 1 test
    Step 3:  Deposit Flow .................... 3 tests
    Step 4:  AI Scoring Engine ............... 2 tests
    Step 5:  XCM Rate Updates ................ 2 tests
    Step 6:  Rebalance Flow .................. 4 tests
    Step 7:  Governance & Access Control ...... 4 tests
    Step 8:  Withdrawal Flow ................. 3 tests
    Step 9:  Vault State Consistency ......... 3 tests
    Step 10: Constants Verification .......... 2 tests

  YieldVault (3 tests)
    ✔ should allow deposits and mint shares
    ✔ should trigger rebalance after interval
    ✔ should not rebalance before interval

  34 passing (767ms)
```

### Test Architecture

The integration test (`test/Integration.test.js`) simulates the **complete user journey** in sequential steps:

```
Deploy all contracts → Mint tokens → Deposit WDOT → Score strategies →
Update rates via XCM → Rebalance (6h time-travel) → Governance weight change →
Withdraw WDOT → Verify vault state consistency → Validate constants
```

### Run Specific Suites

```bash
# Unit tests only
npx hardhat test test/AIScorer.test.js
npx hardhat test test/YieldVault.test.js

# Integration flow only
npx hardhat test test/Integration.test.js

# With gas report
REPORT_GAS=true npx hardhat test
```

---

## 🔗 Testnet Deployment

### Network Configuration

| Parameter | Value |
|---|---|
| **Network** | Polkadot Hub Testnet |
| **Chain ID** | `420420417` |
| **Currency** | PAS (Paseo) |
| **RPC (Primary)** | `https://eth-rpc-testnet.polkadot.io/` |
| **RPC (Backup)** | `https://services.polkadothub-rpc.com/testnet/` |
| **Faucet** | [faucet.polkadot.io](https://faucet.polkadot.io) |
| **Explorer** | [Polkadot Hub Testnet Explorer](https://blockscout.polkadot-hub-testnet.parity.io) |

### Deploy to Testnet

```bash
# 1. Get PAS tokens from faucet (https://faucet.polkadot.io)
# 2. Ensure PRIVATE_KEY and POLKADOT_HUB_RPC_URL are set in .env
# 3. Deploy
npx hardhat run scripts/deploy.js --network polkadot-hub-testnet
```

### Deployed Contract Addresses (Polkadot Hub Testnet)

| Contract | Address |
|---|---|
| **WDOT** (MockERC20) | `0xa6446C060e93A91b00dA94135d784704F27558eb` |
| **USDC** (MockERC20) | `0xa3c740c8F64eB59c21743792c10aA7E6e1734160` |
| **MockXCMYieldReader** | `0x4F74fE087c53b7db2e01C5Ce4491A037D8007AD2` |
| **MockChainlinkOracle** | `0xf5eded7E428FF0b74BDE1E2Af848816CfA15e813` |
| **AIScorer** | `0x7b78f51cF63C5F181e27CA4CEFD63B484aE2F8d8` |
| **RebalanceExecutor** | `0x9cf1c0395063E30e2047378A3971663DA25c7e59` |
| **YieldVault** | `0x5965941fC7AedF911673d36b27E6ABCC3Fef8B6A` |
| **GaslessForwarder** | `0x596Ce7101DB73258acB293F59b17f49AE7ef6311` |

**Deployer**: `0x4f3c0610e2ACf990fD382A5Fb11021CaECCAf1D7`

### MetaMask / Wallet Configuration

| Field | Value |
|---|---|
| Network Name | Polkadot Hub Testnet |
| RPC URL | `https://eth-rpc-testnet.polkadot.io/` |
| Chain ID | `420420417` |
| Currency Symbol | `PAS` |

---

## 🔄 XCM Relayer

The XCM relayer simulates cross-chain yield data updates from Bifrost. In production, this would be replaced by an XCM listener on the Bifrost sovereign account.

### Auto-Update Script

```bash
# Install cron dependency
npm install node-cron

# Run relayer (updates rates every 6 hours)
node scripts/auto-update-xcm.js
```

The relayer (`scripts/auto-update-xcm.js`) does the following:
1. Connects to `MockXCMYieldReader` on testnet
2. Generates simulated yield rates (vDOT: 5-10%, DOT: 4-8%, USDC: 2-5%)
3. Calls `updateRates()` on-chain
4. Repeats every 6 hours via `node-cron`

### Manual Rate Update

```bash
npx hardhat run scripts/update-xcm.js --network polkadot-hub-testnet
```

---

## 🖥️ Frontend

### Setup & Run

```bash
cd frontend
npm install
npm start
# → Opens at http://localhost:3000
```

### Build for Production

```bash
cd frontend
npm run build
```

### Frontend Features

| Feature | Description |
|---|---|
| **Dashboard** | TVL, share price, current strategy, APY overview |
| **Vault Panel** | Deposit WDOT → receive ymWDOT, redeem to withdraw |
| **AI Score Panel** | Live YOS per strategy, rebalance trigger button |
| **Wallet Connect** | MetaMask / Talisman integration, auto network switching |

---

## 🗂️ Project Structure

```
YieldMind/
│
├── contracts/                          ← Solidity smart contracts (Solidity 0.8.24)
│   ├── YieldVault.sol                  ← Core ERC-4626 vault
│   ├── AIScorer.sol                    ← On-chain yield scoring engine
│   ├── XCMYieldReader.sol              ← Bifrost XCM yield data store
│   ├── RebalanceExecutor.sol           ← Strategy execution engine
│   ├── GaslessForwarder.sol            ← EIP-2771 meta-tx forwarder
│   ├── interfaces/
│   │   ├── IXCMYieldReader.sol         ← Yield reader interface
│   │   └── IChainlinkOracle.sol        ← Price oracle interface
│   └── mocks/
│       ├── MockERC20.sol               ← ERC-20 with mint faucet
│       ├── MockXCMYieldReader.sol       ← XCM simulation for testing
│       ├── MockChainlinkOracle.sol      ← Configurable price feed
│       └── MockBifrost.sol             ← Bifrost SLP stub
│
├── scripts/
│   ├── deploy.js                       ← Full deployment script (7 contracts)
│   ├── auto-update-xcm.js              ← Cron-based XCM relayer (6h interval)
│   ├── update-xcm.js                   ← Manual rate update script
│   ├── mint_tokens.js                  ← Token minting helper
│   ├── check-balance.js                ← Testnet balance checker
│   └── check-nonce.js                  ← Nonce & fee data inspector
│
├── test/
│   ├── AIScorer.test.js                ← AIScorer unit tests (2 tests)
│   ├── YieldVault.test.js              ← YieldVault unit tests (3 tests)
│   └── Integration.test.js            ← Full flow integration (29 tests)
│
├── frontend/                           ← React frontend
│   ├── src/
│   │   ├── App.js                      ← Main application
│   │   ├── components/                 ← UI components (19 files)
│   │   ├── config/
│   │   │   └── contracts.js            ← Deployed addresses & ABIs
│   │   ├── styles/                     ← CSS stylesheets
│   │   └── utils/                      ← Helper utilities
│   └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md                 ← System design documentation
│   └── SECURITY.md                     ← Threat model & SWC checklist
│
├── hardhat.config.js                   ← Network config (Hardhat + Polkadot Hub Testnet)
├── package.json                        ← Dependencies (Hardhat, OpenZeppelin, ethers)
├── .env.example                        ← Environment template
├── .gitignore
├── LICENSE
└── README.md                           ← This file
```

---

## 🔒 Security Model

Full threat model available in [`docs/SECURITY.md`](docs/SECURITY.md).

### Protection Matrix

| Attack Vector | Mitigation | Contract |
|---|---|---|
| **Reentrancy** | `ReentrancyGuard` on all vault functions | YieldVault |
| **Flash Loan** | 6-hour `REBALANCE_INTERVAL` cooldown | YieldVault |
| **Oracle Manipulation** | Rate sanity bounds in XCMYieldReader | XCMYieldReader |
| **Unauthorized Rebalance** | `onlyOwner` (= vault) on executor | RebalanceExecutor |
| **Weight Manipulation** | `onlyGovernance` + sum must equal 10000 | AIScorer |
| **Integer Overflow** | Solidity 0.8.24 built-in SafeMath | All contracts |
| **Replay Attacks** | Per-user nonce tracking | GaslessForwarder |
| **Expired Meta-TX** | Deadline field enforcement | GaslessForwarder |

### Known Limitations (Hackathon Scope)

| Limitation | Production Solution |
|---|---|
| Strategy execution emits events only (no live protocol calls) | Integrate Bifrost SLP + lending protocols |
| XCM data simulated via `MockXCMYieldReader` | Replace with XCM listener on Bifrost sovereign account |
| No performance fee harvesting | Add `harvest()` with fee-on-yield mechanism |
| Single-chain deployment | Multi-parachain XCM reader expansion |

---

## 🗺️ Roadmap

| Phase | Timeline | Milestone |
|---|---|---|
| **Phase 0** | ✅ Hackathon | Core contracts, 34 tests, frontend, Polkadot Hub testnet deploy |
| **Phase 1** | Q2 2026 | External audit (Polkadot Assurance Legion), Hub mainnet |
| **Phase 2** | Q3 2026 | W3F grant for XCMYieldReader as public good, +2 strategies |
| **Phase 3** | Q4 2026 | YieldMind DAO, token-governed strategy whitelist, OpenGov integration |
| **Phase 4** | 2027 | XCM reader for 5+ parachains, institutional vault tier, mobile app |

---

## 🤝 Contributing

```bash
# Fork, clone, create branch
git checkout -b feature/your-feature

# Make changes, run tests
npx hardhat test

# Commit with conventional messages
git commit -m "feat: add strategy X integration"

# Push and open PR
git push origin feature/your-feature
```

**Commit convention**: `feat:` | `fix:` | `test:` | `docs:` | `refactor:` | `chore:`

---

## 📄 License

```
MIT License — Copyright (c) 2026 YieldMind

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
provided to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

---

<div align="center">

**Built with ❤️ for the Polkadot ecosystem**

*YieldMind — The AI that earns while you sleep*

[![Polkadot](https://img.shields.io/badge/Built_on-Polkadot_Hub-E91E8C?style=flat-square&logo=polkadot)](https://polkadot.network)
[![OpenZeppelin](https://img.shields.io/badge/Secured_by-OpenZeppelin_5.x-4E5EE4?style=flat-square)](https://openzeppelin.com)
[![Bifrost](https://img.shields.io/badge/Integrated_with-Bifrost-5A8DEE?style=flat-square)](https://bifrost.finance)
[![Hardhat](https://img.shields.io/badge/Tested_with-Hardhat-FFF100?style=flat-square&logo=hardhat)](https://hardhat.org)

</div>