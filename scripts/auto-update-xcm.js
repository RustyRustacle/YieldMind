const hre = require("hardhat");
const cron = require('node-cron');

async function updateRates() {
    try {
        const xcmReaderAddress = "0x4F74fE087c53b7db2e01C5Ce4491A037D8007AD2"; // MockXCMYieldReader on testnet
        const XCMYieldReader = await hre.ethers.getContractFactory("MockXCMYieldReader");
        const xcmReader = XCMYieldReader.attach(xcmReaderAddress);

        // Simulasi fetch data dari Bifrost (dalam production, ini ambil dari XCM)
        const vdotApy = Math.floor(Math.random() * 500) + 500; // 5-10%
        const dotRate = Math.floor(Math.random() * 400) + 400; // 4-8%
        const usdcRate = Math.floor(Math.random() * 300) + 200; // 2-5%

        const tx = await xcmReader.updateRates(vdotApy, dotRate, usdcRate);
        await tx.wait();
        console.log(`[${new Date().toISOString()}] Rates updated:`, { vdotApy, dotRate, usdcRate });
    } catch (error) {
        console.error("Update failed:", error);
    }
}

// Jalankan setiap 6 jam
cron.schedule('0 */6 * * *', updateRates);

// Jalankan sekali saat startup
console.log("XCM Relayer started. Will update rates every 6 hours.");
updateRates();
