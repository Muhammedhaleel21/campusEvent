import { Briefcase, GraduationCap, Shield, Users, ArrowRight, Zap, Globe, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">CampusTrack</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#roles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Roles</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Log in</Button>
            <Button size="sm" onClick={() => navigate("/register")}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Campus Opportunity Tracker
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              Never Miss an
              <span className="text-accent"> Opportunity</span> Again
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover internships, hackathons, placements, and scholarships — all in one place. 
              Built for students, powered by institutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="hero" className="text-base px-8 h-12" onClick={() => navigate("/register")}>
                Start Exploring <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 h-12" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto">
            {[
              { label: "Opportunities", value: "2,500+" },
              { label: "Students", value: "15,000+" },
              { label: "Institutions", value: "120+" },
              { label: "Success Rate", value: "89%" },
            ].map((stat) => (
              <div key={stat.label} className="stat-card text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A comprehensive platform designed to bridge the gap between talent and opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Globe, title: "Smart Discovery", desc: "Personalized feed based on your skills, interests, and academic profile." },
              { icon: Bell, title: "Deadline Alerts", desc: "Never miss a deadline with smart reminders and countdown timers." },
              { icon: Shield, title: "Verified Postings", desc: "All opportunities are verified by institution admins for authenticity." },
              { icon: Users, title: "Multi-Role System", desc: "Super Admin, Admin, Student & Alumni — each with tailored dashboards." },
              { icon: Briefcase, title: "Opportunity Management", desc: "Admins can create, edit, and track engagement on posted opportunities." },
              { icon: GraduationCap, title: "Analytics & Insights", desc: "Track engagement, views, and student activity with powerful analytics." },
            ].map((feature) => (
              <div key={feature.title} className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Built for Every Role
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Role-based access ensures everyone has the right tools and permissions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { role: "Super Admin", desc: "Register your institution, approve admins, oversee all opportunities and analytics.", icon: Shield, color: "bg-primary/10 text-primary" },
              { role: "Admin", desc: "Post opportunities, send announcements, manage student engagement and events.", icon: Briefcase, color: "bg-accent/10 text-accent" },
              { role: "Student / Alumni", desc: "Browse opportunities, bookmark favorites, set reminders, and build your profile.", icon: GraduationCap, color: "bg-success/10 text-success" },
            ].map((item) => (
              <div key={item.role} className="text-center p-8 rounded-2xl border border-border hover:border-accent/30 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-5`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{item.role}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="gradient-hero rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(174_62%_40%_/_0.2),_transparent_50%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
                Join thousands of students and institutions already using CampusTrack.
              </p>
              <Button size="lg" variant="hero" className="text-base px-8 h-12" onClick={() => navigate("/register")}>
                Create Your Account <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-accent flex items-center justify-center">
              <Briefcase className="w-3 h-3 text-accent-foreground" />
            </div>
            <span className="font-display font-semibold text-sm text-foreground">CampusTrack</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 CampusTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
