import React from 'react';

const FEATURES = [
    { icon: '🔐', title: 'Non-Custodial', desc: 'Your keys, your coins. Assets stay in user-controlled vaults at all times. YieldMind agents never touch your private keys.' },
    { icon: '🌐', title: 'Cross-Chain Native', desc: 'Operates across Polkadot parachains and bridges — Acala, Moonbeam, Interlay, and more in one unified strategy engine.' },
    { icon: '🤖', title: 'AI-Autonomous', desc: 'Neural agents run continuously, scanning yield opportunities 24/7 and rebalancing positions without manual intervention.' },
    { icon: '⛽', title: 'Gasless Operations', desc: 'Proprietary GaslessForwarder contract on Substrate absorbs all transaction fees. Users pay nothing — ever.' },
    { icon: '📊', title: 'Real-Time APY', desc: 'Live APY feeds aggregated from on-chain data. No third-party oracles, no stale data, no surprises.' },
    { icon: '⬡', title: 'Substrate Native', desc: 'Built directly on Polkadot Hub with Substrate runtimes, ensuring maximum security and parachain composability.' },
];

export default function FeaturesSection() {
    return (
        <section id="features" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2.5rem' }}>
                {/* Header */}
                <div className="ym-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="ym-label" style={{ marginBottom: '1rem', display: 'block' }}>Why YieldMind</div>
                    <h2 className="ym-section-title">Built Different</h2>
                    <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 560, margin: '1.25rem auto 0', lineHeight: 1.7, fontSize: '1rem' }}>
                        Every feature is designed for institutional-grade capital management, available to everyone on Polkadot.
                    </p>
                </div>

                {/* Bento Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '1.25rem',
                }}>
                    {/* Big card — feature 0 */}
                    <div className="ym-card ym-reveal" style={{ gridColumn: 'span 7', padding: 0 }}>
                        <div className="ym-card-inner" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
                            <div>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{FEATURES[0].icon}</div>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.75rem', color: '#fff' }}>
                                    {FEATURES[0].title}
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: '1rem' }}>{FEATURES[0].desc}</p>
                            </div>
                            <div style={{ marginTop: '2rem', height: '2px', width: '48px', background: 'linear-gradient(90deg, var(--pk-pink), var(--pk-purple))' }} />
                        </div>
                        {/* Decorative dot pattern */}
                        <div style={{
                            position: 'absolute', right: '-10px', bottom: '-10px', width: '120px', height: '120px', opacity: 0.06,
                            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '12px 12px'
                        }} />
                    </div>

                    {/* Card 2 */}
                    <div className="ym-card ym-reveal" style={{ gridColumn: 'span 5', padding: 0 }} >
                        <div className="ym-card-inner" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
                            <div>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{FEATURES[1].icon}</div>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.75rem', color: '#fff' }}>
                                    {FEATURES[1].title}
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: '1rem' }}>{FEATURES[1].desc}</p>
                            </div>
                            <div style={{ marginTop: '2rem', height: '2px', width: '48px', background: 'linear-gradient(90deg, var(--pk-purple), var(--pk-indigo))' }} />
                        </div>
                    </div>

                    {/* Cards 3-5 — equal thirds */}
                    {FEATURES.slice(2, 5).map((f, i) => (
                        <div key={i} className="ym-card ym-reveal" style={{ gridColumn: 'span 4', padding: 0 }}>
                            <div className="ym-card-inner" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ fontSize: '2rem' }}>{f.icon}</div>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#fff' }}>{f.title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontSize: '0.9rem' }}>{f.desc}</p>
                            </div>
                        </div>
                    ))}

                    {/* Full-width card — feature 6 */}
                    <div className="ym-card ym-reveal" style={{ gridColumn: 'span 12', padding: 0 }}>
                        <div className="ym-card-inner" style={{ padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ fontSize: '2rem' }}>{FEATURES[5].icon}</div>
                                <div>
                                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#fff', marginBottom: '0.4rem' }}>{FEATURES[5].title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', maxWidth: '600px' }}>{FEATURES[5].desc}</p>
                                </div>
                            </div>
                            {/* Polkadot logo pulse */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: 'radial-gradient(circle, var(--pk-pink) 30%, transparent 70%)',
                                    boxShadow: '0 0 20px var(--pk-pink)',
                                    opacity: 0.8
                                }} />
                                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)' }}>
                                    Polkadot Hub
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .ym-card[style*="span 7"],
          .ym-card[style*="span 5"],
          .ym-card[style*="span 4"],
          .ym-card[style*="span 12"] { grid-column: span 12 !important; }
        }
      `}</style>
        </section>
    );
}
