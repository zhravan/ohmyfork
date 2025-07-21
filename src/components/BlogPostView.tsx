import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Star, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  content: string;
}

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

export function BlogPostView({ post, onBack }: BlogPostViewProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </Button>
              <h1 className="text-xl font-semibold">{post.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                Star
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                Fork
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="border border-border rounded-md bg-background">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">📝</span>
                <span className="font-mono text-sm font-medium">README.md</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md mb-6">
                <p className="text-lg italic">{post.excerpt}</p>
              </div>
              
              <div className="whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}