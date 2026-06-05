import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Star, GitFork, Code2, RefreshCw } from 'lucide-react';
import { GithubIcon } from '../components/Icons';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  SQL: '#e38c00',
  R: '#198CE7',
  Jupyter: '#DA5B0B',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

const FALLBACK_PROJECTS = [
  {
    id: 1,
    name: 'data-pipeline-monitor',
    description: 'Automated ETL pipeline monitoring system with anomaly detection and Slack alerting. Built with Python, AWS Glue, and Lambda.',
    html_url: 'https://github.com/alayparikh',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['python', 'aws', 'etl', 'monitoring'],
    updated_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: 2,
    name: 'tableau-dashboard-suite',
    description: 'Collection of Tableau dashboard templates for fulfillment analytics, KPI tracking, and operational intelligence.',
    html_url: 'https://github.com/alayparikh',
    homepage: null,
    language: 'SQL',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['tableau', 'sql', 'analytics', 'visualization'],
    updated_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: 3,
    name: 'ab-test-framework',
    description: 'Statistical A/B testing framework with power analysis, hypothesis testing, and result visualization for product experiments.',
    html_url: 'https://github.com/alayparikh',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['statistics', 'python', 'ab-testing', 'data-science'],
    updated_at: new Date().toISOString(),
    fork: false,
  },
];

const RepoCard: React.FC<{ repo: Repo; index: number; inView: boolean }> = ({ repo, index, inView }) => {
  const langColor = repo.language ? LANG_COLORS[repo.language] || '#8b949e' : '#8b949e';
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, borderColor: 'rgba(0,212,255,0.2)' }}
      className="glass-card"
      style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        transition: 'all 0.3s',
        minHeight: 200,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-cyan)',
        }}>
          <Code2 size={16} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 30, height: 30, borderRadius: 6,
                background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', transition: 'all 0.2s',
              }}
              data-cursor-hover
            >
              <ExternalLink size={13} />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: 30, height: 30, borderRadius: 6,
              background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', transition: 'all 0.2s',
            }}
            data-cursor-hover
          >
            <GithubIcon size={13} />
          </a>
        </div>
      </div>

      <h3 style={{
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: 8,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {repo.name}
      </h3>

      <p style={{
        fontSize: 12.5,
        color: 'var(--text-secondary)',
        lineHeight: 1.65,
        flex: 1,
        marginBottom: 16,
      }}>
        {repo.description || 'No description provided.'}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} style={{
              padding: '2px 8px',
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: 12,
              fontSize: 10,
              color: '#a78bfa',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {t}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 12, borderTop: '1px solid var(--border-glass)' }}>
        {repo.language && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: langColor }} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{repo.language}</span>
          </div>
        )}
        {repo.stargazers_count > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 11 }}>
            <Star size={11} /> {repo.stargazers_count}
          </div>
        )}
        {repo.forks_count > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 11 }}>
            <GitFork size={11} /> {repo.forks_count}
          </div>
        )}
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>Updated {updatedDate}</span>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('All');

  const fetchRepos = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://api.github.com/users/alayparikh/repos?sort=updated&per_page=30');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: Repo[] = await res.json();
      setRepos(data.filter((r) => !r.fork));
    } catch {
      setRepos(FALLBACK_PROJECTS as Repo[]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const allLangs = ['All', ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[]))];
  const filtered = filter === 'All' ? repos : repos.filter((r) => r.language === filter);

  return (
    <section id="projects" className="section" ref={ref} style={{ position: 'relative', zIndex: 2 }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '-10%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}
        >
          <div>
            <span className="section-label">Projects</span>
            <h2 className="section-title">GitHub Portfolio</h2>
            <p className="section-subtitle">
              Live from my GitHub — data pipelines, analytics tools, and ML experiments.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <motion.a
              href="https://github.com/alayparikh?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              whileHover={{ scale: 1.03 }}
              style={{ fontSize: 13, padding: '10px 20px' }}
            >
              <GithubIcon size={15} /> View All on GitHub
            </motion.a>
            <motion.button
              onClick={fetchRepos}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              <RefreshCw size={15} />
            </motion.button>
          </div>
        </motion.div>

        {/* Language filter */}
        {!loading && repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}
          >
            {allLangs.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  border: '1px solid',
                  borderColor: filter === lang ? 'var(--accent-cyan)' : 'var(--border-glass)',
                  background: filter === lang ? 'rgba(0,212,255,0.1)' : 'transparent',
                  color: filter === lang ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                }}
              >
                {lang}
                {lang !== 'All' && LANG_COLORS[lang] && (
                  <span style={{
                    display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                    background: LANG_COLORS[lang], marginLeft: 6, verticalAlign: 'middle',
                  }} />
                )}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card" style={{
                height: 200, padding: 24,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
              }} />
            ))}
          </div>
        ) : (
          <>
            {error && (
              <div style={{
                padding: '12px 20px',
                background: 'rgba(236,72,153,0.08)',
                border: '1px solid rgba(236,72,153,0.2)',
                borderRadius: 10,
                fontSize: 13,
                color: '#ec4899',
                marginBottom: 24,
              }}>
                GitHub API rate limited — showing sample projects. Click refresh or&nbsp;
                <a href="https://github.com/alayparikh?tab=repositories" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline' }}>
                  view all on GitHub
                </a>.
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {filtered.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} inView={inView} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '60px 0' }}>
                No repositories found for this filter.
              </div>
            )}
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{ marginTop: 56, textAlign: 'center' }}
        >
          <a
            href="https://github.com/alayparikh?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <GithubIcon size={16} /> Explore All Repositories on GitHub
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
