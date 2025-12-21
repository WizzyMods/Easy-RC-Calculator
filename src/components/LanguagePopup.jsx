import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Check, Search } from 'lucide-react';

const LanguagePopup = ({ isOpen, onClose }) => {
    const { language, setLanguage, supportedLanguages, t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLanguages = supportedLanguages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: -20, x: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -20, x: 50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{
                        position: 'absolute',
                        top: '120%',
                        right: 0,
                        width: '280px',
                        background: 'var(--bg-main)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '16px',
                        padding: '1rem',
                        zIndex: 100,
                        boxShadow: 'var(--card-shadow)',
                        transformOrigin: 'top right',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem',
                        maxHeight: '400px',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'var(--glass-bg)',
                            borderRadius: '8px',
                            padding: '0.5rem',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <Search size={14} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder={t('navbar.search_placeholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-main)',
                                    fontSize: '0.9rem',
                                    width: '100%',
                                    outline: 'none'
                                }}
                                autoFocus
                            />
                        </div>
                    </div>

                    <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingRight: '4px' }}>
                        {filteredLanguages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    onClose();
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0.6rem 0.75rem',
                                    background: language === lang.code ? 'var(--primary)' : 'transparent',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: language === lang.code ? 'white' : 'var(--text-main)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'left'
                                }}
                                className="hover-glow"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: language === lang.code ? '600' : '500' }}>
                                            {lang.code.toUpperCase()}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{lang.name}</span>
                                    </div>
                                </div>
                                {language === lang.code && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LanguagePopup;
