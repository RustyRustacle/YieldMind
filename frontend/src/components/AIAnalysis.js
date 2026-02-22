import React from 'react';

const RISK_FACTORS = [
    { name: 'Volatility Index', value: 24, label: 'Stable', color: 'bg-green-500' },
    { name: 'Liquidity Depth', value: 89, label: 'High', color: 'bg-cyan-400' },
    { name: 'Protocol Health', value: 95, label: 'Excellent', color: 'bg-pink' },
    { name: 'XCM Delay', value: 12, label: 'Minimal', color: 'bg-purple-500' },
];

export default function AIAnalysis() {
    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <span className="w-8 h-8 bg-cyan-400/20 rounded-lg flex items-center justify-center mr-3 text-cyan-400">🧠</span>
                        AI Intelligence Core
                    </h2>
                    <div className="h-64 flex items-end gap-2 mb-8">
                        {[40, 65, 45, 80, 55, 90, 85, 95, 75, 85].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-cyan-400 to-pink rounded-t opacity-40 hover:opacity-100 transition-opacity"
                                style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {RISK_FACTORS.map((f, i) => (
                            <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <div className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-widest">{f.name}</div>
                                <div className="text-xl font-black text-white mb-1">{f.value}%</div>
                                <div className={`text-[10px] font-bold ${f.color.replace('bg-', 'text-')}`}>{f.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 bg-gradient-to-b from-purple-500/10 to-transparent border-purple-500/20">
                    <h3 className="text-xl font-bold text-white mb-4">Neural Signal</h3>
                    <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 shadow-inner">
                        <div className="text-5xl font-black text-white glow-pink mb-4">BUY</div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Confidence</span>
                                <span className="text-green-400 font-bold">92.4%</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[92%] animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-6 leading-relaxed">
                        Deterministic scanner identifies outlier yield on Acala vDOT pool.
                        XCM latency is within optimal range for rebalance execution.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 border-l-4 border-pink">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Inferences</h3>
                    <div className="space-y-4">
                        {[
                            'Detected liquidity spike in Moonbeam Stable Pool',
                            'Optimized vDOT allocation (+2.1% expected APY)',
                            'Neural network scan complete: No high-risk anomalies',
                        ].map((msg, i) => (
                            <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5 text-sm items-center">
                                <div className="text-pink">✓</div>
                                <div className="text-gray-300 italic">"{msg}"</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="glass-card p-8 border-l-4 border-cyan-400">
                    <h3 className="text-lg font-bold text-white mb-4">Risk Heatmap</h3>
                    <div className="grid grid-cols-5 gap-2 h-40">
                        {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className={`rounded ${i % 7 === 0 ? 'bg-pink/30 shadow-[0_0_10px_rgba(230,0,122,0.3)]' : 'bg-white/5'}`}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
