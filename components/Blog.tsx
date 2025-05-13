import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogPost {
  _id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
}

interface BlogProps {
  posts: BlogPost[];
  currentPage?: number;
  totalPages?: number;
  hidePagination?: boolean;
  paginationBasePath?: string;
  id?: string;
  maxCards?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: 'spring', stiffness: 80 },
  }),
};

const Blog: React.FC<BlogProps> = ({ posts, currentPage = 1, totalPages = 1, hidePagination = false, paginationBasePath = '', id, maxCards }) => {
  // Only show up to maxCards if provided
  const displayPosts = maxCards ? posts.slice(0, maxCards) : posts;
  // Calculate number of rows for min-h to keep grid symmetric
  const cardsPerRow = 4;
  const rowCount = Math.ceil(displayPosts.length / cardsPerRow);

  return (
    <div
      className="relative w-full py-12 px-4"
      id={id}
      style={{
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
        minHeight: '100vh',
      }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 drop-shadow-lg">Latest Blog Posts</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center"
        style={{ minHeight: `${rowCount * 440}px` }}
      >
        {displayPosts.map((post, i) => (
          <motion.div
            key={post._id}
            className="relative w-full max-w-sm bg-gradient-to-br from-white/80 to-blue-100/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-200 p-6 flex flex-col justify-between group transition-transform duration-300 h-[410px] min-h-[410px]"
            initial="hidden"
            animate="visible"
            custom={i}
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.04,
              rotate: -2,
              boxShadow: '0 12px 32px 0 rgba(0, 123, 255, 0.25)',
              transition: { type: 'spring', stiffness: 200, damping: 10 },
            }}
          >
            <div className="flex flex-col flex-1">
              <h3 className="text-2xl font-bold mb-2 text-blue-900 group-hover:text-blue-700 transition-colors duration-200 break-words">
                {post.title}
              </h3>
              <div className="text-gray-500 text-xs mb-2">
                {new Date(post.createdAt).toISOString().slice(0, 10)}
              </div>
              <p className="text-gray-700 mb-6 line-clamp-7 min-h-[168px]">
                {post.summary}
              </p>
            </div>
            <Link
              href={`/blog/${post._id}`}
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:from-blue-600 hover:to-blue-800 transition-colors duration-200 text-center mt-2"
            >
              Read More
            </Link>
            <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:shadow-xl group-hover:shadow-blue-200 transition-all duration-300" />
          </motion.div>
        ))}
      </div>
      {/* Pagination */}
      {!hidePagination && totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <nav className="flex gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <Link
                key={idx}
                href={`${paginationBasePath}?page=${idx + 1}`}
                className={`px-3 py-1 rounded-lg font-medium transition-colors duration-200 ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-100'}`}
              >
                {idx + 1}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Blog; 