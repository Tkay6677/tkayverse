import posts from '../data/blogs.json';

export async function getServerSideProps({ res }) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://tkayverse.vercel.app/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
      ${posts
        .map(
          (post) => `
        <url>
          <loc>https://tkayverse.vercel.app/blog/${post.slug}</loc>
          <lastmod>${post.date}</lastmod>
          <priority>0.7</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}