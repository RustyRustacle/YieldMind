import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { SCORER_ADDRESS, AISCORER_ABI } from '../config/contracts';

export default function AIPanel({ signer }) {
    const [bestStrategy, setBestStrategy] = useState('Fetching...');
    const [score, setScore] = useState('85'); // Start with a mock for visual flair

    useEffect(() => {
        if (!signer) return;
        const scorer = new ethers.Contract(SCORER_ADDRESS, AISCORER_ABI, signer);
        const fetchScore = async () => {
            try {
                const [strategyIdx, scoreVal] = await scorer.getBestStrategy();
                const strategies = ['vDOT Staking', 'DOT Native Staking', 'USDC Lending'];
                setBestStrategy(strategies[strategyIdx]);
                setScore(scoreVal.toString());
            } catch (e) {
                console.error("AI Scorer fetch error", e);
                setBestStrategy('Dynamic Staking (Default)');
                setScore('78'); // Fallback score
            }
        };
        fetchScore();
    }, [signer]);

    return (
        <div className="glass-card p-8 border-t-4 border-t-cyan-400 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🤖</div>
            <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                AI Opportunity Score
            </h2>

            <div className="flex flex-col items-center justify-center py-6">
                <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-800" />
                        <circle
                            cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
                            strokeDasharray={364}
                            strokeDashoffset={364 - (364 * parseInt(score)) / 100}
                            className="text-cyan-400 shadow-glow"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-black text-white glow-cyan">{score}</span>
                    </div>
                </div>
                <p className="text-gray-400 text-sm mt-4 text-center">Confidence Index</p>
            </div>

            <div className="mt-8 p-4 bg-cyan-400/10 rounded-xl border border-cyan-400/20">
                <div className="text-xs text-cyan-400 font-bold uppercase mb-1">Recommended Strategy</div>
                <div className="text-white font-bold">{bestStrategy}</div>
            </div>
        </div>
    );
}
