import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/ai-twin', label: 'AI Twin' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = () => {
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)} id="nav-logo" passHref>
          <span className={styles.logoIcon}>⬡</span>
          <span className={styles.logoText}>
            Prajwal<span className={styles.logoAccent}>.ai</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.links} role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  id={`nav-${link.label.toLowerCase().replace(' ', '-')}`}
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                >
                  {link.label}
                  <span className={styles.linkUnderline} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className={styles.cta}>
          <a
            href="/resume/Prajwal_Resume_AIML.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
            id="nav-resume-btn"
          >
            <span>Resume</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
          </a>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            id="nav-hamburger"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => {
              const isActive = router.pathname === link.href;
              return (
                <Link key={link.href} href={link.href} passHref legacyBehavior>
                  <motion.a
                    className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                    onClick={() => handleNav()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    id={`mobile-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </motion.a>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
