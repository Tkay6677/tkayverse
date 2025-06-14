import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const result = await db.collection('contacts').insertOne({ name, email, message, createdAt: new Date() });
    return res.status(201).json({ insertedId: result.insertedId });
  }

  if (req.method === 'GET') {
    const contacts = await db.collection('contacts').find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(contacts);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
