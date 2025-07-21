import { GitHubHeader } from "@/components/GitHubHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Building Scalable React Applications with TypeScript",
    excerpt: "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Architecture"],
    author: "John Doe"
  },
  {
    title: "Mastering Async/Await in JavaScript",
    excerpt: "Deep dive into asynchronous programming patterns and best practices for handling promises in modern JavaScript.",
    date: "2024-01-10", 
    readTime: "6 min read",
    tags: ["JavaScript", "Async", "Promises"],
    author: "John Doe"
  },
  {
    title: "Docker Best Practices for Node.js Applications",
    excerpt: "Optimize your Node.js containers with these proven strategies for security, performance, and maintainability.",
    date: "2024-01-05",
    readTime: "10 min read", 
    tags: ["Docker", "Node.js", "DevOps"],
    author: "John Doe"
  },
  {
    title: "State Management in React: Redux vs Zustand vs Context",
    excerpt: "Comprehensive comparison of popular state management solutions and when to use each approach.",
    date: "2023-12-28",
    readTime: "12 min read",
    tags: ["React", "State Management", "Redux", "Zustand"],
    author: "John Doe"
  }
];

export default function BlogsPage() {
  const navigate = useNavigate();

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
            <span className="text-2xl">📝</span>
            <h1 className="text-2xl font-bold">Developer Blog</h1>
          </div>
        </div>
        
        <div className="border border-border rounded-md bg-background">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-foreground">blogs/ directory</span>
              <span className="text-sm text-muted-foreground">{blogPosts.length} articles</span>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {blogPosts.map((post, index) => (
              <article key={index} className="p-6 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Want to stay updated with my latest posts?
          </p>
          <Button className="github-button-primary">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}