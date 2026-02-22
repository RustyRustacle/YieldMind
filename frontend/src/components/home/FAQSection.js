import React, { useState } from 'react';

const FAQS = [
    {
        q: 'What is YieldMind?',
        a: 'YieldMind is an AI-powered yield intelligence protocol native to Polkadot Hub. Autonomous agents continuously scan and execute optimal yield strategies across connected parachains — 24/7, gasless, and fully on-chain.',
    },
    {
        q: 'Is YieldMind non-custodial?',
        a: 'Yes. Your assets are held in user-controlled Substrate vaults at all times. YieldMind agents interact with protocols on your behalf but never take custody of your private keys.',
    },
    {
        q: 'How does the gasless experience work?',
        a: 'The GaslessForwarder contract on Polkadot Hub absorbs all transaction fees at the protocol level. Users never pay gas — deposits, rebalances, and withdrawals are all free of charge.',
    },
    {
        q: 'Which wallets are supported?',
        a: 'YieldMind supports all Polkadot-compatible wallets including SubWallet, Talisman, and Polkadot.js Extension. No registration or KYC is required.',
    },
    {
        q: 'How are yields generated?',
        a: 'AI agents continuously analyze yield rates across integrated Polkadot parachains (Acala, Moonbeam, Interlay, Parallel and more). Capital is algorithmically routed to the highest verified yield at all times.',
    },
    {
        q: 'Is the protocol audited?',
        a: 'Smart contracts undergo continuous auditing. All on-chain operations produce a Merkle-verifiable audit trail. Audit reports are publicly available in our documentation.',
    },
];

function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                borderBottom: '1px solid rgba(124,58,237,0.12)',
                transition: 'border-color 0.3s',
            }}
        >
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%',
                    padding: '1.4rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                <span style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: open ? '#fff' : 'rgba(255,255,255,0.75)',
                    transition: 'color 0.25s',
                    letterSpacing: '-0.01em',
                }}>
                    {q}
                </span>
                {/* Chevron */}
                <span style={{
                    flexShrink: 0,
                    width: '22px', height: '22px',
                    borderRadius: '50%',
                    border: `1px solid ${open ? 'rgba(230,0,122,0.4)' : 'rgba(124,58,237,0.25)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: open ? 'var(--pk-pink)' : 'rgba(124,58,237,0.6)',
                    fontSize: '0.65rem',
                }}>
                    ▾
                </span>
            </button>

            <div style={{
                overflow: 'hidden',
                maxHeight: open ? '200px' : '0px',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                <p style={{
                    paddingBottom: '1.4rem',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.9rem',
                    lineHeight: 1.75,
                    paddingRight: '2.5rem',
                }}>
                    {a}
                </p>
            </div>
        </div>
    );
}

export default function FAQSection() {
    return (
        <section id="faq" style={{ position: 'relative', zIndex: 1, padding: '5rem 0 7rem' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2.5rem' }}>

                <div className="ym-reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="ym-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Got Questions</div>
                    <h2 className="ym-section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>FAQ</h2>
                </div>

                <div className="ym-reveal" style={{ transitionDelay: '0.1s' }}>
                    {FAQS.map((item, i) => (
                        <FAQItem key={i} q={item.q} a={item.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}
