import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PostOpportunityPage = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Post New Opportunity</h1>
        <p className="text-muted-foreground mt-1">Create a new opportunity for students</p>
      </div>

      <div className="bg-card rounded-xl shadow-card p-6 space-y-4 border border-border/50">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input placeholder="e.g. Google Summer Internship 2026" />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea placeholder="Describe the opportunity..." rows={4} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
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
            <Label>Deadline</Label>
            <Input type="date" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Skills Required</Label>
          <Input placeholder="e.g. Python, React, Machine Learning" />
        </div>
        <div className="space-y-2">
          <Label>Apply Link</Label>
          <Input placeholder="https://..." />
        </div>
        <Button className="w-full sm:w-auto">Publish Opportunity</Button>
      </div>
    </div>
  );
};

export default PostOpportunityPage;
