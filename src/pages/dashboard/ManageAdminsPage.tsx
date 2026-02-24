import { Users, Ban, Trash2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const admins = [
  { id: 1, name: "James Park", email: "james@college.edu", status: "active", postings: 12 },
  { id: 2, name: "Priya Sharma", email: "priya@college.edu", status: "active", postings: 5 },
  { id: 3, name: "Mike Johnson", email: "mike@college.edu", status: "suspended", postings: 3 },
];

const ManageAdminsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Manage Admins</h1>
          <p className="text-muted-foreground mt-1">Add, remove, or suspend admin accounts</p>
        </div>
        <Button className="gap-2"><PlusCircle className="w-4 h-4" /> Add Admin</Button>
      </div>

      <div className="space-y-3">
        {admins.map((admin) => (
          <div key={admin.id} className="bg-card rounded-xl shadow-card p-5 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-display font-bold text-accent text-sm">
                {admin.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{admin.name}</p>
                <p className="text-xs text-muted-foreground">{admin.email} · {admin.postings} postings</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={admin.status === "active" ? "secondary" : "destructive"} className="capitalize">{admin.status}</Badge>
              <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                <Ban className="w-3 h-3" /> {admin.status === "active" ? "Suspend" : "Activate"}
              </Button>
              <Button size="sm" variant="ghost" className="h-8 text-xs text-destructive gap-1">
                <Trash2 className="w-3 h-3" /> Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAdminsPage;
