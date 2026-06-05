import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

const CONTACT_ITEMS = [
  { icon: <Mail size={18} />, label: 'Email', value: 'alayparikh98@gmail.com', href: 'mailto:alayparikh98@gmail.com', color: '#00d4ff' },
  { icon: <Phone size={18} />, label: 'Phone', value: '+1 (408) 483-1223', href: 'tel:+14084831223', color: '#7c3aed' },
  { icon: <MapPin size={18} />, label: 'Location', value: 'Atlanta, GA', href: null, color: '#10b981' },
];

const SOCIAL_LINKS = [
  { icon: <GithubIcon size={20} />, href: 'https://github.com/alayparikh', label: 'GitHub' },
  { icon: <LinkedinIcon size={20} />, href: 'https://linkedin.com/in/alayparikh', label: 'LinkedIn' },
  { icon: <Mail size={20} />, href: 'mailto:alayparikh98@gmail.com', label: 'Email' },
];

type FormState = { name: string; email: string; subject: string; message: string };
type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Using mailto fallback (Formspree or EmailJS can be added later)
    const mailtoLink = `mailto:alayparikh98@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailtoLink, '_blank');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-glass)',
    borderRadius: 10,
    color: 'var(--text-primary)',
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <section id="contact" className="section" ref={ref} style={{ position: 'relative', zIndex: 2 }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(124,58,237,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Contact</span>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Let's Work Together</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Whether you have a data challenge, want to discuss analytics strategy,
            or just say hello — my inbox is always open.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'start' }}>
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
                Available for new opportunities
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                I'm currently open to senior data analyst, analytics engineering, and
                data science roles. I bring deep expertise in Python, SQL, cloud platforms,
                and turning ambiguous data into clear decisions.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              {CONTACT_ITEMS.map(({ icon, label, value, href, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: color + '10',
                    border: `1px solid ${color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: color, flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
                    {href ? (
                      <a href={href} style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</a>
                    ) : (
                      <span style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <div style={{ display: 'flex', gap: 12 }}>
                {SOCIAL_LINKS.map(({ icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
                    style={{
                      width: 46, height: 46, borderRadius: '50%',
                      border: '1px solid var(--border-glass)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-glass)',
                      transition: 'all 0.3s',
                    }}
                    aria-label={label}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card"
            style={{ padding: '36px 36px', border: '1px solid rgba(0,212,255,0.1)' }}
          >
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle size={48} style={{ color: 'var(--accent-green)', marginBottom: 16 }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Message opened!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Your email client should have opened. Looking forward to connecting!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.05)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border-glass)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.05)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border-glass)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.05)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-glass)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.05)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-glass)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  <Send size={15} />
                  {status === 'sending' ? 'Opening...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
