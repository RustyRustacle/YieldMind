import React, { useState } from 'react';
import { connectPolkadotWallet } from '../utils/dedot';

export default function WalletConnect({ onConnect, account }) {
    const [connecting, setConnecting] = useState(false);

    const handleConnect = async () => {
        setConnecting(true);
        try {
            const { signer, account } = await connectPolkadotWallet();
            onConnect({ signer, account });
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setConnecting(false);
        }
    };

    if (account && account.address) {
        return (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white font-mono text-sm leading-none">
                    {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
                </span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                    ⬢
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={handleConnect}
            disabled={connecting}
            className={`px-8 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 ${connecting
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-pink hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-pink/30'
                }`}
        >
            {connecting ? (
                <span className="flex items-center">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                </span>
            ) : 'Connect Wallet'}
        </button>
    );
}