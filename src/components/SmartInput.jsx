import React, { useState } from 'react';
import { Copy, Check, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SmartInput = ({ label, value, onChange, placeholder, type = "number", step = "1", required = false, unit = "" }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const adjustValue = (delta) => {
    const current = parseFloat(value) || 0;
    const s = parseFloat(step) || 1;
    const newValue = (current + delta * s).toFixed(s < 1 ? 1 : 0);
    onChange(newValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
        {value && (
          <button
            type="button"
            onClick={handleCopy}
            style={{
              background: 'none',
              border: 'none',
              color: copied ? '#10b981' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: '600',
              padding: '2px 4px',
              transition: 'all 0.2s',
              opacity: 0.7
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
            title="Copy to clipboard"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={copied ? 'check' : 'copy'}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? t('calculator.copied') : t('calculator.copy')}</span>
              </motion.div>
            </AnimatePresence>
          </button>
        )}
      </div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          overflow: 'hidden'
        }}>
          <button
            type="button"
            onClick={() => adjustValue(-1)}
            style={{
              position: 'absolute',
              left: '0.5rem',
              height: '2.5rem',
              width: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '8px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              zIndex: 3,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <Minus size={16} />
          </button>

          <input
            type={type}
            step={step}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="glass-card"
            style={{
              padding: '1.2rem',
              paddingLeft: '4rem',
              paddingRight: unit ? '5.5rem' : '4rem',
              background: 'rgba(255,255,255,0.03)',
              color: 'var(--text-main)',
              outline: 'none',
              width: '100%',
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: '500',
              border: '1px solid var(--glass-border)'
            }}
            required={required}
          />

          <div style={{
            position: 'absolute',
            right: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            zIndex: 3
          }}>
            {unit && (
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginRight: '0.5rem', fontWeight: 'bold' }}>{unit}</span>
            )}
            <button
              type="button"
              onClick={() => adjustValue(1)}
              style={{
                height: '2.5rem',
                width: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: '8px',
                color: 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              <Plus size={16} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartInput;
