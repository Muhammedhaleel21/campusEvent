import { Users, Briefcase, FileCheck, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Students", value: "2,847", icon: Users, change: "+12%" },
  { label: "Total Opportunities", value: "186", icon: Briefcase, change: "+8%" },
  { label: "Active Events", value: "24", icon: TrendingUp, change: "+3" },
  { label: "Pending Requests", value: "5", icon: FileCheck, change: "New" },
];

const adminRequests = [
  { id: 1, name: "Priya Sharma", email: "priya@college.edu", reason: "Placement coordinator", status: "pending", date: "2026-02-22" },
  { id: 2, name: "Ravi Kumar", email: "ravi@college.edu", reason: "Department HOD", status: "pending", date: "2026-02-21" },
  { id: 3, name: "Anita Desai", email: "anita@college.edu", reason: "Training & placement cell", status: "pending", date: "2026-02-20" },
];

const recentOpportunities = [
  { id: 1, title: "Google Summer Internship 2026", category: "Internship", admin: "James Park", views: 342, deadline: "2026-03-15" },
  { id: 2, title: "National Hackathon Challenge", category: "Hackathon", admin: "James Park", views: 189, deadline: "2026-03-01" },
  { id: 3, title: "Microsoft Campus Hiring", category: "Placement", admin: "James Park", views: 567, deadline: "2026-04-10" },
];

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your organization's activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
            <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Admin Requests */}
      <div className="bg-card rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-display font-semibold text-foreground">Admin Requests</h2>
          <Badge variant="secondary">{adminRequests.length} pending</Badge>
        </div>
        <div className="space-y-3">
          {adminRequests.map((req) => (
            <div key={req.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-display font-bold text-accent text-sm">
                  {req.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{req.name}</p>
                  <p className="text-xs text-muted-foreground">{req.email} · {req.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground mr-2 hidden sm:inline">
                  <Clock className="w-3 h-3 inline mr-1" />{req.date}
                </span>
                <Button size="sm" className="h-8 text-xs gap-1">
                  <CheckCircle className="w-3 h-3" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                  <XCircle className="w-3 h-3" /> Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Opportunities */}
      <div className="bg-card rounded-xl shadow-card p-6">
        <h2 className="text-lg font-display font-semibold text-foreground mb-5">Recent Opportunities</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Title</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Category</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Posted By</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Views</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {recentOpportunities.map((opp) => (
                <tr key={opp.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-3 px-2 font-medium text-foreground">{opp.title}</td>
                  <td className="py-3 px-2"><Badge variant="secondary">{opp.category}</Badge></td>
                  <td className="py-3 px-2 text-muted-foreground">{opp.admin}</td>
                  <td className="py-3 px-2 text-muted-foreground">{opp.views}</td>
                  <td className="py-3 px-2 text-muted-foreground">{opp.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
