const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YieldVault", function () {
    let vault, wdot, usdc, xcmReader, dotPriceOracle, scorer, rebalanceExecutor;
    let owner, user;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        const MockERC20 = await ethers.getContractFactory("MockERC20");
        wdot = await MockERC20.deploy("Wrapped DOT", "WDOT", 18);
        usdc = await MockERC20.deploy("USD Coin", "USDC", 6);

        const MockXCMYieldReader = await ethers.getContractFactory("MockXCMYieldReader");
        xcmReader = await MockXCMYieldReader.deploy(750, 700, 500);

        const MockChainlinkOracle = await ethers.getContractFactory("MockChainlinkOracle");
        dotPriceOracle = await MockChainlinkOracle.deploy(10 * 10 ** 8, 8);

        const AIScorer = await ethers.getContractFactory("AIScorer");
        scorer = await AIScorer.deploy(await xcmReader.getAddress(), await dotPriceOracle.getAddress());

        const MockBifrost = await ethers.getContractFactory("MockBifrost");
        const bifrost = await MockBifrost.deploy();

        const RebalanceExecutor = await ethers.getContractFactory("RebalanceExecutor");
        rebalanceExecutor = await RebalanceExecutor.deploy(
            await wdot.getAddress(),
            await usdc.getAddress(),
            await bifrost.getAddress()
        );

        const YieldVault = await ethers.getContractFactory("YieldVault");
        vault = await YieldVault.deploy(
            await wdot.getAddress(),
            "YieldMind Vault Token",
            "ymWDOT",
            await scorer.getAddress(),
            await rebalanceExecutor.getAddress()
        );

        await rebalanceExecutor.transferOwnership(await vault.getAddress());
    });

    it("should allow deposits and mint shares", async function () {
        const depositAmount = ethers.parseUnits("100", 18);
        await wdot.mint(user.address, depositAmount);
        await wdot.connect(user).approve(await vault.getAddress(), depositAmount);
        await vault.connect(user).deposit(depositAmount, user.address);

        const shares = await vault.balanceOf(user.address);
        expect(shares).to.equal(depositAmount); // 1:1 for simplicity
    });

    it("should trigger rebalance after interval", async function () {
        // Fast-forward time
        await ethers.provider.send("evm_increaseTime", [6 * 3600 + 1]);
        await ethers.provider.send("evm_mine");

        await expect(vault.triggerRebalance())
            .to.emit(vault, "Rebalanced");
    });

    it("should not rebalance before interval", async function () {
        await expect(vault.triggerRebalance()).to.be.revertedWith("Too soon");
    });
});