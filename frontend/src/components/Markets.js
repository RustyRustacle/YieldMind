import React from 'react';

const PROTOCOLS = [
    { name: 'Acala', asset: 'DOT', apy: '14.2', tvl: '125M', risk: 'Low', color: 'text-pink' },
    { name: 'Moonbeam', asset: 'GLMR', apy: '11.8', tvl: '98M', risk: 'Medium', color: 'text-purple-400' },
    { name: 'Interlay', asset: 'iBTC', apy: '8.5', tvl: '45M', risk: 'Low', color: 'text-yellow-500' },
    { name: 'Parallel', asset: 'DOT', apy: '15.4', tvl: '110M', risk: 'Medium', color: 'text-blue-400' },
    { name: 'Equilibrium', asset: 'EQD', apy: '12.1', tvl: '32M', risk: 'Medium', color: 'text-cyan-400' },
];

export default function Markets() {
    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 bg-gradient-to-br from-pink/10 to-transparent border-pink/20">
                    <h2 className="text-2xl font-bold text-white mb-2">Active Yield Markets</h2>
                    <p className="text-gray-400">Discover and compare optimized yield opportunities across the Polkadot ecosystem.</p>
                </div>
                <div className="glass-card p-8 border-cyan-400/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs text-gray-500 font-bold uppercase mb-1">Total Market TVL</div>
                            <div className="text-3xl font-black text-white">$410M+</div>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-2xl">💰</div>
                    </div>
                </div>
            </div>

            <div className="glass-card overflow-hidden border-white/5">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-white/10">
                            <th className="px-6 py-4">Protocol</th>
                            <th className="px-6 py-4">Primary Asset</th>
                            <th className="px-6 py-4">Current APY</th>
                            <th className="px-6 py-4">TVL</th>
                            <th className="px-6 py-4">Risk Level</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {PROTOCOLS.map((p, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-6 font-bold text-white flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg bg-current opacity-20 ${p.color}`}></div>
                                    {p.name}
                                </td>
                                <td className="px-6 py-6 text-gray-300 font-mono">{p.asset}</td>
                                <td className="px-6 py-6">
                                    <span className="text-xl font-black text-white glow-pink">{p.apy}%</span>
                                </td>
                                <td className="px-6 py-6 text-gray-400">${p.tvl}</td>
                                <td className="px-6 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${p.risk === 'Low' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                        }`}>
                                        {p.risk} Risk
                                    </span>
                                </td>
                                <td className="px-6 py-6 text-right">
                                    <button className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold text-gray-300 hover:bg-pink hover:text-white transition transform group-hover:scale-105">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
