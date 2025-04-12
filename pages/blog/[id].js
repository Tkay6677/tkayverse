import { useRouter } from 'next/router';
import posts from '../../data/blogs.json';
import { useTheme } from '../../contexts/ThemeContext';
import Head from 'next/head';
import Link from 'next/link';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();

  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className={`text-3xl font-bold ${theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-green-400'}`}>
          Post Not Found
        </h2>
        <p className="text-gray-300 mt-4">Sorry, that post doesn’t exist. Back to the vibes?</p>
        <Link href="/#blog">
          <span className={`mt-4 inline-block font-bold ${theme === 'neon' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-500' : 'text-green-400'}`}>
            Back to Blog
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <Head>
        <title>{post.title} | Tkay’s Blog</title>
        <meta name="description" content={post.snippet} />
      </Head>
      <Link href="/#blog">
        <span className={`inline-block mb-6 font-bold ${theme === 'neon' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-500' : 'text-green-400'}`}>
          ← Back to Blog
        </span>
      </Link>
      <h1 className={`text-4xl font-bold mb-4 glitch ${theme === 'neon' ? 'text-pink-500 animate-glitch-slow' : theme === 'light' ? 'text-blue-600' : 'text-green-400'}`}>
        {post.title}
      </h1>
      <p className="text-gray-500 mb-6">{post.date}</p>
      <div className="prose prose-invert max-w-none text-gray-300">
        <p>{post.content}</p>
      </div>
    </div>
  );
}