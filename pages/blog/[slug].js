import clientPromise from '../../lib/mongodb';
import { useTheme } from '../../contexts/ThemeContext';
import Head from 'next/head';
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const post = await db.collection('posts').findOne({ slug: params.slug });
  if (!post) {
    return { notFound: true };
  }
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}

export default function BlogPost({ post }) {
  
  
  const { theme } = useTheme();

  

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
        <title>{post.title} | Tkay’s Tech Vibe Check</title>
        <meta name="description" content={post.snippet.slice(0, 160)} />
        <meta name="keywords" content={`Rust, Solana, .NET, ${post.title.split(' ').join(', ')}, Tkay portfolio`} />
        <meta name="author" content="Tkay" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.snippet.slice(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tkayverse.vercel.app/blog/${post.slug}`} />
        <meta property="og:image" content={post.previewImage || '/images/blog/placeholder.png'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.snippet.slice(0, 160)} />
        <meta name="twitter:image" content={post.previewImage || '/images/blog/placeholder.png'} />
        <link rel="canonical" href={`https://tkayverse.vercel.app/blog/${post.slug}`} />
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