import React from 'react';

export default function CTASection({ onLaunchApp }) {
    return (
        <section style={{ position: 'relative', zIndex: 1, padding: '7rem 2.5rem' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                <div className="ym-card ym-reveal" style={{ padding: 0, overflow: 'hidden' }}>
                    {/* Gradient background */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg, rgba(230,0,122,0.12) 0%, rgba(124,58,237,0.15) 50%, rgba(79,70,229,0.1) 100%)',
                    }} />
                    {/* Polkadot dot decoration */}
                    <div style={{
                        position: 'absolute', right: '-40px', top: '-40px',
                        width: '300px', height: '300px',
                        backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.12) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                        borderRadius: '50%',
                        transform: 'rotate(15deg)',
                    }} />
                    <div style={{
                        position: 'absolute', left: '-60px', bottom: '-60px',
                        width: '250px', height: '250px',
                        backgroundImage: 'radial-gradient(circle, rgba(230,0,122,0.1) 1px, transparent 1px)',
                        backgroundSize: '14px 14px',
                        borderRadius: '50%',
                    }} />

                    <div className="ym-card-inner" style={{ padding: '5rem 4rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                        <div className="ym-label" style={{ marginBottom: '1.5rem', display: 'block' }}>
                            Start Earning Today
                        </div>
                        <h2 style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 900,
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            lineHeight: 0.95,
                            letterSpacing: '-0.04em',
                            marginBottom: '1.5rem',
                        }}>
                            <span style={{
                                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Your Capital.<br />
                            </span>
                            <span className="ym-gradient-text">Autonomous Returns.</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                            Connect your wallet and let AI agents optimize your yield across the Polkadot ecosystem. Zero fees. Zero complexity.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="ym-btn-primary" onClick={onLaunchApp} style={{ fontSize: '1rem', padding: '1rem 2.75rem' }}>
                                Launch App
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '0.5rem' }}>
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <a className="ym-btn-secondary" href="https://github.com/RustyRustacle/YieldMind" target="_blank" rel="noreferrer" style={{ fontSize: '1rem', padding: '1rem 2.75rem' }}>
                                View Github
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
