import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Mail, X } from "lucide-react";

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
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-background border border-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-border bg-background">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="font-mono text-sm font-medium">newsletter-preview.md</span>
                  </div>
                  <h1 className="text-lg font-semibold">{issue.title}</h1>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto">
            <div className="border border-border rounded-none bg-background">
              <div className="bg-muted/30 px-4 py-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">📧</span>
                    <span className="font-mono text-sm font-medium">{issue.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                </div>
              </div>
              
              <div className="p-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h1 className="text-2xl font-bold mb-4">{issue.title}</h1>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {issue.topics.map((topic) => (
                      <Badge key={topic} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md mb-6">
                    <p className="text-base italic font-medium">{issue.description}</p>
                  </div>
                  
                  <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                    {issue.content}
                  </div>
                  
                  <div className="mt-8 p-4 border border-border rounded-md bg-muted/30">
                    <h3 className="font-semibold mb-2">📬 Subscribe to The Developer's Weekly</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get weekly insights like this delivered straight to your inbox. Join 1,247+ developers who trust our content.
                    </p>
                    <Button className="github-button-primary">
                      Subscribe Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}