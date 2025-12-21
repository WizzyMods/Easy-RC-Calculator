import React, { useState } from 'react';
import { ArrowLeft, History, Info } from 'lucide-react';
import { calculateRunTime } from '../utils/calculations';
import SmartInput from '../components/SmartInput';

const RunTimeCalculator = ({ onBack }) => {
    const [capacity, setCapacity] = useState('');
    const [avgCurrent, setAvgCurrent] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        if (capacity && avgCurrent) {
            setResult(calculateRunTime(capacity, avgCurrent));
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
                <div className="glass-card" style={{ padding: '0.75rem', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                    <History size={32} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Run Time</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Estimated Drive Time (Capacity / Avg. Load)</p>
                </div>
            </div>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <SmartInput
                    label="Battery Capacity (mAh)"
                    value={capacity}
                    onChange={setCapacity}
                    placeholder="e.g. 5000"
                    required
                />

                <SmartInput
                    label="Average Current Draw (A)"
                    value={avgCurrent}
                    onChange={setAvgCurrent}
                    placeholder="e.g. 20"
                    step="0.1"
                    required
                />

                <button
                    type="submit"
                    className="glass-card"
                    style={{
                        padding: '1rem',
                        background: '#ec4899',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: '1rem',
                        fontSize: '1rem'
                    }}
                >
                    Calculate Run Time
                </button>
            </form>

            {result && (
                <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem', textAlign: 'center', border: '1px solid #ec4899' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Estimated Drive Time</p>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ec4899' }}>
                        {result} <span style={{ fontSize: '1rem' }}>minutes</span>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <Info size={20} color="#ec4899" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Average current draw depends heavily on driving style. Aggressive driving will significantly reduce this estimate.
                </p>
            </div>
        </div>
    );
};

export default RunTimeCalculator;
