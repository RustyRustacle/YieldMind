require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    "polkadot-hub-testnet": {
      url: process.env.POLKADOT_HUB_RPC_URL || "https://eth-rpc-testnet.polkadot.io/",
      chainId: 420420417,
      accounts: (() => {
        const pk = process.env.PRIVATE_KEY;
        if (!pk) return [];
        // Ensure it's a 32-byte hex string (64 chars, or 66 with 0x)
        const cleanPk = pk.startsWith("0x") ? pk.slice(2) : pk;
        if (cleanPk.length !== 64 || !/^[0-9a-fA-F]+$/.test(cleanPk)) {
          console.warn("Invalid PRIVATE_KEY format in .env, skipping account configuration.");
          return [];
        }
        return [pk.startsWith("0x") ? pk : `0x${pk}`];
      })(),
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};