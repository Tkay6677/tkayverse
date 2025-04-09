import Terminal from '../components/Terminal';
import SkillGrid from '../components/SkillGrid';
import ProjectCard from '../components/ProjectCard';
import Playground from '../components/Playground';
import About from '../components/About';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const { theme, switchTheme } = useTheme();

  if (!theme) return null; // Wait for theme to load

  return (
    <div className="relative">
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
        <h2 className="text-4xl font-bold text-center mb-12">Skills Dashboard</h2>
        <SkillGrid />
      </section>
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12">The Code Vault</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <ProjectCard
            title="Solana DApp"
            desc="A decentralized app for Solana blockchain—wallet checker or NFT minter."
            tech={['Solana', 'Rust', 'JS']}
            link="https://github.com/yourusername/solana-dapp"
          />
          <ProjectCard
            title="Rust CLI Tool"
            desc="A blazing-fast command-line tool for file processing."
            tech={['Rust', 'C++']}
            link="https://github.com/yourusername/rust-cli"
          />
          <ProjectCard
            title="React Dashboard"
            desc="A sleek dashboard with real-time data, hooked to MongoDB."
            tech={['React', 'Next.js', 'MongoDB']}
            link="https://your-dashboard.vercel.app"
          />
          <ProjectCard
            title=".NET Desktop App"
            desc="A polished desktop utility built in my early coding days."
            tech={['.NET', 'C#', 'VB.NET']}
            link="https://github.com/yourusername/dotnet-app"
          />
        </div>
      </section>
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Interactive Playground</h2>
        <Playground />
      </section>
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12">About Tkay</h2>
        <About />
      </section>
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Tech Vibe Check</h2>
        <Blog />
      </section>
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Contact: The Drop Zone</h2>
        <Contact />
      </section>
    </div>
  );
}