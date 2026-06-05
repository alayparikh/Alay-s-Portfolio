import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Footer: React.FC = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{
      position: 'relative',
      zIndex: 2,
      padding: '40px 0 28px',
      borderTop: '1px solid var(--border-glass)',
      background: 'rgba(2,4,9,0.6)',
      backdropFilter: 'blur(10px)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            AP.
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Alay Parikh — Senior Data Analyst, Atlanta GA
          </span>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {[
            { icon: <GithubIcon size={16} />, href: 'https://github.com/alayparikh', label: 'GitHub' },
            { icon: <LinkedinIcon size={16} />, href: 'https://linkedin.com/in/alayparikh', label: 'LinkedIn' },
            { icon: <Mail size={16} />, href: 'mailto:alayparikh98@gmail.com', label: 'Email' },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: 'var(--accent-cyan)', y: -2 }}
              style={{ color: 'var(--text-muted)', transition: 'all 0.2s' }}
              aria-label={label}
            >
              {icon}
            </motion.a>
          ))}

          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -3, borderColor: 'var(--accent-cyan)' }}
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-glass)',
              color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: 8,
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>

      <div className="container" style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
          Built with React, Framer Motion & TypeScript · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
