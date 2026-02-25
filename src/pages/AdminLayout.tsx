import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "@/components/AdminSidebar";

const AdminLayout = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-background">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
