import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  if (req.method === 'GET') {
    const projects = await db
      .collection('projects')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return res.status(200).json(projects);
  }

  if (req.method === 'POST') {
    const { title, desc, tech, link, image } = req.body;
    if (!title || !desc || !tech || !link) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const techArr = Array.isArray(tech)
      ? tech
      : tech.split(',').map((s) => s.trim());
    const result = await db.collection('projects').insertOne({
      title,
      desc,
      tech: techArr,
      link,
      image,
      createdAt: new Date(),
    });
    return res.status(201).json({ insertedId: result.insertedId });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
