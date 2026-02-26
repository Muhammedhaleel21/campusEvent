import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Send, CheckCircle, Users, User } from "lucide-react";

const PostOpportunityPage = () => {
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [duration, setDuration] = useState("");
  const [deadline, setDeadline] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [openings, setOpenings] = useState("");
  const [eventType, setEventType] = useState<"single" | "group">("single");
  const [registrationFee, setRegistrationFee] = useState("");
  const [groupMinMembers, setGroupMinMembers] = useState(2);
  const [groupMaxMembers, setGroupMaxMembers] = useState(4);

  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const editId = params.get('id');

  // populate when editing
  useEffect(() => {
    if (editId) {
      const stored: any[] = JSON.parse(localStorage.getItem('postedOpportunities') || '[]');
      const opp = stored.find(o => String(o.id) === editId);
      if (opp) {
        setOrganization(opp.org || "");
        setTitle(opp.title || "");
        setDescription(opp.description || "");
        setCategory(opp.category ? opp.category.toLowerCase() : "");
        setJobLocation(opp.location || "");
        setStipend(opp.stipend || "");
        setDuration(opp.duration || "");
        setDeadline(opp.deadline || "");
        setApplyLink(opp.applyLink || "");
        setOpenings(opp.openings ? String(opp.openings) : "");
        setSkills(opp.skills || []);
        setEventType(opp.eventType || "single");
        setRegistrationFee(opp.registrationFee || "");
        setGroupMinMembers(opp.groupMinMembers || 2);
        setGroupMaxMembers(opp.groupMaxMembers || 4);
      }
    }
  }, [editId]);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const daysLeft = deadline ? Math.max(0, Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;
    const stored = JSON.parse(localStorage.getItem('postedOpportunities') || '[]');
    if (editId) {
      const idx = stored.findIndex(o => String(o.id) === editId);
      if (idx !== -1) {
        stored[idx] = {
          ...stored[idx],
          title,
          org: organization,
          category: category ? category.charAt(0).toUpperCase() + category.slice(1) : '',
          deadline,
          daysLeft,
          skills,
          location: jobLocation,
          description,
          stipend,
          duration,
          applyLink,
          openings: openings ? parseInt(openings, 10) : undefined,
          eventType,
          registrationFee,
          groupMinMembers: eventType === 'group' ? groupMinMembers : undefined,
          groupMaxMembers: eventType === 'group' ? groupMaxMembers : undefined,
        };
      }
    } else {
      const newOpp = {
        id: Date.now(),
        title,
        org: organization,
        category: category ? category.charAt(0).toUpperCase() + category.slice(1) : '',
        deadline,
        daysLeft,
        skills,
        views: 0,
        saved: false,
        location: jobLocation,
        description,
        stipend,
        duration,
        applyLink,
        openings: openings ? parseInt(openings, 10) : undefined,
        logo: '',
        requirements: [],
        perks: [],
        eventType,
        registrationFee,
        groupMinMembers: eventType === 'group' ? groupMinMembers : undefined,
        groupMaxMembers: eventType === 'group' ? groupMaxMembers : undefined,
      };
      stored.push(newOpp);
    }
    localStorage.setItem('postedOpportunities', JSON.stringify(stored));
    // Notify same-tab listeners (window.storage only fires cross-tab)
    window.dispatchEvent(new CustomEvent('opportunitiesUpdated'));

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      if (!editId) {
        // clear the form
        setOrganization('');
        setTitle('');
        setDescription('');
        setCategory('');
        setJobLocation('');
        setStipend('');
        setDuration('');
        setDeadline('');
        setApplyLink('');
        setOpenings('');
        setSkills([]);
        setCurrentSkill("");
        setEventType('single');
        setRegistrationFee('');
        setGroupMinMembers(2);
        setGroupMaxMembers(4);
      }
      setTimeout(() => setShowSuccess(false), 3000);
      // after editing or new, go back to dashboard list
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-slate-900">Success!</p>
              <p className="text-sm text-slate-600">
                {editId ? 'Opportunity updated successfully' : 'Opportunity published successfully'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            {editId ? 'Edit Opportunity' : 'Post New Opportunity'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {editId ? 'Update the details and press publish' : 'Fill in the details below to create a new opportunity'}
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-white">
            <CardTitle className="text-lg text-slate-900">Opportunity Details</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              All fields are required unless marked optional
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-6">
              {/* Organization & Title */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-sm font-medium text-slate-700">
                    Organization <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="organization"
                    placeholder="e.g. Google, Microsoft"
                    className="border-slate-200 focus:border-slate-400"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g. Summer Internship 2026"
                    className="border-slate-200 focus:border-slate-400"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the opportunity, requirements, and benefits..."
                  rows={4}
                  className="border-slate-200 focus:border-slate-400 resize-none"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              {/* Category & Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-slate-700">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category" className="border-slate-200 focus:border-slate-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="placement">Placement</SelectItem>
                      <SelectItem value="scholarship">Scholarship</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-slate-700">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. Remote, Bangalore, Mumbai"
                    className="border-slate-200 focus:border-slate-400"
                    value={jobLocation}
                    onChange={e => setJobLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Stipend & Duration */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stipend" className="text-sm font-medium text-slate-700">
                    Stipend/Salary <span className="text-slate-400 text-xs">(optional)</span>
                  </Label>
                  <Input
                    id="stipend"
                    placeholder="e.g. $5000/month or ₹25 LPA"
                    className="border-slate-200 focus:border-slate-400"
                    value={stipend}
                    onChange={e => setStipend(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm font-medium text-slate-700">
                    Duration <span className="text-slate-400 text-xs">(optional)</span>
                  </Label>
                  <Input
                    id="duration"
                    placeholder="e.g. 3 months, 48 hours"
                    className="border-slate-200 focus:border-slate-400"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium text-slate-700">
                  Skills Required <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="skills"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a skill and press Enter"
                    className="flex-1 border-slate-200 focus:border-slate-400"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSkill}
                    className="border-slate-200"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Skills Tags */}
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded text-sm text-slate-700"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Deadline & Apply Link */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-sm font-medium text-slate-700">
                    Application Deadline <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    className="border-slate-200 focus:border-slate-400"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applyLink" className="text-sm font-medium text-slate-700">
                    Apply Link <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="applyLink"
                    placeholder="https://..."
                    className="border-slate-200 focus:border-slate-400"
                    value={applyLink}
                    onChange={e => setApplyLink(e.target.value)}
                  />
                </div>
              </div>

              {/* Openings */}
              <div className="space-y-2">
                <Label htmlFor="openings" className="text-sm font-medium text-slate-700">
                  Number of Openings <span className="text-slate-400 text-xs">(optional)</span>
                </Label>
                <Input
                  id="openings"
                  type="number"
                  placeholder="e.g. 10"
                  className="border-slate-200 focus:border-slate-400 max-w-xs"
                  value={openings}
                  onChange={e => setOpenings(e.target.value)}
                />
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Event Type <span className="text-red-500">*</span></Label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEventType('single')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 text-sm font-medium transition-all ${eventType === 'single'
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                  >
                    <User className="w-4 h-4" />
                    Single
                  </button>
                  <button
                    type="button"
                    onClick={() => setEventType('group')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 text-sm font-medium transition-all ${eventType === 'group'
                      ? 'border-accent bg-accent text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                  >
                    <Users className="w-4 h-4" />
                    Group
                  </button>
                </div>
              </div>

              {/* Group Size — visible only when Group is selected */}
              {eventType === 'group' && (
                <div className="space-y-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
                  <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    Group Size
                    <span className="text-slate-400 text-xs font-normal">(members per team)</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Minimum */}
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 font-medium">Minimum</p>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setGroupMinMembers(m => Math.max(2, m - 1))}
                          className="w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-accent hover:text-accent transition disabled:opacity-40"
                          disabled={groupMinMembers <= 2}
                        >−</button>
                        <span className="w-10 text-center text-lg font-bold text-slate-900">{groupMinMembers}</span>
                        <button
                          type="button"
                          onClick={() => setGroupMinMembers(m => Math.min(groupMaxMembers, m + 1))}
                          className="w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-accent hover:text-accent transition disabled:opacity-40"
                          disabled={groupMinMembers >= groupMaxMembers}
                        >+</button>
                      </div>
                    </div>
                    {/* Maximum */}
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 font-medium">Maximum</p>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setGroupMaxMembers(m => Math.max(groupMinMembers, m - 1))}
                          className="w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-accent hover:text-accent transition disabled:opacity-40"
                          disabled={groupMaxMembers <= groupMinMembers}
                        >−</button>
                        <span className="w-10 text-center text-lg font-bold text-slate-900">{groupMaxMembers}</span>
                        <button
                          type="button"
                          onClick={() => setGroupMaxMembers(m => Math.min(20, m + 1))}
                          className="w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-accent hover:text-accent transition disabled:opacity-40"
                          disabled={groupMaxMembers >= 20}
                        >+</button>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-accent/80">
                    Students must register with {groupMinMembers}–{groupMaxMembers} members.
                  </p>
                </div>
              )}

              {/* Registration Fee */}
              <div className="space-y-2">
                <Label htmlFor="registrationFee" className="text-sm font-medium text-slate-700">
                  Registration Fee <span className="text-slate-400 text-xs">(optional — leave blank if free)</span>
                </Label>
                <Input
                  id="registrationFee"
                  placeholder="e.g. ₹500, $10, Free"
                  className="border-slate-200 focus:border-slate-400 max-w-xs"
                  value={registrationFee}
                  onChange={e => setRegistrationFee(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter className="border-t border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="flex items-center justify-between w-full">
                <p className="text-xs text-slate-500">
                  <span className="text-red-500">*</span> Required fields
                </p>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-slate-900 hover:bg-slate-800 text-white min-w-[140px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editId ? 'Updating...' : 'Publishing...'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> {editId ? 'Update Opportunity' : 'Publish Opportunity'}
                    </div>
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Helper Text */}
        <p className="text-xs text-center text-slate-400 mt-4">
          By posting, you agree to our terms and guidelines. Opportunities are reviewed before going live.
        </p>
      </div>
    </div>
  );
};

export default PostOpportunityPage;
