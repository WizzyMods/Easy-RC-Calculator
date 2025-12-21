import { Zap, Calculator, Gauge, Settings, History, Info, ChevronRight } from 'lucide-react';

const CalculatorCard = ({ title, description, icon: Icon, color, onClick }) => {
    return (
        <div
            className="glass-card"
            style={{
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                border: '1px solid var(--glass-border)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
            onClick={onClick}
        >
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: `${color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color
            }}>
                <Icon size={28} />
            </div>
            <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '600' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{description}</p>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: color }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Explore</span>
                <ChevronRight size={16} />
            </div>
        </div>
    );
};

export default CalculatorCard;
