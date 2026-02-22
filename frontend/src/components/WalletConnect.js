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
            <div style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                backdropFilter: 'blur(12px)',
            }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'blink 1.5s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#fff', letterSpacing: '0.05em' }}>
                    {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
                </span>
                {/* Polkadot dot icon */}
                <div style={{
                    width: '22px', height: '22px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--pk-pink), var(--pk-purple))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.6rem', color: '#fff', fontWeight: 900,
                }}>⬡</div>
            </div>
        );
    }

    return (
        <button
            onClick={handleConnect}
            disabled={connecting}
            className="ym-btn-primary"
            style={{
                padding: '0.6rem 1.5rem',
                fontSize: '0.78rem',
                opacity: connecting ? 0.65 : 1,
                cursor: connecting ? 'not-allowed' : 'pointer',
            }}
        >
            {connecting ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg style={{ animation: 'spin 1s linear infinite', width: '14px', height: '14px' }} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" />
                    </svg>
                    Connecting...
                </span>
            ) : 'Connect Wallet'}
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </button>
    );
}