import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  switch (method) {
    case 'PUT': {
      const { title, desc, tech, link, image } = req.body;
      if (!title || !desc || !tech || !link) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const techArr = Array.isArray(tech)
        ? tech
        : tech.split(',').map((s) => s.trim());
      await db.collection('projects').updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, desc, tech: techArr, link, image } }
      );
      const updatedProj = await db
        .collection('projects')
        .findOne({ _id: new ObjectId(id) });
      return res.status(200).json(updatedProj);
    }
    case 'DELETE': {
      await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
      return res.status(204).end();
    }
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
