import React from 'react';

const ASSETS = [
    { name: 'ymWDOT', balance: '1000.0', value: '7,500.00', change: '+2.4%', shared: 65 },
    { name: 'ymvDOT', balance: '450.0', value: '3,375.00', change: '+5.1%', shared: 25 },
    { name: 'USDC', balance: '1,200.0', value: '1,200.00', change: '0.0%', shared: 10 },
];

export default function Portfolio() {
    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-card p-8 bg-gradient-to-br from-pink/20 to-transparent border-pink/30">
                            <div className="text-xs text-gray-500 font-bold uppercase mb-1 tracking-widest">Total Portfolio Value</div>
                            <div className="text-4xl font-black text-white glow-pink">$12,075.00</div>
                            <div className="mt-4 inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                                +$245.50 (Last 24h)
                            </div>
                        </div>
                        <div className="glass-card p-8 border-cyan-400/20 flex flex-col justify-center">
                            <div className="text-xs text-gray-500 font-bold uppercase mb-1 tracking-widest">Yield Earned</div>
                            <div className="text-4xl font-black text-white">$1,120.45</div>
                            <div className="text-xs text-cyan-400 mt-2 font-mono italic">All-time profit</div>
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Asset Allocation</h3>
                        <div className="space-y-6">
                            {ASSETS.map((a, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-white">{a.name}</span>
                                        <span className="text-gray-400 font-mono italic">{a.shared}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full animate-in slide-in-from-left duration-1000 ${i === 0 ? 'bg-pink' : i === 1 ? 'bg-cyan-400' : 'bg-purple-500'
                                            }`} style={{ width: `${a.shared}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="glass-card p-8 border-none bg-white/5">
                        <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            {[
                                { type: 'Deposit', amount: '100 WDOT', time: '2h ago', status: 'Confirmed' },
                                { type: 'Rebalance', amount: 'Neural Sig.', time: '5h ago', status: 'Success' },
                                { type: 'Yield Dist.', amount: '4.5 vDOT', time: '1d ago', status: 'Auto' },
                            ].map((item, i) => (
                                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-pink/30 before:rounded-full">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="text-sm font-bold text-white">{item.type}</div>
                                        <div className="text-[10px] text-gray-500">{item.time}</div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <div className="text-gray-400">{item.amount}</div>
                                        <div className="text-cyan-400 font-mono tracking-tighter">{item.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-pink to-purple-700 text-white shadow-2xl shadow-pink/20 relative overflow-hidden group">
                        <div className="absolute -right-8 -bottom-8 text-9xl opacity-10 group-hover:rotate-12 transition-transform">⬢</div>
                        <h3 className="text-xl font-black mb-2 relative z-10">Premium Staking</h3>
                        <p className="text-sm opacity-80 mb-6 relative z-10">Institutional grade yield for retail users.</p>
                        <button className="w-full py-3 bg-white text-pink font-bold rounded-xl active:scale-95 transition-transform relative z-10">
                            Upgrade Tier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
