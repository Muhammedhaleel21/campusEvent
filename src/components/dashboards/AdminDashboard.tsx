import { Briefcase, Eye, PlusCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "My Postings", value: "12", icon: Briefcase, change: "+2" },
  { label: "Total Views", value: "1,847", icon: Eye, change: "+15%" },
  { label: "Active Events", value: "8", icon: TrendingUp, change: "+1" },
  { label: "Saves", value: "234", icon: PlusCircle, change: "+18%" },
];

const myPostings = [
  { id: 1, title: "Summer Internship at TechCorp", category: "Internship", views: 245, saves: 34, deadline: "2026-03-20", status: "active" },
  { id: 2, title: "AI/ML Workshop - March 2026", category: "Workshop", views: 189, saves: 22, deadline: "2026-03-05", status: "active" },
  { id: 3, title: "Campus Coding Contest", category: "Hackathon", views: 312, saves: 56, deadline: "2026-02-28", status: "expiring" },
  { id: 4, title: "GATE Scholarship Program", category: "Scholarship", views: 421, saves: 89, deadline: "2026-04-01", status: "active" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and track your posted opportunities</p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="w-4 h-4" /> Post New
        </Button>
      </div>

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

      <div className="bg-card rounded-xl shadow-card p-6">
        <h2 className="text-lg font-display font-semibold text-foreground mb-5">My Postings</h2>
        <div className="space-y-3">
          {myPostings.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-foreground text-sm truncate">{post.title}</p>
                  <Badge variant={post.status === "expiring" ? "destructive" : "secondary"} className="text-xs">
                    {post.status === "expiring" ? "Expiring Soon" : post.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {post.views} views · {post.saves} saves · Deadline: {post.deadline}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 text-xs">Edit</Button>
                <Button size="sm" variant="ghost" className="h-8 text-xs text-destructive">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
