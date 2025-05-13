import { GetServerSideProps } from 'next';
import Link from 'next/link';
import connectDB from '../../lib/mongodb';
import BlogModel from '../../models/Blog';

interface BlogPostProps {
  post: {
    _id: string;
    title: string;
    summary: string;
    content: string;
    createdAt: string;
  };
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/#blog-section"
          className="mb-8 inline-block text-blue-600 hover:text-blue-800"
        >
          ← Back to Blogs
        </Link>
        <article className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-6">{post.summary}</p>
          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 text-gray-500">
            Posted on {new Date(post.createdAt).toISOString().slice(0, 10)}
          </div>
        </article>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await connectDB();
  const post = await BlogModel.findById(params?.id).lean();

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}; 