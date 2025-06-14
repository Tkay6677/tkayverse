import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Terminal from '../components/Terminal';
import SkillGrid from '../components/SkillGrid';
import ProjectCard from '../components/ProjectCard';
import About from '../components/About';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Modal from '../components/Modal';
import { useTheme } from '../contexts/ThemeContext';
import Head from 'next/head';
import clientPromise from '../lib/mongodb';

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

// Sample project data (move to a separate file or API in production)
const projects = [
  {
    title: "Azaiki Public Library",
    desc: "A library website built with Next.js and MongoDB for accessing books, resources, and cultural programs at Azaiki Public Library.",
    tech: ['React', 'MongoDB', 'JS'],
    link: "https://azaikipubliclibrary.org.ng/",
    image: "/images/azaiki.png",
  },
  {
    title: "Izon Cultural Heritage",
    desc: "A blog website built with Next.js and MongoDB to preserve and showcase the rich traditions, stories, and values of the Izon cultural heritage.",
    tech: ['React', 'MongoDB'],
    link: "https://www.izonculturalheritagecentre.org/",
    image: "/images/izon-cultural.png",
  },
  {
    title: "PrimeLiving",
    desc: "A sleek real estate website built with React and MongoDB for showcasing property listings and services by PrimeLiving.",
    tech: ['React', 'Nodejs', 'MongoDB'],
    link: "https://primeliving.onrender.com/",
    image: "/images/primeliving.png",
  },
  {
    title: "Premium Trust Finance",
    desc: "A Crypto investment website ",
    tech: ['HTML', 'CSS', 'JS', 'SQL', 'PHP'],
    link: "https://www.premiumtrustfinance.io/",
    image: "/images/ptf.png",
  },
  {
    title: "Big Madam Gadgets",
    desc: "A sleek ecommerce website built with Nextjs and Prisma for showcasing products for the Big Madam brand.",
    tech: ['Next.js', 'Nodejs', 'Prisma', 'SQL'],
    link: "https://github.com/Tkay6677/bmgadgets",
    image: "/images/bm.png",
  },
  {
    title: "DataDeck",
    desc: "A database management desktop application built using VB.NET",
    tech: ['.NET', 'VB.NET', 'SQL'],
    link: "https://github.com/Tkay6677/DataDeck",
    image: "/images/datadeck.png",
  },
  {
    title: "NDU Quiz Telegram App",
    desc: "A telegram web quiz app built built specifically targeting the Niger Delta University (NDU).",
    tech: ['Nextjs', 'BOT_Father', 'telegram'],
    link: "https://t.me/NduQuizbot",
    image: "/images/ndu.png",
  },
  // Add more projects as needed
];


export default function Home({ projects, posts }) {
  const { theme, switchTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  if (!theme) return null;

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="relative">
      <Head>
        <title>Tkay’s Portfolio | Tokoni Orukaria</title>
        <meta
          name="description"
          content="Final-year Comp Sci student showcasing 5+ years of coding—Rust, Solana, .NET, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              desc={project.desc}
              tech={project.tech}
              link={project.link}
              image={project.image}
            />
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-6">
      
          <a 
            href="#projects"
            className="text-green-400 hover:text-green-300 transition-colors font-bold"
            onClick={() => openModal(
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={index}
                      title={project.title}
                      desc={project.desc}
                      tech={project.tech}
                      link={project.link}
                      image={project.image}
                    />
                  ))}
                </div>
            )}
            
          >
            Check Out More
          </a>

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
        <Blog initialPosts={posts} />

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
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const projects = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
  const posts = await db.collection('posts').find({}).sort({ date: -1 }).toArray();
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}