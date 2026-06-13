import Head from 'next/head';
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Prajwal Patil</title>
        <meta name="description" content="AI/ML Engineer building production-grade AI systems, RAG pipelines & FastAPI backends." />
      </Head>
      <Hero />
      <Metrics />
    </>
  );
}
