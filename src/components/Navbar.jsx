import React, { useState, useEffect } from 'react';
import { Zap, Languages, Sun, Moon, Palette, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LanguagePopup from './LanguagePopup';
import '../styles/global.css';

const themes = [
  { id: 'default', name: 'Deep Blue', color: '#3b82f6' },
  { id: 'crimson', name: 'Crimson', color: '#ef4444' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'sunset', name: 'Sunset', color: '#f59e0b' },
];

const Navbar = ({ onHome, onAbout, activeView, onSearch, searchValue }) => {
  const [showThemes, setShowThemes] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const { language, t } = useLanguage();
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('rc-theme');
    const validThemes = themes.map(t => t.id);
    return validThemes.includes(saved) ? saved : 'default';
  });
  const [currentMode, setCurrentMode] = useState(() => {
    const saved = localStorage.getItem('rc-mode');
    return ['light', 'dark'].includes(saved) ? saved : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-mode', currentMode);
    localStorage.setItem('rc-theme', currentTheme);
    localStorage.setItem('rc-mode', currentMode);
  }, [currentTheme, currentMode]);

  const applyBlurTransition = (callback) => {
    document.documentElement.classList.add('theme-blur-active');

    // Smoothly wait for peak blur before switching content
    setTimeout(() => {
      callback();
      // Hold the blur for a tiny bit to mask visual jumps
      setTimeout(() => {
        document.documentElement.classList.remove('theme-blur-active');
      }, 150);
    }, 400); // Increased slightly for smoother ramp-up
  };

  const handleThemeSelect = (themeId) => {
    applyBlurTransition(() => {
      setCurrentTheme(themeId);
      setShowThemes(false);
    });
  };

  const handleModeToggle = () => {
    applyBlurTransition(() => {
      setCurrentMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    });
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: 'var(--text-main)',
    fontSize: '0.9rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const getActiveStyle = (view) => ({
    background: activeView === view ? 'rgba(var(--primary-rgb), 0.15)' : 'none',
    borderColor: activeView === view ? 'var(--primary)' : 'var(--glass-border)',
    boxShadow: activeView === view ? '0 0 15px rgba(var(--primary-rgb), 0.2)' : 'none',
    color: activeView === view ? 'var(--primary)' : 'var(--text-main)',
    fontWeight: activeView === view ? '700' : '500',
  });

  const navButtonClass = "glass-card hover-glow";

  return (
    <nav className="glass-nav">
      <div className="container" style={{ minHeight: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', padding: '0.5rem 1rem' }}>
        <div
          onClick={onHome}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
        >
          <div className="glass-card" style={{ padding: '0.3rem', display: 'flex', alignItems: 'center' }}>
            <Zap size={18} color="var(--primary)" />
          </div>
          <h1 className="gradient-text nav-logo-text" style={{ fontSize: '1.1rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Easy RC Calculator</h1>
        </div>

        <div className="nav-search-desktop" style={{ flex: 1, maxWidth: '400px', margin: '0 2rem', position: 'relative' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder={t('navbar.search_placeholder')}
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 1rem 0.6rem 2.8rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'all 0.3s'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            className={`${navButtonClass} nav-link-desktop`}
            style={{ ...buttonStyle, ...getActiveStyle('menu'), padding: '0.5rem 0.75rem' }}
            onClick={onHome}
          >
            {t('navbar.home')}
          </button>
          <button
            className={`${navButtonClass} nav-link-desktop`}
            style={{ ...buttonStyle, ...getActiveStyle('about'), padding: '0.5rem 0.75rem' }}
            onClick={onAbout}
          >
            {t('navbar.about')}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
            <button
              className={navButtonClass}
              onClick={() => {
                setShowThemes(!showThemes);
                if (!showThemes) setShowLanguages(false);
              }}
              style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', color: 'var(--text-main)', cursor: 'pointer' }}
              title="Select Theme"
            >
              <Palette size={18} color="var(--primary)" />
            </button>

            <AnimatePresence>
              {showThemes && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: -20, x: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20, x: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '220px',
                    background: 'var(--bg-main)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '16px',
                    padding: '1rem',
                    zIndex: 100,
                    boxShadow: 'var(--card-shadow)',
                    transformOrigin: 'top right'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('navbar.mode')}</span>
                    <button
                      onClick={handleModeToggle}
                      style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '20px',
                        padding: '4px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {currentMode === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                      {currentMode === 'dark' ? t('navbar.night') : t('navbar.day')}
                    </button>
                  </div>

                  <div style={{ height: '1px', background: 'var(--glass-border)', marginBottom: '1rem' }} />

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'block' }}>{t('navbar.skin')}</span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleThemeSelect(t.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.6rem 0.75rem',
                          background: currentTheme === t.id ? 'var(--primary)' : 'transparent',
                          border: 'none',
                          borderRadius: '10px',
                          color: currentTheme === t.id ? 'white' : 'var(--text-main)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            background: t.color,
                            border: currentTheme === t.id ? '2px solid white' : 'none'
                          }} />
                          <span style={{ fontSize: '0.9rem', fontWeight: currentTheme === t.id ? '600' : '400' }}>{t.name}</span>
                        </div>
                        {currentTheme === t.id && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ position: 'relative' }}>
              <button
                className="glass-card language-btn hover-glow"
                onClick={() => {
                  setShowLanguages(!showLanguages);
                  if (!showLanguages) setShowThemes(false);
                }}
                style={{
                  padding: '0.5rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: 'var(--text-main)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                title={t('navbar.select_language')}
              >
                <Languages size={18} color="var(--primary)" />
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: '"Outfit", sans-serif',
                  opacity: 0.9
                }}>{language.toUpperCase()}</span>
              </button>
              <LanguagePopup isOpen={showLanguages} onClose={() => setShowLanguages(false)} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
