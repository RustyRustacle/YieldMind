const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AIScorer", function () {
  let xcmReader, dotPriceOracle, scorer;

  beforeEach(async function () {
    const MockXCMYieldReader = await ethers.getContractFactory("MockXCMYieldReader");
    xcmReader = await MockXCMYieldReader.deploy(750, 700, 500);

    const MockChainlinkOracle = await ethers.getContractFactory("MockChainlinkOracle");
    dotPriceOracle = await MockChainlinkOracle.deploy(10 * 10**8, 8);

    const AIScorer = await ethers.getContractFactory("AIScorer");
    scorer = await AIScorer.deploy(await xcmReader.getAddress(), await dotPriceOracle.getAddress());
  });

  it("should return best strategy based on weights", async function () {
    const [strategy, score] = await scorer.getBestStrategy();
    // With default rates (7.5%,7.0%,5.0%) and weights 40/35/25, vDOT should win
    expect(strategy).to.equal(0); // 0 = vDOT
    expect(score).to.be.gt(0);
  });

  it("should allow governance to update weights", async function () {
    await scorer.setWeights(2000, 4000, 4000); // now USDC + DOT have higher weight
    const [strategy] = await scorer.getBestStrategy();
    // DOT rate 7% vs USDC 5% => DOT should win
    expect(strategy).to.equal(1);
  });
});