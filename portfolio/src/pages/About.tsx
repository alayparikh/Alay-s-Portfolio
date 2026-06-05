import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, BarChart2, Cpu, Layers, GitBranch, TrendingUp } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: <Database size={22} />,
    title: 'Data Engineering',
    desc: 'ETL pipelines, AWS Glue, Airflow, Databricks — processing millions of records daily.',
    color: '#00d4ff',
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Analytics & BI',
    desc: 'Tableau & Power BI dashboards trusted by 8+ cross-functional teams for real-time decisions.',
    color: '#3b82f6',
  },
  {
    icon: <Cpu size={22} />,
    title: 'AI & ML',
    desc: 'LLM fine-tuning (LoRA/PEFT), anomaly detection, generative AI workflow automation.',
    color: '#7c3aed',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Product Analytics',
    desc: 'A/B testing, funnel analysis, cohort studies — translating behavior into product decisions.',
    color: '#ec4899',
  },
  {
    icon: <Layers size={22} />,
    title: 'Cloud Platforms',
    desc: 'AWS (Glue, Lambda, Redshift, S3) and Azure (Data Factory, Databricks) at enterprise scale.',
    color: '#10b981',
  },
  {
    icon: <GitBranch size={22} />,
    title: 'CI/CD & DevOps',
    desc: 'Automated data quality controls integrated into CI/CD pipelines, reducing failures by 14%.',
    color: '#f59e0b',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const About: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="section" ref={ref} style={{ position: 'relative', zIndex: 2 }}>
      <div style={{
        position: 'absolute', top: 0, left: '-20%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 680, marginBottom: 72 }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">Turning data into decisions</h2>
          <p className="section-subtitle">
            I'm an Analytical Engineer based in Atlanta, GA with 5 years of experience
            transforming raw data into strategic intelligence. From architecting ETL pipelines
            at AWS to building AI-driven analytics at Mythics — I bridge the gap between
            data engineering and business outcomes.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Atlanta, GA', 'Open to Remote', '5 YOE', 'MS Computer Science'].map((t) => (
              <span key={t} className="tag" style={{ fontSize: 12 }}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Bio + image */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          marginBottom: 72,
          alignItems: 'start',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: 16, marginBottom: 20 }}>
              At <strong style={{ color: 'var(--text-primary)' }}>Mythics</strong>, I analyze order-to-cash
              data across 1,000+ locations, identify operational inefficiencies, and drive 13%
              reductions in order failures using SQL and Python-based anomaly detection.
              I maintain 10+ real-time Tableau dashboards enabling 9% faster stakeholder decisions.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: 16, marginBottom: 20 }}>
              At <strong style={{ color: 'var(--text-primary)' }}>Amazon Web Services</strong>,
              I designed and deployed internal data pipeline monitoring systems supporting 8
              cross-functional teams. I engineered automated data quality controls using Python,
              AWS Glue, and Lambda in CI/CD pipelines, reducing operational failures by 14%.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: 16 }}>
              I leverage <strong style={{ color: 'var(--text-primary)' }}>generative AI tools</strong> including
              Claude Code and Codex to automate analytics workflows, accelerate root-cause
              investigations, and improve reporting efficiency by 11%.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card"
            style={{
              padding: 32,
              border: '1px solid rgba(0,212,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 160, height: 160,
              background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />
            {[
              {
                degree: 'M.S. Computer Science',
                school: 'University of Texas at Arlington',
                period: 'Graduate',
                color: '#00d4ff',
              },
              {
                degree: 'B.E. Computer Engineering',
                school: 'Gujarat Technological University',
                period: 'Undergraduate',
                color: '#7c3aed',
              },
            ].map(({ degree, school, period, color }) => (
              <div key={degree} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border-glass)' }}>
                <div style={{ fontSize: 11, color: color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 6 }}>{period}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 4 }}>{degree}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{school}</div>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'email', value: 'alayparikh98@gmail.com' },
                { label: 'phone', value: '+1 (408) 483-1223' },
                { label: 'location', value: 'Atlanta, GA' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent-cyan)', minWidth: 60 }}>{label}:</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Capability cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -4, borderColor: item.color + '40' }}
              className="glass-card"
              style={{
                padding: 24,
                transition: 'all 0.3s ease',
                borderColor: 'var(--border-glass)',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: item.color + '15',
                border: `1px solid ${item.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: item.color, marginBottom: 16,
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
