import React from 'react';

// Receives demo state from App.js parent
export default function Dashboard({ signer, account, demoTVL, demoPosition, demoAPY }) {

    // When no demo data yet, show zeros (not mock data)
    const tvl = demoTVL ?? '0';
    const position = demoPosition ?? '0';
    const apy = demoAPY ?? '0.0';

    const stats = [
        {
            label: 'Total Value Locked',
            value: parseFloat(tvl).toLocaleString('en-US', { maximumFractionDigits: 2 }),
            unit: 'WDOT',
            sub: tvl === '0' ? 'No deposits yet' : '↑ Live position',
            subColor: tvl === '0' ? 'rgba(255,255,255,0.2)' : '#4ade80',
            accent: 'var(--pk-pink)',
        },
        {
            label: 'Your Position',
            value: parseFloat(position).toLocaleString('en-US', { maximumFractionDigits: 2 }),
            unit: 'ymWDOT',
            sub: position === '0' ? 'Deposit to start' : '≈ $' + (parseFloat(position) * 7.5).toFixed(2) + ' USD',
            subColor: 'rgba(255,255,255,0.3)',
            accent: 'var(--pk-purple)',
        },
        {
            label: 'Current APY',
            value: apy,
            unit: '%',
            sub: apy === '0.0' || apy === '0' ? 'Run AI Rebalance' : 'AI Optimized · Live',
            subColor: apy === '0.0' || apy === '0' ? 'rgba(255,255,255,0.2)' : 'var(--pk-purple)',
            accent: 'var(--pk-indigo)',
        },
    ];

    return (
        <div>
            <div style={{
                fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--pk-pink)', marginBottom: '1.5rem',
            }}>
                Vault Dashboard
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="dash-grid">
                {stats.map((s, i) => (
                    <div key={i} style={{
                        borderRadius: '14px', padding: '1.25rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderLeft: '3px solid ' + s.accent,
                        transition: 'all 0.3s ease',
                    }}>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: '0.6rem' }}>
                            {s.label}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.04em', color: s.value === '0' ? 'rgba(255,255,255,0.25)' : '#fff', transition: 'color 0.4s' }}>
                                {s.value}
                            </span>
                            <span style={{ color: s.accent, fontWeight: 600, fontSize: '0.85rem' }}>{s.unit}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: s.subColor, fontFamily: 'IBM Plex Mono, monospace', transition: 'color 0.4s' }}>
                            {s.sub}
                        </div>
                    </div>
                ))}
            </div>

            <style>{'@media (max-width: 600px) { .dash-grid { grid-template-columns: 1fr !important; } }'}</style>
        </div>
    );
}