import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield, Bell, Eye } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl shadow-card p-6 space-y-4 border border-border/50">
        <h2 className="font-display font-semibold text-foreground flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Deadline Reminders</p>
            <p className="text-xs text-muted-foreground">Get notified before deadlines</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">New Opportunities</p>
            <p className="text-xs text-muted-foreground">Alert when new posts match your skills</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      {/* Security */}
      <div className="bg-card rounded-xl shadow-card p-6 space-y-4 border border-border/50">
        <h2 className="font-display font-semibold text-foreground flex items-center gap-2"><Shield className="w-4 h-4" /> Security</h2>
        <div className="space-y-2">
          <Label>Current Password</Label>
          <Input type="password" placeholder="Enter current password" />
        </div>
        <div className="space-y-2">
          <Label>New Password</Label>
          <Input type="password" placeholder="Enter new password" />
        </div>
        <Button>Update Password</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
