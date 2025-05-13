import { GetServerSideProps } from 'next';
import HomeSection from '../components/Home/page';
import AboutUsSection from '../components/About-Us/page';
import TeamSection from '../components/Team Members/page';
import PortfolioPage from '../components/Portfolio/page';
import ContactPage from '../src/app/contact/page';
import Blog from '../components/Blog';
import connectDB from '../lib/mongodb';
import BlogModel from '../models/Blog';

interface HomeProps {
  posts: {
    _id: string;
    title: string;
    summary: string;
    content: string;
    createdAt: string;
  }[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <div>
      <HomeSection />
      <AboutUsSection />
      <TeamSection />
      <PortfolioPage />
      <Blog posts={posts} hidePagination paginationBasePath="/blog" id="blog-section" maxCards={4} />
      <ContactPage />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await connectDB();
  const posts = await BlogModel.find({})
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}; 