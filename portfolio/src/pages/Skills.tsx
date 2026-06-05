import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SKILL_GROUPS = [
  {
    category: 'Languages & Databases',
    color: '#00d4ff',
    skills: [
      { name: 'SQL', level: 97 },
      { name: 'Python', level: 93 },
      { name: 'PySpark', level: 85 },
      { name: 'R', level: 75 },
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    color: '#3b82f6',
    skills: [
      { name: 'AWS (Glue, Lambda, Redshift)', level: 90 },
      { name: 'Azure Data Factory', level: 82 },
      { name: 'Databricks', level: 85 },
      { name: 'Snowflake / BigQuery', level: 80 },
    ],
  },
  {
    category: 'BI & Visualization',
    color: '#7c3aed',
    skills: [
      { name: 'Tableau', level: 95 },
      { name: 'Power BI', level: 88 },
      { name: 'Recharts / D3.js', level: 72 },
      { name: 'Advanced Excel', level: 90 },
    ],
  },
  {
    category: 'ML & AI',
    color: '#ec4899',
    skills: [
      { name: 'LLM Fine-tuning (LoRA/PEFT)', level: 78 },
      { name: 'TensorFlow / SVM', level: 72 },
      { name: 'Pandas / Scikit-learn', level: 88 },
      { name: 'Generative AI Integration', level: 85 },
    ],
  },
];

const TOOL_CHIPS = [
  'Apache Airflow', 'AWS Glue', 'Azure Data Factory', 'Databricks',
  'CI/CD Pipelines', 'Docker', 'Git', 'Jupyter',
  'dbt', 'Redshift', 'BigQuery', 'Snowflake',
  'Claude Code', 'Codex', 'Pandas', 'NumPy',
  'A/B Testing', 'Hypothesis Testing', 'Statistical Analysis', 'ETL Design',
];

const SkillBar: React.FC<{ name: string; level: number; color: string; delay: number; inView: boolean }> = ({
  name, level, color, delay, inView,
}) => {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{name}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: color,
        }}>{level}%</span>
      </div>
      <div style={{
        height: 4,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          style={{
            height: '100%',
            borderRadius: 4,
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: `0 0 8px ${color}40`,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            width: 6, height: 6, borderRadius: '50%',
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }} />
        </motion.div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="section" ref={ref} style={{ position: 'relative', zIndex: 2 }}>
      <div style={{
        position: 'absolute', top: '20%', right: '-10%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <span className="section-label">Technical Skills</span>
          <h2 className="section-title">Data Stack Proficiency</h2>
          <p className="section-subtitle">
            Full-spectrum expertise from raw ingestion to executive dashboards —
            built through 5 years of production systems at AWS, Mythics, and beyond.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, marginBottom: 56 }}>
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.15, duration: 0.5 }}
              className="glass-card"
              style={{
                padding: '28px 28px 24px',
                borderColor: group.color + '20',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${group.color}, transparent)`,
                borderRadius: '16px 16px 0 0',
              }} />
              <h3 style={{
                fontSize: 13,
                fontWeight: 600,
                color: group.color,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 24,
              }}>
                {group.category}
              </h3>
              {group.skills.map((s, si) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  color={group.color}
                  delay={gi * 0.1 + si * 0.08}
                  inView={inView}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tool chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)', marginBottom: 20, letterSpacing: 2 }}>
            // full_toolchain[]
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TOOL_CHIPS.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.04 }}
                whileHover={{ scale: 1.05, borderColor: 'var(--accent-cyan)' }}
                style={{
                  padding: '7px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 24,
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
