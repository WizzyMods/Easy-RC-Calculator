import React, { useState } from 'react';
import { ArrowLeft, Zap, Info } from 'lucide-react';
import { calculateWatts } from '../utils/calculations';
import SmartInput from '../components/SmartInput';

const WattCalculator = ({ onBack }) => {
    const [voltage, setVoltage] = useState('');
    const [current, setCurrent] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        if (voltage && current) {
            setResult(calculateWatts(voltage, current));
        }
    };

    return (
        <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <button
                onClick={onBack}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    color: 'var(--text-muted)',
                    marginBottom: '2rem',
                    padding: 0
                }}
            >
                <ArrowLeft size={18} />
                Back to Menu
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                    <Zap size={32} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Watt Calculation</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Power (W) = Voltage (V) × Current (A)</p>
                </div>
            </div>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <SmartInput
                    label="Voltage (V)"
                    value={voltage}
                    onChange={setVoltage}
                    placeholder="e.g. 11.1"
                    step="0.1"
                    required
                />

                <SmartInput
                    label="Current (A)"
                    value={current}
                    onChange={setCurrent}
                    placeholder="e.g. 40"
                    step="0.1"
                    required
                />

                <button
                    type="submit"
                    className="glass-card"
                    style={{
                        padding: '1rem',
                        background: 'var(--primary)',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: '1rem',
                        fontSize: '1rem'
                    }}
                >
                    Calculate Power
                </button>
            </form>

            {result && (
                <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem', textAlign: 'center', border: '1px solid var(--primary)' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Resulting Power</p>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {result} <span style={{ fontSize: '1rem' }}>Watts</span>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <Info size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Watt calculation helps you understand the load on your battery and electronic speed controller (ESC). Ensure your ESC can handle the calculated Watts.
                </p>
            </div>
        </div>
    );
};

export default WattCalculator;
