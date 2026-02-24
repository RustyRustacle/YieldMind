const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YieldMind — Full Integration Flow", function () {
    let vault, wdot, usdc, xcmReader, dotPriceOracle, scorer, rebalanceExecutor, forwarder;
    let owner, user1, user2;

    before(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // ─── Deploy Token Mocks ───
        const MockERC20 = await ethers.getContractFactory("MockERC20");
        wdot = await MockERC20.deploy("Wrapped DOT", "WDOT", 18);
        usdc = await MockERC20.deploy("USD Coin", "USDC", 6);

        // ─── Deploy XCM Reader (rate oracle) ───
        const MockXCMYieldReader = await ethers.getContractFactory("MockXCMYieldReader");
        xcmReader = await MockXCMYieldReader.deploy(750, 700, 500); // 7.5% vDOT, 7.0% DOT, 5.0% USDC

        // ─── Deploy Chainlink Price Oracle ───
        const MockChainlinkOracle = await ethers.getContractFactory("MockChainlinkOracle");
        dotPriceOracle = await MockChainlinkOracle.deploy(10 * 10 ** 8, 8); // $10.00

        // ─── Deploy AIScorer ───
        const AIScorer = await ethers.getContractFactory("AIScorer");
        scorer = await AIScorer.deploy(await xcmReader.getAddress(), await dotPriceOracle.getAddress());

        // ─── Deploy RebalanceExecutor ───
        const MockBifrost = await ethers.getContractFactory("MockBifrost");
        const bifrost = await MockBifrost.deploy();

        const RebalanceExecutor = await ethers.getContractFactory("RebalanceExecutor");
        rebalanceExecutor = await RebalanceExecutor.deploy(
            await wdot.getAddress(),
            await usdc.getAddress(),
            await bifrost.getAddress()
        );

        // ─── Deploy YieldVault ───
        const YieldVault = await ethers.getContractFactory("YieldVault");
        vault = await YieldVault.deploy(
            await wdot.getAddress(),
            "YieldMind Vault Token",
            "ymWDOT",
            await scorer.getAddress(),
            await rebalanceExecutor.getAddress()
        );

        // ─── Deploy GaslessForwarder ───
        const GaslessForwarder = await ethers.getContractFactory("GaslessForwarder");
        forwarder = await GaslessForwarder.deploy();

        // ─── Wire ownership ───
        await rebalanceExecutor.transferOwnership(await vault.getAddress());
    });

    // ═══════════════════════════════════════════════
    //   STEP 1: DEPLOYMENT & WIRING VERIFICATION
    // ═══════════════════════════════════════════════

    describe("Step 1: Deployment & Wiring", function () {
        it("all contracts should be deployed with valid addresses", async function () {
            expect(await vault.getAddress()).to.be.properAddress;
            expect(await wdot.getAddress()).to.be.properAddress;
            expect(await usdc.getAddress()).to.be.properAddress;
            expect(await scorer.getAddress()).to.be.properAddress;
            expect(await rebalanceExecutor.getAddress()).to.be.properAddress;
            expect(await forwarder.getAddress()).to.be.properAddress;
            expect(await xcmReader.getAddress()).to.be.properAddress;
        });

        it("vault should reference the correct scorer and executor", async function () {
            expect(await vault.scorer()).to.equal(await scorer.getAddress());
            expect(await vault.rebalanceExecutor()).to.equal(await rebalanceExecutor.getAddress());
        });

        it("rebalance executor ownership should be transferred to vault", async function () {
            expect(await rebalanceExecutor.owner()).to.equal(await vault.getAddress());
        });

        it("vault asset should be WDOT", async function () {
            expect(await vault.asset()).to.equal(await wdot.getAddress());
        });

        it("vault ERC20 metadata should be correct", async function () {
            expect(await vault.name()).to.equal("YieldMind Vault Token");
            expect(await vault.symbol()).to.equal("ymWDOT");
        });
    });

    // ═══════════════════════════════════════════════
    //   STEP 2: TOKEN MINTING & BALANCES
    // ═══════════════════════════════════════════════

    describe("Step 2: Token Minting", function () {
        it("should mint WDOT to user1 and user2", async function () {
            const amount1 = ethers.parseUnits("1000", 18);
            const amount2 = ethers.parseUnits("500", 18);

            await wdot.mint(user1.address, amount1);
            await wdot.mint(user2.address, amount2);

            expect(await wdot.balanceOf(user1.address)).to.equal(amount1);
            expect(await wdot.balanceOf(user2.address)).to.equal(amount2);
        });
    });

    // ═══════════════════════════════════════════════
    //   STEP 3: DEPOSIT FLOW
    // ═══════════════════════════════════════════════

    describe("Step 3: Deposit Flow", function () {
        it("user1 should approve and deposit 500 WDOT, receiving ymWDOT shares", async function () {
            const depositAmount = ethers.parseUnits("500", 18);
            const vaultAddress = await vault.getAddress();

            await wdot.connect(user1).approve(vaultAddress, depositAmount);
            await vault.connect(user1).deposit(depositAmount, user1.address);

            const shares = await vault.balanceOf(user1.address);
            expect(shares).to.equal(depositAmount); // 1:1 on first deposit

            // WDOT balance should decrease
            expect(await wdot.balanceOf(user1.address)).to.equal(ethers.parseUnits("500", 18));

            // Vault total assets should match deposit
            expect(await vault.totalAssets()).to.equal(depositAmount);
        });

        it("user2 should deposit 300 WDOT", async function () {
            const depositAmount = ethers.parseUnits("300", 18);
            const vaultAddress = await vault.getAddress();

            await wdot.connect(user2).approve(vaultAddress, depositAmount);
            await vault.connect(user2).deposit(depositAmount, user2.address);

            expect(await vault.balanceOf(user2.address)).to.equal(depositAmount);
            expect(await vault.totalAssets()).to.equal(ethers.parseUnits("800", 18));
        });

        it("should emit Deposit event", async function () {
            const depositAmount = ethers.parseUnits("100", 18);
            const vaultAddress = await vault.getAddress();

            await wdot.connect(user1).approve(vaultAddress, depositAmount);

            await expect(vault.connect(user1).deposit(depositAmount, user1.address))
                .to.emit(vault, "Deposit")
                .withArgs(user1.address, user1.address, depositAmount, depositAmount);
        });
    });

    // ═══════════════════════════════════════════════
    //   STEP 4: AI SCORING ENGINE
    // ═══════════════════════════════════════════════

    describe("Step 4: AI Scoring Engine", function () {
        it("should return vDOT (strategy 0) as best with initial rates", async function () {
            // Rates: vDOT=7.5%, DOT=7.0%, USDC=5.0%
            // Weights: vDOT=40%, DOT=35%, USDC=25%
            // vDOT score: (750*4000)/10000 - 10 = 300 - 10 = 290
            // DOT  score: (700*3500)/10000 - 5  = 245 - 5  = 240
            // USDC score: (500*2500)/10000      = 125
            const [strategy, score] = await scorer.getBestStrategy();
            expect(strategy).to.equal(0); // vDOT wins
            expect(score).to.equal(290);
        });

        it("should read rates from XCMYieldReader correctly", async function () {
            expect(await xcmReader.getVDOTApy()).to.equal(750);
            expect(await xcmReader.getDOTStakingRate()).to.equal(700);
            expect(await xcmReader.getUSDCLendingRate()).to.equal(500);
        });
    });

    // ═══════════════════════════════════════════════
    //   STEP 5: XCM RATE UPDATES
    // ═══════════════════════════════════════════════

    describe("Step 5: XCM Rate Updates", function () {
        it("should update rates and shift best strategy to DOT", async function () {
            // Push DOT rate way up so DOT staking wins
            await xcmReader.updateRates(500, 1200, 300); // 5% vDOT, 12% DOT, 3% USDC

            const [strategy, score] = await scorer.getBestStrategy();
            expect(strategy).to.equal(1); // DOT staking now wins

            // DOT score: (1200*3500)/10000 - 5 = 420 - 5 = 415
            expect(score).to.equal(415);
        });

        it("should shift best strategy to USDC when weights change", async function () {
            // Set extreme weights favoring USDC
            await scorer.setWeights(1000, 1000, 8000); // 10% vDOT, 10% DOT, 80% USDC

            // Rates: 5% vDOT, 12% DOT, 3% USDC
            // USDC score: (300*8000)/10000 = 240 (no penalty)
            // vDOT score: (500*1000)/10000 - 10 = 50 - 10 = 40
            // DOT  score: (1200*1000)/10000 - 5 = 120 - 5 = 115
            const [strategy] = await scorer.getBestStrategy();
            expect(strategy).to.equal(2); // USDC wins with extreme weight

            // Restore weights
            await scorer.setWeights(4000, 3500, 2500);
        });
    });

    // ═══════════════════════════════════════════════
    //   STEP 6: REBALANCE FLOW
    // ═══════════════════════════════════════════════

    describe("Step 6: Rebalance Flow", function () {
        it("should revert if rebalance is triggered too soon", async function () {
            await expect(vault.triggerRebalance()).to.be.revertedWith("Too soon");
        });

        it("should rebalance after 6-hour interval and emit event", async function () {
            // Time travel 6 hours + 1 second
            await ethers.provider.send("evm_increaseTime", [6 * 3600 + 1]);
            await ethers.provider.send("evm_mine");

            // Current best strategy should be DOT (from step 5 rate update)
            const [expectedStrategy] = await scorer.getBestStrategy();

            const tx = await vault.triggerRebalance();
            const receipt = await tx.wait();

            await expect(tx).to.emit(vault, "Rebalanced");

            // Verify lastRebalance was updated
            const lastRebalance = await vault.lastRebalance();
            const block = await ethers.provider.getBlock(receipt.blockNumber);
            expect(lastRebalance).to.equal(block.timestamp);
        });

        it("should not allow rebalance immediately after previous rebalance", async function () {
            await expect(vault.triggerRebalance()).to.be.revertedWith("Too soon");
        });

        it("should allow second rebalance after another 6-hour wait", async function () {
            await ethers.provider.send("evm_increaseTime", [6 * 3600 + 1]);
            await ethers.provider.send("evm_mine");

            await expect(vault.triggerRebalance()).to.emit(vault, "Rebalanced");
        });
    });

    // ═══════════════════════════════════════════════
    //   STEP 7: GOVERNANCE & ACCESS CONTROL
    // ═══════════════════════════════════════════════

    describe("Step 7: Governance & Access Control", function () {
        it("only governance can update AI scorer weights", async function () {
            await expect(
                scorer.connect(user1).setWeights(3000, 3000, 4000)
            ).to.be.revertedWith("not governance");
        });

        it("governance should change weights successfully", async function () {
            await scorer.setWeights(5000, 3000, 2000);
            expect(await scorer.w_vdot()).to.equal(5000);
            expect(await scorer.w_dot()).to.equal(3000);
            expect(await scorer.w_usdc()).to.equal(2000);

            // Restore
            await scorer.setWeights(4000, 3500, 2500);
        });

        it("weights must sum to 10000", async function () {
            await expect(
                scorer.setWeights(5000, 5000, 5000) // sum = 15000
            ).to.be.revertedWith("weights must sum to 10000");
        });

        it("governance can transfer to new address", async function () {
            await scorer.setGovernance(user1.address);
            expect(await scorer.governance()).to.equal(user1.address);

            // Revert back
            await scorer.connect(user1).setGovernance(owner.address);
        });
    });

    // ═══════════════════════════════════════════════
    //   STEP 8: WITHDRAWAL FLOW
    // ═══════════════════════════════════════════════

    describe("Step 8: Withdrawal Flow", function () {
        it("user1 should withdraw WDOT by redeeming shares", async function () {
            const sharesToRedeem = ethers.parseUnits("200", 18);
            const user1SharesBefore = await vault.balanceOf(user1.address);
            const user1WdotBefore = await wdot.balanceOf(user1.address);

            await vault.connect(user1).redeem(sharesToRedeem, user1.address, user1.address);

            const user1SharesAfter = await vault.balanceOf(user1.address);
            const user1WdotAfter = await wdot.balanceOf(user1.address);

            expect(user1SharesAfter).to.equal(user1SharesBefore - sharesToRedeem);
            expect(user1WdotAfter).to.be.gt(user1WdotBefore);
        });

        it("user2 should withdraw all shares", async function () {
            const user2Shares = await vault.balanceOf(user2.address);
            const user2WdotBefore = await wdot.balanceOf(user2.address);

            await vault.connect(user2).redeem(user2Shares, user2.address, user2.address);

            expect(await vault.balanceOf(user2.address)).to.equal(0);
            expect(await wdot.balanceOf(user2.address)).to.be.gt(user2WdotBefore);
        });

        it("should emit Withdraw event", async function () {
            const amount = ethers.parseUnits("50", 18);
            await expect(
                vault.connect(user1).redeem(amount, user1.address, user1.address)
            ).to.emit(vault, "Withdraw");
        });
    });

    // ═══════════════════════════════════════════════
    //   STEP 9: VAULT STATE CONSISTENCY
    // ═══════════════════════════════════════════════

    describe("Step 9: Vault State Consistency", function () {
        it("total supply should match remaining shares", async function () {
            const totalSupply = await vault.totalSupply();
            const user1Shares = await vault.balanceOf(user1.address);
            const user2Shares = await vault.balanceOf(user2.address);

            expect(totalSupply).to.equal(user1Shares + user2Shares);
        });

        it("total assets should be consistent with WDOT held in vault", async function () {
            const vaultWdot = await wdot.balanceOf(await vault.getAddress());
            expect(await vault.totalAssets()).to.equal(vaultWdot);
        });

        it("share-to-asset conversion should be 1:1", async function () {
            const shares = ethers.parseUnits("100", 18);
            const assets = await vault.convertToAssets(shares);
            expect(assets).to.equal(shares);
        });
    });

    // ═══════════════════════════════════════════════
    //   STEP 10: REBALANCE INTERVAL CONSTANT
    // ═══════════════════════════════════════════════

    describe("Step 10: Constants Verification", function () {
        it("REBALANCE_INTERVAL should be 6 hours", async function () {
            expect(await vault.REBALANCE_INTERVAL()).to.equal(6 * 3600);
        });

        it("REBALANCE_THRESHOLD should be 200 bps (2%)", async function () {
            expect(await vault.REBALANCE_THRESHOLD()).to.equal(200);
        });
    });
});
