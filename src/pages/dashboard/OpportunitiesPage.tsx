import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import StudentDashboard from "@/components/dashboards/StudentDashboard";

const OpportunitiesPage = () => {
  const { user } = useAuth();
  
  if (user?.role === "admin") return <AdminDashboard />;
  if (user?.role === "super_admin") return <StudentDashboard />;
  return <StudentDashboard />;
};

export default OpportunitiesPage;
