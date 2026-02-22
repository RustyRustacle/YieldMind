import React, { useEffect, useRef } from 'react';

export default function HeroSection({ onLaunchApp }) {
    const heroRef = useRef(null);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        const timeout = setTimeout(() => el.classList.add('active'), 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="min-h-screen flex items-center relative overflow-hidden" style={{ paddingTop: '10rem', paddingBottom: '6rem' }}>
            {/* Extra center pink glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '50%',
                transform: 'translateX(-50%)',
                width: '600px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(230,0,122,0.07) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2.5rem', width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}
                    className="hero-grid">

                    {/* Left — copy */}
                    <div ref={heroRef} className="ym-reveal" style={{ zIndex: 1 }}>
                        {/* Pill */}
                        <div className="ym-pill" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
                            <span className="ym-pill-dot" />
                            Built on Polkadot Hub · AI-Powered · Non-Custodial
                        </div>

                        {/* Headline */}
                        <h1 style={{ marginBottom: '1.75rem' }}>
                            <span className="ym-hero-text" style={{ display: 'block' }}>
                                Autonomous
                            </span>
                            <span className="ym-hero-text" style={{ display: 'block' }}>
                                Yield&nbsp;
                            </span>
                            <span className="ym-gradient-text" style={{
                                display: 'block',
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 900,
                                fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                                lineHeight: 0.92,
                                letterSpacing: '-0.05em'
                            }}>
                                Intelligence
                            </span>
                        </h1>

                        <p style={{
                            fontSize: '1.15rem',
                            lineHeight: 1.75,
                            color: 'rgba(255,255,255,0.5)',
                            maxWidth: '520px',
                            marginBottom: '2.5rem',
                            fontWeight: 300
                        }}>
                            YieldMind deploys autonomous AI agents across the Polkadot ecosystem to discover,
                            analyze, and execute optimal yield strategies — 24/7, gasless, and fully on-chain.
                        </p>

                        {/* CTA buttons */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                            <button className="ym-btn-primary" onClick={onLaunchApp}>
                                <span>Launch App</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <a className="ym-btn-secondary" href="#how-it-works">
                                How It Works
                            </a>
                        </div>

                        {/* Mini stat badges */}
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {[
                                { label: 'TVL', value: '$41M+' },
                                { label: 'Avg APY', value: '14.2%' },
                                { label: 'Protocols', value: '12+' },
                            ].map((s, i) => (
                                <div key={i} style={{
                                    display: 'flex', flexDirection: 'column', gap: '0.2rem',
                                    paddingRight: '1.5rem',
                                    borderRight: i < 2 ? '1px solid rgba(124,58,237,0.2)' : 'none'
                                }}>
                                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--pk-pink)' }}>
                                        {s.label}
                                    </span>
                                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.04em', color: '#fff' }}>
                                        {s.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Polkadot orb */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="ym-orb-container">
                            <div className="ym-orb-bg-glow" />
                            <div className="ym-orb-ring ym-orb-ring-1" />
                            <div className="ym-orb-ring ym-orb-ring-2" />
                            <div className="ym-orb-ring ym-orb-ring-3" />
                            {/* Floating labels */}
                            <div style={{
                                position: 'absolute', top: '8%', right: '-8%',
                                background: 'rgba(12,10,22,0.85)', backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(230,0,122,0.3)',
                                borderRadius: '12px', padding: '0.6rem 1rem'
                            }}>
                                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--pk-pink)', marginBottom: '0.2rem' }}>APY</div>
                                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#fff' }}>14.2%</div>
                            </div>
                            <div style={{
                                position: 'absolute', bottom: '10%', left: '-5%',
                                background: 'rgba(12,10,22,0.85)', backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(124,58,237,0.3)',
                                borderRadius: '12px', padding: '0.6rem 1rem'
                            }}>
                                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--pk-purple)', marginBottom: '0.2rem' }}>AI Ops</div>
                                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#fff' }}>Live</div>
                            </div>
                            <div className="ym-orb-core" style={{
                                background: 'rgba(10, 8, 20, 0.85)',
                                padding: '20px',
                                boxShadow: '0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(230,0,122,0.2)',
                            }}>
                                <img src="/img/logo.png" alt="YieldMind" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom fade */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '120px',
                background: 'linear-gradient(to bottom, transparent, var(--pk-dark))',
                pointerEvents: 'none'
            }} />

            <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
