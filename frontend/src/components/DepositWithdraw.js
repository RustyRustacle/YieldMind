import React, { useState } from 'react';
import { ethers } from 'ethers';
import { VAULT_ADDRESS, VAULT_ABI, WDOT_ADDRESS, ERC20_ABI } from '../config/contracts';

export default function DepositWithdraw({ signer, account }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!signer || !amount) return;
    setLoading(true);
    try {
      const vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
      const wdot = new ethers.Contract(WDOT_ADDRESS, ERC20_ABI, signer);
      const amountWei = ethers.parseEther(amount);
      // Approve vault to spend WDOT
      const approveTx = await wdot.approve(VAULT_ADDRESS, amountWei);
      await approveTx.wait();
      // Deposit
      const depositTx = await vault.deposit(amountWei, account.address);
      await depositTx.wait();
      alert('Deposit successful');
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">Manage Assets</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2 font-medium uppercase tracking-wider">Deposit Amount (WDOT)</label>
          <div className="relative">
            <input
              type="text"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/5 border border-white/10 text-white p-4 rounded-xl w-full focus:outline-none focus:border-pink transition-all text-xl font-bold"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-pink font-bold">WDOT</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleDeposit}
            disabled={loading}
            className="btn-polkadot font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Deposit WDOT'}
          </button>

          <button
            disabled
            className="bg-white/5 border border-white/5 text-gray-600 font-bold py-4 px-6 rounded-xl cursor-not-allowed"
          >
            Withdraw Tokens
          </button>
        </div>

        <p className="text-gray-500 text-xs text-center">
          Withdrawals are subject to a 24h cooldown period.
        </p>
      </div>
    </div>
  );
}