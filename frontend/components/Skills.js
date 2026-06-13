import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const SKILL_CATEGORIES = [
  {
    id: 'genai',
    label: 'Generative AI',
    icon: '🧠',
    color: '#D4A017',
    skills: [
      { name: 'LangChain', level: 90 },
      { name: 'FAISS', level: 85 },
      { name: 'RAG Systems', level: 88 },
      { name: 'Gemini API', level: 80 },
      { name: 'OpenAI API', level: 78 },
      { name: 'Prompt Engineering', level: 85 },
    ],
  },
  {
    id: 'ml',
    label: 'ML / Deep Learning',
    icon: '⚡',
    color: '#10B981',
    skills: [
      { name: 'PyTorch', level: 82 },
      { name: 'TensorFlow', level: 78 },
      { name: 'Scikit-learn', level: 88 },
      { name: 'HuggingFace', level: 75 },
      { name: 'NumPy / Pandas', level: 92 },
      { name: 'Data Preprocessing', level: 90 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: '🛠',
    color: '#D4A017',
    skills: [
      { name: 'FastAPI', level: 88 },
      { name: 'Python', level: 92 },
      { name: 'REST APIs', level: 88 },
      { name: 'Pydantic', level: 85 },
      { name: 'Async / Await', level: 80 },
      { name: 'MongoDB', level: 72 },
    ],
  },
  {
    id: 'dsa',
    label: 'DSA & Problem Solving',
    icon: '💡',
    color: '#FFB347',
    skills: [
      { name: 'LeetCode (300+)', level: 80 },
      { name: 'Dynamic Programming', level: 75 },
      { name: 'Graph Algorithms', level: 78 },
      { name: 'Trees & Heaps', level: 82 },
      { name: 'Sliding Window', level: 88 },
      { name: 'Two Pointers', level: 87 },
    ],
  },
];

const TECH_TAGS = [
  { name: 'Python', category: 'core' },
  { name: 'LangChain', category: 'ai' },
  { name: 'FAISS', category: 'ai' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'PyTorch', category: 'ml' },
  { name: 'TensorFlow', category: 'ml' },
  { name: 'Gemini API', category: 'ai' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'Git', category: 'tools' },
  { name: 'Scikit-learn', category: 'ml' },
  { name: 'HuggingFace', category: 'ai' },
  { name: 'Pydantic', category: 'backend' },
  { name: 'NumPy', category: 'ml' },
  { name: 'Pandas', category: 'ml' },
  { name: 'RAG', category: 'ai' },
  { name: 'OpenAI API', category: 'ai' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Vercel', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'Jupyter Notebook', category: 'tools' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'R', category: 'core' },
  { name: 'C', category: 'core' },
  { name: 'JSON', category: 'core' },
];

function SkillBar({ name, level, color, inView }) {
  return (
    <div className={styles.skillRow}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel} style={{ color }}>{level}%</span>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('genai');
  const [inView, setInView] = useState(false);
  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === activeTab);

  return (
    <section className={styles.section} id="skills">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setInView(true)}
        >
          <span className={styles.sectionBadge} id="skills-badge"> Technical Arsenal</span>
          <h2 className={styles.title} id="skills-heading">Skills & Expertise</h2>
          <p className={styles.subtitle}>
            Depth-first approach  mastering the full AI stack from model training to 
            production deployment, with strong backend and problem-solving foundations.
          </p>
        </motion.div>

        <div className={styles.layout}>
          {/* Skill bars panel */}
          <motion.div
            className={styles.skillsPanel}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Category tabs */}
            <div className={styles.tabs} role="tablist" id="skills-tabs">
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeTab === cat.id}
                  className={`${styles.tab} ${activeTab === cat.id ? styles.tabActive : ''}`}
                  onClick={() => { setActiveTab(cat.id); setInView(false); setTimeout(() => setInView(true), 50); }}
                  style={activeTab === cat.id ? { borderColor: cat.color, color: cat.color } : {}}
                  id={`skills-tab-${cat.id}`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Skill bars */}
            <motion.div
              className={styles.barsContainer}
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              id={`skills-bars-${activeTab}`}
            >
              {activeCategory.skills.map((s) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  color={activeCategory.color}
                  inView={inView}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Tech tag cloud */}
          <motion.div
            className={styles.tagPanel}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="skills-tag-cloud"
          >
            <p className={styles.tagTitle}>Full Tech Stack</p>
            <div className={styles.tagCloud}>
              {TECH_TAGS.map((tag, i) => (
                <motion.span
                  key={`${tag.name}-${i}`}
                  className={styles.tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  id={`tag-${tag.name.toLowerCase().replace(/\s+/g, '-')}-${i}`}
                >
                  {tag.name}
                </motion.span>
              ))}
            </div>

            {/* LeetCode card */}
            <div className={styles.leetcodeCard} id="skills-leetcode-card">
              <div className={styles.lcHeader}>
                <span className={styles.lcIcon}>🏆</span>
                <span className={styles.lcTitle}>LeetCode</span>
                <span className={styles.lcBadge}>Top Solver</span>
              </div>
              <div className={styles.lcStats}>
                <div className={styles.lcStat}>
                  <span className={styles.lcNum}>300+</span>
                  <span className={styles.lcLbl}>Problems</span>
                </div>
                <div className={styles.lcDivider} />
                <div className={styles.lcStat}>
                  <span className={styles.lcNum} style={{ color: '#D4A017' }}>Easy+Med</span>
                  <span className={styles.lcLbl}>Primary Focus</span>
                </div>
                <div className={styles.lcDivider} />
                <div className={styles.lcStat}>
                  <span className={styles.lcNum} style={{ color: '#FF6B6B' }}>Hard</span>
                  <span className={styles.lcLbl}>DP & Graphs</span>
                </div>
              </div>
              <div className={styles.lcTopics}>
                {['Dynamic Programming', 'Graphs', 'Trees', 'Sliding Window', 'Two Pointers', 'Binary Search'].map((t) => (
                  <span key={t} className={styles.lcTopic}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
