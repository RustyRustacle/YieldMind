import React from 'react';

const PROTOCOLS = [
    { name: 'Acala', asset: 'DOT', apy: '14.2', tvl: '125M', risk: 'Low', accentColor: 'var(--pk-pink)' },
    { name: 'Moonbeam', asset: 'GLMR', apy: '11.8', tvl: '98M', risk: 'Medium', accentColor: 'var(--pk-purple)' },
    { name: 'Interlay', asset: 'iBTC', apy: '8.5', tvl: '45M', risk: 'Low', accentColor: '#f59e0b' },
    { name: 'Parallel', asset: 'DOT', apy: '15.4', tvl: '110M', risk: 'Medium', accentColor: 'var(--pk-indigo)' },
    { name: 'Equilibrium', asset: 'EQD', apy: '12.1', tvl: '32M', risk: 'Medium', accentColor: '#22d3ee' },
];

function RiskBadge({ risk }) {
    const isLow = risk === 'Low';
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.2rem 0.65rem',
            borderRadius: '100px',
            background: isLow ? 'rgba(34,197,94,0.1)' : 'rgba(251,191,36,0.1)',
            border: `1px solid ${isLow ? 'rgba(34,197,94,0.25)' : 'rgba(251,191,36,0.25)'}`,
            color: isLow ? '#4ade80' : '#fbbf24',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.58rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
        }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            {risk}
        </span>
    );
}

export default function Markets() {
    return (
        <div>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pk-pink)', marginBottom: '0.4rem' }}>
                        Active Yield Markets
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                        AI-ranked opportunities across the Polkadot ecosystem.
                    </p>
                </div>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem',
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.2rem' }}>Total Market TVL</div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.75rem', color: '#fff', letterSpacing: '-0.04em' }}>$410M+</div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(124,58,237,0.15)',
            }}>
                {/* Table header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1.2fr 1fr 1.2fr 1fr',
                    padding: '0.75rem 1.25rem',
                    background: 'rgba(124,58,237,0.06)',
                    borderBottom: '1px solid rgba(124,58,237,0.12)',
                }}>
                    {['Protocol', 'Asset', 'APY', 'TVL', 'Risk', ''].map((h, i) => (
                        <div key={i} style={{
                            fontFamily: 'IBM Plex Mono, monospace',
                            fontSize: '0.58rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.3)',
                            textAlign: i === 5 ? 'right' : 'left',
                        }}>
                            {h}
                        </div>
                    ))}
                </div>

                {/* Protocol rows */}
                {PROTOCOLS.map((p, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr 1.2fr 1fr 1.2fr 1fr',
                            padding: '1rem 1.25rem',
                            borderBottom: i < PROTOCOLS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            alignItems: 'center',
                            transition: 'background 0.2s',
                            cursor: 'default',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        {/* Protocol name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '8px', height: '8px',
                                borderRadius: '50%',
                                background: p.accentColor,
                                boxShadow: `0 0 8px ${p.accentColor}`,
                                flexShrink: 0,
                            }} />
                            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{p.name}</span>
                        </div>

                        {/* Asset */}
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
                            {p.asset}
                        </span>

                        {/* APY */}
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.15rem', color: p.accentColor, letterSpacing: '-0.03em' }}>
                            {p.apy}%
                        </span>

                        {/* TVL */}
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                            ${p.tvl}
                        </span>

                        {/* Risk badge */}
                        <div><RiskBadge risk={p.risk} /></div>

                        {/* Action */}
                        <div style={{ textAlign: 'right' }}>
                            <button className="ym-btn-secondary" style={{ padding: '0.35rem 0.85rem', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
