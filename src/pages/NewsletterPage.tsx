import { GitHubHeader } from "@/components/GitHubHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { NewsletterPreviewModal } from "@/components/NewsletterPreviewModal";
import { ArrowLeft, Mail, Calendar, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NewsletterIssue {
  title: string;
  description: string;
  date: string;
  topics: string[];
  readTime: string;
  content: string;
}

const recentIssues: NewsletterIssue[] = [
  {
    title: "The Developer's Weekly #42",
    description: "This week: React Server Components deep dive, debugging techniques that saved my career, and why I'm excited about TypeScript 5.3.",
    date: "2024-01-15",
    topics: ["React", "TypeScript", "Debugging", "Career"],
    readTime: "5 min read",
    content: `## Welcome to Issue #42! 🚀

**This Week's Highlights:**

### React Server Components: The Future is Here
After months of experimenting with React Server Components in production, I can confidently say they're a game-changer. Here's what you need to know:

- **Performance**: 40% faster initial page loads
- **Developer Experience**: Simplified data fetching patterns
- **Caching**: Built-in optimization that just works

\`\`\`tsx
// Old way - Client component with useEffect
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  return user ? <div>{user.name}</div> : <Loading />;
};

// New way - Server component
const UserProfile = async ({ userId }) => {
  const user = await fetchUser(userId);
  return <div>{user.name}</div>;
};
\`\`\`

### Debugging Stories That Saved My Career

**The Case of the Invisible Memory Leak**

Picture this: Production server mysteriously crashing every 3 days. No error logs, no warnings, just... dead. After a week of debugging, I discovered a single line of code that was creating DOM nodes without cleaning them up.

*Lesson learned*: Always profile your memory usage, especially in long-running applications.

### TypeScript 5.3: What's Got Me Excited

The new \`satisfies\` operator is absolutely brilliant:

\`\`\`typescript
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
} satisfies ApiConfig;

// Now TypeScript knows the exact shape AND validates against ApiConfig!
\`\`\`

---

## Community Spotlight 🌟

Shoutout to @sarah_codes for her amazing article on "Microinteractions in React" - it completely changed how I think about user experience.

## Tool of the Week 🛠️

**Bun 1.0** - If you haven't tried it yet, you're missing out. Package installation is blazingly fast, and the built-in test runner is surprisingly good.

---

That's a wrap for this week! As always, hit reply and let me know what you thought. Your feedback shapes future issues.

Stay curious,
Alex`
  },
  {
    title: "The Developer's Weekly #41", 
    description: "Breaking down the new CSS container queries, a retrospective on my first year freelancing, and the tools that boost my productivity.",
    date: "2024-01-08",
    topics: ["CSS", "Freelancing", "Productivity", "Tools"],
    readTime: "6 min read",
    content: `## Issue #41: Container Queries & Freelancing Lessons 📦

### CSS Container Queries: Finally Here!

After years of waiting, container queries are finally stable across all browsers. This changes **everything** about responsive design:

\`\`\`css
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 300px) {
  .widget {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
\`\`\`

No more media queries based on viewport! Components can now respond to their own size.

### One Year Freelancing: The Brutal Truth

Last week marked my first anniversary as a freelance developer. Here's what I wish someone had told me:

**The Good:**
- 3x salary increase
- Complete control over tech stack
- Working with amazing startups

**The Challenging:**
- Irregular income (some months feast, others famine)
- Self-discipline is HARD
- Imposter syndrome hits different when you're on your own

**Key Lesson**: Always have 6 months expenses saved. Always.

### Productivity Stack That Actually Works

After trying hundreds of tools, here's what stuck:

1. **Notion** - All project docs and client communication
2. **Linear** - Task management (beats Jira by miles)
3. **CleanShot X** - Screenshots and screen recordings
4. **Raycast** - App launcher on steroids
5. **Obsidian** - Personal knowledge management

The secret isn't the tools—it's picking a few and sticking with them.

---

## Quick Tips 💡

- Use \`console.time()\` and \`console.timeEnd()\` for quick performance debugging
- \`git commit --amend\` saves you from embarrassing typos in commit messages
- Set up GitHub Actions for automatic dependency updates (Dependabot is your friend)

See you next week!
Alex`
  },
  {
    title: "The Developer's Weekly #40",
    description: "Docker optimization secrets, the psychology of code reviews, and why I switched from Redux to Zustand (and you might too).",
    date: "2024-01-01",
    topics: ["Docker", "Code Reviews", "State Management"],
    readTime: "7 min read",
    content: `## Issue #40: New Year, Better Code 🎉

### Docker Optimization: From 2GB to 200MB

Spent last week optimizing our Docker images. The results were shocking:

**Before:**
- Image size: 2.1GB
- Build time: 8 minutes
- Cold start: 45 seconds

**After:**
- Image size: 185MB
- Build time: 2 minutes  
- Cold start: 8 seconds

**The Secret Sauce:**

\`\`\`dockerfile
# Use multi-stage builds
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs
\`\`\`

### The Psychology of Code Reviews

After analyzing 500+ code reviews, I noticed patterns:

**What makes developers defensive:**
- "This is wrong" (judgment without explanation)
- "Why didn't you just..." (implies incompetence)
- Nitpicking formatting when CI should handle it

**What creates learning:**
- "What do you think about trying X because Y?"
- "I learned this approach recently: [link]"
- "This works, and here's an alternative that might be more maintainable"

**Golden Rule**: Review code like you're teaching a friend, not judging an enemy.

### Redux → Zustand: Why I Made the Switch

After 3 years with Redux, I finally tried Zustand. The comparison is brutal:

**Redux Boilerplate (actions, reducers, selectors):**
\`\`\`typescript
// 50+ lines of boilerplate for simple counter
\`\`\`

**Zustand:**
\`\`\`typescript
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
\`\`\`

That's it. 6 lines. TypeScript support is excellent, DevTools work perfectly, and testing is straightforward.

**When to choose what:**
- **Redux**: Large teams, complex state, time-travel debugging critical
- **Zustand**: Everything else

---

## 2024 Predictions 🔮

- AI pair programming becomes mainstream (GitHub Copilot v2 will be incredible)
- WebAssembly adoption accelerates (especially for compute-heavy tasks)
- CSS Grid subgrid finally gets universal support
- We'll see the first production-ready Rust web framework challenge Node.js

What are your predictions? Hit reply and let me know!

Happy New Year,
Alex`
  }
];

export default function NewsletterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<NewsletterIssue | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const handleIssueClick = (issue: NewsletterIssue) => {
    setSelectedIssue(issue);
    setIsPreviewOpen(true);
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
                  <article key={index} className="p-6 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => handleIssueClick(issue)}>
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

      <NewsletterPreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        issue={selectedIssue}
      />
    </div>
  );
}