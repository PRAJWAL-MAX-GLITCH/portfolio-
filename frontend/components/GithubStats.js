import { motion } from 'framer-motion';
import styles from './GithubStats.module.css';

export default function GithubStats() {
  return (
    <section className={styles.section} id="github">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionBadge}>Open Source</span>
          <h2 className={styles.title}>GitHub Profile</h2>
          <p className={styles.subtitle}>
            Building consistently — all AI projects, experiments and code are available on GitHub.
          </p>
        </div>

        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.ctaInner}>
            <div className={styles.ctaLeft}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor" className={styles.githubIconLarge}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <div className={styles.ctaInfo}>
                <h3 className={styles.ctaHandle}>@PRAJWAL-MAX-GLITCH</h3>
                <p className={styles.ctaDesc}>
                  Source code for MediSense AI (RAG), AI Smart Learning Platform,
                  and this AI Digital Twin — all available on GitHub.
                </p>
                <div className={styles.ctaTags}>
                  {['LangChain', 'FAISS', 'FastAPI', 'PyTorch', 'TensorFlow', 'RAG'].map((tag) => (
                    <span key={tag} className={styles.ctaTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="https://github.com/PRAJWAL-MAX-GLITCH"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
              id="github-cta-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View GitHub Profile
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
