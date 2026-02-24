const hre = require("hardhat");

async function main() {
    const [signer] = await hre.ethers.getSigners();
    const address = await signer.getAddress();
    const nonce = await hre.ethers.provider.getTransactionCount(address, "latest");
    const pendingNonce = await hre.ethers.provider.getTransactionCount(address, "pending");
    const feeData = await hre.ethers.provider.getFeeData();
    console.log("Account:", address);
    console.log("Latest nonce:", nonce);
    console.log("Pending nonce:", pendingNonce);
    console.log("Fee data:", {
        gasPrice: feeData.gasPrice?.toString(),
        maxFeePerGas: feeData.maxFeePerGas?.toString(),
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
    });
}

main().catch(console.error);
