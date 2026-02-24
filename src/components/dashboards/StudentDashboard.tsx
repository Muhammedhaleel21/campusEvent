import { useState } from "react";
import { Bookmark, BookmarkCheck, Briefcase, Clock, Filter, GraduationCap, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Internship", "Hackathon", "Placement", "Scholarship", "Workshop"];

const opportunities = [
  { id: 1, title: "Google Summer Internship 2026", org: "Google", category: "Internship", deadline: "2026-03-15", daysLeft: 19, skills: ["Python", "ML", "Data Science"], views: 342, saved: false },
  { id: 2, title: "National Hackathon Challenge", org: "HackIndia", category: "Hackathon", deadline: "2026-03-01", daysLeft: 5, skills: ["React", "Node.js"], views: 189, saved: true },
  { id: 3, title: "Microsoft Campus Hiring", org: "Microsoft", category: "Placement", deadline: "2026-04-10", daysLeft: 45, skills: ["DSA", "System Design"], views: 567, saved: false },
  { id: 4, title: "GATE Scholarship Program", org: "AICTE", category: "Scholarship", deadline: "2026-04-01", daysLeft: 36, skills: ["Engineering"], views: 421, saved: false },
  { id: 5, title: "AWS Cloud Workshop", org: "Amazon", category: "Workshop", deadline: "2026-03-10", daysLeft: 14, skills: ["AWS", "Cloud"], views: 156, saved: true },
  { id: 6, title: "TCS CodeVita Programming Contest", org: "TCS", category: "Hackathon", deadline: "2026-03-25", daysLeft: 29, skills: ["C++", "Java", "DSA"], views: 298, saved: false },
];

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedIds, setSavedIds] = useState<number[]>([2, 5]);

  const filtered = opportunities.filter(
    (opp) =>
      (activeCategory === "All" || opp.category === activeCategory) &&
      (opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.org.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSave = (id: number) => {
    setSavedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Explore Opportunities</h1>
        <p className="text-muted-foreground mt-1">Find internships, hackathons, placements and more</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-xl font-display font-bold text-foreground">{opportunities.length}</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <BookmarkCheck className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-xl font-display font-bold text-foreground">{savedIds.length}</div>
            <div className="text-xs text-muted-foreground">Saved</div>
          </div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-xl font-display font-bold text-foreground">3</div>
            <div className="text-xs text-muted-foreground">Expiring Soon</div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search opportunities..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              className="text-xs whitespace-nowrap"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Opportunity Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((opp) => (
          <div key={opp.id} className="bg-card rounded-xl shadow-card p-5 hover:shadow-card-hover transition-all duration-300 group border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <Badge variant="secondary" className="text-xs">{opp.category}</Badge>
              <button onClick={() => toggleSave(opp.id)} className="text-muted-foreground hover:text-accent transition-colors">
                {savedIds.includes(opp.id) ? <BookmarkCheck className="w-5 h-5 text-accent" /> : <Bookmark className="w-5 h-5" />}
              </button>
            </div>
            <h3 className="font-display font-semibold text-foreground text-base mb-1 group-hover:text-accent transition-colors">{opp.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{opp.org}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {opp.skills.map((s) => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{s}</span>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {opp.daysLeft <= 7 ? (
                  <span className="text-destructive font-medium">{opp.daysLeft}d left</span>
                ) : (
                  <span>{opp.daysLeft} days left</span>
                )}
              </span>
              <span>{opp.views} views</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <GraduationCap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No opportunities found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
