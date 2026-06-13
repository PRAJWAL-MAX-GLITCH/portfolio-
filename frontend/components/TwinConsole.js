import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TwinConsole.module.css';

const SUGGESTED_QUESTIONS = [
  'Tell me about Prajwal',
  'Explain LinguiFAI',
  'Explain MediSense AI',
  'Explain Smart Learning Platform',
  'What technologies does he know?',
  'Why should I hire him?',
];

const OFFLINE_RESPONSES = {
  about: `I'm Prajwal's AI Twin. Prajwal is a B.Tech Computer Science & Engineering student at **Parul University** (20232027). He specialises in **Generative AI**, **Machine Learning**, **RAG Systems**, and **FastAPI** backend engineering. He is actively looking for AI Engineer, ML Engineer, and Backend Engineer roles.`,
  linguifai: `**LinguiFAI** is a Multi-LLM Language Translation Platform.\n\n **Architecture**: Microservices dynamically routing across OpenAI, Gemini, Groq, and DeepSeek\n **Stack**: FastAPI + Celery + Redis + Docker\n **How it works**: Uses asynchronous tasks to process large-scale PDF/DOCX documents for accurate, context-aware translations. Optimized for real-time latency.`,
  medisense: `**MediSense AI** is a RAG-Based Medical Assistant.\n\n **Architecture**: Retrieval-Augmented Generation (RAG)\n **Stack**: LangChain + FAISS + FastAPI + Python + Hugging Face\n **How it works**: Medical queries are matched semantically against documents using FAISS vector search. Relevant context is retrieved and passed to an LLM, resulting in grounded, hallucination-resistant responses.`,
  learning: `**AI Smart Learning Platform** is a personalized recommender.\n\n **Purpose**: Personalized learning path recommendations for students\n **Stack**: FastAPI + PyTorch + TensorFlow + Python + MongoDB + Vercel\n **AI Core**: Deep learning-based recommendation engine that adapts learning paths based on student interaction and progress.`,
  skills: `Prajwal's verified technical stack:\n\n**AI/ML**: Python, Machine Learning, Deep Learning, TensorFlow, PyTorch, Generative AI\n**RAG & LLM**: LangChain, FAISS, RAG, LLM Pipelines, Vector Databases, Prompt Engineering\n**Backend**: FastAPI\n**Problem Solving**: 300+ LeetCode problems solved`,
  hire: `You should hire Prajwal because:\n\n **300+ LeetCode problems** solved  strong algorithmic foundation\n **Built MediSense AI**  a production RAG system using LangChain + FAISS\n **Built AI Smart Learning Platform**  deep learning recommendation engine\n **Rare combination**: ML expertise + FastAPI backend engineering\n **Hands-on builder** of real AI/ML applications, not just theory`,
};

function getOfflineResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('prajwal') || q.includes('about') || q.includes('who')) return OFFLINE_RESPONSES.about;
  if (q.includes('linguifai') || q.includes('translat') || q.includes('multi-llm')) return OFFLINE_RESPONSES.linguifai;
  if (q.includes('medisense') || q.includes('medical') || q.includes('rag')) return OFFLINE_RESPONSES.medisense;
  if (q.includes('learning') || q.includes('platform') || q.includes('recommend')) return OFFLINE_RESPONSES.learning;
  if (q.includes('skill') || q.includes('technolog') || q.includes('know') || q.includes('stack')) return OFFLINE_RESPONSES.skills;
  if (q.includes('hire') || q.includes('why') || q.includes('achiev')) return OFFLINE_RESPONSES.hire;
  return `Hi! I'm Prajwal's AI Twin. Ask me:\n\n **"Tell me about Prajwal"**\n **"Explain LinguiFAI"**\n **"Explain MediSense AI"**\n **"Explain Smart Learning Platform"**\n **"What technologies does he know?"**\n **"Why should I hire him?"**`;
}

function formatMessage(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
}

export default function TwinConsole() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi!  I'm **Prajwal's AI Twin**. \n\nI am now running with **RAG + FAISS** on the backend and a **3D Interactive Avatar**. \n\nYou can click the Microphone button below to speak to me, or type your question!`,
      id: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('offline'); // 'online' | 'offline'
  
  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Automatically send after voice input
        sendMessage(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Clean up markdown before speaking
      const cleanText = text.replace(/\*\*/g, '').replace(/\n/g, '. ').replace(/<br\/>/g, '. ');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.cancel(); // cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async (query) => {
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    // Stop speaking if user interrupts
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }

    const userMsg = { role: 'user', content: trimmed, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
        signal: AbortSignal.timeout(10000), // RAG might take slightly longer
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMode('online');
      
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response, id: Date.now() }]);
      speakText(data.response);
      
    } catch (err) {
      console.error(err);
      setMode('offline');
      const offlineReply = getOfflineResponse(trimmed);
      await new Promise((r) => setTimeout(r, 800)); // simulate thinking
      
      setMessages((prev) => [...prev, { role: 'assistant', content: offlineReply, id: Date.now() }]);
      speakText(offlineReply);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <section className={styles.section} id="twin">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badgeRow}>
            <span className={styles.badge} id="twin-badge">
              <span className={styles.badgeDot} />
              AI Digital Twin V5
            </span>
            <span className={`${styles.modeBadge} ${mode === 'online' ? styles.modeOnline : styles.modeOffline}`}>
              {mode === 'online' ? ' RAG Active' : ' Offline Mode'}
            </span>
          </div>
          <h2 className={styles.title} id="twin-heading">Meet My AI Twin</h2>
          <p className={styles.subtitle}>
            Now powered by a 3D Avatar, Voice Recognition, and a true FAISS RAG architecture.
          </p>
        </motion.div>

        <div className={styles.consoleLayout}>
          {/* Avatar and Suggestions Column */}
          <motion.div
            className={styles.suggestions}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Removed Avatar for Research Lab Theme */}
            <div className={styles.terminalHeader}>
              <span className={styles.terminalTitle}>System: Prajwal AI Twin</span>
              <span className={styles.terminalStatus}>Online</span>
            </div>

            <p className={styles.suggestTitle}> Suggested Questions</p>
            <div className={styles.suggestList}>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  className={styles.suggestBtn}
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                >
                  <span className={styles.suggestArrow}></span>
                  {q}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Chat Window Column */}
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderDots}>
                <span style={{ background: '#FF6B6B' }} />
                <span style={{ background: '#FFB347' }} />
                <span style={{ background: '#D4A017' }} />
              </div>
              <span className={styles.chatHeaderTitle}>prajwal_ai_twin.rag_engine</span>
              <span className={styles.chatHeaderStatus}>
                <span className={styles.statusPing} />
                {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Active'}
              </span>
            </div>

            <div className={styles.messages}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.assistantMsg}`}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {msg.role === 'assistant' && <div className={styles.msgAvatar}></div>}
                    <div
                      className={styles.msgBubble}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                    {msg.role === 'user' && <div className={styles.userAvatar}>U</div>}
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    className={`${styles.message} ${styles.assistantMsg}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={styles.msgAvatar}></div>
                    <div className={styles.typingBubble}>
                      <span className={styles.dot} style={{ animationDelay: '0ms' }} />
                      <span className={styles.dot} style={{ animationDelay: '160ms' }} />
                      <span className={styles.dot} style={{ animationDelay: '320ms' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            <div className={styles.inputArea}>
              <button 
                className={`${styles.voiceBtn} ${isListening ? styles.listening : ''}`} 
                onClick={toggleListen}
                title={isListening ? "Stop listening" : "Start speaking"}
              >
                {isListening ? '' : ''}
              </button>
              
              <input
                ref={inputRef}
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "Listening..." : "Ask about projects, skills, architecture..."}
                disabled={loading || isListening}
              />
              <button
                className={styles.sendBtn}
                onClick={() => sendMessage(input)}
                disabled={loading || (!input.trim() && !isListening)}
              >
                {loading ? (
                  <span className={styles.spinner} />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
