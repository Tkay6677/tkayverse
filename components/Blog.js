import { useState, useEffect } from 'react';
import posts from '../data/blogs.json';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import Image from 'next/image';

export default function Blog() {
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    };
    if (modalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto'; // Restore scroll
    };
  }, [modalOpen]);

  // Sort posts by date (newest first) to ensure top 3 are recent
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.slice(0, 3).map((post) => (
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
         <div className="mt-6 flex justify-center gap-6">
            
                <a 
                  href="#blog"
                  className="text-green-400 hover:text-green-300 transition-colors font-bold"
                  onClick={() => setModalOpen(true)}
                  
                >
                  Check Out More
                </a>
      
            </div>
    

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg max-w-5xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
              aria-label="Close modal"
            >
              ×
            </button>
            <h2
              className={`text-2xl font-bold mb-6 ${
                theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-green-400'
              }`}
            >
              All Blog Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
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
        </div>
      )}
    </div>
  );
}