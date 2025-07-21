import { GitHubHeader } from "@/components/GitHubHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Calendar, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NewsletterIssue {
  title: string;
  description: string;
  date: string;
  topics: string[];
  readTime: string;
}

const recentIssues: NewsletterIssue[] = [
  {
    title: "The Developer's Weekly #42",
    description: "This week: React Server Components deep dive, debugging techniques that saved my career, and why I'm excited about TypeScript 5.3.",
    date: "2024-01-15",
    topics: ["React", "TypeScript", "Debugging", "Career"],
    readTime: "5 min read"
  },
  {
    title: "The Developer's Weekly #41", 
    description: "Breaking down the new CSS container queries, a retrospective on my first year freelancing, and the tools that boost my productivity.",
    date: "2024-01-08",
    topics: ["CSS", "Freelancing", "Productivity", "Tools"],
    readTime: "6 min read"
  },
  {
    title: "The Developer's Weekly #40",
    description: "Docker optimization secrets, the psychology of code reviews, and why I switched from Redux to Zustand (and you might too).",
    date: "2024-01-01",
    topics: ["Docker", "Code Reviews", "State Management"],
    readTime: "7 min read"
  }
];

export default function NewsletterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📧</span>
            <h1 className="text-2xl font-bold">Developer Newsletter</h1>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Newsletter Info & Signup */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-md bg-background">
              <div className="bg-muted/30 px-4 py-3 border-b border-border">
                <span className="font-mono text-sm text-foreground">newsletter/subscribe.md</span>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">The Developer's Weekly</h2>
                  <p className="text-muted-foreground mb-4">
                    A weekly dose of development insights, debugging stories, and the latest tools 
                    that are actually worth your time. No spam, just valuable content.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 border border-border rounded-md">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-xl font-bold text-foreground">1,247</div>
                      <div className="text-sm text-muted-foreground">Subscribers</div>
                    </div>
                    <div className="text-center p-3 border border-border rounded-md">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="text-xl font-bold text-foreground">94%</div>
                      <div className="text-sm text-muted-foreground">Open Rate</div>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="developer@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="github-button-primary w-full"
                    disabled={subscribed}
                  >
                    {subscribed ? "Subscribed! 🎉" : "Subscribe"}
                  </Button>
                </form>
                
                <div className="mt-6 p-4 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">What you'll get:</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Weekly technical insights</li>
                    <li>• Real debugging stories</li>
                    <li>• Tool recommendations</li>
                    <li>• Career tips & advice</li>
                    <li>• No spam, unsubscribe anytime</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Issues */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-md bg-background">
              <div className="bg-muted/30 px-4 py-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-foreground">newsletter/archive/</span>
                  <span className="text-sm text-muted-foreground">{recentIssues.length} recent issues</span>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {recentIssues.map((issue, index) => (
                  <article key={index} className="p-6 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                            {issue.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {issue.readTime}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {issue.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(issue.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {issue.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Want to see all previous issues?
              </p>
              <Button variant="outline">
                Browse Full Archive
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}