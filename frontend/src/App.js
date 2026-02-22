import React, { useState, useEffect, useRef } from 'react';
import WalletConnect from './components/WalletConnect';
import { connectPolkadotWallet } from './utils/dedot';
import Dashboard from './components/Dashboard';
import DepositWithdraw from './components/DepositWithdraw';
import RebalanceButton from './components/RebalanceButton';
import AIPanel from './components/AIPanel';
import Markets from './components/Markets';
import AIAnalysis from './components/AIAnalysis';
import Portfolio from './components/Portfolio';

function App() {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [isDApp, setIsDApp] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.nexus-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-nexus').forEach(el => observer.observe(el));
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [isDApp]);

  const handleConnect = ({ signer, account }) => {
    setSigner(signer);
    setAccount(account);
  };

  const handleDisconnect = () => {
    setSigner(null);
    setAccount(null);
  };

  if (isDApp) {
    return (
      <div className="min-h-screen relative text-white bg-[#030303]">
        <div className="nexus-bg">
          <div className="glow-sphere" style={{ top: '-10%', left: '20%' }}></div>
          <div className="glow-sphere" style={{ bottom: '-10%', right: '20%', background: 'radial-gradient(circle, var(--accent-indigo) 0%, transparent 70%)' }}></div>
        </div>

        <header className="fixed top-0 left-0 right-0 py-6 px-12 flex justify-between items-center z-50 bg-[#030303]/60 backdrop-blur-2xl border-b border-white/5">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setIsDApp(false)}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-[15deg] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <span className="text-black font-black text-xl">Y</span>
            </div>
            <span className="text-2xl font-heading font-black tracking-tight mt-1">YieldMind</span>
          </div>
          <div className="flex items-center gap-8">
            <WalletConnect onConnect={handleConnect} account={account} />
            {account && (
              <button
                onClick={handleDisconnect}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center font-bold text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
            <button onClick={() => setIsDApp(false)} className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">
              Exit Terminal
            </button>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto px-12 pt-48 pb-48">
          <div className="reveal-nexus mb-24">
            <span className="text-purple-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">Autonomous Command // Terminal</span>
            <h2 className="text-7xl font-heading font-black tracking-tight">Intelligence Nexus</h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8">
              <div className="nexus-card h-full reveal-nexus">
                <div className="nexus-content">
                  <Dashboard signer={signer} account={account} />
                </div>
              </div>
            </div>
            <div className="xl:col-span-4">
              <div className="nexus-card h-full reveal-nexus" style={{ transitionDelay: '0.2s' }}>
                <div className="nexus-content">
                  <AIPanel signer={signer} />
                </div>
              </div>
            </div>

            <div className="xl:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2 nexus-card reveal-nexus">
                <div className="nexus-content">
                  <DepositWithdraw signer={signer} account={account} />
                </div>
              </div>
              <div className="nexus-card bg-gradient-to-br from-purple-600/5 to-transparent reveal-nexus" style={{ transitionDelay: '0.2s' }}>
                <div className="nexus-content flex flex-col justify-center h-full">
                  <h3 className="text-3xl font-heading font-bold mb-6">Neural Rebalancing</h3>
                  <p className="text-gray-400 mb-10 text-xl font-light leading-relaxed">
                    Optimize cross-chain yield positioning via neural interference signals.
                  </p>
                  <RebalanceButton signer={signer} />
                </div>
              </div>
            </div>

            <div className="xl:col-span-12 mt-16">
              <h2 className="text-4xl font-heading font-black mb-12 tracking-tight reveal-nexus">Global Yield Matrix</h2>
              <div className="nexus-card reveal-nexus">
                <div className="nexus-content">
                  <Markets />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative text-white bg-[#030303]">
      <div className="nexus-bg">
        <div className="glow-sphere" style={{ top: '-10%', left: '20%' }}></div>
        <div className="glow-sphere" style={{ bottom: '-10%', right: '20%', background: 'radial-gradient(circle, var(--accent-indigo) 0%, transparent 70%)' }}></div>
      </div>

      <header className="fixed top-0 left-0 right-0 p-12 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <span className="text-black font-black text-2xl">Y</span>
          </div>
          <span className="text-3xl font-heading font-black tracking-tight mt-1">YieldMind</span>
        </div>
        <div className="flex items-center gap-16">
          <nav className="hidden lg:flex gap-16 font-mono text-[10px] uppercase tracking-[0.5em] text-white/40">
            <a href="#how-it-works" className="hover:text-white transition-all">Flow</a>
            <a href="#agents" className="hover:text-white transition-all">Agents</a>
            <a href="#nexus" className="hover:text-white transition-all">Nexus</a>
          </nav>
          <button onClick={() => setIsDApp(true)} className="btn-nexus">Open Terminal</button>
        </div>
      </header>

      {/* Balanced Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-12 pt-24">
        <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="reveal-nexus">
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="text-[10px] font-mono tracking-[0.4em] text-purple-400 font-bold uppercase">Autonomous Intelligence // v2.0</span>
            </div>
            <h1 className="text-hero mb-12 leading-none">
              The Agentic <br />
              <span className="text-gradient-purple">Intelligence</span>
            </h1>
            <p className="text-2xl text-gray-400 mb-16 max-w-2xl font-light leading-relaxed">
              Deterministic yield optimization powered by autonomous neural agents.
              Native to Polkadot Hub. Decentralized. Absolute.
            </p>
            <div className="flex flex-wrap gap-8">
              <button onClick={() => setIsDApp(true)} className="btn-nexus shadow-2xl">Launch Nexus</button>
              <button className="btn-nexus-outline">System Audit</button>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center items-center reveal-nexus" style={{ transitionDelay: '0.4s' }}>
            <div className="neural-core">
              <div className="core-orbit orbit-1"></div>
              <div className="core-orbit orbit-2"></div>
              <div className="core-orbit orbit-3"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full blur-[60px] opacity-20"></div>
                <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                  <span className="text-black font-black text-3xl">Y</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Pipeline */}
      <section id="how-it-works" className="max-w-[1400px] mx-auto px-12 py-60">
        <div className="flex flex-col mb-40 reveal-nexus">
          <span className="text-purple-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">The Methodology</span>
          <h2 className="text-7xl font-heading font-black tracking-tight">The Nexus Pipeline</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {[
            { step: '01', title: 'Asset Orchestration', desc: 'Enterprise-grade vaults on Substrate securing institutional liquidity.' },
            { step: '02', title: 'Neural Analysis', desc: 'Custom AI models scanning cross-chain data points in real-time.' },
            { step: '03', title: 'Deterministic Flow', desc: 'Mathematical execution of yield signals without human latency.' }
          ].map((item, i) => (
            <div key={i} className="nexus-card reveal-nexus" style={{ transitionDelay: `${i * 0.2}s` }}>
              <div className="nexus-content">
                <div className="text-6xl font-black text-white/5 mb-8">{item.step}</div>
                <h4 className="text-2xl font-heading font-bold mb-4 uppercase tracking-widest">{item.title}</h4>
                <p className="text-gray-400 font-light text-lg leading-relaxed">{item.desc}</p>
                <div className="w-12 h-1 bg-purple-600 mt-8"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Agent Grid */}
      <section id="agents" className="max-w-[1400px] mx-auto px-12 py-60 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-40 items-end">
          <div className="reveal-nexus">
            <h2 className="text-8xl font-heading font-black tracking-tighter uppercase mb-6 leading-[0.85]">Yield <br /> Sentinels</h2>
            <div className="h-2 w-32 bg-purple-600 rounded-full mt-10"></div>
          </div>
          <p className="text-2xl text-gray-500 font-light leading-relaxed reveal-nexus" style={{ transitionDelay: '0.2s' }}>
            Specialized neural architectures running deterministic logic in isolated runtimes across the Polkadot ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '◉', title: 'Macro Scanner', tag: 'Systemic Analysis', desc: 'Identifies macro yield shifts across the ecosystem.' },
            { icon: '◇', title: 'Flash Node', tag: 'HFT Execution', desc: 'High-speed vault optimization for maximum efficiency.' },
            { icon: '▲', title: 'Risk Oracle', tag: 'Probability', desc: 'Real-time modeling for institutional-grade capital preservation.' }
          ].map((item, i) => (
            <div key={i} className="nexus-card reveal-nexus group" style={{ transitionDelay: `${i * 0.2}s` }}>
              <div className="nexus-content">
                <div className="text-4xl mb-12 text-purple-500 group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                <div className="font-mono text-[9px] text-purple-400 uppercase tracking-widest mb-4 font-bold">{item.tag}</div>
                <h4 className="text-2xl font-heading font-bold mb-6 uppercase tracking-widest">{item.title}</h4>
                <p className="text-gray-400 text-lg font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-60 px-12 border-t border-white/5 bg-[#030303]/40 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-6 reveal-nexus">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <span className="text-black font-black text-2xl">Y</span>
              </div>
              <span className="text-3xl font-heading font-black tracking-tight">YieldMind</span>
            </div>
            <p className="text-gray-500 text-2xl font-light max-w-sm mb-12 leading-relaxed">
              Architecting the future of decentralized yield intelligence.
            </p>
            <div className="flex gap-8 text-white/20 hover:text-white transition-colors cursor-pointer text-xs font-mono tracking-widest">
              <span>TWITTER</span>
              <span>DISCORD</span>
              <span>GITHUB</span>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-12 reveal-nexus" style={{ transitionDelay: '0.2s' }}>
            <div>
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-8">Ecosystem</h5>
              <div className="flex flex-col gap-4 text-lg font-light text-gray-500">
                <span className="hover:text-white cursor-pointer transition">Terminal</span>
                <span className="hover:text-white cursor-pointer transition">Markets</span>
                <span className="hover:text-white cursor-pointer transition">Analytics</span>
              </div>
            </div>
            <div>
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-8">Protocol</h5>
              <div className="flex flex-col gap-4 text-lg font-light text-gray-500">
                <span className="hover:text-white cursor-pointer transition">Audit Docs</span>
                <span className="hover:text-white cursor-pointer transition">Consensus</span>
                <span className="hover:text-white cursor-pointer transition">Legal</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto pt-40 mt-40 border-t border-white/5 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.4em] text-white/10 reveal-nexus">
          <span>Secured by deterministic substrate agent runtimes</span>
          <span>© 2026 YieldMind Labs</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
