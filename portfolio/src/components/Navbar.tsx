import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(2, 4, 9, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AP<span style={{ color: 'var(--accent-cyan)' }}>.</span>
          </motion.a>

          {/* Desktop nav */}
          <ul style={{ display: 'flex', gap: 4, listStyle: 'none', alignItems: 'center' }}
            className="desktop-nav">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              return (
                <li key={href}>
                  <motion.a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    whileHover={{ color: 'var(--accent-cyan)' }}
                    style={{
                      padding: '8px 16px',
                      fontSize: 14,
                      fontWeight: 500,
                      color: active === id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      borderRadius: 8,
                      transition: 'color 0.2s',
                      position: 'relative',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {active === id && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,212,255,0.08)',
                          borderRadius: 8,
                          border: '1px solid rgba(0,212,255,0.15)',
                        }}
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>

          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="btn-primary desktop-nav"
            whileHover={{ scale: 1.05 }}
            style={{ padding: '10px 24px', fontSize: 13 }}
          >
            Hire Me
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 7 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  background: 'var(--accent-cyan)',
                  borderRadius: 2,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'rgba(2, 4, 9, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-glass)',
              padding: '20px 24px',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      fontSize: 16,
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      borderRadius: 8,
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
};

export default Navbar;
