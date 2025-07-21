import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Star, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

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
              
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    img: ({node, ...props}) => (
                      <img 
                        {...props} 
                        className="rounded-lg border border-border shadow-sm max-w-full h-auto" 
                        loading="lazy"
                      />
                    ),
                    code: ({node, className, children, ...props}: any) => {
                      const isInline = !className || !className.includes('language-');
                      return !isInline ? (
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto border border-border">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      ) : (
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      );
                    },
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic bg-muted/30 p-4 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4 first:mt-0">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>,
                    h4: ({children}) => <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>,
                    ul: ({children}) => <ul className="list-disc pl-6 space-y-1 my-4">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal pl-6 space-y-1 my-4">{children}</ol>,
                    li: ({children}) => <li className="leading-relaxed">{children}</li>,
                    p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                    a: ({href, children}) => (
                      <a 
                        href={href} 
                        className="text-primary hover:text-primary/80 underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    table: ({children}) => (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full border border-border rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({children}) => <thead className="bg-muted">{children}</thead>,
                    th: ({children}) => <th className="border border-border px-4 py-2 text-left font-semibold">{children}</th>,
                    td: ({children}) => <td className="border border-border px-4 py-2">{children}</td>,
                    hr: () => <hr className="border-t border-border my-8" />
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}