const hre = require("hardhat");

async function main() {
    const [signer] = await hre.ethers.getSigners();
    const address = await signer.getAddress();
    const balance = await hre.ethers.provider.getBalance(address);
    const network = await hre.ethers.provider.getNetwork();
    console.log("Network chain ID:", network.chainId.toString());
    console.log("Account:", address);
    console.log("Balance:", hre.ethers.formatEther(balance), "PAS");
}

main().catch(console.error);
