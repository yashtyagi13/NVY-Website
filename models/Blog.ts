import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog post.'],
  },
  summary: {
    type: String,
    required: [true, 'Please provide a summary for this blog post.'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this blog post.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema); 