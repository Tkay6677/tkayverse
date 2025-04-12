import posts from '../data/blogs.json';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function Blog() {
  const { theme } = useTheme();

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <div className="bg-gray-900 border border-purple-500 rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 cursor-pointer">
              <h3 className={`text-xl font-bold mb-2 glitch hover:animate-glitch ${theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-purple-400'}`}>
                {post.title}
              </h3>
              <p className="text-gray-300 mb-4">{post.snippet}</p>
              <p className="text-gray-500 text-sm mb-4">{post.date}</p>
              <span className={`font-bold ${theme === 'neon' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-500' : 'text-green-400'}`}>
                Read More
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}