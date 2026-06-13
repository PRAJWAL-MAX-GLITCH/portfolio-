import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer" role="contentinfo">
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Logo */}
          <div className={styles.brand}>
            <span className={styles.logoIcon}>⬡</span>
            <span className={styles.logoText}>
              Prajwal<span className={styles.logoAccent}>.ai</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className={styles.nav} aria-label="Footer navigation">
            {['#twin', '#projects', '#skills', '#metrics', '#contact'].map((href) => (
              <button
                key={href}
                className={styles.navLink}
                onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
                id={`footer-nav-${href.replace('#', '')}`}
              >
                {href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <p className={styles.copy}>
            © {year} Prajwal Patil · Built with Next.js & FastAPI
          </p>
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Bottom strip */}
        <div className={styles.bottom}>
          <span className={styles.madeWith}>
            Made with 🧠 AI & ⚡ passion by{' '}
            <span className={styles.name}>Prajwal Patil</span>
          </span>
          <span className={styles.stack}>
            Next.js · FastAPI · Gemini API · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
