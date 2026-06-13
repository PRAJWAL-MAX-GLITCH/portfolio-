import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const roles = [
  'AI/ML Engineer.',
  'AI Research Engineer.',
  'Production AI Systems.',
  'Deep Learning Architectures.',
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const fullText = roles[currentRole];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex < fullText.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);
    } else if (isDeleting && charIndex > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, speed);
    } else if (!isDeleting && charIndex === fullText.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentRole((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, isDeleting, currentRole]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className={styles.statusBadge} id="hero-status">
            <span className={styles.statusDot} />
            <span>Research Lab · Operational</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 variants={itemVariants} className={styles.heading} id="hero-heading">
            <span className={styles.greetingText}>Hello, I'm</span><br />
            Prajwal Patil
          </motion.h1>

          <motion.h2 variants={itemVariants} className={styles.subheading}>
            <span className={styles.typeText}>{displayText}</span>
            <span className={styles.cursor} aria-hidden="true">|</span>
          </motion.h2>

          {/* Description */}
          <motion.div variants={itemVariants} className={styles.descriptionContainer} id="hero-description">
            <p className={styles.description}>
              Building AI is not just about training models—it's about creating systems that can understand information, reason over context, and deliver meaningful outcomes.
            </p>
            <p className={styles.description}>
              As an AI/ML Engineer, I focus on Generative AI, RAG architectures, Machine Learning, and scalable backend systems. My goal is to bridge the gap between AI research and practical applications by developing solutions that are both technically robust and user-focused.
            </p>
            <p className={styles.description}>
              From AI-powered learning platforms to retrieval-based assistants, I enjoy building products where intelligence is not a feature, but the foundation of the entire experience.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className={styles.ctaGroup}>
            <button
              className={styles.btnPrimary}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Research
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => document.querySelector('#twin')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Query AI Twin
            </button>
          </motion.div>

          {/* Tech stack chips */}
          <motion.div variants={itemVariants} className={styles.techStack} id="hero-tech-stack">
            {['PyTorch', 'CUDA', 'FastAPI', 'LangChain', 'FAISS', 'TensorFlow'].map((tech) => (
              <span key={tech} className={styles.techChip}>{tech}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Architecture Visual */}
        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          id="hero-visual-card"
        >
          <div className={styles.aiCard}>
            {/* Card header */}
            <div className={styles.cardHeader}>
              <div className={styles.cardDots}>
                <span style={{ background: '#FF6B6B' }} />
                <span style={{ background: '#FFB347' }} />
                <span style={{ background: '#10B981' }} />
              </div>
              <span className={styles.cardTitle}>prajwal.ai_twin</span>
              <span className={styles.cardLive}>
                <span className={styles.liveDot} />
                LIVE
              </span>
            </div>

            {/* Card body */}
            <div className={styles.cardBody}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>SYSTEM STATUS</span>
                <span className={styles.statBadge}>Operational</span>
              </div>
              <div className={styles.metricGrid}>
                {[
                  { label: 'LeetCode', value: '300+', icon: '⚡' },
                  { label: 'AI Projects', value: '3', icon: '🚀' },
                  { label: 'RAG Systems', value: '1', icon: '🧠' },
                  { label: 'Core Stack', value: 'Python', icon: '🐍' },
                ].map((m) => (
                  <div key={m.label} className={styles.metricItem}>
                    <span className={styles.metricIcon}>{m.icon}</span>
                    <span className={styles.metricValue}>{m.value}</span>
                    <span className={styles.metricLabel}>{m.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.aiPrompt}>
                <div className={styles.promptLine}>
                  <span className={styles.promptSymbol}>›</span>
                  <span className={styles.promptText}>Tell me about MediSense AI...</span>
                </div>
                <div className={styles.responseArea}>
                  <span className={styles.avatarDot}>P</span>
                  <span className={styles.responseText}>
                    MediSense is a RAG-powered medical assistant using LangChain + FAISS 
                    for semantic retrieval over clinical documents...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
