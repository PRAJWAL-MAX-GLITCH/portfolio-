import Head from 'next/head';
import Projects from '../components/Projects';
import Architecture from '../components/Architecture';

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects | Prajwal Patil</title>
        <meta name="description" content="Explore Prajwal's AI and ML projects including MediSense AI and AI Smart Learning Platform." />
      </Head>
      <Projects />
      <Architecture />
    </>
  );
}
