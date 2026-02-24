import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, GraduationCap, Award, Wrench } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information</p>
      </div>

      <div className="bg-card rounded-xl shadow-card p-6 space-y-6 border border-border/50">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-2xl font-display font-bold text-accent">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">{user?.name}</h2>
            <Badge variant="secondary" className="capitalize mt-1">{user?.role?.replace("_", " ")}</Badge>
          </div>
        </div>

        {/* Fields */}
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> Full Name</Label>
            <Input defaultValue={user?.name} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</Label>
            <Input defaultValue={user?.email} disabled />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5" /> College</Label>
            <Input placeholder="Enter your college name" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Wrench className="w-3.5 h-3.5" /> Skills</Label>
            <Input placeholder="e.g. React, Python, Machine Learning" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Award className="w-3.5 h-3.5" /> Achievements</Label>
            <Input placeholder="e.g. Won Smart India Hackathon 2025" />
          </div>
        </div>

        <Button className="w-full sm:w-auto">Save Changes</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
