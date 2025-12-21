import React, { useState } from 'react';
import { ArrowLeft, Activity, Info } from 'lucide-react';
import { calculateRPM } from '../utils/calculations';
import SmartInput from '../components/SmartInput';

const RPMCalculator = ({ onBack }) => {
    const [kv, setKv] = useState('');
    const [voltage, setVoltage] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        if (kv && voltage) {
            setResult(calculateRPM(kv, voltage));
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
                <div className="glass-card" style={{ padding: '0.75rem', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                    <Activity size={32} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>RPM Calculation</h2>
                    <p style={{ color: 'var(--text-muted)' }}>RPM = Motor KV × Voltage (V)</p>
                </div>
            </div>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <SmartInput
                    label="Motor KV Rating"
                    value={kv}
                    onChange={setKv}
                    placeholder="e.g. 3500"
                    required
                />

                <SmartInput
                    label="Battery Voltage (V)"
                    value={voltage}
                    onChange={setVoltage}
                    placeholder="e.g. 7.4"
                    step="0.1"
                    required
                />

                <button
                    type="submit"
                    className="glass-card"
                    style={{
                        padding: '1rem',
                        background: '#8b5cf6',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: '1rem',
                        fontSize: '1rem'
                    }}
                >
                    Calculate RPM
                </button>
            </form>

            {result && (
                <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem', textAlign: 'center', border: '1px solid #8b5cf6' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Estimated Motor Speed</p>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                        {Number(result).toLocaleString()} <span style={{ fontSize: '1rem' }}>RPM</span>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <Info size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    This calculates the theoretical maximum RPM of the motor with no load. Actual RPM under load will be approximately 10-15% lower.
                </p>
            </div>
        </div>
    );
};

export default RPMCalculator;
