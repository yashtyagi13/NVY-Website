import { useRouter } from 'next/router';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const router = useRouter();
  const adminRoute = process.env.ADMIN_ROUTE;

  // Only render if the route matches the env variable
  if (router.query.adminRoute !== adminRoute) {
    return <div>404 - Page Not Found</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <AdminDashboard />
    </main>
  );
} 