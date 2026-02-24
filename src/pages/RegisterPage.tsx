import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, GraduationCap, Shield, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const roles: { value: UserRole; label: string; icon: typeof Shield; desc: string }[] = [
  { value: "super_admin", label: "Super Admin", icon: Shield, desc: "Institution / Organization" },
  { value: "admin", label: "Admin", icon: Briefcase, desc: "Post & manage opportunities" },
  { value: "student", label: "Student", icon: GraduationCap, desc: "Explore opportunities" },
  { value: "alumni", label: "Alumni", icon: Users, desc: "Stay connected" },
];

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgId, setOrgId] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: "Error", description: "Passwords don't match.", variant: "destructive" });
      return;
    }
    if (password.length < 8) {
      toast({ title: "Error", description: "Password must be 8+ characters.", variant: "destructive" });
      return;
    }
    register({ name, email, role, password, organizationId: orgId || undefined });
    toast({ title: "Account Created!", description: role === "admin" ? "Your admin request is pending approval." : "Welcome to CampusTrack!" });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(174_62%_40%_/_0.2),_transparent_50%)]" />
        <div className="relative text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-8 shadow-glow">
            <Briefcase className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-4xl font-display font-bold text-primary-foreground mb-4">Join CampusTrack</h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Create your account and unlock access to thousands of campus opportunities.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg animate-slide-up">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">CampusTrack</span>
          </div>

          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">
            {step === 1 ? "Choose your role to get started" : "Fill in your details"}
          </p>

          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      role === r.value
                        ? "border-accent bg-accent/5 shadow-glow"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    <r.icon className={`w-6 h-6 mb-2 ${role === r.value ? "text-accent" : "text-muted-foreground"}`} />
                    <div className="font-display font-semibold text-foreground text-sm">{r.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>
              <Button className="w-full h-11 mt-4" onClick={() => setStep(2)}>Continue</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="you@institution.edu" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>

              {role === "super_admin" && (
                <>
                  <div className="space-y-2">
                    <Label>Organization Name</Label>
                    <Input placeholder="Your college or company name" value={orgName} onChange={e => setOrgName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Organization ID / Registration No.</Label>
                    <Input placeholder="Unique registration number" value={orgId} onChange={e => setOrgId(e.target.value)} required />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="8+ characters" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Confirm</Label>
                  <Input type="password" placeholder="Repeat password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button type="submit" className="flex-1">Create Account</Button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
