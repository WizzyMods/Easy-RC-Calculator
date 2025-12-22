import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalculatorCard from './components/CalculatorCard';
import BackgroundSymbols from './components/BackgroundSymbols';
import DynamicCalculator from './components/DynamicCalculator';
import About from './components/About';
import * as formulas from './utils/calculations';
import './styles/global.css';
import {
  Zap, Gauge, History, Settings, Battery, Activity,
  RotateCcw, Ruler, Timer, FastForward, Lightbulb,
  Target, Radio, Compass, Thermometer, Wind,
  TrendingUp, Scaling, Weight, Waves, Search,
  Droplet, ShieldCheck, Users
} from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { io } from 'socket.io-client';

const CalculatorPage = ({ calculators, unitSystem, setUnitSystem }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const calcConfig = calculators.find(c => c.id === id);

  if (!calcConfig) {
    return <div className="text-center p-8">Calculator not found</div>;
  }

  return (
    <DynamicCalculator
      config={calcConfig}
      onBack={() => navigate('/')}
      unitSystem={unitSystem}
      setUnitSystem={setUnitSystem}
    />
  );
};

const HomePage = ({ simpleCalculations, advancedCalculations, searchTerm, setSearchTerm, handleNavigate, t, activeUsers }) => {
  const filteredSimple = simpleCalculations.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdvanced = advancedCalculations.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {t('app.welcome_title')} <span className="gradient-text">Easy RC Calculator</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          {t('app.welcome_subtitle')}
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '20px',
          color: '#10b981',
          fontSize: '0.9rem',
          fontWeight: '500'
        }}>
          <Users size={16} />
          <span>{activeUsers}</span>
        </div>
      </header>

      <div className="nav-search-mobile" style={{ marginBottom: '2.5rem', position: 'relative' }}>
        <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem 1rem 0.8rem 2.8rem',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            color: 'var(--text-main)',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      {filteredSimple.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{t('app.essential_tools')}</h3>
            <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)', margin: '0 1.5rem' }}></div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredSimple.map((calc) => (
              <CalculatorCard
                key={calc.id}
                {...calc}
                onClick={() => handleNavigate(calc.id)}
              />
            ))}
          </div>
        </section>
      )}

      {filteredAdvanced.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{t('app.advanced_tools')}</h3>
            <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)', margin: '0 1.5rem' }}></div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredAdvanced.map((calc) => (
              <CalculatorCard
                key={calc.id}
                {...calc}
                onClick={() => handleNavigate(calc.id)}
              />
            ))}
          </div>
        </section>
      )}

      {filteredSimple.length === 0 && filteredAdvanced.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <Search size={48} style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
          <p style={{ fontSize: '1.2rem' }}>{t('app.no_tools_found').replace('{term}', searchTerm)}</p>
        </div>
      )}
    </>
  );
};

const MainApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [unitSystem, setUnitSystem] = useState(() => localStorage.getItem('rc-unit-system') || 'Metric');
  const [activeUsers, setActiveUsers] = useState(0);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('rc-unit-system', unitSystem);
  }, [unitSystem]);

  useEffect(() => {
    // Connect to WebSocket server (via Vite proxy)
    const socket = io({
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
    });

    socket.on('userCount', (count) => {
      setActiveUsers(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Reset search when location changes (optional, but good UX)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const simpleCalculations = [
    {
      id: 'watt', title: t('calculator.tools.watt.title'), description: t('calculator.tools.watt.description'), icon: Zap, color: '#3b82f6', category: t('calculator.categories.electronics'),
      tip: t('calculator.tools.watt.tip'),
      inputs: [{ id: 'v', label: t('calculator.inputs.voltage'), placeholder: '11.1' }, { id: 'a', label: t('calculator.inputs.current'), placeholder: '50' }],
      calculate: formulas.calculateWatt, units: { metric: 'W', imperial: 'W' }
    },
    {
      id: 'rpm', title: t('calculator.tools.rpm.title'), description: t('calculator.tools.rpm.description'), icon: Activity, color: '#8b5cf6', category: t('calculator.categories.motor'),
      tip: t('calculator.tools.rpm.tip'),
      inputs: [{ id: 'kv', label: t('calculator.inputs.motor_kv'), placeholder: '3500' }, { id: 'v', label: t('calculator.inputs.voltage'), placeholder: '11.1' }],
      calculate: formulas.calculateRPM, units: { metric: 'RPM', imperial: 'RPM' }
    },
    {
      id: 'gear', title: t('calculator.tools.gear.title'), description: t('calculator.tools.gear.description'), icon: Settings, color: '#10b981', category: t('calculator.categories.transmission'),
      tip: t('calculator.tools.gear.tip'),
      inputs: [{ id: 's', label: t('calculator.inputs.spur_gear'), placeholder: '54' }, { id: 'p', label: t('calculator.inputs.pinion_gear'), placeholder: '18' }],
      calculate: formulas.calculateGearRatio, units: { metric: ': 1', imperial: ': 1' }
    },
    {
      id: 'safe_amps', title: t('calculator.tools.safe_amps.title'), description: t('calculator.tools.safe_amps.description'), icon: ShieldCheck, color: '#ef4444', category: t('calculator.categories.battery'),
      tip: t('calculator.tools.safe_amps.tip'),
      inputs: [{ id: 'cap', label: t('calculator.inputs.capacity'), placeholder: '5000' }, { id: 'c', label: t('calculator.inputs.c_rating'), placeholder: '50' }],
      calculate: formulas.calculateSafeAmps, units: { metric: 'Amps', imperial: 'Amps' }
    },
    {
      id: 'fdr', title: t('calculator.tools.fdr.title'), description: t('calculator.tools.fdr.description'), icon: RotateCcw, color: '#06b6d4', category: t('calculator.categories.transmission'),
      tip: t('calculator.tools.fdr.tip'),
      inputs: [
        { id: 's', label: t('calculator.inputs.spur_gear'), placeholder: '80' },
        { id: 'p', label: t('calculator.inputs.pinion_gear'), placeholder: '25' },
        { id: 'ir', label: t('calculator.inputs.internal_ratio'), placeholder: '2.6' },
        { id: 'd', label: t('calculator.inputs.tire_diameter'), placeholder: '64', metric: 'mm', imperial: 'in' }
      ],
      calculate: formulas.calculateFDRComplex, units: { metric: ': 1', imperial: ': 1' }
    },
    {
      id: 'rollout', title: t('calculator.tools.rollout.title'), description: t('calculator.tools.rollout.description'), icon: Ruler, color: '#f97316', category: t('calculator.categories.transmission'),
      tip: t('calculator.tools.rollout.tip'),
      inputs: [
        { id: 'd', label: t('calculator.inputs.tire_diameter'), placeholder: '65', metric: 'mm', imperial: 'in' },
        { id: 'ir', label: t('calculator.inputs.internal_ratio'), placeholder: '2.6' },
        { id: 's', label: t('calculator.inputs.spur_gear'), placeholder: '80' },
        { id: 'p', label: t('calculator.inputs.pinion_gear'), placeholder: '25' }
      ],
      calculate: formulas.calculateRolloutComplex, units: { metric: 'mm', imperial: 'in' }
    },
    {
      id: 'charge', title: t('calculator.tools.charge.title'), description: t('calculator.tools.charge.description'), icon: Timer, color: '#10b981', category: t('calculator.categories.battery'),
      tip: t('calculator.tools.charge.tip'),
      inputs: [{ id: 'cap', label: t('calculator.inputs.capacity'), placeholder: '5000' }, { id: 'cur', label: t('calculator.inputs.current'), placeholder: '5' }],
      calculate: formulas.calculateChargeTime, units: { metric: 'min', imperial: 'min' }
    },
    {
      id: 'scalespeed', title: t('calculator.tools.scalespeed.title'), description: t('calculator.tools.scalespeed.description'), icon: Scaling, color: '#6366f1', category: t('calculator.categories.physics'),
      tip: t('calculator.tools.scalespeed.tip'),
      inputs: [{ id: 's', label: t('calculator.inputs.actual_speed'), placeholder: '60', metric: 'km/h', imperial: 'mph' }, { id: 'sc', label: t('calculator.inputs.scale'), placeholder: '10' }],
      calculate: formulas.calculateScaleSpeed, units: { metric: 'km/h', imperial: 'mph' }
    },
    {
      id: 'energy', title: t('calculator.tools.energy.title'), description: t('calculator.tools.energy.description'), icon: Lightbulb, color: '#eab308', category: t('calculator.categories.battery'),
      tip: t('calculator.tools.energy.tip'),
      inputs: [{ id: 'cap', label: t('calculator.inputs.capacity'), placeholder: '5000' }, { id: 'v', label: t('calculator.inputs.voltage'), placeholder: '11.1' }],
      calculate: formulas.calculateBatteryEnergy, units: { metric: 'Wh', imperial: 'Wh' }
    },
    {
      id: 'draw', title: t('calculator.tools.draw.title'), description: t('calculator.tools.draw.description'), icon: FastForward, color: '#ef4444', category: t('calculator.categories.electronics'),
      tip: t('calculator.tools.draw.tip'),
      inputs: [{ id: 'w', label: t('calculator.inputs.power'), placeholder: '500' }, { id: 'v', label: t('calculator.inputs.voltage'), placeholder: '11.1' }],
      calculate: formulas.calculateCurrentDraw, units: { metric: 'A', imperial: 'A' }
    },
    {
      id: 'kv', title: t('calculator.tools.kv.title'), description: t('calculator.tools.kv.description'), icon: Radio, color: '#ec4899', category: t('calculator.categories.motor'),
      tip: t('calculator.tools.kv.tip'),
      inputs: [{ id: 'rpm', label: t('calculator.inputs.measured_rpm'), placeholder: '38000' }, { id: 'v', label: t('calculator.inputs.voltage'), placeholder: '11.1' }],
      calculate: formulas.calculateMotorKV, units: { metric: 'KV', imperial: 'KV' }
    },
    {
      id: 'oil', title: t('calculator.tools.oil.title'), description: t('calculator.tools.oil.description'), icon: Droplet, color: '#0ea5e9', category: t('calculator.categories.chassis'),
      tip: t('calculator.tools.oil.tip'),
      inputs: [{ id: 'wt', label: t('calculator.inputs.shock_wt'), placeholder: '30' }],
      calculate: formulas.calculateShockOil, units: { metric: 'CST', imperial: 'CST' }
    },
  ];

  const advancedCalculations = [
    {
      id: 'speed', title: t('calculator.tools.speed.title'), description: t('calculator.tools.speed.description'), icon: Gauge, color: '#f59e0b', category: t('calculator.categories.performance'),
      tip: t('calculator.tools.speed.tip'),
      inputs: [
        { id: 'rpm', label: t('calculator.inputs.motor_rpm'), placeholder: '35000' },
        { id: 's', label: t('calculator.inputs.spur_gear'), placeholder: '54' },
        { id: 'p', label: t('calculator.inputs.pinion_gear'), placeholder: '18' },
        { id: 't', label: t('calculator.inputs.tire_diameter'), placeholder: '100', metric: 'mm', imperial: 'in' }
      ],
      calculate: formulas.calculateSpeed, units: { metric: 'km/h', imperial: 'mph' }
    },
    {
      id: 'runtime', title: t('calculator.tools.runtime.title'), description: t('calculator.tools.runtime.description'), icon: History, color: '#ec4899', category: t('calculator.categories.battery'),
      tip: t('calculator.tools.runtime.tip'),
      inputs: [{ id: 'cap', label: t('calculator.inputs.capacity'), placeholder: '5000' }, { id: 'cur', label: t('calculator.inputs.avg_current_draw'), placeholder: '30' }],
      calculate: formulas.calculateRunTime, units: { metric: 'min', imperial: 'min' }
    },
    {
      id: 'cg', title: t('calculator.tools.cg.title'), description: t('calculator.tools.cg.description'), icon: Weight, color: '#06b6d4', category: t('calculator.categories.chassis'),
      tip: t('calculator.tools.cg.tip'),
      inputs: [{ id: 'f', label: t('calculator.inputs.front_weight'), placeholder: '800', metric: 'g', imperial: 'oz' }, { id: 't', label: t('calculator.inputs.total_weight'), placeholder: '1500', metric: 'g', imperial: 'oz' }],
      calculate: formulas.calculateCGBalance, units: { metric: '% Front', imperial: '% Front' }
    },
    {
      id: 'corner', title: t('calculator.tools.corner.title'), description: t('calculator.tools.corner.description'), icon: Target, color: '#10b981', category: t('calculator.categories.chassis'),
      tip: t('calculator.tools.corner.tip'),
      inputs: [
        { id: 'fl', label: t('calculator.inputs.front_left'), placeholder: '400', metric: 'g', imperial: 'oz' },
        { id: 'fr', label: t('calculator.inputs.front_right'), placeholder: '400', metric: 'g', imperial: 'oz' },
        { id: 'rl', label: t('calculator.inputs.rear_left'), placeholder: '350', metric: 'g', imperial: 'oz' },
        { id: 'rr', label: t('calculator.inputs.rear_right'), placeholder: '350', metric: 'g', imperial: 'oz' }
      ],
      calculate: formulas.calculateCornerWeightBalance, units: { metric: '% Cross', imperial: '% Cross' }
    },
    {
      id: 'wheel_rate', title: t('calculator.tools.wheel_rate.title'), description: t('calculator.tools.wheel_rate.description'), icon: Activity, color: '#8b5cf6', category: t('calculator.categories.chassis'),
      tip: t('calculator.tools.wheel_rate.tip'),
      inputs: [{ id: 'k', label: t('calculator.inputs.spring_rate'), placeholder: '5.0' }, { id: 'mr', label: t('calculator.inputs.motion_ratio'), placeholder: '0.7' }],
      calculate: formulas.calculateWheelRate, units: { metric: 'Rate', imperial: 'Rate' }
    },
    {
      id: 'turning', title: t('calculator.tools.turning.title'), description: t('calculator.tools.turning.description'), icon: Compass, color: '#6366f1', category: t('calculator.categories.physics'),
      tip: t('calculator.tools.turning.tip'),
      inputs: [{ id: 'wb', label: t('calculator.inputs.wheelbase'), placeholder: '257', metric: 'mm', imperial: 'in' }, { id: 'sa', label: t('calculator.inputs.steering_angle'), placeholder: '25' }],
      calculate: formulas.calculateTurningRadius, units: { metric: 'mm', imperial: 'in' }
    },
    {
      id: 'eff', title: t('calculator.tools.eff.title'), description: t('calculator.tools.eff.description'), icon: TrendingUp, color: '#f97316', category: t('calculator.categories.motor'),
      tip: t('calculator.tools.eff.tip'),
      inputs: [{ id: 'out', label: t('calculator.inputs.output_power'), placeholder: '400' }, { id: 'in', label: t('calculator.inputs.input_power'), placeholder: '500' }],
      calculate: formulas.calculateMotorEfficiency, units: { metric: '%', imperial: '%' }
    },
    {
      id: 'thermal', title: t('calculator.tools.thermal.title'), description: t('calculator.tools.thermal.description'), icon: Thermometer, color: '#ef4444', category: t('calculator.categories.electronics'),
      tip: t('calculator.tools.thermal.tip'),
      inputs: [{ id: 'cur', label: t('calculator.inputs.avg_current'), placeholder: '40' }, { id: 'res', label: t('calculator.inputs.esc_resistance'), placeholder: '0.5' }],
      calculate: formulas.calculateESCThermalLoad, units: { metric: 'W Heat', imperial: 'W Heat' }
    },
    {
      id: 'drag', title: t('calculator.tools.drag.title'), description: t('calculator.tools.drag.description'), icon: Wind, color: '#3b82f6', category: t('calculator.categories.physics'),
      tip: t('calculator.tools.drag.tip'),
      inputs: [
        { id: 'cd', label: t('calculator.inputs.drag_coefficient'), placeholder: '0.35' },
        { id: 'a', label: t('calculator.inputs.frontal_area'), placeholder: '0.05', metric: 'm²', imperial: 'sq ft' },
        { id: 'v', label: t('calculator.inputs.velocity'), placeholder: '100', metric: 'km/h', imperial: 'mph' }
      ],
      calculate: formulas.calculateDragForce, units: { metric: 'N', imperial: 'lbf' }
    },
    {
      id: 'transfer', title: t('calculator.tools.transfer.title'), description: t('calculator.tools.transfer.description'), icon: Waves, color: '#8b5cf6', category: t('calculator.categories.chassis'),
      tip: t('calculator.tools.transfer.tip'),
      inputs: [
        { id: 'w', label: t('calculator.inputs.total_weight'), placeholder: '1500', metric: 'g', imperial: 'oz' },
        { id: 'h', label: t('calculator.inputs.cg_height'), placeholder: '35', metric: 'mm', imperial: 'in' },
        { id: 'wb', label: t('calculator.inputs.wheelbase'), placeholder: '257', metric: 'mm', imperial: 'in' },
        { id: 'a', label: t('calculator.inputs.acceleration'), placeholder: '1.2' }
      ],
      calculate: formulas.calculateWeightTransfer, units: { metric: 'g', imperial: 'oz' }
    },
    {
      id: 'torque', title: t('calculator.tools.torque.title'), description: t('calculator.tools.torque.description'), icon: FastForward, color: '#eab308', category: t('calculator.categories.motor'),
      tip: t('calculator.tools.torque.tip'),
      inputs: [{ id: 'w', label: t('calculator.inputs.power'), placeholder: '600' }, { id: 'rpm', label: t('calculator.inputs.motor_rpm'), placeholder: '30000' }],
      calculate: formulas.calculateTorque, units: { metric: 'Nm', imperial: 'oz-in' }
    },
  ];

  const handleNavigate = (path) => {
    if (path === 'menu') {
      navigate('/');
    } else if (path === 'about') {
      navigate('/about');
    } else {
      navigate(`/calculators/${path}`);
    }
    setSearchTerm('');
  };

  const activeView = location.pathname === '/' ? 'menu' : location.pathname === '/about' ? 'about' : 'calculator';

  return (
    <div className="app-container">
      <div className="theme-blur-overlay" />
      <BackgroundSymbols />
      <Navbar
        onHome={() => navigate('/')}
        onAbout={() => navigate('/about')}
        activeView={activeView}
        onSearch={setSearchTerm}
        searchValue={searchTerm}
      />

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <Routes>
          <Route path="/" element={
            <HomePage
              simpleCalculations={simpleCalculations}
              advancedCalculations={advancedCalculations}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleNavigate={handleNavigate}
              t={t}
              activeUsers={activeUsers}
            />
          } />
          <Route path="/about" element={<About onBack={() => navigate('/')} />} />
          <Route path="/calculators/:id" element={
            <CalculatorPage
              calculators={[...simpleCalculations, ...advancedCalculations]}
              unitSystem={unitSystem}
              setUnitSystem={setUnitSystem}
            />
          } />
        </Routes>
      </main>

      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '2rem 0', marginTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>{t('app.footer_text')}</p>
        </div>
      </footer>
    </div>
  );
}

import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <LanguageProvider>
    <ErrorBoundary>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </ErrorBoundary>
  </LanguageProvider>
);

export default App;
