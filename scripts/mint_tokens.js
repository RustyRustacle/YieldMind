const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();
    const wdotAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"; // From contracts.js
    const wdot = await ethers.getContractAt("MockERC20", wdotAddress);

    console.log(`Minting 1000 WDOT to ${owner.address}...`);
    const tx = await wdot.mint(owner.address, ethers.parseUnits("1000", 18));
    await tx.wait();
    console.log("Tokens minted successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
