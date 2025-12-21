import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, Info, Lightbulb, Share2, Save, Activity, ChevronRight, Zap } from 'lucide-react';
import SmartInput from './SmartInput';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const DynamicCalculator = ({ config, onBack, unitSystem, setUnitSystem }) => {
    const { t } = useLanguage();
    const [copiedId, setCopiedId] = useState(null); // null, 'main', or index
    const [inputs, setInputs] = useState(
        config.inputs.reduce((acc, curr) => ({ ...acc, [curr.id]: '' }), {})
    );

    // Unit Conversion Helpers
    const conversions = {
        toMetric: {
            in: (v) => v * 25.4,
            oz: (v) => v * 28.35,
            mph: (v) => v * 1.60934,
            'sq ft': (v) => v * 0.0929
        },
        toImperial: {
            mm: (v) => v / 25.4,
            g: (v) => v / 28.35,
            kmh: (v) => v / 1.60934,
            m2: (v) => v / 0.0929
        }
    };

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleInputChange = (id, value) => {
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const calculateResult = () => {
        // Collect all input values, converting to Metric if strictly needed for the internal formulas
        const values = config.inputs.map(input => {
            const val = parseFloat(inputs[input.id]) || 0;
            if (unitSystem === 'Imperial' && input.imperial) {
                // If it's a specific unit like 'in' or 'oz', convert to 'mm' or 'g' for the formula
                if (input.imperial === 'in') return conversions.toMetric.in(val);
                if (input.imperial === 'oz') return conversions.toMetric.oz(val);
                // Add more as needed
            }
            return val;
        });

        const rawResult = config.calculate(...values);

        // If result is an object (complex), handle main + secondary
        // If result is a string (simple), convert if needed
        if (typeof rawResult === 'object') {
            return {
                main: rawResult.main,
                secondary: rawResult.secondary.map(s => {
                    // Convert secondary result units if needed
                    let val = s.value;
                    let unit = s.unit;
                    if (unitSystem === 'Imperial') {
                        if (s.unit === 'mm') { val = conversions.toImperial.mm(parseFloat(s.value)).toFixed(2); unit = 'in'; }
                        if (s.unit === 'g') { val = conversions.toImperial.g(parseFloat(s.value)).toFixed(1); unit = 'oz'; }
                    }
                    return { ...s, value: val, unit: unit };
                })
            };
        }

        // Handle simple conversion for the main result
        let finalMain = rawResult;
        let finalUnit = unitSystem === 'Metric' ? config?.units?.metric : config?.units?.imperial;

        if (unitSystem === 'Imperial' && config.units.metric !== config.units.imperial) {
            const val = parseFloat(rawResult);
            if (config.units.metric === 'km/h') finalMain = conversions.toImperial.kmh(val).toFixed(2);
            if (config.units.metric === 'mm') finalMain = conversions.toImperial.mm(val).toFixed(2);
            if (config.units.metric === 'g') finalMain = conversions.toImperial.g(val).toFixed(1);
        }

        return { main: finalMain, secondary: [] };
    };

    const result = calculateResult();

    return (
        <div className="calculator-dashboard" style={{ maxWidth: '1200px', margin: '0 auto', color: 'var(--text-main)' }}>
            {/* Header & Breadcrumbs */}
            <header style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <span style={{ cursor: 'pointer' }} onClick={onBack}>{t('calculator.back')}</span>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--primary)', fontWeight: '500' }}>{config.category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{config.title}</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px' }}>{config.description}</p>
                    </div>

                    {/* Metric/Imperial Toggle */}
                    <div className="glass-card" style={{ padding: '4px', display: 'flex', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)' }}>
                        {['Metric', 'Imperial'].map((sys) => (
                            <button
                                key={sys}
                                onClick={() => setUnitSystem(sys)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    background: unitSystem === sys ? 'var(--primary)' : 'transparent',
                                    color: unitSystem === sys ? 'white' : 'var(--text-muted)',
                                    boxShadow: unitSystem === sys ? '0 4px 12px rgba(var(--primary-rgb), 0.3)' : 'none'
                                }}
                            >
                                {sys === 'Metric' ? 'Metric' : 'Imperial'}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {/* Left Column: Inputs */}
                <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Activity size={20} color="var(--primary)" />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('calculator.input_values')}</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(max(150px, 45%), 1fr))', gap: '1rem' }}>
                        {config.inputs.map((input) => (
                            <div key={input.id} style={{ gridColumn: config.inputs.length > 3 ? 'auto' : 'span 2' }}>
                                <SmartInput
                                    label={input.label}
                                    placeholder={input.placeholder}
                                    value={inputs[input.id]}
                                    unit={unitSystem === 'Metric' ? (input.metric || '') : (input.imperial || '')}
                                    onChange={(val) => handleInputChange(input.id, val)}
                                />
                            </div>
                        ))}
                    </div>

                </div>

                {/* Right Column: Results */}
                <div className="glass-card" style={{ padding: '2.5rem', background: 'rgba(var(--primary-rgb), 0.05)', border: '1px solid rgba(var(--primary-rgb), 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <Info size={20} color="var(--primary)" />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('calculator.results')}</h3>
                    </div>

                    <div className="glass-card" style={{
                        padding: '2.5rem',
                        textAlign: 'center',
                        marginBottom: '2rem',
                        background: `linear-gradient(135deg, ${config.color}15, transparent)`,
                        border: `1px solid ${config.color}33`,
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.1em' }}>
                            {config?.title?.split('(')[0]}
                        </p>
                        <button
                            onClick={() => handleCopy(result.main, 'main')}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                cursor: 'pointer',
                                color: copiedId === 'main' ? '#10b981' : 'var(--text-muted)',
                                transition: 'all 0.2s'
                            }}
                            className="hover-glow"
                            title={t('calculator.copy')}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={copiedId === 'main' ? 'check' : 'copy'}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {copiedId === 'main' ? <Check size={14} /> : <Copy size={14} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>

                        <div style={{ fontSize: '4.5rem', fontWeight: '900', color: config.color, lineHeight: 1 }}>
                            {result.main}
                            <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                {unitSystem === 'Metric' ? config?.units?.metric : config?.units?.imperial}
                            </span>
                        </div>

                    </div>

                    {/* Secondary Results Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        {result.secondary.map((sec, idx) => (
                            <div key={idx} className="glass-card" style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                                <button
                                    onClick={() => handleCopy(sec.value, idx)}
                                    style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: copiedId === idx ? '#10b981' : 'var(--text-muted)',
                                        opacity: copiedId === idx ? 1 : 0.5
                                    }}
                                    title={t('calculator.copy')}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={copiedId === idx ? 'check' : 'copy'}
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {copiedId === idx ? <Check size={12} /> : <Copy size={12} />}
                                        </motion.div>
                                    </AnimatePresence>
                                </button>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', paddingRight: '1rem' }}>{sec.label} ({sec.unit})</p>
                                <p style={{ fontSize: '1.4rem', fontWeight: '800' }}>{sec.value}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Tip Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{
                    marginTop: '2rem',
                    padding: '2rem',
                    border: '1px dashed var(--primary)44',
                    background: 'rgba(var(--primary-rgb), 0.03)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem'
                }}
            >
                <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lightbulb size={24} color="var(--primary)" />
                </div>
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('calculator.tip')}</h4>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{config.tip}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default DynamicCalculator;
