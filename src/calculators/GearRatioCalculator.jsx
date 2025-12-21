import React, { useState } from 'react';
import { ArrowLeft, Settings, Info } from 'lucide-react';
import { calculateGearRatio } from '../utils/calculations';
import SmartInput from '../components/SmartInput';

const GearRatioCalculator = ({ onBack }) => {
    const [spur, setSpur] = useState('');
    const [pinion, setPinion] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        if (spur && pinion) {
            setResult(calculateGearRatio(spur, pinion));
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
                <div className="glass-card" style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                    <Settings size={32} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Gear Ratio</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Ratio = Spur Gear (Teeth) / Pinion Gear (Teeth)</p>
                </div>
            </div>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <SmartInput
                    label="Spur Gear (Teeth)"
                    value={spur}
                    onChange={setSpur}
                    placeholder="e.g. 54"
                    required
                />

                <SmartInput
                    label="Pinion Gear (Teeth)"
                    value={pinion}
                    onChange={setPinion}
                    placeholder="e.g. 15"
                    required
                />

                <button
                    type="submit"
                    className="glass-card"
                    style={{
                        padding: '1rem',
                        background: '#10b981',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: '1rem',
                        fontSize: '1rem'
                    }}
                >
                    Calculate Ratio
                </button>
            </form>

            {result && (
                <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem', textAlign: 'center', border: '1px solid #10b981' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Final Drive Ratio</p>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>
                        {result} <span style={{ fontSize: '1rem' }}>: 1</span>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <Info size={20} color="#10b981" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Higher ratios provide more torque and acceleration but lower top speed. Lower ratios provide higher top speed but less low-end punch.
                </p>
            </div>
        </div>
    );
};

export default GearRatioCalculator;
