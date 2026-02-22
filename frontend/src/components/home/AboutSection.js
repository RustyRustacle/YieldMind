import React from 'react';

export default function AboutSection() {
    return (
        <section id="about" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
                    className="about-grid">

                    {/* Left */}
                    <div className="ym-reveal">
                        <div className="ym-label" style={{ marginBottom: '1.25rem', display: 'block' }}>What Is YieldMind</div>
                        <h2 className="ym-section-title" style={{ marginBottom: '1.75rem' }}>
                            The Protocol That<br />
                            <span className="ym-gradient-text">Works For You</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                            YieldMind is an AI-powered yield intelligence protocol native to Polkadot Hub. It deploys a fleet of autonomous agents that continuously monitor yield opportunities across all connected parachains.
                        </p>
                        <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                            Unlike traditional yield aggregators, YieldMind agents operate with deterministic logic — every decision is math, not speculation. Your capital is always one block away from the highest verified yield.
                        </p>
                        {/* Bullet points */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                            {[
                                'AI agents trained specifically on DeFi yield patterns',
                                'Substrate-native vaults with institutional-grade security',
                                'Gasless transactions via on-chain GaslessForwarder',
                                'Transparent on-chain audit trail for every operation',
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        background: 'var(--pk-pink)', marginTop: '0.5rem', flexShrink: 0,
                                        boxShadow: '0 0 8px var(--pk-pink)'
                                    }} />
                                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Protocol diagram card */}
                    <div className="ym-reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="ym-card" style={{ padding: 0 }}>
                            <div className="ym-card-inner" style={{ padding: '2.5rem' }}>
                                {/* Title */}
                                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pk-purple)', marginBottom: '2rem' }}>
                                    Protocol Architecture
                                </div>

                                {/* SVG diagram */}
                                <svg viewBox="0 0 380 280" style={{ width: '100%', height: 'auto', display: 'block' }} fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Connection lines */}
                                    <line x1="190" y1="60" x2="80" y2="150" stroke="rgba(124,58,237,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="190" y1="60" x2="190" y2="150" stroke="rgba(124,58,237,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="190" y1="60" x2="300" y2="150" stroke="rgba(124,58,237,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="80" y1="190" x2="190" y2="240" stroke="rgba(230,0,122,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="190" y1="190" x2="190" y2="240" stroke="rgba(230,0,122,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                                    <line x1="300" y1="190" x2="190" y2="240" stroke="rgba(230,0,122,0.3)" strokeWidth="1" strokeDasharray="4 4" />

                                    {/* Top node — YieldMind core */}
                                    <circle cx="190" cy="40" r="32" fill="rgba(230,0,122,0.12)" stroke="rgba(230,0,122,0.5)" strokeWidth="1.5" />
                                    <text x="190" y="36" textAnchor="middle" fill="#E6007A" fontFamily="Outfit,sans-serif" fontWeight="900" fontSize="14">YM</text>
                                    <text x="190" y="50" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="7">CORE</text>

                                    {/* Middle nodes — agents */}
                                    {[
                                        { cx: 80, label: 'Macro', sub: 'Scanner' },
                                        { cx: 190, label: 'Risk', sub: 'Oracle' },
                                        { cx: 300, label: 'Flash', sub: 'Node' },
                                    ].map((n, i) => (
                                        <g key={i}>
                                            <circle cx={n.cx} cy="170" r="26" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.4)" strokeWidth="1" />
                                            <text x={n.cx} y="167" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontFamily="Outfit,sans-serif" fontWeight="700" fontSize="10">{n.label}</text>
                                            <text x={n.cx} y="180" textAnchor="middle" fill="rgba(124,58,237,0.7)" fontFamily="IBM Plex Mono,monospace" fontSize="6">{n.sub}</text>
                                        </g>
                                    ))}

                                    {/* Bottom node — Vault */}
                                    <rect x="150" y="220" width="80" height="40" rx="10" fill="rgba(230,0,122,0.08)" stroke="rgba(230,0,122,0.35)" strokeWidth="1.5" />
                                    <text x="190" y="236" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontFamily="Outfit,sans-serif" fontWeight="700" fontSize="10">Vault</text>
                                    <text x="190" y="250" textAnchor="middle" fill="rgba(230,0,122,0.7)" fontFamily="IBM Plex Mono,monospace" fontSize="7">Substrate</text>
                                </svg>

                                {/* Legend */}
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                                    {[
                                        { color: 'var(--pk-pink)', label: 'Core Protocol' },
                                        { color: 'var(--pk-purple)', label: 'AI Agents' },
                                    ].map((l, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }} />
                                            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{l.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
}
