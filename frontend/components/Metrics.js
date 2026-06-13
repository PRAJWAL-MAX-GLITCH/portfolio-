import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Metrics.module.css';

function useCountUp(target, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return count;
}

const STATS = [
  { id: 'leetcode', icon: '⚡', value: 300, suffix: '+', label: 'LeetCode Problems', sublabel: 'Consistent problem solver', color: '#FFB347' },
  { id: 'projects', icon: '🚀', value: 3, suffix: '', label: 'AI Projects Built', sublabel: 'LinguiFAI, MediSense & More', color: '#D4A017' },
  { id: 'rag', icon: '🧠', value: 1, suffix: '', label: 'RAG System', sublabel: 'LangChain + FAISS pipeline', color: '#10B981' },
  { id: 'frameworks', icon: '🛠', value: 5, suffix: '+', label: 'Core AI Frameworks', sublabel: 'PyTorch, TF, LangChain, FAISS, FastAPI', color: '#FF6B6B' },
];

const TIMELINE = [
  {
    year: '2023 - 2027',
    title: 'B.Tech Computer Science & Engineering',
    description: 'Parul University · CGPA: 6.49',
    icon: '🎓',
    color: '#D4A017',
  },
  {
    year: 'Skills',
    title: 'AI / ML Technical Stack',
    description: 'Machine Learning, Deep Learning, TensorFlow, PyTorch, Scikit-Learn, LangChain, FAISS, RAG, Prompt Engineering, Embeddings, Vector Search.',
    icon: '⚡',
    color: '#10B981',
  },
  {
    year: 'Project',
    title: 'MediSense AI - RAG Based Medical Assistant',
    description: 'Built a Retrieval-Augmented Generation healthcare assistant for intelligent medical information retrieval. Integrated LangChain, Hugging Face models, and FAISS vector search for semantic document retrieval. Developed FastAPI backend services for real-time query processing and context-aware response generation.',
    icon: '🧠',
    color: '#D4A017',
  },
  {
    year: 'Project',
    title: 'LinguiFAI - Multi-LLM Translation Platform',
    description: 'Developed an advanced AI-powered language translation platform that dynamically routes requests across OpenAI, Gemini, Groq, and DeepSeek models. Architected a FastAPI backend using Celery and Redis for asynchronous task execution and large-scale document processing, deployed using Docker.',
    icon: '🌐',
    color: '#FFB347',
  },
  {
    year: 'Project',
    title: 'AI Smart Learning Platform',
    description: 'Developed an AI-powered learning platform providing personalized quizzes, course recommendations, and learning paths. Built ML/DL models for student analytics and recommendations. Designed scalable FastAPI services integrated with MongoDB and deployed the application on Vercel.',
    icon: '📚',
    color: '#FFB347',
  },
  {
    year: 'Achievements',
    title: 'Achievements & Certifications',
    description: 'Solved 300+ DSA problems on LeetCode. Built and deployed AI, ML, and Generative AI applications. Certifications: Generative AI · AWS Cloud · AI Fundamentals.',
    icon: '🏆',
    color: '#FF6B6B',
  },
];

function StatCard({ stat, inView, index }) {
  const count = useCountUp(stat.value, 1800, inView);
  return (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      id={`metric-${stat.id}`}
    >
      <div className={styles.statIcon} style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
        {stat.icon}
      </div>
      <div className={styles.statValue} style={{ color: stat.color }}>
        {count}{stat.suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
      <div className={styles.statSublabel}>{stat.sublabel}</div>
    </motion.div>
  );
}

export default function Metrics() {
  const [inView, setInView] = useState(false);

  return (
    <section className={styles.section} id="metrics">
      <div className={styles.container}>
        {/* Stats */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionBadge} id="metrics-badge"> By The Numbers</span>
          <h2 className={styles.title} id="metrics-heading">Technical Telemetry</h2>
          <p className={styles.subtitle}>
            Quantified evidence of engineering depth  because numbers don't lie.
          </p>
        </motion.div>

        <div
          className={styles.statsGrid}
          id="metrics-stats-grid"
          ref={(el) => { if (el && !inView) setInView(true); }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} inView={inView} index={i} />
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          className={styles.timelineSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className={styles.timelineTitle} id="metrics-timeline-heading">Engineering Journey</h3>
          <div className={styles.timeline} id="metrics-timeline">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={`${item.year}-${i}`}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                id={`timeline-${item.year.toLowerCase().replace(/\s+/g, '-')}-${i}`}
              >
                <div className={styles.timelineLeft}>
                  <div
                    className={styles.timelineIcon}
                    style={{ background: `${item.color}15`, border: `2px solid ${item.color}40` }}
                  >
                    {item.icon}
                  </div>
                  <div className={styles.timelineLine} />
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineYear} style={{ color: item.color }}>{item.year}</div>
                  <h4 className={styles.timelineItemTitle}>{item.title}</h4>
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
