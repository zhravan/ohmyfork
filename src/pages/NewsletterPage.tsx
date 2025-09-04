import { Calendar, Mail, TrendingUp, Users, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useContent, useContentTags } from '@/hooks/use-content';

import { GitHubHeader } from '@/components/GitHubHeader';
import { NewsletterPreviewModal } from '@/components/NewsletterPreviewModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TagMultiSelect, SortSelect } from '@/components/filters/FilterControls';
import { Label } from '@/components/ui/label';

interface NewsletterIssue {
  title: string;
  description: string;
  date: string;
  topics: string[];
  readTime: string;
  Component?: React.ComponentType;
}

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<NewsletterIssue | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [q, setQ] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<'date-desc'|'date-asc'|'title-asc'|'title-desc'>('date-desc');
  const { tags } = useContentTags('newsletters');
  const { content: issues, search } = useContent<NewsletterIssue>('newsletters', {}, { page: 1, limit: 100 });
  useEffect(() => { search({ query: q, tags: selectedTags, sort }); }, [q, selectedTags, sort, search]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setMessage('Subscribed! Check your inbox to confirm.');
    setTimeout(() => {
      setSubscribed(false);
      setMessage(null);
      setEmail('');
    }, 3000);
  };

  const handleIssueClick = (issue: NewsletterIssue) => {
    setSelectedIssue(issue);
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      
      <div className="container mx-auto px-2 sm:px-4 py-6">
  <h1 className="sr-only">Newsletter</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Newsletter Info & Signup */}
          <div className="lg:col-span-1 order-2 lg:order-1 mb-6 lg:mb-0">
            <div className="border border-border rounded-md bg-background">
              <div className="bg-muted/30 px-3 sm:px-4 py-3 border-b border-border">
                <span className="font-mono text-xs sm:text-sm text-foreground">newsletter/subscribe.md</span>
              </div>
              <div className="p-4 sm:p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">The Developer's Weekly</h2>
                  <p className="text-muted-foreground mb-4">
                    A weekly dose of development insights, debugging stories, and the latest tools 
                    that are actually worth your time. No spam, just valuable content.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
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
                
                <form onSubmit={handleSubscribe} className="space-y-4" aria-describedby="newsletter-desc">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="developer@example.com" 
                      aria-label="Email address"
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="github-button-primary w-full"
                    disabled={subscribed}
                    aria-busy={subscribed}
                  >
                    {subscribed ? "Subscribed! 🎉" : "Subscribe"}
                  </Button>
                  <div aria-live="polite" className="sr-only">{message}</div>
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
          
          {/* Issues + Filters */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="mb-4 space-y-3">
              <div className="relative max-w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search issues..." className="pl-10" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <TagMultiSelect options={tags} value={selectedTags} onChange={setSelectedTags} />
                <span className="ml-auto text-xs text-muted-foreground">Sort:</span>
                <SortSelect value={sort} onChange={setSort} />
              </div>
            </div>
            <div className="border border-border rounded-md bg-background">
              <div className="bg-muted/30 px-3 sm:px-4 py-3 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="font-mono text-xs sm:text-sm text-foreground">newsletter/</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{(issues as any[]).length} issues</span>
                </div>
              </div>
              <div className="divide-y divide-border">
                {(issues as any[]).map((issue: any, index: number) => (
                  <article key={index} className="p-4 sm:p-6 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => handleIssueClick(issue)}>
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors truncate">
                            {issue.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {issue.readTime}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                          {issue.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
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
          </div>
        </div>
      </div>

      <NewsletterPreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        issue={selectedIssue}
      />
    </div>
  );
}
