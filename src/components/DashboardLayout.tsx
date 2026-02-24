import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Briefcase, LayoutDashboard, Users, FileCheck, BarChart3, 
  Settings, LogOut, Bell, ChevronRight, PlusCircle, Bookmark, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
}

const roleNavItems: Record<string, NavItem[]> = {
  super_admin: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Admin Requests", path: "/dashboard/requests", icon: FileCheck },
    { label: "Manage Admins", path: "/dashboard/admins", icon: Users },
    { label: "Opportunities", path: "/dashboard/opportunities", icon: Briefcase },
    { label: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
    { label: "Settings", path: "/dashboard/settings", icon: Settings },
  ],
  admin: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Post Opportunity", path: "/dashboard/post", icon: PlusCircle },
    { label: "My Postings", path: "/dashboard/opportunities", icon: Briefcase },
    { label: "Announcements", path: "/dashboard/announcements", icon: Bell },
    { label: "Settings", path: "/dashboard/settings", icon: Settings },
  ],
  student: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Explore", path: "/dashboard/explore", icon: Search },
    { label: "Saved", path: "/dashboard/saved", icon: Bookmark },
    { label: "Profile", path: "/dashboard/profile", icon: Settings },
  ],
  alumni: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Explore", path: "/dashboard/explore", icon: Search },
    { label: "Saved", path: "/dashboard/saved", icon: Bookmark },
    { label: "Profile", path: "/dashboard/profile", icon: Settings },
  ],
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = roleNavItems[user?.role || "student"];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="p-5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-display font-bold text-sidebar-foreground">CampusTrack</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-primary">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/50 capitalize">{user?.role?.replace("_", " ")}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 glass border-b border-border/50 px-6 py-3 flex items-center justify-between">
          <div className="md:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded gradient-accent flex items-center justify-center">
              <Briefcase className="w-3.5 h-3.5 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-sm">CampusTrack</span>
          </div>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent" />
            </Button>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
