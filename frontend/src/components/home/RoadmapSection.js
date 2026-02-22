import React from 'react';

const MILESTONES = [
    {
        period: 'Q1 2025',
        title: 'Protocol Genesis',
        items: ['Smart contract architecture finalized', 'YieldMind Vault v1 deployed on testnet', 'AI Scorer contract live on Rococo'],
        status: 'done',
    },
    {
        period: 'Q2 2025',
        title: 'Mainnet Launch',
        items: ['Polkadot Hub mainnet deployment', 'Acala & Moonbeam integration', 'GaslessForwarder live'],
        status: 'done',
    },
    {
        period: 'Q3 2025',
        title: 'Agent Expansion',
        items: ['Flash Node HFT agent deployed', 'Risk Oracle v2 with zkML proofs', 'Web app public beta launch'],
        status: 'active',
    },
    {
        period: 'Q4 2025',
        title: 'Ecosystem Growth',
        items: ['Interlay, Parallel Finance integration', '$YM token genesis event', 'DAO governance launch'],
        status: 'upcoming',
    },
    {
        period: 'Q2 2026',
        title: 'Cross-Ecosystem',
        items: ['Ethereum bridge via XCM', 'Institutional API & SDK', 'V2 neural agent architecture'],
        status: 'upcoming',
    },
];

export default function RoadmapSection() {
    return (
        <section id="roadmap" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2.5rem' }}>
                <div className="ym-reveal" style={{ marginBottom: '4.5rem' }}>
                    <div className="ym-label" style={{ marginBottom: '1rem', display: 'block' }}>Development Timeline</div>
                    <h2 className="ym-section-title">Roadmap</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="roadmap-grid">
                    {/* Timeline */}
                    <div className="ym-timeline ym-reveal">
                        {MILESTONES.map((m, i) => (
                            <div key={i} className="ym-timeline-item">
                                <div className={`ym-timeline-dot ${m.status}`} />
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                                        {m.period}
                                    </span>
                                    <span className={`ym-badge ym-badge-${m.status}`}>
                                        {m.status === 'done' ? '✓ Complete' : m.status === 'active' ? '⟳ In Progress' : 'Upcoming'}
                                    </span>
                                </div>
                                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem' }}>{m.title}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    {m.items.map((item, j) => (
                                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{
                                                width: '4px', height: '4px', borderRadius: '50%',
                                                background: m.status === 'done' ? 'var(--pk-pink)' : m.status === 'active' ? 'var(--pk-purple)' : 'rgba(255,255,255,0.2)',
                                                flexShrink: 0,
                                            }} />
                                            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress summary card */}
                    <div className="ym-reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="ym-card" style={{ padding: 0 }}>
                            <div className="ym-card-inner" style={{ padding: '2.5rem' }}>
                                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pk-pink)', marginBottom: '2rem' }}>
                                    Build Progress
                                </div>

                                {/* Progress bars */}
                                {[
                                    { label: 'Smart Contracts', pct: 95 },
                                    { label: 'AI Agent Engine', pct: 80 },
                                    { label: 'Frontend dApp', pct: 85 },
                                    { label: 'Cross-Chain Bridges', pct: 45 },
                                    { label: 'DAO Governance', pct: 30 },
                                ].map((bar, i) => (
                                    <div key={i} style={{ marginBottom: '1.25rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}>{bar.label}</span>
                                            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.875rem' }}>{bar.pct}%</span>
                                        </div>
                                        <div style={{ height: '4px', borderRadius: '100px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${bar.pct}%`,
                                                borderRadius: '100px',
                                                background: `linear-gradient(90deg, var(--pk-pink), var(--pk-purple))`,
                                                boxShadow: '0 0 8px rgba(230,0,122,0.4)',
                                            }} />
                                        </div>
                                    </div>
                                ))}

                                <div style={{ marginTop: '2rem', padding: '1.25rem', borderRadius: '12px', background: 'rgba(230,0,122,0.07)', border: '1px solid rgba(230,0,122,0.2)' }}>
                                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--pk-pink)', marginBottom: '0.5rem' }}>Current Phase</div>
                                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#fff' }}>Agent Expansion</div>
                                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.3rem' }}>Q3 2025 — On Track</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        @media (max-width: 900px) { .roadmap-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
}
