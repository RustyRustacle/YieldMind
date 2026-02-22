import React, { useState } from 'react';
import { ethers } from 'ethers';
import { VAULT_ADDRESS, VAULT_ABI, WDOT_ADDRESS, ERC20_ABI } from '../config/contracts';

// ─────────────────────────────────────────
// DEMO_MODE: false → uses real contract
// ─────────────────────────────────────────
const DEMO_MODE = true;

export default function DepositWithdraw({ signer, account, onDemoDeposit }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | processing | success

  // ── REAL logic (preserved) ──
  const runRealDeposit = async () => {
    const vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
    const wdot = new ethers.Contract(WDOT_ADDRESS, ERC20_ABI, signer);
    const amountWei = ethers.parseEther(amount);
    const approveTx = await wdot.approve(VAULT_ADDRESS, amountWei);
    await approveTx.wait();
    const depositTx = await vault.deposit(amountWei, account.address);
    await depositTx.wait();
  };

  // ── DEMO simulation ──
  const runDemoDeposit = async () => {
    setPhase('processing');
    await new Promise(r => setTimeout(r, 800));
    setPhase('approving');
    await new Promise(r => setTimeout(r, 700));
    setPhase('depositing');
    await new Promise(r => setTimeout(r, 1000));
    onDemoDeposit && onDemoDeposit(parseFloat(amount) || 0);
    setPhase('success');
  };

  const handleDeposit = async () => {
    if (!signer || !amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    try {
      if (DEMO_MODE) {
        await runDemoDeposit();
      } else {
        setPhase('processing');
        await runRealDeposit();
        setPhase('success');
      }
    } catch (err) {
      console.error(err);
      setPhase('idle');
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setPhase('idle'); setAmount(''); };

  const phaseLabel = {
    processing: 'Approving spend...',
    approving: 'Signing transaction...',
    depositing: 'Depositing to vault...',
  };

  return (
    <div>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pk-pink)', marginBottom: '1.5rem' }}>
        Manage Assets
      </div>
      <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.75rem', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
        Deposit & Withdraw
      </h2>

      {/* ── Success state ── */}
      {phase === 'success' ? (
        <div style={{ borderRadius: '14px', background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.25)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: '0.7rem' }}>✓</div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#fff' }}>Deposit Confirmed</span>
          </div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1rem' }}>
            {amount} WDOT → ymWDOT minted to your vault position.
          </div>
          <button onClick={reset} className="ym-btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem', padding: '0.6rem' }}>
            New Deposit
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Input */}
          <div>
            <label style={{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.6rem' }}>
              Deposit Amount (WDOT)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%', padding: '1rem 4.5rem 1rem 1.1rem',
                  background: 'rgba(124,58,237,0.06)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  borderRadius: '12px', color: '#fff',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.3rem',
                  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(230,0,122,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(230,0,122,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(124,58,237,0.25)'; e.target.style.boxShadow = 'none'; }}
              />
              <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--pk-pink)', fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                WDOT
              </div>
            </div>
            {/* Quick amounts */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {['10', '50', '100', '500'].map(v => (
                <button key={v} onClick={() => setAmount(v)} style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: 'rgba(255,255,255,0.5)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(124,58,237,0.2)'; e.target.style.color = '#fff'; }}
                  onMouseLeave={e => { e.target.style.background = 'rgba(124,58,237,0.1)'; e.target.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Progress label when loading */}
          {loading && phaseLabel[phase] && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg style={{ animation: 'spin 1s linear infinite', width: '13px', height: '13px', flexShrink: 0 }} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="var(--pk-purple)" strokeWidth="3" fill="none" strokeDasharray="31.4 15.7" />
              </svg>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--pk-purple)' }}>{phaseLabel[phase]}</span>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              onClick={handleDeposit}
              disabled={loading || !signer || !amount}
              className="ym-btn-primary"
              style={{ justifyContent: 'center', opacity: (loading || !signer || !amount) ? 0.6 : 1, cursor: (loading || !signer || !amount) ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Processing...' : 'Deposit WDOT'}
            </button>
            <button disabled className="ym-btn-secondary" style={{ justifyContent: 'center', opacity: 0.35, cursor: 'not-allowed' }}>
              Withdraw
            </button>
          </div>

          <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
            Withdrawals have a 24h cooldown period
          </p>
          {DEMO_MODE && signer && (
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(124,58,237,0.5)', textAlign: 'center', marginTop: '-0.5rem' }}>
              ◆ Demo simulation mode active
            </p>
          )}
        </div>
      )}

      <style>{'@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'}</style>
    </div>
  );
}