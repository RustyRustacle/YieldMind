import React from 'react';

const DISTRIBUTION = [
    { label: 'Community & Ecosystem', pct: 35, color: 'var(--pk-pink)' },
    { label: 'Protocol Treasury', pct: 25, color: 'var(--pk-purple)' },
    { label: 'Team & Advisors', pct: 15, color: 'var(--pk-indigo)' },
    { label: 'Private Sale', pct: 15, color: 'rgba(124,58,237,0.4)' },
    { label: 'Public Sale', pct: 10, color: 'rgba(255,255,255,0.12)' },
];

const VESTING = [
    { tier: 'Team & Advisors', cliff: '12 months', vesting: '36 months linear' },
    { tier: 'Private Sale', cliff: '6 months', vesting: '18 months linear' },
    { tier: 'Community', cliff: 'None', vesting: 'Gradual release' },
    { tier: 'Treasury', cliff: 'None', vesting: 'DAO governed' },
];

export default function TokenomicsSection() {
    return (
        <section id="tokenomics" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2.5rem' }}>
                <div className="ym-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="ym-label" style={{ marginBottom: '1rem', display: 'block' }}>$YM Token</div>
                    <h2 className="ym-section-title">Tokenomics</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="token-grid">

                    {/* Donut + legend */}
                    <div className="ym-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                            {/* Conic gradient donut */}
                            <div style={{
                                width: '100%', height: '100%',
                                borderRadius: '50%',
                                background: `conic-gradient(
                  var(--pk-pink)   0%   35%,
                  var(--pk-purple) 35%  60%,
                  var(--pk-indigo) 60%  75%,
                  rgba(124,58,237,0.35) 75% 90%,
                  rgba(255,255,255,0.08) 90% 100%
                )`,
                                boxShadow: '0 0 50px rgba(124,58,237,0.3)',
                            }} />
                            {/* Inner hole */}
                            <div style={{
                                position: 'absolute',
                                width: '110px', height: '110px',
                                borderRadius: '50%',
                                background: 'var(--pk-dark-2, #0a0a10)',
                                top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>$YM</div>
                                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>1B Supply</div>
                            </div>
                        </div>
                        {/* Legend */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
                            {DISTRIBUTION.map((d, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: d.color, flexShrink: 0 }} />
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>{d.label}</span>
                                    </div>
                                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{d.pct}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vesting table */}
                    <div className="ym-reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="ym-card" style={{ padding: 0 }}>
                            <div className="ym-card-inner" style={{ padding: '2rem' }}>
                                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pk-purple)', marginBottom: '1.5rem' }}>
                                    Vesting Schedule
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            {['Tier', 'Cliff', 'Vesting'].map(h => (
                                                <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(124,58,237,0.15)', fontWeight: 500 }}>
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {VESTING.map((v, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                                <td style={{ padding: '0.875rem 0.75rem', color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>{v.tier}</td>
                                                <td style={{ padding: '0.875rem 0.75rem', color: 'var(--pk-pink)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.78rem' }}>{v.cliff}</td>
                                                <td style={{ padding: '0.875rem 0.75rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>{v.vesting}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Supply note */}
                                <div style={{ marginTop: '1.75rem', padding: '1rem', borderRadius: '10px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
                                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--pk-purple)', marginBottom: '0.4rem' }}>Total Supply</div>
                                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#fff' }}>1,000,000,000</div>
                                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginTop: '0.25rem' }}>$YM • Fixed Supply • No Inflation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        @media (max-width: 900px) { .token-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
}
