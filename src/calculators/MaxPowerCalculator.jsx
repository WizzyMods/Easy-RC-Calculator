import React, { useState } from 'react';
import { ArrowLeft, Battery, Info } from 'lucide-react';
import { calculateMaxPower } from '../utils/calculations';
import SmartInput from '../components/SmartInput';

const MaxPowerCalculator = ({ onBack }) => {
    const [cRating, setCRating] = useState('');
    const [capacity, setCapacity] = useState('');
    const [voltage, setVoltage] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        if (cRating && capacity && voltage) {
            setResult(calculateMaxPower(cRating, capacity, voltage));
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
                <div className="glass-card" style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                    <Battery size={32} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Max Battery Power</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Continuous Current = (C-Rating × Capacity) / 1000</p>
                </div>
            </div>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <SmartInput
                    label="C-Rating (Continuous)"
                    value={cRating}
                    onChange={setCRating}
                    placeholder="e.g. 50"
                    required
                />

                <SmartInput
                    label="Capacity (mAh)"
                    value={capacity}
                    onChange={setCapacity}
                    placeholder="e.g. 5000"
                    required
                />

                <SmartInput
                    label="Voltage (V)"
                    value={voltage}
                    onChange={setVoltage}
                    placeholder="e.g. 11.1"
                    step="0.1"
                    required
                />

                <button
                    type="submit"
                    className="glass-card"
                    style={{
                        padding: '1rem',
                        background: '#ef4444',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: '1rem',
                        fontSize: '1rem'
                    }}
                >
                    Check Battery Limit
                </button>
            </form>

            {result && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', border: '1px solid #ef4444' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Max Cont. Current</p>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                            {result.maxCurrent} <span style={{ fontSize: '1rem' }}>Amps</span>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', border: '1px solid #ef4444' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Max Cont. Power</p>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                            {result.maxWatts} <span style={{ fontSize: '1rem' }}>Watts</span>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <Info size={20} color="#ef4444" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Exceeding the maximum continuous current rating can lead to battery swelling, overheating, or failure. Always leave at least 20% margin.
                </p>
            </div>
        </div>
    );
};

export default MaxPowerCalculator;
