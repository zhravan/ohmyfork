import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Mail, X } from "lucide-react";
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
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <DialogTitle className="text-xl font-semibold">{issue.title}</DialogTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Meta info */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mt-3">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              DevPortfolio
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(issue.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {issue.readTime}
            </div>
          </div>
        </DialogHeader>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-6">
            {issue.topics.map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
          
          {/* Description */}
          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <p className="text-base italic">{issue.description}</p>
          </div>
          
          {/* Main content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                img: ({ src, alt, ...props }) => (
                  <img 
                    src={src} 
                    alt={alt} 
                    {...props}
                    className="max-w-full h-auto rounded-lg border my-4"
                  />
                ),
                code: ({ children, className, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match;
                  
                  if (isInline) {
                    return (
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  }
                  
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ children, ...props }) => (
                  <h1 className="text-2xl font-bold mt-8 mb-4 first:mt-0" {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 className="text-xl font-semibold mt-6 mb-3" {...props}>
                    {children}
                  </h2>
                ),
                p: ({ children, ...props }) => (
                  <p className="mb-4 leading-relaxed" {...props}>
                    {children}
                  </p>
                )
              }}
            >
              {issue.content}
            </ReactMarkdown>
          </div>
          
          {/* Subscribe CTA */}
          <div className="mt-8 p-6 border rounded-lg bg-muted/30">
            <h3 className="text-lg font-semibold mb-2">📬 Subscribe to The Developer's Weekly</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Get weekly insights like this delivered straight to your inbox. Join 1,247+ developers who trust our content.
            </p>
            <Button size="lg" className="w-full sm:w-auto">
              Subscribe Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}