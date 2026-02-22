import { ethers } from 'ethers';

export async function connectPolkadotWallet() {
    console.log('Connecting wallet...');

    if (window.ethereum?.isMetaMask && !window.ethereum?._metamask?.isUnlocked) {
        console.warn('MetaMask is locked');
    }

    // Priority: Talisman > SubWallet > MetaMask
    let providerInstance = null;

    if (window.talismanEth) {
        providerInstance = window.talismanEth;
    } else if (window.subwallet) {
        providerInstance = window.subwallet;
    } else if (window.ethereum) {
        if (window.ethereum.providers) {
            providerInstance = window.ethereum.providers.find(p => p.isTalisman) ||
                window.ethereum.providers.find(p => p.isSubWallet) ||
                window.ethereum;
        } else {
            providerInstance = window.ethereum;
        }
    }

    if (!providerInstance) {
        throw new Error('No EVM wallet found. Please install Talisman, SubWallet, or MetaMask.');
    }

    try {
        // Explicitly request accounts to trigger the permission popup
        const accounts = await providerInstance.request({
            method: 'eth_requestAccounts'
        });

        if (!accounts || accounts.length === 0) {
            throw new Error('Wallet connection denied or no accounts found.');
        }

        const provider = new ethers.BrowserProvider(providerInstance, "any");
        // Ensure we wait for the network to be ready
        await provider.getNetwork();

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        console.log('Connected successfully:', address);
        return {
            provider,
            signer,
            account: { address }
        };
    } catch (err) {
        console.error('Wallet connection failed:', err);
        throw err;
    }
}
