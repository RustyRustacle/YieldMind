import React, { useState } from 'react';
import { ethers } from 'ethers';
import { VAULT_ADDRESS, VAULT_ABI } from '../config/contracts';

export default function RebalanceButton({ signer }) {
    const [loading, setLoading] = useState(false);

    const handleRebalance = async () => {
        if (!signer) return;
        setLoading(true);
        try {
            const vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
            const tx = await vault.triggerRebalance();
            await tx.wait();
            alert('Rebalance triggered');
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleRebalance}
            disabled={loading}
            className="btn-polkadot px-8 py-3 rounded-full font-bold text-lg flex items-center shadow-lg hover:shadow-pink/40"
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Rebalancing...
                </>
            ) : (
                <>
                    <span className="mr-2">⚡</span> Trigger AI Rebalance
                </>
            )}
        </button>
    );
}