import Head from 'next/head';
import TwinConsole from '../components/TwinConsole';

export default function AITwinPage() {
  return (
    <>
      <Head>
        <title>AI Twin | Prajwal Patil</title>
        <meta name="description" content="Chat with Prajwal's AI Twin to learn more about his background, skills, and projects." />
      </Head>
      <TwinConsole />
    </>
  );
}
