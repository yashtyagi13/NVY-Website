import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching blog' });
      }
      break;

    case 'PUT':
      try {
        const blog = await Blog.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
      } catch (error) {
        res.status(400).json({ error: 'Error updating blog' });
      }
      break;

    case 'DELETE':
      try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
      } catch (error) {
        res.status(400).json({ error: 'Error deleting blog' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
} 