import React from 'react';
import { motion } from 'framer-motion';
import { Info, ShieldCheck, Zap, Heart, Cpu, Gauge, Scaling, Weight } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const About = ({ onBack }) => {
    const { t } = useLanguage();
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="glass-card"
            style={{
                padding: '3rem',
                maxWidth: '900px',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Decorative gradient blur */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                opacity: 0.1,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <Info size={40} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        {t('about.title')}
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '0 auto', borderRadius: '2px' }} />
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    <motion.section variants={itemVariants}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Zap size={24} color="var(--primary)" />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{t('about.mission_title')}</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            {t('about.mission_desc')}
                        </p>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <ShieldCheck size={24} color="var(--primary)" />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{t('about.precision_title')}</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            {t('about.precision_desc')}
                        </p>
                    </motion.section>
                </div>

                <motion.div variants={itemVariants} style={{ marginTop: '4rem', padding: '2rem', background: 'var(--glass-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Cpu size={20} color="var(--primary)" />
                        {t('about.capabilities_title')}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: Gauge, text: 'Performance Prediction' },
                            { icon: Cpu, text: 'Electronic Load Analysis' },
                            { icon: Scaling, text: 'Scale Realism Tools' },
                            { icon: Weight, text: 'Chassis Balance Tuning' }
                        ].map((feature, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
                                <feature.icon size={16} color="var(--primary)" />
                                <span style={{ fontSize: '0.95rem' }}>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <footer style={{ marginTop: '5rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '3rem' }}>
                    <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        Built with <Heart size={16} color="#ef4444" fill="#ef4444" /> for the RC Community
                    </p>
                    <button
                        onClick={onBack}
                        className="glass-card hover-glow"
                        style={{
                            marginTop: '2rem',
                            padding: '0.8rem 2.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        {t('about.back_to_tools')}
                    </button>
                </footer>
            </div>
        </motion.div>
    );
};

export default About;
