import Head from 'next/head';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Prajwal Patil</title>
        <meta name="description" content="Get in touch with Prajwal Patil." />
      </Head>
      <Contact />
    </>
  );
}
