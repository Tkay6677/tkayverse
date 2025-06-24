// scripts/build-rss.js
// Generates public/feed.xml from MongoDB posts collection.
// Run automatically after `next build` via the postbuild script.

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });


(async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI not set – skipping RSS generation');
    return;
  }
  try {
    let clientPromiseExport = require('../lib/mongodb');
    const clientPromise = clientPromiseExport.default || clientPromiseExport;
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'tkay';
    const db = client.db(dbName);
    const posts = await db.collection('posts').find({}).sort({ date: -1 }).toArray();

    const site = 'https://tkayverse.vercel.app';

    const itemsXml = posts
      .map((post) => {
        const url = `${site}/blog/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();
        return `\n    <item>\n      <title><![CDATA[${post.title}]]></title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description><![CDATA[${post.snippet}]]></description>\n    </item>`;
      })
      .join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Tkayverse Blog</title>\n    <link>${site}</link>\n    <description>Rust, Solana & .NET musings</description>${itemsXml}\n  </channel>\n</rss>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'feed.xml'), rss);
    // eslint-disable-next-line no-console
    console.log('✅ RSS feed generated at public/feed.xml');
    if (client && client.close) await client.close();
  } catch (err) {
    console.error('RSS generation error:', err);
    console.warn('RSS generation error:', err.message);
    // Do not fail the build – continue gracefully
    return;
  }
})();
