import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  if (req.method === 'GET') {
    const posts = await db.collection('posts').find({}).sort({ date: -1 }).toArray();
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { title, slug, snippet, content, date, previewImage } = req.body;
    if (!title || !slug || !content || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await db.collection('posts').insertOne({ title, slug, snippet, content, date: new Date(date), previewImage });
    return res.status(201).json({ insertedId: result.insertedId });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
