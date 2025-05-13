import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json(blogs);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching blogs' });
      }
      break;

    case 'POST':
      try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
      } catch (error) {
        res.status(400).json({ error: 'Error creating blog' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
} 