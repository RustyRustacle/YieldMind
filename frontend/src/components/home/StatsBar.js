import React from 'react';

const STATS = [
    { label: 'Total Value Locked', value: '$41M+', suffix: '' },
    { label: 'Active Strategies', value: '128', suffix: '' },
    { label: 'Protocols Integrated', value: '12', suffix: '+' },
    { label: 'AI Operations / 24h', value: '3.4K', suffix: '' },
    { label: 'Average APY', value: '14.2', suffix: '%' },
    { label: 'Users Protected', value: '5,200', suffix: '+' },
    { label: 'Total Value Locked', value: '$41M+', suffix: '' },
    { label: 'Active Strategies', value: '128', suffix: '' },
    { label: 'Protocols Integrated', value: '12', suffix: '+' },
    { label: 'AI Operations / 24h', value: '3.4K', suffix: '' },
    { label: 'Average APY', value: '14.2', suffix: '%' },
    { label: 'Users Protected', value: '5,200', suffix: '+' },
];

export default function StatsBar() {
    return (
        <div className="ym-ticker" style={{ position: 'relative', zIndex: 1 }}>
            <div className="ym-ticker-track">
                {STATS.map((s, i) => (
                    <div key={i} className="ym-ticker-item">
                        <span className="ym-ticker-label">{s.label}</span>
                        <span style={{ color: 'rgba(124,58,237,0.6)', fontSize: '0.65rem' }}>·</span>
                        <span className="ym-ticker-value">{s.value}{s.suffix}</span>
                        <span className="ym-ticker-sep" style={{ marginLeft: '1.5rem' }}>◆</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
