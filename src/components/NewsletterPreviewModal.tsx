
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, User, Mail } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface NewsletterIssue {
  title: string;
  description: string;
  date: string;
  topics: string[];
  readTime: string;
  content: string;
}

interface NewsletterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: NewsletterIssue | null;
}

export function NewsletterPreviewModal({ isOpen, onClose, issue }: NewsletterPreviewModalProps) {
  if (!issue) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-8 py-6 border-b bg-muted/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl font-bold leading-tight pr-8">
                  {issue.title}
                </DialogTitle>
                
                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">DevPortfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(issue.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{issue.readTime}</span>
                  </div>
                </div>
                
                {/* Topics */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {issue.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs px-2 py-1">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-base text-muted-foreground italic leading-relaxed">
                {issue.description}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
          <div className="px-8 py-6">
            {/* Main content with improved typography */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  img: ({ src, alt, ...props }) => (
                    <div className="my-6">
                      <img 
                        src={src} 
                        alt={alt} 
                        {...props}
                        className="max-w-full h-auto rounded-lg border shadow-sm"
                      />
                    </div>
                  ),
                  code: ({ children, className, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match;
                    
                    if (isInline) {
                      return (
                        <code className="bg-muted px-2 py-0.5 rounded text-sm font-mono border" {...props}>
                          {children}
                        </code>
                      );
                    }
                    
                    return (
                      <div className="my-6">
                        <pre className="bg-muted border rounded-lg p-4 overflow-x-auto">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  },
                  pre: ({ children, ...props }) => (
                    <div className="my-6">
                      <pre className="bg-muted border rounded-lg p-4 overflow-x-auto" {...props}>
                        {children}
                      </pre>
                    </div>
                  ),
                  h1: ({ children, ...props }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-6 first:mt-0 border-b pb-2" {...props}>
                      {children}
                    </h1>
                  ),
                  h2: ({ children, ...props }) => (
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground" {...props}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children, ...props }) => (
                    <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground" {...props}>
                      {children}
                    </h3>
                  ),
                  p: ({ children, ...props }) => (
                    <p className="mb-4 leading-relaxed text-foreground/90" {...props}>
                      {children}
                    </p>
                  ),
                  ul: ({ children, ...props }) => (
                    <ul className="mb-4 space-y-2 list-disc pl-6" {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol className="mb-4 space-y-2 list-decimal pl-6" {...props}>
                      {children}
                    </ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li className="leading-relaxed" {...props}>
                      {children}
                    </li>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground" {...props}>
                      {children}
                    </blockquote>
                  ),
                  hr: ({ ...props }) => (
                    <hr className="my-8 border-border" {...props} />
                  )
                }}
              >
                {issue.content}
              </ReactMarkdown>
            </div>
            
            {/* Subscribe CTA with better spacing */}
            <div className="mt-12 p-6 border-2 border-dashed border-primary/20 rounded-xl bg-gradient-to-br from-muted/30 to-muted/50">
              <div className="text-center space-y-4">
                <div className="text-3xl mb-2">📬</div>
                <h3 className="text-xl font-bold">Subscribe to The Developer's Weekly</h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Get weekly insights like this delivered straight to your inbox. Join 1,247+ developers who trust our content.
                </p>
                <Button size="lg" className="px-8 py-3">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
