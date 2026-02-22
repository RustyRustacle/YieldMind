import React, { useState } from 'react';
import { ethers } from 'ethers';
import { VAULT_ADDRESS, VAULT_ABI } from '../config/contracts';

// ─────────────────────────────────────────
// DEMO_MODE: false → uses real contract
// ─────────────────────────────────────────
const DEMO_MODE = true;

// Random APY between min and max
const randomAPY = (currentAPY) => {
    const base = parseFloat(currentAPY) || 8;
    // Random delta between +1.5 and +6 (always improves for demo effect)
    const delta = (Math.random() * 4.5 + 1.5).toFixed(1);
    const newAPY = Math.min(base + parseFloat(delta), 32); // cap at 32%
    return newAPY.toFixed(1);
};

const DEMO_STEPS = [
    { label: 'Scanning 12 protocols across Polkadot...', duration: 1100 },
    { label: 'AI analysis: evaluating yield vectors...', duration: 1300 },
    { label: 'Risk oracle: validating position safety...', duration: 1000 },
    { label: 'Neural signal: executing rebalance...', duration: 1400 },
    { label: 'Confirming on substrate chain...', duration: 900 },
];

export default function RebalanceButton({ signer, currentAPY, onRebalanceComplete }) {
    const [phase, setPhase] = useState('idle');
    const [stepIdx, setStepIdx] = useState(0);
    const [result, setResult] = useState(null);

    // ── DEMO simulation ──
    const runDemoSimulation = async () => {
        setPhase('running');
        for (let i = 0; i < DEMO_STEPS.length; i++) {
            setStepIdx(i);
            await new Promise(r => setTimeout(r, DEMO_STEPS[i].duration));
        }
        const apyBefore = parseFloat(currentAPY) || 0;
        const apyAfter = parseFloat(randomAPY(apyBefore));
        const res = {
            apyBefore: apyBefore.toFixed(1),
            apyAfter: apyAfter.toFixed(1),
            protocols: Math.floor(Math.random() * 3) + 2, // 2–4
            gain: (apyAfter - apyBefore).toFixed(1),
        };
        setResult(res);
        onRebalanceComplete && onRebalanceComplete(res.apyAfter);
        setPhase('success');
    };

    // ── REAL logic (preserved) ──
    const runRealRebalance = async () => {
        const vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
        const tx = await vault.triggerRebalance();
        await tx.wait();
    };

    const handleRebalance = async () => {
        if (!signer) return;
        try {
            if (DEMO_MODE) {
                await runDemoSimulation();
            } else {
                setPhase('running');
                await runRealRebalance();
                setPhase('success');
            }
        } catch (err) {
            console.error(err);
            setPhase('error');
        }
    };

    const reset = () => { setPhase('idle'); setStepIdx(0); setResult(null); };

    const card = (children) => (
        <div style={{ borderRadius: '14px', background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)', padding: '1.25rem', marginTop: '0.75rem' }}>
            {children}
        </div>
    );

    /* ── IDLE ── */
    if (phase === 'idle') return (
        <div>
            <button
                onClick={handleRebalance}
                disabled={!signer}
                className="ym-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '1rem 2rem', fontSize: '0.9rem', opacity: !signer ? 0.4 : 1, cursor: !signer ? 'not-allowed' : 'pointer' }}
            >
                <span style={{ marginRight: '0.4rem' }}>⚡</span> Trigger AI Rebalance
            </button>
            {!signer && (
                <p style={{ marginTop: '0.5rem', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
                    Connect wallet to continue
                </p>
            )}
            {DEMO_MODE && signer && (
                <p style={{ marginTop: '0.5rem', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(124,58,237,0.5)', textAlign: 'center' }}>
                    ◆ Demo simulation mode active
                </p>
            )}
        </div>
    );

    /* ── RUNNING ── */
    if (phase === 'running') return card(
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <svg style={{ animation: 'spin 1s linear infinite', width: '15px', height: '15px', flexShrink: 0 }} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="var(--pk-purple)" strokeWidth="3" fill="none" strokeDasharray="31.4 15.7" />
                </svg>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--pk-purple)' }}>
                    Neural Agent Active
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {DEMO_STEPS.map((s, i) => {
                    const done = i < stepIdx;
                    const current = i === stepIdx;
                    return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', opacity: (done || current) ? 1 : 0.2, transition: 'opacity 0.4s' }}>
                            <div style={{
                                width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                                background: done ? 'var(--pk-pink)' : current ? 'transparent' : 'rgba(255,255,255,0.08)',
                                border: done ? 'none' : current ? '2px solid var(--pk-purple)' : '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                animation: current ? 'dot-pulse 1.5s ease-in-out infinite' : 'none',
                                fontSize: '0.5rem', color: '#fff',
                            }}>
                                {done ? '✓' : ''}
                            </div>
                            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.63rem', color: done ? 'rgba(255,255,255,0.65)' : current ? '#fff' : 'rgba(255,255,255,0.2)' }}>{s.label}</span>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '1rem', height: '3px', borderRadius: '100px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${((stepIdx + 1) / DEMO_STEPS.length) * 100}%`, background: 'linear-gradient(90deg, var(--pk-pink), var(--pk-purple))', borderRadius: '100px', transition: 'width 0.5s ease' }} />
            </div>

            <style>{'@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes dot-pulse { 0%,100%{opacity:1}50%{opacity:0.3} }'}</style>
        </div>
    );

    /* ── SUCCESS ── */
    if (phase === 'success' && result) return card(
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: '0.75rem' }}>✓</div>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff' }}>Rebalance Executed</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                {/* APY card */}
                <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(230,0,122,0.08)', border: '1px solid rgba(230,0,122,0.2)' }}>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pk-pink)', marginBottom: '0.3rem' }}>APY</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through' }}>{result.apyBefore}%</span>
                        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>→</span>
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#4ade80' }}>{result.apyAfter}%</span>
                    </div>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', color: '#4ade80', marginTop: '0.2rem' }}>+{result.gain}% gain</div>
                </div>

                {/* Protocols */}
                <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pk-purple)', marginBottom: '0.3rem' }}>Protocols</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>{result.protocols} Shifted</div>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.2rem' }}>Gas: 0 (Gasless)</div>
                </div>
            </div>

            <button onClick={reset} className="ym-btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem', padding: '0.6rem' }}>
                Run Again
            </button>
        </div>
    );

    /* ── ERROR ── */
    return card(
        <div>
            <div style={{ color: '#f87171', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', marginBottom: '0.75rem' }}>✕ Failed — check console</div>
            <button onClick={reset} className="ym-btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem', padding: '0.6rem' }}>Try Again</button>
        </div>
    );
}