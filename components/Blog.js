import posts from '../data/blogs.json';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import Image from 'next/image';

export default function Blog() {
  const { theme } = useTheme();

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <div
              className={`bg-gray-900 border rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                theme === 'neon'
                  ? 'border-pink-500 hover:shadow-pink-500/50'
                  : theme === 'light'
                  ? 'border-blue-500 hover:shadow-blue-500/50'
                  : 'border-green-500 hover:shadow-green-500/50'
              }`}
            >
              {post.previewImage ? (
                <Image
                  src={post.previewImage}
                  alt={`${post.title} preview`}
                  width={400}
                  height={200}
                  className={`w-full h-40 object-cover rounded-md mb-4 ${
                    theme === 'neon' ? 'glitch animate-glitch' : ''
                  }`}
                  priority={false}
                  placeholder="blur"
                  blurDataURL="/images/blog/placeholder.png"
                  onError={() => console.error(`Failed to load image: ${post.previewImage}`)}
                />
              ) : (
                <div
                  className={`w-full h-40 rounded-md mb-4 bg-gray-700 flex items-center justify-center ${
                    theme === 'neon' ? 'text-pink-400' : theme === 'light' ? 'text-blue-400' : 'text-green-400'
                  }`}
                >
                  No Preview
                </div>
              )}
              <h3
                className={`text-xl font-bold mb-2 glitch hover:animate-glitch ${
                  theme === 'neon'
                    ? 'text-pink-500'
                    : theme === 'light'
                    ? 'text-blue-600'
                    : 'text-green-400'
                }`}
              >
                {post.title}
              </h3>
              <p
                className={`text-sm mb-2 ${
                  theme === 'neon'
                    ? 'text-pink-200'
                    : theme === 'light'
                    ? 'text-gray-600'
                    : 'text-gray-300'
                }`}
              >
                {post.snippet}
              </p>
              <p
                className={`text-sm mb-4 ${
                  theme === 'neon'
                    ? 'text-pink-400'
                    : theme === 'light'
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}
              >
                {new Date(post.date).toLocaleDateString()}
              </p>
              <span
                className={`font-bold ${
                  theme === 'neon'
                    ? 'text-cyan-400'
                    : theme === 'light'
                    ? 'text-blue-500'
                    : 'text-green-400'
                }`}
              >
                Read More
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}