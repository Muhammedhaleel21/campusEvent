import { useState, useEffect } from "react";
import {
  Bookmark, BookmarkCheck, Briefcase, Clock, Filter, GraduationCap,
  Search, TrendingUp, MapPin, Calendar, X, ExternalLink, Users,
  Award, DollarSign, Globe, CheckCircle, AlertCircle, Mail, Phone,
  Link as LinkIcon, Share2, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Internship", "Hackathon", "Placement", "Scholarship", "Workshop"];

const baseOpportunities = [
  {
    id: 1,
    title: "Google Summer Internship 2026",
    org: "Google",
    category: "Internship",
    deadline: "2026-03-15",
    daysLeft: 19,
    skills: ["Python", "ML", "Data Science"],
    views: 342,
    saved: false,
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&auto=format",
    location: "Mountain View, CA (Remote)",
    description: "Join Google for an immersive summer internship experience. Work on real-world projects, collaborate with顶尖 engineers, and contribute to products used by millions.",
    stipend: "$8,000/month",
    duration: "10-12 weeks",
    openings: 25,
    applied: 342,
    requirements: [
      "Pursuing B.Tech/M.Tech in CS or related field",
      "Strong DSA and problem-solving skills",
      "Experience with Python/Java",
      "Minimum GPA: 8.0"
    ],
    perks: [
      "Housing stipend",
      "Mentorship program",
      "Networking events",
      "Potential full-time offer"
    ],
    contact: {
      email: "internships@google.com",
      website: "careers.google.com/internships"
    }
  },
  {
    id: 2,
    title: "National Hackathon Challenge",
    org: "HackIndia",
    category: "Hackathon",
    deadline: "2026-03-01",
    daysLeft: 5,
    skills: ["React", "Node.js"],
    views: 189,
    saved: true,
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100&h=100&fit=crop&auto=format",
    location: "Bangalore, India (In-person)",
    description: "India's biggest hackathon with ₹10L in prizes. Build innovative solutions for real-world problems and get noticed by top tech companies.",
    prize: "₹10,00,000",
    duration: "48 hours",
    teams: "2-4 members",
    registered: 189,
    requirements: [
      "Open to all college students",
      "Team size: 2-4",
      "Bring your own laptop",
      "Preliminary round online"
    ],
    perks: [
      "Cash prizes for winners",
      "Internship opportunities",
      "Networking with industry experts",
      "Goodies and swag"
    ],
    contact: {
      email: "hackathon@hackindia.com",
      website: "hackindia.com/challenge"
    }
  },
  {
    id: 3,
    title: "Microsoft Campus Hiring",
    org: "Microsoft",
    category: "Placement",
    deadline: "2026-04-10",
    daysLeft: 45,
    skills: ["DSA", "System Design"],
    views: 567,
    saved: false,
    logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=100&h=100&fit=crop&auto=format",
    location: "Hyderabad, India",
    description: "Microsoft is hiring fresh graduates for software engineering roles. Join the team that builds world-class products and services.",
    salary: "₹25-35 LPA",
    role: "Software Engineer",
    openings: 150,
    applied: 4567,
    requirements: [
      "2025/2026 batch graduates",
      "Strong coding skills",
      "System design knowledge",
      "Good communication skills"
    ],
    perks: [
      "Competitive salary",
      "Health insurance",
      "Stock options",
      "Learning budget"
    ],
    contact: {
      email: "campus@microsoft.com",
      website: "microsoft.com/campus"
    }
  },
  {
    id: 4,
    title: "GATE Scholarship Program",
    org: "AICTE",
    category: "Scholarship",
    deadline: "2026-04-01",
    daysLeft: 36,
    skills: ["Engineering"],
    views: 421,
    saved: false,
    logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&h=100&fit=crop&auto=format",
    location: "National Level",
    description: "AICTE offers scholarships for GATE-qualified students pursuing M.Tech/PhD. Financial support for meritorious students.",
    amount: "₹12,400/month",
    duration: "24 months",
    eligibility: "GATE qualified",
    applied: 892,
    requirements: [
      "GATE 2025/2026 qualified",
      "Admission to M.Tech/PhD",
      "Minimum 60% in graduation",
      "Family income < ₹8 LPA"
    ],
    perks: [
      "Monthly stipend",
      "Book grant",
      "Conference allowance",
      "HRA if applicable"
    ],
    contact: {
      email: "scholarship@aicte.in",
      website: "aicte-india.org/scholarship"
    }
  },
  {
    id: 5,
    title: "AWS Cloud Workshop",
    org: "Amazon",
    category: "Workshop",
    deadline: "2026-03-10",
    daysLeft: 14,
    skills: ["AWS", "Cloud"],
    views: 156,
    saved: true,
    logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop&auto=format",
    location: "Virtual Event",
    description: "Learn cloud computing with AWS experts. Hands-on workshop covering EC2, S3, Lambda, and more. Get certified with AWS badges.",
    price: "Free",
    duration: "2 days (4 hours each)",
    seats: 100,
    registered: 156,
    requirements: [
      "Basic programming knowledge",
      "AWS account (free tier)",
      "Laptop with internet",
      "Interest in cloud computing"
    ],
    perks: [
      "AWS certification voucher",
      "Workshop completion certificate",
      "AWS credits",
      "Networking with AWS team"
    ],
    contact: {
      email: "aws-training@amazon.com",
      website: "aws.amazon.com/training"
    }
  },
  {
    id: 6,
    title: "TCS CodeVita Programming Contest",
    org: "TCS",
    category: "Hackathon",
    deadline: "2026-03-25",
    daysLeft: 29,
    skills: ["C++", "Java", "DSA"],
    views: 298,
    saved: false,
    logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&auto=format",
    location: "Online",
    description: "World's largest coding contest by TCS. Win cash prizes, get interview opportunities, and showcase your coding skills globally.",
    prize: "₹1,00,00,000",
    rounds: 3,
    languages: ["C++", "Java", "Python", "C"],
    registered: 29800,
    requirements: [
      "Open to all",
      "Individual participation",
      "Problem-solving skills",
      "Any programming language"
    ],
    perks: [
      "Cash prizes for top 100",
      "Interview opportunities",
      "Certificate for all participants",
      "Global recognition"
    ],
    contact: {
      email: "codevita@tcs.com",
      website: "tcs.com/codevita"
    }
  },
];

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedIds, setSavedIds] = useState<number[]>([2, 5]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [registeredIds, setRegisteredIds] = useState<number[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Group registration form state
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [memberCount, setMemberCount] = useState(2);
  const [memberNames, setMemberNames] = useState<string[]>(['', '']);

  // combine base static opportunities with any posted via localStorage
  const [opportunitiesList, setOpportunitiesList] = useState<any[]>([]);

  // load cached posts once on mount
  const loadFromStorage = () => {
    const stored: any[] = JSON.parse(localStorage.getItem('postedOpportunities') || '[]');
    const extra = stored.map((o, idx) => ({
      ...o,
      id: o.id || Date.now() + idx,
      daysLeft: o.deadline
        ? Math.max(
          0,
          Math.ceil(
            (new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          )
        )
        : 0,
      views: o.views || 0,
      saved: o.saved || false,
      logo: o.logo || '',
    }));
    setOpportunitiesList([...baseOpportunities, ...extra]);
  };

  useEffect(() => {
    loadFromStorage();

    // cross-tab updates
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'postedOpportunities') loadFromStorage();
    };
    // same-tab updates (dispatched by PostOpportunityPage after save)
    const handleCustom = () => loadFromStorage();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('opportunitiesUpdated', handleCustom);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('opportunitiesUpdated', handleCustom);
    };
  }, []);

  const filtered = opportunitiesList.filter(
    (opp) =>
      (activeCategory === "All" || opp.category === activeCategory) &&
      (opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.org.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSave = (id: number) => {
    setSavedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleRegister = (id: number) => {
    if (!registeredIds.includes(id)) {
      setRegisteredIds([...registeredIds, id]);
      const opportunity = opportunitiesList.find(opp => opp.id === id);
      setNotificationMessage(`Successfully registered for ${opportunity?.title}!`);
      setShowNotification(true);
      setSelectedOpportunity(null);
      setShowGroupForm(false);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleGroupRegister = () => {
    if (!selectedOpportunity) return;
    const filled = memberNames.slice(0, memberCount).every(n => n.trim().length > 0);
    if (!filled) {
      alert('Please fill in all member names.');
      return;
    }
    handleRegister(selectedOpportunity.id);
  };

  const updateMemberCount = (count: number) => {
    const minM = selectedOpportunity?.groupMinMembers ?? 2;
    const maxM = selectedOpportunity?.groupMaxMembers ?? 10;
    const clamped = Math.max(minM, Math.min(maxM, count));
    setMemberCount(clamped);
    setMemberNames(prev => {
      const copy = [...prev];
      while (copy.length < clamped) copy.push('');
      return copy.slice(0, clamped);
    });
  };

  const openModal = (opp: any) => {
    setSelectedOpportunity(opp);
    setShowGroupForm(false);
    const initialCount = opp.groupMinMembers ?? 2;
    setMemberCount(initialCount);
    setMemberNames(Array(initialCount).fill(''));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Internship": return "🎓";
      case "Hackathon": return "💻";
      case "Placement": return "🏢";
      case "Scholarship": return "📚";
      case "Workshop": return "🔧";
      default: return "📌";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-sm font-medium text-green-800">{notificationMessage}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Explore Opportunities
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <span className="inline-block w-1 h-1 rounded-full bg-accent"></span>
              Find internships, hackathons, placements and more
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-sm">
            {filtered.length} opportunities available
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-slate-900">{opportunitiesList.length}</div>
              <div className="text-sm text-slate-500">Total Opportunities</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 flex items-center justify-center">
              <BookmarkCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-slate-900">{savedIds.length}</div>
              <div className="text-sm text-slate-500">Saved Opportunities</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-slate-900">{registeredIds.length}</div>
              <div className="text-sm text-slate-500">Registered</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-slate-900">
                {opportunitiesList.filter(o => o.daysLeft <= 7).length}
              </div>
              <div className="text-sm text-slate-500">Expiring Soon</div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by title or company..."
                className="pl-10 border-slate-200 focus:border-accent focus:ring-accent/20"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={activeCategory === cat ? "default" : "outline"}
                  className={`text-xs whitespace-nowrap rounded-full px-4 ${activeCategory === cat
                    ? 'bg-gradient-to-r from-accent to-accent/80 text-white'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Opportunity Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => openModal(opp)}
            >
              <div className="flex p-5">
                {/* Left Side - Image/Logo */}
                <div className="flex-shrink-0 mr-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-white shadow-md group-hover:shadow-lg transition-shadow">
                    {opp.logo ? (
                      <img
                        src={opp.logo}
                        alt={opp.org}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-400 bg-gradient-to-br from-accent/10 to-accent/20">
                        {opp.org?.charAt(0) || '?'}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {getCategoryIcon(opp.category)} {opp.category}
                    </span>
                    {opp.eventType === 'group' && (
                      <div className="mt-1">
                        <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <Users className="w-2.5 h-2.5" /> Group
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-slate-900 text-base leading-tight group-hover:text-accent transition-colors line-clamp-1">
                          {opp.title}
                        </h3>
                        {!opp.logo && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-accent text-white leading-none">NEW</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="font-medium text-slate-700">{opp.org}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {opp.location}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(opp.id);
                      }}
                      className={`flex-shrink-0 ml-2 p-2 rounded-lg transition-all ${savedIds.includes(opp.id)
                        ? 'bg-accent/10 text-accent'
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                    >
                      {savedIds.includes(opp.id)
                        ? <BookmarkCheck className="w-4 h-4 fill-accent text-accent" />
                        : <Bookmark className="w-4 h-4" />
                      }
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-3">
                    {opp.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {opp.daysLeft <= 7 ? (
                          <span className="text-rose-600 font-semibold flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            </span>
                            {opp.daysLeft}d left
                          </span>
                        ) : (
                          <span className="text-slate-500">{opp.daysLeft} days left</span>
                        )}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Users className="w-3 h-3" />
                        {opp.views.toLocaleString()} views
                      </span>
                    </div>
                    {registeredIds.includes(opp.id) && (
                      <Badge className="bg-green-500 text-white text-[10px] px-2">
                        Registered
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">No opportunities found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="text-accent border-accent/20 hover:bg-accent/5"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-white shadow-md">
                  {selectedOpportunity.logo ? (
                    <img
                      src={selectedOpportunity.logo}
                      alt={selectedOpportunity.org}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-400 bg-gradient-to-br from-accent/10 to-accent/20">
                      {selectedOpportunity.org?.charAt(0) || '?'}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-display font-bold text-slate-900">{selectedOpportunity.title}</h2>
                    {selectedOpportunity.eventType === 'group' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-accent text-white">
                        <Users className="w-3 h-3" /> Group Event
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 flex items-center gap-2 mt-1">
                    <span className="font-medium">{selectedOpportunity.org}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedOpportunity.location}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Category & Deadline */}
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-accent text-white px-3 py-1">
                  {getCategoryIcon(selectedOpportunity.category)} {selectedOpportunity.category}
                </Badge>
                <Badge variant="outline" className={`border-2 ${selectedOpportunity.daysLeft <= 7 ? 'border-rose-200 text-rose-600 bg-rose-50' : 'border-slate-200'
                  }`}>
                  <Calendar className="w-3 h-3 mr-1" />
                  Deadline: {selectedOpportunity.deadline} ({selectedOpportunity.daysLeft} days left)
                </Badge>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">About the Opportunity</h3>
                <p className="text-slate-600 leading-relaxed">{selectedOpportunity.description}</p>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedOpportunity.stipend && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <DollarSign className="w-4 h-4 text-accent mb-1" />
                    <p className="text-xs text-slate-500">Stipend</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedOpportunity.stipend}</p>
                  </div>
                )}
                {selectedOpportunity.prize && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <Award className="w-4 h-4 text-accent mb-1" />
                    <p className="text-xs text-slate-500">Prize Pool</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedOpportunity.prize}</p>
                  </div>
                )}
                {selectedOpportunity.salary && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <DollarSign className="w-4 h-4 text-accent mb-1" />
                    <p className="text-xs text-slate-500">Salary</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedOpportunity.salary}</p>
                  </div>
                )}
                {selectedOpportunity.amount && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <DollarSign className="w-4 h-4 text-accent mb-1" />
                    <p className="text-xs text-slate-500">Amount</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedOpportunity.amount}</p>
                  </div>
                )}
                {selectedOpportunity.duration && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <Clock className="w-4 h-4 text-accent mb-1" />
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedOpportunity.duration}</p>
                  </div>
                )}
                {selectedOpportunity.registrationFee && (
                  <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                    <DollarSign className="w-4 h-4 text-emerald-600 mb-1" />
                    <p className="text-xs text-slate-500">Fee</p>
                    <p className="text-sm font-semibold text-emerald-700">{selectedOpportunity.registrationFee}</p>
                  </div>
                )}
                <div className="bg-slate-50 rounded-xl p-3">
                  <Users className="w-4 h-4 text-accent mb-1" />
                  <p className="text-xs text-slate-500">Applicants</p>
                  <p className="text-sm font-semibold text-slate-900">{selectedOpportunity.applied || selectedOpportunity.registered?.toLocaleString()}</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-display font-semibold text-slate-900 mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedOpportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              {selectedOpportunity.requirements?.length > 0 && (
                <div>
                  <h3 className="text-lg font-display font-semibold text-slate-900 mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedOpportunity.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Perks */}
              {selectedOpportunity.perks?.length > 0 && (
                <div>
                  <h3 className="text-lg font-display font-semibold text-slate-900 mb-3">Perks & Benefits</h3>
                  <ul className="space-y-2">
                    {selectedOpportunity.perks.map((perk: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-slate-600">
                        <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-6 space-y-4">
              {/* Already registered state */}
              {registeredIds.includes(selectedOpportunity.id) ? (
                <div className="flex justify-end">
                  <Button className="gap-2 px-8 py-6 text-base bg-green-500 hover:bg-green-600 cursor-not-allowed" disabled>
                    <CheckCircle className="w-5 h-5" /> Already Registered
                  </Button>
                </div>
              ) : selectedOpportunity.eventType === 'group' && !showGroupForm ? (
                /* Group event — prompt to open group form */
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="text-sm text-slate-500 space-y-0.5">
                      {selectedOpportunity.groupMinMembers && selectedOpportunity.groupMaxMembers && (
                        <p>
                          Group size: <span className="font-semibold text-slate-700">
                            {selectedOpportunity.groupMinMembers}–{selectedOpportunity.groupMaxMembers} members
                          </span>
                        </p>
                      )}
                      {selectedOpportunity.registrationFee && (
                        <p>Fee per member: <span className="font-semibold text-emerald-600">{selectedOpportunity.registrationFee}</span></p>
                      )}
                    </div>
                    <Button
                      className="gap-2 px-8 py-6 text-base bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
                      onClick={() => setShowGroupForm(true)}
                    >
                      <Users className="w-5 h-5" /> Register as Group
                    </Button>
                  </div>
                </div>
              ) : selectedOpportunity.eventType === 'group' && showGroupForm ? (
                /* Group registration form */
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" /> Group Registration
                    </h4>
                    <button onClick={() => setShowGroupForm(false)} className="text-xs text-slate-400 hover:text-slate-600 underline">Cancel</button>
                  </div>

                  {/* Member count */}
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-slate-700 w-36">Number of members</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateMemberCount(memberCount - 1)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                        disabled={memberCount <= (selectedOpportunity.groupMinMembers ?? 2)}
                      >−</button>
                      <span className="w-8 text-center font-semibold text-slate-900">{memberCount}</span>
                      <button
                        type="button"
                        onClick={() => updateMemberCount(memberCount + 1)}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                        disabled={memberCount >= (selectedOpportunity.groupMaxMembers ?? 10)}
                      >+</button>
                    </div>
                    {selectedOpportunity.groupMinMembers && selectedOpportunity.groupMaxMembers && (
                      <span className="text-xs text-slate-400">
                        ({selectedOpportunity.groupMinMembers}–{selectedOpportunity.groupMaxMembers} allowed)
                      </span>
                    )}
                  </div>

                  {/* Member name inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: memberCount }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 w-16">Member {i + 1}</span>
                        <input
                          type="text"
                          placeholder={`Enter name`}
                          value={memberNames[i] || ''}
                          onChange={e => {
                            const copy = [...memberNames];
                            copy[i] = e.target.value;
                            setMemberNames(copy);
                          }}
                          className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Fee summary */}
                  {selectedOpportunity.registrationFee && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3 flex items-center justify-between text-sm">
                      <span className="text-slate-600">
                        {memberCount} members × <span className="font-semibold">{selectedOpportunity.registrationFee}</span> per member
                      </span>
                      <span className="font-bold text-emerald-700">Total: {selectedOpportunity.registrationFee} ×{memberCount}</span>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      className="gap-2 px-8 py-5 text-base bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
                      onClick={handleGroupRegister}
                    >
                      <CheckCircle className="w-5 h-5" /> Confirm Registration
                    </Button>
                  </div>
                </div>
              ) : (
                /* Single event — original flow */
                <div className="flex justify-end">
                  <Button
                    className="gap-2 px-8 py-6 text-base bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
                    onClick={() => handleRegister(selectedOpportunity.id)}
                  >
                    <ExternalLink className="w-5 h-5" /> Register Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;