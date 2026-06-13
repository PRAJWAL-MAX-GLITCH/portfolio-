import Head from 'next/head';
import Skills from '../components/Skills';
import GithubStats from '../components/GithubStats';
import LeetCodeStats from '../components/LeetCodeStats';

export default function SkillsPage() {
  return (
    <>
      <Head>
        <title>Skills | Prajwal Patil</title>
        <meta name="description" content="Technical skills, GitHub stats, and LeetCode achievements of Prajwal Patil." />
      </Head>
      <Skills />
      <GithubStats />
      <LeetCodeStats />
    </>
  );
}
