import React, { useState, useEffect } from 'react';
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';
import DepositWithdraw from './components/DepositWithdraw';
import RebalanceButton from './components/RebalanceButton';
import AIPanel from './components/AIPanel';
import Markets from './components/Markets';

// Home sections
import HeroSection from './components/home/HeroSection';
import StatsBar from './components/home/StatsBar';
import AboutSection from './components/home/AboutSection';
import HowItWorksSection from './components/home/HowItWorksSection';
import AgentSection from './components/home/AgentSection';
import FeaturesSection from './components/home/FeaturesSection';
import PartnersSection from './components/home/PartnersSection';
import FAQSection from './components/home/FAQSection';
import CTASection from './components/home/CTASection';

/* ─── Nav links ─── */
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Agents', href: '#agents' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
];

function App() {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [isDApp, setIsDApp] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Demo shared state ──
  const [demoTVL, setDemoTVL] = useState('0');
  const [demoPosition, setDemoPosition] = useState('0');
  const [demoAPY, setDemoAPY] = useState('0');

  const handleDemoDeposit = (amount) => {
    setDemoTVL(prev => (parseFloat(prev) + amount).toFixed(2));
    setDemoPosition(prev => (parseFloat(prev) + amount).toFixed(2));
    // Seed a base APY on first deposit if not yet set
    setDemoAPY(prev => prev === '0' ? (8 + Math.random() * 3).toFixed(1) : prev);
  };

  const handleRebalanceComplete = (newAPY) => {
    setDemoAPY(newAPY);
  };

  /* ── Scroll effects ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Reveal animations ── */
  useEffect(() => {
    if (isDApp) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.ym-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isDApp]);

  /* ── dApp mouse spotlight ── */
  useEffect(() => {
    if (!isDApp) return;
    const onMove = e => {
      document.querySelectorAll('.nexus-card').forEach(card => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
      });
    };

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-nexus').forEach(el => observer.observe(el));
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); observer.disconnect(); };
  }, [isDApp]);

  const handleConnect = ({ signer, account }) => { setSigner(signer); setAccount(account); };
  const handleDisconnect = () => { setSigner(null); setAccount(null); };

  /* ═══════════════════════════════════════
     dApp TERMINAL VIEW
  ═══════════════════════════════════════ */
  if (isDApp) {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', color: '#fff', background: 'var(--pk-dark)' }}>
        {/* Ambient background */}
        <div className="ym-ambient">
          <div className="ym-glow ym-glow-1" />
          <div className="ym-glow ym-glow-2" />
        </div>

        {/* dApp Navbar */}
        <header style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          padding: '1.25rem 2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 100,
          background: 'rgba(5,5,7,0.75)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(124,58,237,0.15)',
        }}>
          <div className="ym-logo" onClick={() => setIsDApp(false)}>
            <div className="ym-logo-icon" style={{ background: 'transparent', border: '1px solid rgba(124,58,237,0.3)', padding: '5px' }}>
              <img src="/img/logo.png" alt="YieldMind" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span className="ym-logo-text">YieldMind</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <WalletConnect onConnect={handleConnect} account={account} />
            {account && (
              <button onClick={handleDisconnect} style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700,
                transition: 'all 0.2s',
              }}>✕</button>
            )}
            <button
              onClick={() => setIsDApp(false)}
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
            >
              ← Back
            </button>
          </div>
        </header>

        {/* dApp Content */}
        <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '8rem 2.5rem 5rem' }}>
          <div className="reveal-nexus" style={{ marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--pk-pink)', display: 'block', marginBottom: '0.5rem' }}>
              Autonomous Command // Terminal
            </span>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              Intelligence Nexus
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            {/* Row 1: Dashboard + AI Panel */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="dapp-row-1">
              <div className="nexus-card reveal-nexus">
                <div className="nexus-content"><Dashboard signer={signer} account={account} demoTVL={demoTVL} demoPosition={demoPosition} demoAPY={demoAPY} /></div>
              </div>
              <div className="nexus-card reveal-nexus" style={{ transitionDelay: '0.15s' }}>
                <div className="nexus-content"><AIPanel signer={signer} /></div>
              </div>
            </div>

            {/* Row 2: Deposit + Rebalance */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="dapp-row-2">
              <div className="nexus-card reveal-nexus">
                <div className="nexus-content"><DepositWithdraw signer={signer} account={account} onDemoDeposit={handleDemoDeposit} /></div>
              </div>
              <div className="nexus-card reveal-nexus" style={{ transitionDelay: '0.15s', background: 'linear-gradient(135deg, rgba(124,58,237,0.06), transparent)' }}>
                <div className="nexus-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', minHeight: '200px' }}>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.75rem' }}>Neural Rebalancing</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    Optimize cross-chain yield positioning via neural interference signals.
                  </p>
                  <RebalanceButton signer={signer} currentAPY={demoAPY} onRebalanceComplete={handleRebalanceComplete} />
                </div>
              </div>
            </div>

            {/* Row 3: Markets */}
            <div style={{ marginTop: '1rem' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.03em', marginBottom: '1.5rem' }} className="reveal-nexus">
                Global Yield Matrix
              </h2>
              <div className="nexus-card reveal-nexus">
                <div className="nexus-content"><Markets /></div>
              </div>
            </div>
          </div>
        </main>

        <style>{`
          @media (max-width: 900px) {
            .dapp-row-1, .dapp-row-2 { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     HOME / LANDING VIEW
  ═══════════════════════════════════════ */
  return (
    <div style={{ minHeight: '100vh', position: 'relative', color: '#fff', background: 'var(--pk-dark)' }}>
      {/* Ambient glows */}
      <div className="ym-ambient">
        <div className="ym-glow ym-glow-1" />
        <div className="ym-glow ym-glow-2" />
        <div className="ym-glow ym-glow-3" />
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`ym-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="ym-nav-inner">
          {/* Logo */}
          <div className="ym-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="ym-logo-icon" style={{ background: 'transparent', border: '1px solid rgba(124,58,237,0.3)', padding: '5px' }}>
              <img src="/img/logo.png" alt="YieldMind" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span className="ym-logo-text">YieldMind</span>
          </div>

          {/* Desktop nav links */}
          <div className="ym-nav-links" style={{ display: 'flex' }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="ym-nav-link">
                {l.label}
              </a>
            ))}
            <button className="ym-btn-primary" onClick={() => setIsDApp(true)} style={{ padding: '0.6rem 1.6rem', fontSize: '0.78rem' }}>
              Launch App
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: 'none',
              background: 'none', border: 'none',
              color: '#fff', cursor: 'pointer',
              fontSize: '1.5rem', lineHeight: 1,
            }}
            className="ym-hamburger"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: 'rgba(5,5,7,0.96)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(124,58,237,0.15)',
            padding: '1.5rem 2.5rem',
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
          }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="ym-nav-link" style={{ fontSize: '0.75rem' }}
                onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <button className="ym-btn-primary" onClick={() => { setIsDApp(true); setMenuOpen(false); }}>
              Launch App
            </button>
          </div>
        )}
      </nav>

      {/* ── SECTIONS ── */}
      <HeroSection onLaunchApp={() => setIsDApp(true)} />
      <StatsBar />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="ym-divider" />
      </div>

      <AboutSection />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="ym-divider" />
      </div>

      <HowItWorksSection />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="ym-divider" />
      </div>

      <AgentSection />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="ym-divider" />
      </div>

      <FeaturesSection />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="ym-divider" />
      </div>

      <PartnersSection />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="ym-divider" />
      </div>

      <FAQSection />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="ym-divider" />
      </div>

      <CTASection onLaunchApp={() => setIsDApp(true)} />

      {/* ── FOOTER ── */}
      <footer style={{
        position: 'relative', zIndex: 1,
        padding: '4rem 2.5rem 2.5rem',
        borderTop: '1px solid rgba(124,58,237,0.12)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}
            className="footer-grid">
            {/* Brand */}
            <div>
              <div className="ym-logo" style={{ marginBottom: '1rem', cursor: 'default' }}>
                <div className="ym-logo-icon" style={{ background: 'transparent', border: '1px solid rgba(124,58,237,0.3)', padding: '5px' }}>
                  <img src="/img/logo.png" alt="YieldMind" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span className="ym-logo-text">YieldMind</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '280px', marginBottom: '1.5rem' }}>
                Autonomous AI yield intelligence protocol, native to the Polkadot Hub ecosystem.
              </p>
              {/* Social links */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[['Twitter', 'https://x.com'], ['Discord', 'https://discord.gg'], ['Github', 'https://github.com/RustyRustacle/YieldMind'], ['Docs', 'https://docs.yieldmind.io']].map(([label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.25)',
                    textDecoration: 'none',
                    padding: '0.4rem 0.6rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Columns */}
            {[
              { title: 'Protocol', links: ['Terminal', 'Markets', 'Analytics', 'Agents'] },
              { title: 'Resources', links: ['Docs', 'Audit', 'Github', 'SDK'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Legal'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--pk-purple)', marginBottom: '1.25rem', fontWeight: 500 }}>
                  {col.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {col.links.map(l => (
                    <button key={l} onClick={() => { }} style={{
                      color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', padding: 0,
                      transition: 'color 0.2s', fontFamily: 'inherit',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '1rem',
          }}>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
              © 2026 YieldMind Labs — Built on Polkadot
            </span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
              Secured by deterministic substrate agent runtimes
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .ym-nav-links { display: none !important; }
          .ym-hamburger { display: block !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
