# YieldMind – AI‑Powered Yield Intelligence on Polkadot Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

YieldMind is the first on‑chain AI agent that dynamically rebalances LST‑backed yield strategies using real‑time Polkadot staking signals. Built entirely in Solidity on Polkadot Hub EVM.

## Features
- ERC‑4626 vault with automatic AI rebalancing
- On‑chain scoring model using XCM and Chainlink data
- Gasless meta‑transactions for first‑time depositors
- XCMYieldReader – reads Bifrost staking APY via XCM (simulated via relayer)
- React + Dedot frontend with one‑click interactions

## Quick Start
```bash
git clone https://github.com/your-handle/yieldmind
cd yieldmind
npm install
npx hardhat compile
npx hardhat test
npm run deploy
cd frontend && npm install && npm run dev

Live Demo
https://yieldmind.vercel.app

License
MIT (non‑commercial, common good)

text

#### `LICENSE`
MIT License

Copyright (c) 2026 YieldMind Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

text

---

### Contracts

#### `contracts/interfaces/IChainlinkOracle.sol`
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IChainlinkOracle {
    function latestAnswer() external view returns (int256);
    function decimals() external view returns (uint8);
}