import React from 'react';

const PARTNERS = [
    { name: 'Polkadot', sub: 'Base Layer', img: '/img/polkadot.png' },
    { name: 'Acala', sub: 'DeFi Hub', img: '/img/acala.png' },
    { name: 'Moonbeam', sub: 'EVM Chain', img: '/img/moonbeam.png' },
    { name: 'Interlay', sub: 'iBTC Protocol', img: '/img/interlay.png' },
    { name: 'Parallel', sub: 'Lending', img: '/img/parallel.png' },
    { name: 'Astar', sub: 'Smart Contracts', img: '/img/astar.png' },
];

export default function PartnersSection() {
    return (
        <section id="partners" style={{ position: 'relative', zIndex: 1, padding: '5rem 0' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2.5rem' }}>

                <div className="ym-reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div className="ym-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Built On & Integrated With</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'rgba(255,255,255,0.7)' }}>
                        The Polkadot Ecosystem
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }} className="partners-grid">
                    {PARTNERS.map((p, i) => (
                        <div key={i} className="ym-card ym-reveal" style={{ transitionDelay: `${i * 0.07}s`, padding: 0 }}>
                            <div className="ym-card-inner" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '52px', height: '52px',
                                    borderRadius: '14px',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    overflow: 'hidden',
                                    padding: '8px',
                                }}>
                                    <img
                                        src={p.img}
                                        alt={p.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0.9)' }}
                                        onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = `<span style="font-family:Outfit,sans-serif;font-weight:900;font-size:1rem;color:rgba(255,255,255,0.5)">${p.name.slice(0, 2)}</span>`; }}
                                    />
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: '#fff', marginBottom: '0.15rem' }}>{p.name}</div>
                                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{p.sub}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) { .partners-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 480px) { .partners-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
        </section>
    );
}
