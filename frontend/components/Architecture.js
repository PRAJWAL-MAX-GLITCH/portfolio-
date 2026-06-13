import { motion } from 'framer-motion';
import styles from './Architecture.module.css';

const flowData = [
  { id: 'user', label: 'User Query', icon: '👤', x: 50, y: 150 },
  { id: 'api', label: 'FastAPI Gateway', icon: '⚡', x: 250, y: 150 },
  { id: 'llm', label: 'Gemini LLM', icon: '🧠', x: 450, y: 50 },
  { id: 'embed', label: 'Embeddings Model', icon: '🔢', x: 450, y: 250 },
  { id: 'vector', label: 'FAISS Vector DB', icon: '🗄️', x: 650, y: 250 },
  { id: 'response', label: 'Final Response', icon: '✨', x: 650, y: 150 },
];

const connections = [
  { from: 'user', to: 'api' },
  { from: 'api', to: 'llm' },
  { from: 'api', to: 'embed' },
  { from: 'embed', to: 'vector' },
  { from: 'vector', to: 'llm' },
  { from: 'llm', to: 'response' },
];

export default function Architecture() {
  return (
    <section className={styles.section} id="architecture">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionBadge}>System Design</span>
          <h2 className={styles.title}>Architecture Showcase</h2>
          <p className={styles.subtitle}>
            A high-level view of the AI conversational agent with Retrieval-Augmented Generation (RAG).
          </p>
        </div>

        <div className={styles.diagramContainer}>
          <div className={styles.diagramCanvas}>
            {/* Draw Connections */}
            <svg className={styles.connectionSvg}>
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(212, 160, 23, 0.2)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0.6)" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="rgba(16, 185, 129, 0.6)" />
                </marker>
              </defs>
              
              <path d="M 120 180 L 250 180" className={styles.connectionLine} markerEnd="url(#arrowhead)" />
              <path d="M 330 160 Q 380 80 450 80" className={styles.connectionLine} markerEnd="url(#arrowhead)" />
              <path d="M 330 200 Q 380 280 450 280" className={styles.connectionLine} markerEnd="url(#arrowhead)" />
              <path d="M 530 280 L 650 280" className={styles.connectionLine} markerEnd="url(#arrowhead)" />
              <path d="M 690 250 Q 690 120 530 80" className={styles.connectionLine} strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
              <path d="M 530 90 Q 590 120 650 160" className={styles.connectionLine} markerEnd="url(#arrowhead)" />
            </svg>

            {/* Draw Nodes */}
            {flowData.map((node, index) => (
              <motion.div
                key={node.id}
                className={styles.node}
                style={{ left: node.x, top: node.y }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={styles.nodeIcon}>{node.icon}</div>
                <div className={styles.nodeLabel}>{node.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
