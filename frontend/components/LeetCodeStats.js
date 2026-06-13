import { motion } from 'framer-motion';
import styles from './LeetCodeStats.module.css';

// Only what the resume states: 300+ problems solved
const leetcodeData = {
  totalSolved: '300+',
  focus: [
    { label: 'Arrays & Hashing', color: '#00b8a3' },
    { label: 'Dynamic Programming', color: '#ffc01e' },
    { label: 'Graphs & Trees', color: '#D4A017' },
    { label: 'Sliding Window', color: '#10B981' },
    { label: 'Two Pointers', color: '#ff375f' },
    { label: 'Binary Search', color: '#FFB347' },
  ],
};

export default function LeetCodeStats() {
  return (
    <section className={styles.section} id="leetcode">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionBadge}>Algorithms & Data Structures</span>
          <h2 className={styles.title}>LeetCode Profile</h2>
          <p className={styles.subtitle}>
            Consistent problem solving demonstrating strong DSA fundamentals and algorithmic thinking.
          </p>
        </div>

        <motion.div
          className={styles.statsCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Main solved count */}
          <div className={styles.mainBlock}>
            <div className={styles.solvedRing}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,161,22,0.1)" strokeWidth="10" />
                <motion.circle
                  cx="70" cy="70" r="58"
                  fill="none"
                  stroke="#ffa116"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 58}
                  initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 58 * 0.15 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
              </svg>
              <div className={styles.ringContent}>
                <span className={styles.solvedCount}>{leetcodeData.totalSolved}</span>
                <span className={styles.solvedLabel}>Solved</span>
              </div>
            </div>

            <div className={styles.mainInfo}>
              <div className={styles.achievementBadge}>
                <span className={styles.badgeIcon}>⚡</span>
                <div>
                  <div className={styles.badgeTitle}>300+ Problems Solved</div>
                  <div className={styles.badgeSubtitle}>Consistent daily problem-solving habit</div>
                </div>
              </div>
              <div className={styles.achievementBadge}>
                <span className={styles.badgeIcon}>🧠</span>
                <div>
                  <div className={styles.badgeTitle}>Strong DSA Foundation</div>
                  <div className={styles.badgeSubtitle}>Core requirement for AI engineering roles</div>
                </div>
              </div>
              <div className={styles.achievementBadge}>
                <span className={styles.badgeIcon}>🎯</span>
                <div>
                  <div className={styles.badgeTitle}>Algorithmic Thinking</div>
                  <div className={styles.badgeSubtitle}>Optimizing complexity in AI pipelines</div>
                </div>
              </div>
              <a
                href="https://leetcode.com/u/prajwalpatil28/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
                id="leetcode-cta-btn"
              >
                <span>View LeetCode Profile</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            </div>

          </div>

          {/* Focus areas */}
          <div className={styles.focusSection}>
            <h4 className={styles.focusTitle}>Focus Areas</h4>
            <div className={styles.focusGrid}>
              {leetcodeData.focus.map((area, i) => (
                <motion.div
                  key={area.label}
                  className={styles.focusChip}
                  style={{ borderColor: `${area.color}40`, background: `${area.color}10` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <span className={styles.focusDot} style={{ background: area.color }} />
                  <span style={{ color: area.color }}>{area.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
