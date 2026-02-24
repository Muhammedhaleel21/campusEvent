import { useAuth } from "@/contexts/AuthContext";
import SuperAdminDashboard from "@/components/dashboards/SuperAdminDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import DashboardLayout from "@/components/DashboardLayout";

const DashboardPage = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case "super_admin": return <SuperAdminDashboard />;
      case "admin": return <AdminDashboard />;
      case "student":
      case "alumni":
      default: return <StudentDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default DashboardPage;
