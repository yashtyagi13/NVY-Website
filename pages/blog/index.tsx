import { GetServerSideProps } from 'next';
import Blog from '../../components/Blog';
import connectDB from '../../lib/mongodb';
import BlogModel from '../../models/Blog';

interface BlogPageProps {
  posts: {
    _id: string;
    title: string;
    summary: string;
    content: string;
    createdAt: string;
  }[];
  currentPage: number;
  totalPages: number;
}

export default function BlogPage({ posts, currentPage, totalPages }: BlogPageProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
      minHeight: '100vh',
    }}>
      <Blog posts={posts} currentPage={currentPage} totalPages={totalPages} paginationBasePath="/blog" maxCards={4} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const page = parseInt((context.query.page as string) || '1', 10);
  const limit = 4;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    BlogModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    BlogModel.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      currentPage: page,
      totalPages,
    },
  };
}; 