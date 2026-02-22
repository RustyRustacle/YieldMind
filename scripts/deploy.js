const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy mock tokens (WDOT, USDC)
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const wdot = await MockERC20.deploy("Wrapped DOT", "WDOT", 18);
  await wdot.waitForDeployment();
  console.log("WDOT deployed to:", await wdot.getAddress());

  const usdc = await MockERC20.deploy("USD Coin", "USDC", 6);
  await usdc.waitForDeployment();
  console.log("USDC deployed to:", await usdc.getAddress());

  // Deploy mock XCM reader
  const MockXCMYieldReader = await hre.ethers.getContractFactory("MockXCMYieldReader");
  const xcmReader = await MockXCMYieldReader.deploy(750, 700, 500); // 7.5%, 7.0%, 5.0%
  await xcmReader.waitForDeployment();
  console.log("MockXCMYieldReader deployed to:", await xcmReader.getAddress());

  // Deploy mock Chainlink oracle for DOT price
  const MockChainlinkOracle = await hre.ethers.getContractFactory("MockChainlinkOracle");
  const dotPriceOracle = await MockChainlinkOracle.deploy(10 * 10**8, 8); // $10.00 with 8 decimals
  await dotPriceOracle.waitForDeployment();
  console.log("MockChainlinkOracle deployed to:", await dotPriceOracle.getAddress());

  // Deploy AIScorer
  const AIScorer = await hre.ethers.getContractFactory("AIScorer");
  const scorer = await AIScorer.deploy(await xcmReader.getAddress(), await dotPriceOracle.getAddress());
  await scorer.waitForDeployment();
  console.log("AIScorer deployed to:", await scorer.getAddress());

  // Deploy RebalanceExecutor (mock Bifrost address - use zero for now)
  const RebalanceExecutor = await hre.ethers.getContractFactory("RebalanceExecutor");
  const rebalanceExecutor = await RebalanceExecutor.deploy(
    await wdot.getAddress(),
    await usdc.getAddress(),
    "0x0000000000000000000000000000000000000000" // placeholder for Bifrost vDOT
  );
  await rebalanceExecutor.waitForDeployment();
  console.log("RebalanceExecutor deployed to:", await rebalanceExecutor.getAddress());

  // Deploy YieldVault (asset = WDOT)
  const YieldVault = await hre.ethers.getContractFactory("YieldVault");
  const vault = await YieldVault.deploy(
    await wdot.getAddress(),
    "YieldMind Vault Token",
    "ymWDOT",
    await scorer.getAddress(),
    await rebalanceExecutor.getAddress()
  );
  await vault.waitForDeployment();
  console.log("YieldVault deployed to:", await vault.getAddress());

  // Deploy GaslessForwarder
  const GaslessForwarder = await hre.ethers.getContractFactory("GaslessForwarder");
  const forwarder = await GaslessForwarder.deploy();
  await forwarder.waitForDeployment();
  console.log("GaslessForwarder deployed to:", await forwarder.getAddress());

  // Optional: set vault as owner of rebalanceExecutor
  await rebalanceExecutor.transferOwnership(await vault.getAddress());
  console.log("RebalanceExecutor ownership transferred to vault");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});