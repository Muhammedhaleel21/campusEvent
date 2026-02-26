import { Briefcase, Eye, PlusCircle, TrendingUp, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// stats will be generated inside component because some values depend on state

// sample static postings that always appear (could be removed if not needed)
const staticPostings = [
  { id: 1, title: "Summer Internship at TechCorp", category: "Internship", views: 245, saves: 34, deadline: "2026-03-20", status: "active" },
  { id: 2, title: "AI/ML Workshop - March 2026", category: "Workshop", views: 189, saves: 22, deadline: "2026-03-05", status: "active" },
  { id: 3, title: "Campus Coding Contest", category: "Hackathon", views: 312, saves: 56, deadline: "2026-02-28", status: "expiring" },
  { id: 4, title: "GATE Scholarship Program", category: "Scholarship", views: 421, saves: 89, deadline: "2026-04-01", status: "active" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [myPostings, setMyPostings] = useState<any[]>([]);

  const stats = [
    { label: "My Postings", value: myPostings.length.toString(), icon: Briefcase, change: "" },
    // other stats could also be computed from postings
    { label: "Total Views", value: myPostings.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString(), icon: Eye, change: "" },
    { label: "Active Events", value: myPostings.filter(p => p.status !== 'expired').length.toString(), icon: TrendingUp, change: "" },
    { label: "Saves", value: myPostings.reduce((sum, p) => sum + (p.saves || 0), 0).toLocaleString(), icon: PlusCircle, change: "" },
  ];

  const loadPostings = () => {
    const stored: any[] = JSON.parse(localStorage.getItem('postedOpportunities') || '[]');
    setMyPostings([...staticPostings, ...stored]);
  };

  useEffect(() => {
    loadPostings();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'postedOpportunities') {
        loadPostings();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleDelete = (id: number) => {
    // remove from localStorage array as well
    const stored: any[] = JSON.parse(localStorage.getItem('postedOpportunities') || '[]');
    const filtered = stored.filter(o => o.id !== id);
    localStorage.setItem('postedOpportunities', JSON.stringify(filtered));
    setMyPostings(prev => prev.filter(p => p.id !== id));
  };

  const handleEdit = (id: number) => {
    navigate(`/dashboard/post?id=${id}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and track your posted opportunities</p>
        </div>
        <Button className="gap-2" onClick={() => navigate('/dashboard/post')}>
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
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-medium text-foreground text-sm truncate">{post.title}</p>
                  <Badge variant={post.status === "expiring" ? "destructive" : "secondary"} className="text-xs">
                    {post.status === "expiring" ? "Expiring Soon" : post.category}
                  </Badge>
                  {post.eventType === "group" ? (
                    <Badge className="text-xs bg-accent/10 text-accent border border-accent/20 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Group
                    </Badge>
                  ) : (
                    <Badge className="text-xs bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-1">
                      <User className="w-3 h-3" /> Single
                    </Badge>
                  )}
                  {post.registrationFee && (
                    <Badge className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                      💰 {post.registrationFee}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {post.views || 0} views · {post.saves || 0} saves · Deadline: {post.deadline}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => handleEdit(post.id)}>Edit</Button>
                <Button size="sm" variant="ghost" className="h-8 text-xs text-destructive" onClick={() => handleDelete(post.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {myPostings.length === 0 && <p className="text-center text-sm text-muted-foreground">No postings yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
