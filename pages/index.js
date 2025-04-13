import dynamic from 'next/dynamic';
import Terminal from '../components/Terminal';
import SkillGrid from '../components/SkillGrid';
import ProjectCard from '../components/ProjectCard';
import About from '../components/About';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import { useTheme } from '../contexts/ThemeContext';
import Head from 'next/head';

// Lazy-load Playground
const Playground = dynamic(() => import('../components/Playground'), {
  ssr: false, // Disable server-side rendering
  loading: () => (
    <div className="max-w-5xl mx-auto px-4">
      <div className="rounded-lg p-6 bg-gray-800 border border-green-500">
        <h3 className="text-2xl font-bold text-green-400 mb-4">Python Sandbox</h3>
        <p className="text-gray-300 mb-4 animate-pulse">Loading Python Sandbox...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const { theme, switchTheme } = useTheme();

  if (!theme) return null;

  return (
    <div className="relative">
      <Head>
        <title>Tkay’s Portfolio | Tokoni Orukaria</title>
        <meta
          name="description"
          content="Final-year Comp Sci student showcasing 5+ years of coding—Rust, Solana, .NET, and more."
        />
        <meta name="google-site-verification" content="C-XAhJHsGoC7x4ojjN0C9ojU3PXbxbTKd2ynVUC_Nks" />
      </Head>
      <button
        onClick={switchTheme}
        className="fixed top-4 right-4 bg-purple-500 text-black font-bold py-2 px-4 rounded hover:bg-purple-400 transition-colors z-50"
      >
        Switch Theme
      </button>
      <section className="flex items-center justify-center min-h-screen">
        <Terminal />
      </section>
      <section className="py-16">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            theme === 'neon' ? 'glitch animate-glitch-slow' : ''
          } ${theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-green-400'}`}
        >
          Skills Dashboard
        </h2>
        <SkillGrid />
      </section>
      <section className="py-16">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            theme === 'neon' ? 'glitch animate-glitch-slow' : ''
          } ${theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-green-400'}`}
        >
          The Code Vault
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <ProjectCard
            title="Azaiki Public Library"
            desc="A library website built with Next.js and MongoDB for accessing books, resources, and cultural programs at Azaiki Public Library."
            tech={['React', 'MongoDB', 'JS']}
            link="https://azaikipubliclibrary.org.ng/"
            image="/images/azaiki.png"
          />
          <ProjectCard
            title="Izon Cultural Heritage"
            desc="A blog website built with Next.js and MongoDB to preserve and showcase the rich traditions, stories, and values of the Izon cultural heritage."
            tech={['React', 'MongoDB']}
            link="https://www.izonculturalheritagecentre.org/"
            image="/images/izon-cultural.png"
          />
          <ProjectCard
            title="PrimeLiving"
            desc="A sleek real estate website built with React and MongoDB for showcasing property listings and services by PrimeLiving."
            tech={['React', 'Nodejs', 'MongoDB']}
            link="https://primeliving.onrender.com/"
            image="/images/primeliving.png"
          />
        </div>
      </section>
      <section className="py-16">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            theme === 'neon' ? 'glitch animate-glitch-slow' : ''
          } ${theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-green-400'}`}
        >
          Interactive Playground
        </h2>
        <Playground />
      </section>
      <section className="py-16">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            theme === 'neon' ? 'glitch animate-glitch-slow' : ''
          } ${theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-green-400'}`}
        >
          About Tkay
        </h2>
        <About />
      </section>
      <section className="py-16" id="blog">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            theme === 'neon' ? 'glitch animate-glitch-slow' : ''
          } ${theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-green-400'}`}
        >
          Tech Vibe Check
        </h2>
        <Blog />
      </section>
      <section className="py-16">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            theme === 'neon' ? 'glitch animate-glitch-slow' : ''
          } ${theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-green-400'}`}
        >
          Contact: The Drop Zone
        </h2>
        <Contact />
      </section>
    </div>
  );
}