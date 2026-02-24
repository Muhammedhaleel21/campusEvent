import { BarChart3, Users, Briefcase, TrendingUp, Eye } from "lucide-react";

const stats = [
  { label: "Total Students", value: "2,847", icon: Users },
  { label: "Total Opportunities", value: "186", icon: Briefcase },
  { label: "Active Events", value: "24", icon: TrendingUp },
  { label: "Total Views", value: "12,450", icon: Eye },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Organization-wide metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl shadow-card p-6 border border-border/50">
        <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" /> Engagement Overview
        </h2>
        <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
          Chart visualization will appear here with real data
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
