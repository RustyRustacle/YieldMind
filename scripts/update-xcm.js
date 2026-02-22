const hre = require("hardhat");

// This script would be run periodically by a relayer to update yield data.
async function main() {
  const xcmReaderAddress = "0x..."; // deployed address
  const XCMYieldReader = await hre.ethers.getContractFactory("XCMYieldReader");
  const xcmReader = XCMYieldReader.attach(xcmReaderAddress);

  // In production, these values would be fetched from Bifrost via XCM.
  // For hackathon, we simulate random changes.
  const newVdotApy = Math.floor(Math.random() * 1000) + 500; // 5% to 15%
  const newDotRate = Math.floor(Math.random() * 800) + 400;  // 4% to 12%
  const newUsdcRate = Math.floor(Math.random() * 600) + 200; // 2% to 8%

  const tx = await xcmReader.updateRates(newVdotApy, newDotRate, newUsdcRate);
  await tx.wait();
  console.log(`Updated rates: vDOT=${newVdotApy}, DOT=${newDotRate}, USDC=${newUsdcRate}`);
}

main().catch(console.error);