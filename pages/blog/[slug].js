import { useRouter } from 'next/router';
import posts from '../../data/blogs.json';
import { useTheme } from '../../contexts/ThemeContext';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticPaths() {
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  return { props: { post } };
}

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const { theme } = useTheme();

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2
          className={`text-3xl font-bold ${
            theme === 'neon' ? 'text-pink-500' : theme === 'light' ? 'text-blue-600' : 'text-green-400'
          }`}
        >
          Post Not Found
        </h2>
        <p className="text-gray-300 mt-4">Sorry, that post doesn’t exist. Back to the vibes?</p>
        <Link href="/#blog">
          <span
            className={`mt-4 inline-block font-bold ${
              theme === 'neon' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-500' : 'text-green-400'
            }`}
          >
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
        <span
          className={`inline-block mb-6 font-bold ${
            theme === 'neon' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-500' : 'text-green-400'
          }`}
        >
          ← Back to Blog
        </span>
      </Link>
      <h1
        className={`text-4xl font-bold mb-4 glitch ${
          theme === 'neon'
            ? 'text-pink-500 animate-glitch-slow'
            : theme === 'light'
            ? 'text-blue-600'
            : 'text-green-400'
        }`}
      >
        {post.title}
      </h1>
         
      <p
        className={`text-sm mb-6 ${
          theme === 'neon' ? 'text-pink-400' : theme === 'light' ? 'text-blue-600' : 'text-gray-400'
        }`}
      >
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div
        className={`prose max-w-none ${
          theme === 'neon'
            ? 'text-pink-200 prose-a:text-cyan-400 prose-a:hover:text-cyan-300'
            : theme === 'light'
            ? 'text-blue-800 prose-a:text-blue-500 prose-a:hover:text-blue-400'
            : 'text-gray-200 prose-a:text-green-400 prose-a:hover:text-green-300'
        }`}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}