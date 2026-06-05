import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, ChevronDown, ExternalLink } from 'lucide-react';

const EXPERIENCES = [
  {
    id: 'mythics',
    role: 'Senior Data Analyst',
    company: 'Mythics',
    location: 'Atlanta, GA',
    period: 'Mar 2024 – Present',
    type: 'Full-time',
    color: '#00d4ff',
    logo: 'M',
    highlights: [
      'Analyzed order-to-cash and fulfillment data across 1,000+ locations, reducing order failures by 13% via SQL & Python anomaly detection.',
      'Built and maintained 10+ real-time Tableau dashboards tracking fulfillment rates, transaction flow, and operational KPIs — enabling 9% faster stakeholder decisions.',
      'Developed automated monitoring and alerting workflows detecting supply and order disruptions, saving 120 hours per quarter.',
      'Designed and analyzed A/B tests to evaluate operational initiatives, improving fulfillment reliability by 6%.',
      'Leveraged Claude Code and Codex to automate analytics workflows and improve reporting efficiency by 11%.',
      'Led experimentation initiatives: defining success metrics, analyzing statistical significance, and translating results into actionable product recommendations.',
    ],
    tags: ['SQL', 'Python', 'Tableau', 'A/B Testing', 'Anomaly Detection', 'Claude Code'],
  },
  {
    id: 'aws',
    role: 'Software Development Engineer (Data)',
    company: 'Amazon Web Services',
    location: 'Atlanta, GA',
    period: 'Sep 2022 – Mar 2024',
    type: 'Full-time',
    color: '#f59e0b',
    logo: 'A',
    highlights: [
      'Designed and deployed internal data pipeline and monitoring system tracking operational performance across regions for 8 cross-functional teams, reducing disruptions by 7%.',
      'Engineered automated data quality controls using Python, AWS Glue, and Lambda in CI/CD pipelines — reducing operational failures by 14%.',
      'Conducted exploratory analysis on large-scale service usage data, uncovering behavioral trends and informing product improvements.',
      'Designed and maintained 20+ Python and SQL-based data processing and reporting workflows, improving data availability and decision-making speed.',
    ],
    tags: ['Python', 'AWS Glue', 'Lambda', 'CI/CD', 'Redshift', 'SQL'],
  },
  {
    id: 'infosys',
    role: 'Systems Engineer',
    company: 'Infosys Limited',
    location: 'Remote',
    period: 'Jan 2022 – Sep 2022',
    type: 'Full-time',
    color: '#3b82f6',
    logo: 'I',
    highlights: [
      'Built 10 Power BI dashboards tracking operational KPIs, fulfillment trends, and system performance — reducing manual analysis effort by 19%.',
      'Performed quantitative analysis on 500K+ records to identify usage trends, define performance metrics, and recommend data-driven improvements.',
    ],
    tags: ['Power BI', 'SQL', 'Python', 'Data Analysis', 'KPI Reporting'],
  },
  {
    id: 'terminal',
    role: 'Software Engineer',
    company: 'Terminal Trend',
    location: 'Ahmedabad, India',
    period: 'Jan 2019 – Dec 2019',
    type: 'Full-time',
    color: '#10b981',
    logo: 'T',
    highlights: [
      'Developed analytics services supporting product usage tracking and user engagement measurement, enabling data collection for downstream product insight generation.',
    ],
    tags: ['Analytics', 'Product Tracking', 'Data Engineering'],
  },
];

const EDUCATION = [
  {
    degree: 'M.S. Computer Science',
    school: 'University of Texas at Arlington',
    period: 'Graduate',
    color: '#7c3aed',
  },
  {
    degree: 'B.E. Computer Engineering',
    school: 'Gujarat Technological University',
    period: 'Undergraduate',
    color: '#00d4ff',
  },
];

const ExperienceCard: React.FC<{ exp: typeof EXPERIENCES[0]; index: number; inView: boolean }> = ({ exp, index, inView }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ position: 'relative', paddingLeft: 40, marginBottom: 8 }}
    >
      {/* Timeline line */}
      <div style={{
        position: 'absolute', left: 15, top: 28, bottom: -8,
        width: 1, background: 'var(--border-glass)',
      }} />
      {/* Timeline dot */}
      <div style={{
        position: 'absolute', left: 10, top: 24,
        width: 10, height: 10, borderRadius: '50%',
        background: exp.color,
        boxShadow: `0 0 12px ${exp.color}60`,
        border: `2px solid ${exp.color}`,
        zIndex: 1,
      }} />

      <motion.div
        className="glass-card"
        whileHover={{ borderColor: exp.color + '30' }}
        style={{
          padding: '24px 28px',
          transition: 'all 0.3s',
          borderColor: open ? exp.color + '25' : 'var(--border-glass)',
        }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}
          onClick={() => setOpen(!open)}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: exp.color + '15',
              border: `1px solid ${exp.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: exp.color, fontSize: 18, fontWeight: 800,
              fontFamily: "'Syne', sans-serif",
              flexShrink: 0,
            }}>
              {exp.logo}
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                {exp.role}
              </h3>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, color: exp.color, fontWeight: 600 }}>{exp.company}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{exp.location}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}>
              {exp.period}
            </span>
            <motion.div animate={{ rotate: open ? 180 : 0 }} style={{ color: 'var(--text-muted)' }}>
              <ChevronDown size={16} />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-glass)' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: exp.color, flexShrink: 0, marginTop: 7,
                      }} />
                      <span style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{h}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {exp.tags.map((t) => (
                    <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="experience" className="section" ref={ref} style={{ position: 'relative', zIndex: 2 }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title">Career Timeline</h2>
          <p className="section-subtitle">
            5 years of progressive growth — from software engineering to leading
            data analytics at enterprise scale.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 60, alignItems: 'start' }}>
          {/* Timeline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <Briefcase size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-muted)', letterSpacing: 2 }}>
                WORK EXPERIENCE
              </span>
            </div>
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} inView={inView} />
            ))}
          </div>

          {/* Sidebar: education + resume */}
          <div style={{ position: 'sticky', top: 100 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <GraduationCap size={16} style={{ color: 'var(--accent-purple)' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-muted)', letterSpacing: 2 }}>
                  EDUCATION
                </span>
              </div>

              {EDUCATION.map((edu) => (
                <div
                  key={edu.degree}
                  className="glass-card"
                  style={{ padding: '20px 24px', marginBottom: 12, borderColor: edu.color + '20' }}
                >
                  <div style={{ fontSize: 11, color: edu.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
                    {edu.period}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{edu.degree}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{edu.school}</div>
                </div>
              ))}

              <div style={{ marginTop: 32 }}>
                <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(0,212,255,0.15)' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>
                    // resume.pdf
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.7 }}>
                    Download my full resume with detailed work history and accomplishments.
                  </p>
                  <a
                    href="/Alay_Parikh_Sr_DataAnalyst.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '11px 20px' }}
                  >
                    <ExternalLink size={14} /> Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #experience .container > div:last-child > div { grid-template-columns: 1fr !important; }
          #experience .container > div:last-child > div > div:last-child { position: relative !important; top: 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
