import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

const ROLES = [
  'Senior Data Analyst',
  'Analytics Engineer',
  'Data Pipeline Architect',
  'AI & ML Practitioner',
  'Dashboard Strategist',
];

const STATS = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'ETL Pipelines Built' },
  { value: 13, suffix: '%', label: 'Order Failure Reduction' },
  { value: 120, suffix: 'h', label: 'Saved Per Quarter' },
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = ROLES[roleIndex];
    if (isTyping) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 70);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 40);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((r) => (r + 1) % ROLES.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, roleIndex]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0', position: 'relative' }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', top: '30%', right: '-10%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 1,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
            >
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)',
                boxShadow: '0 0 12px var(--accent-green)',
                animation: 'pulse 2s infinite',
              }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--text-secondary)', letterSpacing: 2 }}>
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(42px, 7vw, 80px)',
                fontWeight: 900,
                lineHeight: 1.0,
                marginBottom: 8,
                color: 'var(--text-primary)',
              }}
            >
              Alay
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(42px, 7vw, 80px)',
                fontWeight: 900,
                lineHeight: 1.0,
                marginBottom: 20,
                background: 'linear-gradient(135deg, #00d4ff 0%, #3b82f6 50%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Parikh
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ height: 48, marginBottom: 24, display: 'flex', alignItems: 'center' }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(16px, 2.5vw, 22px)',
                color: 'var(--accent-cyan)',
                fontWeight: 500,
              }}>
                {displayText}
                <span style={{
                  display: 'inline-block', width: 2, height: '1.1em',
                  background: 'var(--accent-cyan)', marginLeft: 3,
                  verticalAlign: 'middle',
                  animation: 'blink 1s steps(1) infinite',
                }} />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                fontSize: 17, color: 'var(--text-secondary)', maxWidth: 520,
                lineHeight: 1.8, marginBottom: 40,
              }}
            >
              Analytical engineer with 5 years turning complex data into business decisions.
              Building ETL pipelines, AI-driven dashboards, and actionable insights at scale
              using SQL, Python, Spark, and the full modern data stack.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}
            >
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
                <Mail size={16} /> Get in Touch
              </a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-outline">
                <GithubIcon size={16} /> View Projects
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{ display: 'flex', gap: 20 }}
            >
              {[
                { icon: <GithubIcon size={20} />, href: 'https://github.com/alayparikh', label: 'GitHub' },
                { icon: <LinkedinIcon size={20} />, href: 'https://linkedin.com/in/alayparikh', label: 'LinkedIn' },
                { icon: <Mail size={20} />, href: 'mailto:alayparikh98@gmail.com', label: 'Email' },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: 'var(--accent-cyan)' }}
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    border: '1px solid var(--border-glass)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s',
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(10px)',
                  }}
                  aria-label={label}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glass-card"
            style={{
              padding: 32,
              minWidth: 260,
              background: 'rgba(13,17,23,0.6)',
              border: '1px solid rgba(0,212,255,0.12)',
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: 2, marginBottom: 24 }}>
              // career_metrics.json
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {STATS.map(({ value, suffix, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 32,
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: 6,
                  }}>
                    {value}{suffix}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-glass)' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
                tech_stack[]
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Python', 'SQL', 'Spark', 'AWS', 'Tableau', 'Airflow'].map((tech) => (
                  <span key={tech} className="tag" style={{ fontSize: 10 }}>{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToAbout}
          style={{
            position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
            background: 'none', border: 'none', color: 'var(--text-muted)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2,
          }}
        >
          <span>SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 900px) {
          #home .container > div { grid-template-columns: 1fr !important; }
          #home .container > div > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
