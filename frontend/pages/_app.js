import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>Prajwal Patil | AI/ML Engineer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="globalStarsBg">
        <div className="stars1" />
        <div className="stars2" />
        <div className="stars3" />
      </div>
      <div className="noise-overlay" aria-hidden="true" />
      
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={router.route}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="page-main"
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
