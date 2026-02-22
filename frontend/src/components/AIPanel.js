import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { SCORER_ADDRESS, AISCORER_ABI } from '../config/contracts';

export default function AIPanel({ signer }) {
    const [bestStrategy, setBestStrategy] = useState('Dynamic Staking (Default)');
    const [score, setScore] = useState('85');

    useEffect(() => {
        if (!signer) return;
        const scorer = new ethers.Contract(SCORER_ADDRESS, AISCORER_ABI, signer);
        const fetch = async () => {
            try {
                const [idx, val] = await scorer.getBestStrategy();
                const names = ['vDOT Staking', 'DOT Native Staking', 'USDC Lending'];
                setBestStrategy(names[idx]);
                setScore(val.toString());
            } catch {
                setBestStrategy('Dynamic Staking (Default)');
                setScore('85');
            }
        };
        fetch();
    }, [signer]);

    const scoreNum = parseInt(score) || 0;
    const radius = 54;
    const circ = 2 * Math.PI * radius;
    const dash = circ - (circ * scoreNum) / 100;

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--pk-pink)', animation: 'blink 1.5s ease-in-out infinite', boxShadow: '0 0 6px var(--pk-pink)' }} />
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pk-pink)' }}>
                    AI Opportunity Score
                </span>
            </div>

            {/* Score ring */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0 1.5rem' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="60" cy="60" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                        <circle
                            cx="60" cy="60" r={radius}
                            stroke="url(#scoreGrad)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circ}
                            strokeDashoffset={dash}
                            style={{ transition: 'stroke-dashoffset 1s ease' }}
                        />
                        <defs>
                            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--pk-pink)" />
                                <stop offset="100%" stopColor="var(--pk-purple)" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2rem', lineHeight: 1, color: '#fff' }}>{score}</span>
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>score</span>
                    </div>
                </div>
            </div>

            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', marginBottom: '1.5rem' }}>Confidence Index</p>

            {/* Recommended strategy */}
            <div style={{
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.25)',
            }}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--pk-purple)', marginBottom: '0.4rem' }}>
                    Recommended Strategy
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{bestStrategy}</div>
            </div>
        </div>
    );
}
