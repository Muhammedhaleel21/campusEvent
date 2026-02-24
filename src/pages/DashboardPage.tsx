import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import SuperAdminDashboard from "@/components/dashboards/SuperAdminDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import SavedPage from "@/pages/dashboard/SavedPage";
import ExplorePage from "@/pages/dashboard/ExplorePage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import PostOpportunityPage from "@/pages/dashboard/PostOpportunityPage";
import AnnouncementsPage from "@/pages/dashboard/AnnouncementsPage";
import AdminRequestsPage from "@/pages/dashboard/AdminRequestsPage";
import ManageAdminsPage from "@/pages/dashboard/ManageAdminsPage";
import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
import OpportunitiesPage from "@/pages/dashboard/OpportunitiesPage";

const DashboardHome = () => {
  const { user } = useAuth();
  switch (user?.role) {
    case "super_admin": return <SuperAdminDashboard />;
    case "admin": return <AdminDashboard />;
    default: return <StudentDashboard />;
  }
};

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="post" element={<PostOpportunityPage />} />
        <Route path="opportunities" element={<OpportunitiesPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="requests" element={<AdminRequestsPage />} />
        <Route path="admins" element={<ManageAdminsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardPage;
