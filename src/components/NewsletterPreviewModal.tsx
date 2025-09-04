
import { Calendar, Clock, Mail, User } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';
import { CodeBlock } from '@/components/mdx/CodeBlock';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NewsletterIssue {
  title: string;
  description: string;
  date: string;
  topics: string[];
  readTime: string;
  // When loaded via content loader
  Component?: React.ComponentType;
}

interface NewsletterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: NewsletterIssue | null;
}

export function NewsletterPreviewModal({ isOpen, onClose, issue }: NewsletterPreviewModalProps) {
  if (!issue) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-full sm:max-w-2xl md:max-w-4xl h-[90vh] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="px-3 sm:px-8 py-4 sm:py-6 border-b bg-muted/20">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
              <div className="mt-1">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-lg sm:text-2xl font-bold leading-tight pr-0 sm:pr-8 break-words break-all">
                  {issue.title}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">ohmyfork</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(issue.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{issue.readTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-4">
                  {issue.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs px-2 py-1">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-3 sm:p-4">
              <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed">
                {issue.description}
              </p>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="px-3 sm:px-8 py-4 sm:py-6">
            <div className="prose prose-slate dark:prose-invert max-w-none prose-sm sm:prose-base">
              {issue.Component ? (
                <MDXProvider components={{ code: CodeBlock }}>
                  <issue.Component />
                </MDXProvider>
              ) : null}
            </div>
            {/* Subscribe CTA with better spacing */}
            <div className="mt-8 sm:mt-12 p-4 sm:p-6 border-2 border-dashed border-primary/20 rounded-xl bg-gradient-to-br from-muted/30 to-muted/50">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="text-2xl sm:text-3xl mb-2">📬</div>
                <h3 className="text-lg sm:text-xl font-bold">Subscribe to The Developer's Weekly</h3>
                <p className="text-muted-foreground max-w-xs sm:max-w-md mx-auto leading-relaxed text-sm sm:text-base">
                  Get weekly insights like this delivered straight to your inbox. Join 1,247+ developers who trust our content.
                </p>
                <Button size="lg" className="px-6 sm:px-8 py-2.5 sm:py-3">
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
