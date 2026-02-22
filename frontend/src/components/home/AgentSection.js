import React from 'react';

const AGENTS = [
    {
        icon: '◉',
        name: 'Macro Scanner',
        tag: 'System Analysis',
        desc: 'Continuously monitors macro conditions across all parachain yield curves. Identifies systemic shifts before they hit.',
        color: 'var(--pk-pink)',
        delay: 0,
    },
    {
        icon: '◇',
        name: 'Risk Oracle',
        tag: 'Probability Engine',
        desc: 'Real-time risk scoring for every protocol and position. Institutional-grade capital preservation logic.',
        color: 'var(--pk-purple)',
        delay: 0.6,
    },
    {
        icon: '▲',
        name: 'Flash Node',
        tag: 'HFT Execution',
        desc: 'Sub-block execution of vault rebalancing decisions. Zero slippage. Zero human latency.',
        color: 'var(--pk-indigo)',
        delay: 1.2,
    },
    {
        icon: '⬡',
        name: 'Vault Keeper',
        tag: 'Asset Custody',
        desc: 'Substrate-native vault management with Merkle-proven audit trails. Your assets, always verifiable.',
        color: '#22d3ee',
        delay: 1.8,
    },
];

export default function AgentSection() {
    return (
        <section id="agents" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2.5rem' }}>

                {/* Header */}
                <div className="ym-reveal" style={{ marginBottom: '4.5rem' }}>
                    <div className="ym-label" style={{ marginBottom: '1rem', display: 'block' }}>Autonomous Neural Fleet</div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <h2 className="ym-section-title">How Agents<br /><span className="ym-gradient-text">Work</span></h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '420px', lineHeight: 1.7, fontSize: '0.95rem' }}>
                            Four specialized AI agents run in parallel, each with a distinct role in the yield optimization pipeline.
                        </p>
                    </div>
                </div>

                {/* Pipeline diagram */}
                <div className="ym-reveal" style={{ marginBottom: '3.5rem', transitionDelay: '0.1s' }}>
                    <div className="ym-card" style={{ padding: 0, overflow: 'visible' }}>
                        <div className="ym-card-inner" style={{ padding: '2.5rem 3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0', position: 'relative' }}>
                                {AGENTS.map((agent, i) => (
                                    <React.Fragment key={i}>
                                        {/* Agent node */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', flex: '0 0 auto' }}>
                                            <div style={{
                                                width: '64px', height: '64px',
                                                borderRadius: '16px',
                                                background: `radial-gradient(circle, ${agent.color}20 0%, transparent 70%)`,
                                                border: `1px solid ${agent.color}50`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '1.5rem',
                                                color: agent.color,
                                                transition: 'all 0.3s ease',
                                                cursor: 'default',
                                                position: 'relative',
                                            }}>
                                                {agent.icon}
                                                {/* Pulsing ring */}
                                                <div style={{
                                                    position: 'absolute', inset: -6,
                                                    borderRadius: '20px',
                                                    border: `1px solid ${agent.color}25`,
                                                    animation: `orb-pulse ${2 + i * 0.5}s ease-in-out infinite`,
                                                }} />
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: agent.color, marginBottom: '0.2rem' }}>
                                                    {agent.tag}
                                                </div>
                                                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>
                                                    {agent.name}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrow connector */}
                                        {i < AGENTS.length - 1 && (
                                            <div style={{ flex: 1, height: '2px', background: `linear-gradient(90deg, ${AGENTS[i].color}60, ${AGENTS[i + 1].color}60)`, position: 'relative', margin: '0 0.5rem', marginBottom: '2rem' }}>
                                                <div style={{
                                                    position: 'absolute', width: '8px', height: '8px',
                                                    borderRadius: '50%', top: '-3px',
                                                    background: AGENTS[i].color,
                                                    boxShadow: `0 0 10px ${AGENTS[i].color}`,
                                                    animation: 'pipeline-flow 2s ease-in-out infinite',
                                                    animationDelay: `${i * 0.5}s`,
                                                }} />
                                                {/* Arrow head */}
                                                <div style={{
                                                    position: 'absolute', right: -1, top: -4,
                                                    borderLeft: `8px solid ${AGENTS[i + 1].color}60`,
                                                    borderTop: '5px solid transparent',
                                                    borderBottom: '5px solid transparent',
                                                }} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Agent cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="agents-grid">
                    {AGENTS.map((agent, i) => (
                        <div key={i} className="ym-card ym-reveal" style={{ transitionDelay: `${i * 0.12}s`, padding: 0 }}>
                            <div className="ym-card-inner" style={{ padding: '1.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '10px',
                                        background: `${agent.color}15`,
                                        border: `1px solid ${agent.color}40`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.1rem', color: agent.color,
                                    }}>
                                        {agent.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: agent.color }}>
                                            {agent.tag}
                                        </div>
                                        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                                            {agent.name}
                                        </div>
                                    </div>
                                </div>
                                <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontSize: '0.88rem' }}>
                                    {agent.desc}
                                </p>
                                <div style={{ marginTop: '1.25rem', height: '2px', width: '36px', background: `linear-gradient(90deg, ${agent.color}, transparent)` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .agents-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .agents-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
