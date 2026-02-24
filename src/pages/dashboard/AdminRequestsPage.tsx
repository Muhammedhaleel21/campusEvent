import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const adminRequests = [
  { id: 1, name: "Priya Sharma", email: "priya@college.edu", reason: "Placement coordinator", proof: "ID_Priya.pdf", date: "2026-02-22" },
  { id: 2, name: "Ravi Kumar", email: "ravi@college.edu", reason: "Department HOD", proof: "ID_Ravi.pdf", date: "2026-02-21" },
  { id: 3, name: "Anita Desai", email: "anita@college.edu", reason: "Training & placement cell", proof: "ID_Anita.pdf", date: "2026-02-20" },
];

const AdminRequestsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Admin Requests</h1>
        <p className="text-muted-foreground mt-1">Review and manage admin registration requests</p>
      </div>

      <div className="space-y-3">
        {adminRequests.map((req) => (
          <div key={req.id} className="bg-card rounded-xl shadow-card p-5 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-display font-bold text-accent text-sm">
                {req.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{req.name}</p>
                <p className="text-xs text-muted-foreground">{req.email} · {req.reason}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Proof: {req.proof}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground mr-2 hidden sm:inline">
                <Clock className="w-3 h-3 inline mr-1" />{req.date}
              </span>
              <Button size="sm" className="h-8 text-xs gap-1"><CheckCircle className="w-3 h-3" /> Approve</Button>
              <Button size="sm" variant="outline" className="h-8 text-xs gap-1"><XCircle className="w-3 h-3" /> Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRequestsPage;
