import { motion } from 'framer-motion';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    id: 'linguifai',
    title: 'LinguiFAI',
    tagline: 'Multi-LLM Language Translation Platform',
    description:
      'Developed an advanced AI-powered language translation platform that dynamically routes requests across OpenAI, Gemini, Groq, and DeepSeek models to deliver accurate context-aware translations. Architected a FastAPI backend using Celery and Redis for asynchronous AI task execution and large-scale PDF/DOCX document processing. Optimized API latency and inference speed for real-time translation workflows while deploying the complete microservices infrastructure using Docker.',
    techStack: ['FastAPI', 'OpenAI', 'Gemini', 'Groq', 'DeepSeek', 'Redis', 'Celery', 'Docker'],
    highlights: [
      'Dynamically routes requests across multiple LLMs',
      'Asynchronous task execution with Celery and Redis',
      'Large-scale PDF/DOCX document processing',
      'Microservices infrastructure deployed with Docker',
    ],
    badge: 'LLM PLATFORM',
    badgeColor: 'amber',
    icon: '',
    metrics: [
      { label: 'Models', value: '4+ LLMs' },
      { label: 'Backend', value: 'FastAPI' },
      { label: 'Queue', value: 'Celery/Redis' },
    ],
    githubUrl: 'https://github.com/prajwal-patil',
    featured: true,
  },
  {
    id: 'medisense',
    title: 'MediSense AI',
    tagline: 'RAG-Based Medical Assistant',
    description:
      'A medical assistant built on Retrieval-Augmented Generation (RAG) architecture. Uses LangChain and FAISS to semantically retrieve relevant context from medical documents, enabling grounded, hallucination-resistant LLM responses.',
    techStack: ['LangChain', 'FAISS', 'FastAPI', 'Python', 'Hugging Face', 'RAG'],
    highlights: [
      'FAISS vector store for semantic similarity search',
      'LangChain RetrievalQA chain with prompt engineering',
      'FastAPI backend for concurrent query handling',
      'Grounded responses reduce LLM hallucinations',
    ],
    badge: 'FLAGSHIP PROJECT',
    badgeColor: 'purple',
    icon: '',
    metrics: [
      { label: 'Architecture', value: 'RAG' },
      { label: 'Vector Store', value: 'FAISS' },
      { label: 'Backend', value: 'FastAPI' },
    ],
    githubUrl: 'https://github.com/prajwal-patil',
    featured: true,
  },
  {
    id: 'ai-learning',
    title: 'AI Smart Learning Platform',
    tagline: 'Personalized Learning Recommender',
    description:
      'An AI-powered educational platform that recommends tailored learning paths to students based on their progress and interactions, using deep learning models for personalization.',
    techStack: ['FastAPI', 'PyTorch', 'TensorFlow', 'Python', 'MongoDB', 'Vercel'],
    highlights: [
      'Deep learning-based recommendation engine',
      'Built with PyTorch and TensorFlow',
      'FastAPI backend for serving AI recommendations',
      'Personalized learning path generation',
    ],
    badge: 'FULL STACK AI',
    badgeColor: 'cyan',
    icon: '',
    metrics: [
      { label: 'Backend', value: 'FastAPI' },
      { label: 'DL Framework', value: 'PyTorch' },
      { label: 'Type', value: 'Recommender' },
    ],
    githubUrl: 'https://github.com/prajwal-patil',
    featured: true,
  },
];

const badgeColors = {
  purple: { bg: 'rgba(212, 160, 23, 0.12)', border: 'rgba(212, 160, 23, 0.35)', color: '#D4A017' },
  cyan: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', color: '#10B981' },
  green: { bg: 'rgba(212, 160, 23, 0.1)', border: 'rgba(212, 160, 23, 0.3)', color: '#D4A017' },
  amber: { bg: 'rgba(255, 179, 71, 0.1)', border: 'rgba(255, 179, 71, 0.3)', color: '#FFB347' },
};

function ProjectCard({ project, index }) {
  const bc = badgeColors[project.badgeColor];

  return (
    <motion.article
      className={`${styles.card} ${project.featured ? styles.featuredCard : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      id={`project-card-${project.id}`}
    >
      {/* Card header */}
      <div className={styles.cardTop}>
        <div className={styles.projectIcon}>{project.icon}</div>
        <span
          className={styles.projectBadge}
          style={{ background: bc.bg, border: `1px solid ${bc.border}`, color: bc.color }}
        >
          {project.badge}
        </span>
      </div>

      <h3 className={styles.projectTitle}>{project.title}</h3>
      <p className={styles.projectTagline}>{project.tagline}</p>
      <p className={styles.projectDesc}>{project.description}</p>

      {/* Metrics row */}
      <div className={styles.metricsRow}>
        {project.metrics.map((m) => (
          <div key={m.label} className={styles.metricBox}>
            <span className={styles.metricVal}>{m.value}</span>
            <span className={styles.metricLbl}>{m.label}</span>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <ul className={styles.highlights}>
        {project.highlights.map((h, i) => (
          <li key={i} className={styles.highlight}>
            <span className={styles.hArrow}></span>
            {h}
          </li>
        ))}
      </ul>

      {/* Tech stack */}
      <div className={styles.techRow}>
        {project.techStack.map((t) => (
          <span key={t} className={styles.techTag}>{t}</span>
        ))}
      </div>

      {/* Footer link */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectLink}
        id={`project-github-${project.id}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        View on GitHub
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
      </a>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionBadge} id="projects-badge">
             Production AI Projects
          </span>
          <h2 className={styles.title} id="projects-heading">What I've Built</h2>
          <p className={styles.subtitle}>
            Real systems. Production architecture. Not tutorial projects.
            Each one demonstrates depth in AI engineering  from RAG pipelines to full-stack ML platforms.
          </p>
        </motion.div>

        {/* Featured projects  large grid */}
        <div className={styles.featuredGrid} id="projects-featured">
          {PROJECTS.filter((p) => p.featured).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Other projects  smaller grid */}
        <div className={styles.otherGrid} id="projects-other">
          {PROJECTS.filter((p) => !p.featured).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
