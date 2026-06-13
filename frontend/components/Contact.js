import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const LINKS = [
  {
    id: 'github',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/PRAJWAL-MAX-GLITCH',
    href: 'https://github.com/PRAJWAL-MAX-GLITCH',
    color: '#F0F4FF',
  },
  {
    id: 'linkedin',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/prajwal-patil-6a81a9383',
    href: 'https://www.linkedin.com/in/prajwal-patil-6a81a9383/',
    color: '#0A66C2',
  },
  {
    id: 'email',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'prajwalpatil062008@gmail.com',
    href: 'mailto:prajwalpatil062008@gmail.com',
    color: '#D4A017',
  },
  {
    id: 'leetcode',
    icon: '⚡',
    label: 'LeetCode',
    value: 'leetcode.com/u/prajwalpatil28',
    href: 'https://leetcode.com/u/prajwalpatil28/',
    color: '#FFB347',
    isEmoji: true,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('prajwalpatil062008@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.section} id="contact">
      {/* Background orb */}
      <div className={styles.orbBg} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.sectionBadge} id="contact-badge">
              <span className={styles.badgeDot} />
              Available for Opportunities
            </span>
            <h2 className={styles.title} id="contact-heading">Let's Build Something</h2>
            <p className={styles.subtitle}>
              I'm actively looking for <strong>AI Engineer</strong>, <strong>ML Engineer</strong>, 
              and <strong>Backend Engineer</strong> internships & roles. 
              If you're building something with AI, I'd love to talk.
            </p>
          </div>

          {/* Main CTA cards */}
          <div className={styles.ctaCards}>
            {/* Primary CTA */}
            <motion.div
              className={styles.primaryCta}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              id="contact-primary-cta"
            >
              <div className={styles.ctaIcon}>🤝</div>
              <h3 className={styles.ctaTitle}>Open to Work</h3>
              <p className={styles.ctaText}>
                Available for internships, contract work, and full-time AI engineering roles.
                Let's discuss what you're building.
              </p>
              <button
                className={styles.ctaPrimaryBtn}
                onClick={copyEmail}
                id="contact-copy-email-btn"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Email Copied!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"/>
                    </svg>
                    Copy Email
                  </>
                )}
              </button>
            </motion.div>

            {/* AI Twin CTA */}
            <motion.div
              className={styles.twinCta}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              id="contact-twin-cta"
            >
              <div className={styles.ctaIcon}>🧠</div>
              <h3 className={styles.ctaTitle}>Talk to My AI Twin</h3>
              <p className={styles.ctaText}>
                Can't schedule a call right now? Chat with my Gemini-powered 
                AI Twin. It knows everything about my projects and skills.
              </p>
              <button
                className={styles.ctaSecondaryBtn}
                onClick={() => document.querySelector('#twin')?.scrollIntoView({ behavior: 'smooth' })}
                id="contact-open-twin-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                Chat with Twin
              </button>
            </motion.div>
          </div>

          {/* Social links */}
          <div className={styles.socialLinks} id="contact-social-links">
            {LINKS.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                id={`contact-link-${link.id}`}
                aria-label={`Visit ${link.label}`}
              >
                <span
                  className={styles.socialIcon}
                  style={{
                    color: hoveredLink === link.id ? link.color : '#8892B0',
                    fontSize: link.isEmoji ? '1.4rem' : undefined,
                  }}
                >
                  {link.icon}
                </span>
                <div className={styles.socialInfo}>
                  <span className={styles.socialLabel}>{link.label}</span>
                  <span className={styles.socialValue}>{link.value}</span>
                </div>
                <svg
                  className={styles.socialArrow}
                  width="14" height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: hoveredLink === link.id ? link.color : '#4A5568' }}
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </motion.a>
            ))}
          </div>

          {/* Resume download */}
          <div className={styles.resumeSection} id="contact-resume-section">
            <div className={styles.resumeText}>
              <strong className={styles.resumeTitle}>Prefer reading a PDF?</strong>
              <span className={styles.resumeSub}>Download my resume for offline review</span>
            </div>
            <a
              href="/resume/Prajwal_Resume_AIML.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeBtn}
              id="contact-download-resume"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
