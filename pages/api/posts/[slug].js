import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const {
    query: { slug },
    method,
  } = req;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  if (method === 'GET') {
    const post = await db.collection('posts').findOne({ slug });
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(200).json(post);
    return;
  }

  if (method === 'PUT') {
    const { title, snippet, content, date, previewImage } = req.body;
    if (!title || !snippet || !content || !date) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    await db.collection('posts').updateOne(
      { slug },
      { $set: { title, snippet, content, date: new Date(date), previewImage } }
    );
    const updatedPost = await db.collection('posts').findOne({ slug });
    res.status(200).json(updatedPost);
    return;
  }

  if (method === 'DELETE') {
    await db.collection('posts').deleteOne({ slug });
    res.status(204).end();
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
