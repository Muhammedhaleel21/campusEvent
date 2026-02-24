import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(email, password);
      toast({ title: "Welcome back!", description: "You've been logged in successfully." });
      navigate("/dashboard");
    } catch {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(174_62%_40%_/_0.2),_transparent_50%)]" />
        <div className="relative text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-8 shadow-glow">
            <Briefcase className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-4xl font-display font-bold text-primary-foreground mb-4">
            Welcome Back
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Access your dashboard and stay updated with the latest campus opportunities.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-up">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">CampusTrack</span>
          </div>

          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Sign In</h1>
          <p className="text-muted-foreground mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@institution.edu" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-11">Sign In</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent font-medium hover:underline">Create one</Link>
          </p>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Super Admin: admin@college.edu / Admin123!</p>
              <p>Admin: james@college.edu / Admin123!</p>
              <p>Student: emily@student.edu / Student1!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
