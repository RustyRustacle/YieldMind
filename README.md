<div align="center">

<img src="https://img.shields.io/badge/Polkadot-E91E8C?style=for-the-badge&logo=polkadot&logoColor=white" />
<img src="https://img.shields.io/badge/Solidity-0.8.24-363636?style=for-the-badge&logo=solidity&logoColor=white" />
<img src="https://img.shields.io/badge/ERC--4626-Vault-6C3FC5?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
<img src="https://img.shields.io/badge/Hackathon-Polkadot%202026-E91E8C?style=for-the-badge" />

<br /><br />

```
██╗   ██╗██╗███████╗██╗     ██████╗ ███╗   ███╗██╗███╗   ██╗██████╗
╚██╗ ██╔╝██║██╔════╝██║     ██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗
 ╚████╔╝ ██║█████╗  ██║     ██║  ██║██╔████╔██║██║██╔██╗ ██║██║  ██║
  ╚██╔╝  ██║██╔══╝  ██║     ██║  ██║██║╚██╔╝██║██║██║╚██╗██║██║  ██║
   ██║   ██║███████╗███████╗██████╔╝██║ ╚═╝ ██║██║██║ ╚████║██████╔╝
   ╚═╝   ╚═╝╚══════╝╚══════╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝
```

### **AI-Powered Yield Intelligence Protocol on Polkadot Hub**

*The first on-chain AI agent that dynamically rebalances LST-backed yield strategies*  
*using real-time Polkadot staking signals — built entirely in Solidity*

<br />

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-yieldmind.vercel.app-E91E8C?style=flat-square)](https://yieldmind.vercel.app)
[![Testnet](https://img.shields.io/badge/🔗%20Testnet-Passet%20Hub-6C3FC5?style=flat-square)](https://blockscout.passet-hub.parity.io)
[![Docs](https://img.shields.io/badge/📄%20Docs-Architecture-0F9D58?style=flat-square)](docs/ARCHITECTURE.md)
[![Security](https://img.shields.io/badge/🔒%20Security-Model-1565C0?style=flat-square)](docs/SECURITY.md)

</div>

---
## LIVE DEMO
https://yieldmindpolkadot.vercel.app/

## 📋 Table of Contents

- [Overview](#-overview)
- [How It Works](#-how-it-works)
- [Contract Architecture](#-contract-architecture)
- [AI Scoring Model](#-ai-scoring-model)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Deploy](#-deploy)
- [Run Tests](#-run-tests)
- [Frontend](#-frontend)
- [Contract Addresses](#-contract-addresses)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧠 Overview

**YieldMind** solves the biggest UX problem in Polkadot DeFi: fragmented yield.

With $800M+ in staked DOT spread across Bifrost vDOT, native staking, and USDC money markets, retail users must manually bridge, swap, and rebalance across parachains — losing yield windows and paying gas multiple times.

YieldMind replaces this with a **single ERC-4626 vault** that:

1. Accepts DOT (wrapped as WDOT) from users
2. Reads live APY data from Bifrost via XCM + Chainlink
3. Runs an on-chain AI scoring model every 6 hours
4. **Automatically rebalances** to the highest-yielding strategy
5. Lets users deposit **gaslessly** via EIP-2771 meta-transactions

> **Track**: EVM Smart Contract — Polkadot Hub  
> **Categories**: DeFi / Stablecoin-enabled dApps + AI-powered dApps  
> **License**: MIT (open-source, non-commercial)

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER FLOW                                │
│                                                                 │
│   User ──deposit WDOT──► YieldVault (ERC-4626)                 │
│                               │                                 │
│                    ┌──────────▼──────────┐                      │
│                    │    AIScorer.sol      │                      │
│                    │  Yield Opportunity   │                      │
│                    │  Score (YOS) Engine  │                      │
│                    └──────────┬──────────┘                      │
│                               │ reads rates from                │
│              ┌────────────────▼────────────────┐                │
│              │        XCMYieldReader.sol        │                │
│              │  Receives Bifrost XCM messages   │                │
│              │  vDOT APY │ DOT Rate │ USDC Rate │                │
│              └────────────────┬────────────────┘                │
│                               │ best strategy                   │
│                    ┌──────────▼──────────┐                      │
│                    │ RebalanceExecutor   │                      │
│                    ├─────────────────────┤                      │
│                    │ Strategy 0: vDOT   │ ← Bifrost SLP         │
│                    │ Strategy 1: DOT    │ ← Native Staking      │
│                    │ Strategy 2: USDC   │ ← Lending Pool        │
│                    └─────────────────────┘                      │
│                                                                 │
│   GaslessForwarder (EIP-2771) ── enables gasless first deposit  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📐 Contract Architecture

| Contract | Description | Key Features |
|---|---|---|
| [`YieldVault.sol`](contracts/YieldVault.sol) | Core ERC-4626 vault — user entry/exit point | ReentrancyGuard, Pausable, EIP-2771, performance fee |
| [`AIScorer.sol`](contracts/AIScorer.sol) | On-chain Yield Opportunity Score (YOS) engine | Governance-adjustable weights, 3-strategy scoring |
| [`XCMYieldReader.sol`](contracts/XCMYieldReader.sol) | Receives & validates Bifrost XCM yield data | Source validation, 2h staleness check, rate sanity |
| [`RebalanceExecutor.sol`](contracts/RebalanceExecutor.sol) | Executes strategy transitions | 6h cooldown, slippage cap, vault-only access |
| [`GaslessForwarder.sol`](contracts/GaslessForwarder.sol) | EIP-2771 meta-transaction forwarder | EIP-712 signatures, nonce tracking, deadline expiry |
| [`MockWDOT.sol`](contracts/MockWDOT.sol) | Testnet WDOT (10 decimals) | Faucet for testing |

### Contract Ownership Graph

```
Deployer (owner)
    │
    ├── owns ──► GaslessForwarder
    ├── owns ──► RebalanceExecutor ──► vault set to YieldVault
    ├── owns ──► YieldVault
    └── owns ──► XCMYieldReader
                     │
                     └── owns ──► AIScorer
                                  (only XCMYieldReader can push rates)
```

---

## 🤖 AI Scoring Model

The "AI" in YieldMind is a **deterministic, trustless, auditable** on-chain scoring function — not an off-chain LLM. This makes it permissionless and verifiable by anyone.

### Yield Opportunity Score Formula

```
YOS_i = ( weight_i × rate_i ) / 100  −  risk_penalty_i

Where:
  weight_vDOT = 40    rate_vDOT = Bifrost vDOT APY (bps)    penalty_vDOT = 50
  weight_DOT  = 35    rate_DOT  = DOT staking rate (bps)    penalty_DOT  = 30
  weight_USDC = 25    rate_USDC = USDC lending rate (bps)   penalty_USDC = 10

Rebalance triggers when:
  max(YOS) − current(YOS) > rebalanceThreshold (default: 200 bps = 2%)
```

### Example Calculation

| Strategy | APY | Weight | Raw Score | Penalty | **YOS** |
|---|---|---|---|---|---|
| Bifrost vDOT | 8.50% | 40 | 340 | 50 | **290** |
| DOT Staking | 11.20% | 35 | 392 | 30 | **362** ← winner |
| USDC Lending | 5.00% | 25 | 125 | 10 | **115** |

> Weights are governance-adjustable via `AIScorer.setWeights()` (owner = DAO multisig in production).

---

## 🚀 Quick Start

### Prerequisites

| Tool | Required Version | Install |
|---|---|---|
| Node.js | v18 or v20 (recommended) | [nodejs.org](https://nodejs.org) |
| npm | v8+ | included with Node |
| MetaMask | Latest | [metamask.io](https://metamask.io) |
| Git | Any | [git-scm.com](https://git-scm.com) |

> ⚠️ **Node.js v25 works but shows a Hardhat warning.** Use v18 LTS or v20 LTS for clean output.

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-handle/yieldmind.git
cd yieldmind

# 2. Install root dependencies (Hardhat, OpenZeppelin, etc.)
npm install

# 3. Copy environment template
cp .env.example .env

# 4. Edit .env — add your deployer private key
#    Format accepted: with or without 0x prefix
#    PRIVATE_KEY=your64hexcharacterprivatekeyhere
```

### Environment Variables

```dotenv
# .env

# Deployer wallet private key (64 hex chars, 0x prefix optional)
PRIVATE_KEY=your_private_key_here

# Passet Hub testnet RPC — must use this exact variable name
PASSET_HUB_RPC=https://testnet-passet-hub-eth-rpc.polkadot.io

# Optional: print gas usage table after tests
REPORT_GAS=false
```

> 🔐 **Security**: Use a dedicated testnet wallet. Never reuse a mainnet wallet for development.

---

## 🔨 Compile

```bash
npx hardhat compile
```

Expected output:
```
Compiled 6 Solidity files successfully (evm target: paris)
```

---

## 🚢 Deploy

### Local (Hardhat Node)

Open **two terminals**:

**Terminal 1 — Start local blockchain:**
```bash
npx hardhat node
```
Keep this running. You'll see 20 test accounts with 10,000 ETH each.

**Terminal 2 — Deploy contracts:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

The script will:
- Deploy all 7 contracts in the correct order
- Wire ownership between contracts automatically
- Seed initial yield rates (vDOT=8.50%, DOT=11.20%, USDC=5.00%)
- Deposit 1,000 WDOT as initial vault liquidity
- **Auto-update `frontend/src/config/contracts.js`** with new addresses

### Testnet (Passet Hub)

```bash
# Make sure PRIVATE_KEY and PASSET_HUB_RPC are set in .env
npx hardhat run scripts/deploy.js --network passet-hub
```

Get testnet PAS tokens from the [Passet Hub Faucet](https://faucet.polkadot.io).

---

## 🧪 Run Tests

```bash
# Run all tests
npx hardhat test

# Run with gas report
REPORT_GAS=true npx hardhat test

# Run specific test suite
npx hardhat test --grep "AIScorer"
npx hardhat test --grep "YieldVault"

# Coverage report
npx hardhat coverage
```

### Test Suites

| Suite | Tests | Coverage |
|---|---|---|
| `AIScorer` | Weight validation, scoring math, governance | ✅ |
| `XCMYieldReader` | XCM auth, staleness, rate validation | ✅ |
| `GaslessForwarder` | EIP-712 sig, nonce, deadline | ✅ |
| `RebalanceExecutor` | Cooldown, access control, slippage | ✅ |
| `YieldVault` | Deposit/withdraw, fee, pause, limits | ✅ |
| `Integration` | Full deposit → rebalance → harvest → withdraw | ✅ |

---

## 🖥️ Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# → Opens at http://localhost:3000

# Build for production
npm run build
```

### Connect MetaMask to Hardhat Local

| Field | Value |
|---|---|
| Network Name | Hardhat Local |
| RPC URL | `http://127.0.0.1:8545` |
| Chain ID | `31337` |
| Currency Symbol | `ETH` |

**Import test wallet** (Hardhat account #0):
```
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
Address:     0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Balance:     10,000 ETH (local only)
```

### Frontend Features

| Screen | Description |
|---|---|
| **Dashboard** | TVL, share price, current strategy, APY overview |
| **Vault Panel** | Deposit WDOT, withdraw ymDOT, faucet for testnet |
| **AI Score Panel** | Live YOS per strategy, 7-day history, rebalance trigger |
| **Status Bar** | XCM connection status, last oracle update, data freshness |

---

## 📍 Contract Addresses

### Localhost (Hardhat Node — `chainId: 31337`)

> ⚠️ These addresses reset every time you restart `npx hardhat node`. Re-deploy to get fresh addresses.

| Contract | Address |
|---|---|
| MockWDOT | `0x8A791620dd6260079BF849Dc5567aDC3F2FdC318` |
| MockUSDC | `0x610178dA211FEF7D417bC0e6FeD39F05609AD788` |
| AIScorer | `0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82` |
| XCMYieldReader | `0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e` |
| RebalanceExecutor | `0x9A676e781A523b5d0C0e43731313A708CB607508` |
| YieldVault | `0x0B306BF915C4d645ff596e518fAf3F9669b97016` |
| GaslessForwarder | `0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1` |

### Passet Hub Testnet (`chainId: 420420421`)

| Contract | Address |
|---|---|
| YieldVault | `— deploy pending —` |
| AIScorer | `— deploy pending —` |
| XCMYieldReader | `— deploy pending —` |

---

## 🗂️ Project Structure

```
yieldmind/
│
├── contracts/                    ← Solidity smart contracts
│   ├── YieldVault.sol            ← ERC-4626 vault (main entry point)
│   ├── AIScorer.sol              ← On-chain yield scoring model
│   ├── XCMYieldReader.sol        ← Bifrost XCM data receiver
│   ├── RebalanceExecutor.sol     ← Strategy execution engine
│   ├── GaslessForwarder.sol      ← EIP-2771 meta-tx forwarder
│   ├── MockWDOT.sol              ← Testnet WDOT token
│   └── mocks/
│       ├── MockERC20.sol         ← Generic ERC-20 mock
│       └── MockXCMYieldReader.sol ← XCM simulation for tests
│
├── scripts/
│   └── deploy.js                 ← Full deployment + auto frontend update
│
├── test/
│   └── YieldMind.test.js         ← 25+ test cases across all contracts
│
├── frontend/                     ← React + Vite + Dedot SDK
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── VaultPanel.jsx
│   │   │   ├── AIScorePanel.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── StatusBar.jsx
│   │   │   └── ConnectScreen.jsx
│   │   ├── hooks/
│   │   │   ├── useWallet.js      ← MetaMask / SubWallet connection
│   │   │   └── useVault.js       ← Contract reads + tx helpers
│   │   └── config/
│   │       ├── contracts.js      ← Contract addresses (auto-updated by deploy)
│   │       └── abis.js           ← Minimal ABIs for frontend
│   └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md           ← System design + flow diagrams
│   └── SECURITY.md               ← Threat model + SWC checklist
│
├── deployments/
│   └── latest.json               ← Last deployment addresses (auto-generated)
│
├── hardhat.config.js
├── package.json
├── .env.example                  ← Copy to .env and fill in keys
├── .gitignore
└── README.md
```

---

## 🔒 Security

YieldMind was built with security-first design. Full threat model: [`docs/SECURITY.md`](docs/SECURITY.md)

### Protections at a Glance

| Attack Vector | Protection |
|---|---|
| Reentrancy | `ReentrancyGuard` on all vault functions |
| Oracle manipulation | 2-hour data freshness + rate sanity bounds |
| Flash loan attacks | 6-hour rebalance cooldown (`REBALANCE_COOLDOWN`) |
| Unauthorized rebalance | `onlyVault` modifier on `RebalanceExecutor` |
| Integer overflow | Solidity 0.8.24 native protection |
| Replay attacks | Per-user nonce in `GaslessForwarder` |
| Expired meta-tx | Deadline field enforced in forwarder |
| Dust deposits | `minDeposit = 0.01 WDOT` enforced |
| Runaway fees | Fee hard-capped at 30% (`MAX_FEE_BPS`) |
| TVL manipulation | `totalDepositCap = 10M WDOT` during audit period |

### Known Limitations (Hackathon Scope)

- Strategy execution hooks (`_enterStrategy` / `_exitStrategy`) emit events as proof-of-call but do not call live Bifrost SLP / lending protocols yet — production integration is Phase 1 roadmap
- Yield accrual in `harvest()` is mathematically computed from APY × TVL — production claims real staking rewards
- XCM data on testnet is simulated via `manualUpdate()` — production uses Bifrost sovereign account

---

## 🗺️ Roadmap

| Phase | Timeline | Milestone |
|---|---|---|
| **Phase 0** | Hackathon | ✅ Core contracts, tests, frontend, testnet deploy |
| **Phase 1** | Q2 2026 | External audit (Polkadot Assurance Legion), Passet Hub mainnet |
| **Phase 2** | Q3 2026 | W3F grant for XCMYieldReader as public good, +2 strategies, OpenGov weight control |
| **Phase 3** | Q4 2026 | YieldMind DAO, token-governed strategy whitelist, Velocity Labs liquidity partnership |
| **Phase 4** | 2027 | XCM reader for 5+ parachains, institutional vault tier, mobile app |

---

## 🤝 Contributing

This project is open-source under MIT for the common good.

```bash
# Fork, clone, create branch
git checkout -b feature/your-feature

# Make changes, add tests
npx hardhat test

# Commit with meaningful messages (required for hackathon commit log)
git commit -m "feat: add strategy X integration"

# Push and open PR
git push origin feature/your-feature
```

**Commit convention:**
- `feat:` — new feature
- `fix:` — bug fix
- `test:` — adding tests
- `docs:` — documentation
- `refactor:` — code restructure

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

**Non-commercial intent**: This codebase is submitted as a common good project under the Polkadot Solidity Hackathon 2026 rules. It will not be used for commercial purposes in its archived form.

---

<div align="center">

**Built with ❤️ for the Polkadot ecosystem**

*YieldMind — The AI that earns while you sleep*

[![Polkadot](https://img.shields.io/badge/Built%20on-Polkadot%20Hub-E91E8C?style=flat-square&logo=polkadot)](https://polkadot.network)
[![OpenZeppelin](https://img.shields.io/badge/Secured%20by-OpenZeppelin-4E5EE4?style=flat-square)](https://openzeppelin.com)
[![Bifrost](https://img.shields.io/badge/Integrated%20with-Bifrost-5A8DEE?style=flat-square)](https://bifrost.finance)

</div>