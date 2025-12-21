import React, { useState } from 'react';
import { ArrowLeft, Gauge, Info } from 'lucide-react';
import { calculateSpeed } from '../utils/calculations';
import SmartInput from '../components/SmartInput';

const SpeedCalculator = ({ onBack }) => {
    const [rpm, setRpm] = useState('');
    const [gearRatio, setGearRatio] = useState('');
    const [tireDiameter, setTireDiameter] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        if (rpm && gearRatio && tireDiameter) {
            setResult(calculateSpeed(rpm, gearRatio, tireDiameter));
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
                <div className="glass-card" style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                    <Gauge size={32} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Velocity/Speed</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Speed = (RPM / Ratio) × Tire Circ. × Units</p>
                </div>
            </div>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <SmartInput
                    label="Motor RPM (at load)"
                    value={rpm}
                    onChange={setRpm}
                    placeholder="e.g. 30000"
                    required
                />

                <SmartInput
                    label="Total Gear Ratio"
                    value={gearRatio}
                    onChange={setGearRatio}
                    placeholder="e.g. 3.5"
                    step="0.01"
                    required
                />

                <SmartInput
                    label="Tire Diameter (mm)"
                    value={tireDiameter}
                    onChange={setTireDiameter}
                    placeholder="e.g. 100"
                    required
                />

                <button
                    type="submit"
                    className="glass-card"
                    style={{
                        padding: '1rem',
                        background: '#f59e0b',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: '1rem',
                        fontSize: '1rem'
                    }}
                >
                    Calculate Speed
                </button>
            </form>

            {result && (
                <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem', textAlign: 'center', border: '1px solid #f59e0b' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Estimated Top Speed</p>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                        {result} <span style={{ fontSize: '1rem' }}>km/h</span>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <Info size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Calculations are theoretical. Drag, weight, and rolling resistance will impact the actual speed.
                </p>
            </div>
        </div>
    );
};

export default SpeedCalculator;
