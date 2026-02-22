import React from 'react';

const STEPS = [
    {
        num: '01',
        icon: '🔗',
        title: 'Connect Your Wallet',
        desc: 'Connect any Polkadot-compatible wallet (SubWallet, Talisman, Polkadot.js). No registration, no KYC — just your address.',
        tag: 'Entry Point',
    },
    {
        num: '02',
        icon: '🧠',
        title: 'AI Scans the Ecosystem',
        desc: 'YieldMind\'s neural agents immediately begin analyzing yield rates across all integrated Polkadot parachains in real-time.',
        tag: 'AI Analysis',
    },
    {
        num: '03',
        icon: '💧',
        title: 'Deposit & Optimize',
        desc: 'Deposit your assets into the YieldMind Vault. The AI continuously rebalances your position to the highest verified yield.',
        tag: 'Execution',
    },
    {
        num: '04',
        icon: '📈',
        title: 'Earn Automatically',
        desc: 'Yield accrues to your position 24/7. Withdraw at any time, or let the compounding work for you — no lock-ups.',
        tag: 'Returns',
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2.5rem' }}>

                {/* Header */}
                <div className="ym-reveal" style={{ marginBottom: '4.5rem' }}>
                    <div className="ym-label" style={{ marginBottom: '1rem', display: 'block' }}>The Methodology</div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <h2 className="ym-section-title">How It Works</h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '420px', lineHeight: 1.7, fontSize: '0.95rem' }}>
                            Four simple steps from wallet connection to autonomous, compounding yield — all gasless.
                        </p>
                    </div>
                </div>

                {/* Steps */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', position: 'relative' }}
                    className="steps-grid">

                    {/* Connector line behind cards */}
                    <div style={{
                        position: 'absolute',
                        top: '4.5rem', left: '12.5%', right: '12.5%',
                        height: '2px',
                        background: 'linear-gradient(90deg, var(--pk-pink), var(--pk-purple), var(--pk-indigo), rgba(79,70,229,0.2))',
                        zIndex: 0,
                        pointerEvents: 'none',
                    }} className="step-line" />

                    {STEPS.map((step, i) => (
                        <div key={i} className="ym-card ym-reveal" style={{ transitionDelay: `${i * 0.12}s`, position: 'relative', zIndex: 1, padding: 0 }}>
                            <div className="ym-card-inner" style={{ padding: '2rem' }}>
                                {/* Step number */}
                                <div style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 900,
                                    fontSize: '3.5rem',
                                    lineHeight: 1,
                                    background: 'linear-gradient(135deg, rgba(124,58,237,0.2), transparent)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginBottom: '1.25rem',
                                }}>
                                    {step.num}
                                </div>

                                {/* Icon circle */}
                                <div style={{
                                    width: '52px', height: '52px',
                                    borderRadius: '14px',
                                    background: 'rgba(124,58,237,0.12)',
                                    border: '1px solid rgba(124,58,237,0.3)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    marginBottom: '1.25rem',
                                }}>
                                    {step.icon}
                                </div>

                                {/* Tag */}
                                <div style={{
                                    fontFamily: 'IBM Plex Mono, monospace',
                                    fontSize: '0.58rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--pk-pink)',
                                    marginBottom: '0.5rem',
                                }}>
                                    {step.tag}
                                </div>

                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#fff', marginBottom: '0.75rem' }}>
                                    {step.title}
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontSize: '0.88rem' }}>
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .step-line { display: none; }
        }
        @media (max-width: 560px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
