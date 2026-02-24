import { Bookmark, BookmarkCheck, Clock, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const savedOpportunities = [
  { id: 2, title: "National Hackathon Challenge", org: "HackIndia", category: "Hackathon", deadline: "2026-03-01", daysLeft: 5, skills: ["React", "Node.js"] },
  { id: 5, title: "AWS Cloud Workshop", org: "Amazon", category: "Workshop", deadline: "2026-03-10", daysLeft: 14, skills: ["AWS", "Cloud"] },
];

const SavedPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Saved Opportunities</h1>
        <p className="text-muted-foreground mt-1">Your bookmarked opportunities for quick access</p>
      </div>

      {savedOpportunities.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {savedOpportunities.map((opp) => (
            <div key={opp.id} className="bg-card rounded-xl shadow-card p-5 hover:shadow-card-hover transition-all duration-300 group border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="text-xs">{opp.category}</Badge>
                <BookmarkCheck className="w-5 h-5 text-accent" />
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
                <Button variant="ghost" size="sm" className="text-xs h-7 text-destructive">Remove</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Bookmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No saved opportunities yet. Start exploring!</p>
        </div>
      )}
    </div>
  );
};

export default SavedPage;
