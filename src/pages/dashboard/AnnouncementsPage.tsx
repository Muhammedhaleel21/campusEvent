import { Bell, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const announcements = [
  { id: 1, title: "Placement Drive Next Week", message: "TCS & Infosys visiting campus on March 5th.", date: "2026-02-23" },
  { id: 2, title: "Hackathon Registration Open", message: "Register for the National Hackathon before March 1st.", date: "2026-02-20" },
];

const AnnouncementsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Announcements</h1>
        <p className="text-muted-foreground mt-1">Send and manage announcements</p>
      </div>

      {/* New Announcement */}
      <div className="bg-card rounded-xl shadow-card p-6 space-y-4 border border-border/50 max-w-2xl">
        <h2 className="font-display font-semibold text-foreground flex items-center gap-2"><Send className="w-4 h-4" /> New Announcement</h2>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input placeholder="Announcement title" />
        </div>
        <div className="space-y-2">
          <Label>Message</Label>
          <Textarea placeholder="Write your announcement..." rows={3} />
        </div>
        <Button className="gap-2"><Send className="w-3.5 h-3.5" /> Send Announcement</Button>
      </div>

      {/* Previous */}
      <div className="space-y-3">
        <h2 className="font-display font-semibold text-foreground">Previous Announcements</h2>
        {announcements.map((a) => (
          <div key={a.id} className="bg-card rounded-xl shadow-card p-5 border border-border/50">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-foreground flex items-center gap-2">
                <Bell className="w-4 h-4 text-accent" /> {a.title}
              </h3>
              <span className="text-xs text-muted-foreground">{a.date}</span>
            </div>
            <p className="text-sm text-muted-foreground">{a.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
