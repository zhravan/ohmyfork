import { AlertCircle, Clock, GitCommit, Tag, User, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface BugTale {
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'solved' | 'investigating' | 'wontfix';
  description: string;
  reproduction: string;
  solution: string;
  tags: string[];
  timeToSolve: string;
  assignee: string;
  dateReported: string;
}

interface BugReportModalProps {
  bug: BugTale | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BugReportModal({ bug, isOpen, onClose }: BugReportModalProps) {
  if (!bug) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solved': return 'default';
      case 'investigating': return 'secondary';
      case 'wontfix': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-full sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto p-2 sm:p-6">
        <DialogHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 w-full min-w-0">
              <AlertCircle className="w-6 h-6 text-destructive shrink-0" />
              <div className="min-w-0">
                <DialogTitle className="text-base sm:text-xl font-mono break-words break-all line-clamp-3">{bug.title}</DialogTitle>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant={getSeverityColor(bug.severity)}>
                    {bug.severity.toUpperCase()}
                  </Badge>
                  <Badge variant={getStatusColor(bug.status)}>
                    {bug.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-6">
          {/* Bug Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 min-w-0">
              <User className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs sm:text-sm truncate">
                <strong>Assignee:</strong> <span className="break-all">{bug.assignee}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs sm:text-sm truncate">
                <strong>Time to Solve:</strong> <span className="break-all">{bug.timeToSolve}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <GitCommit className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs sm:text-sm truncate">
                <strong>Reported:</strong> <span className="break-all">{bug.dateReported}</span>
              </span>
            </div>
          </div>
          {/* Description */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Description
            </h3>
            <div className="bg-background border border-border rounded-lg p-3 sm:p-4">
              <p className="whitespace-pre-wrap break-words text-xs sm:text-base">{bug.description}</p>
            </div>
          </div>
          {/* Steps to Reproduce */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3">🔄 Steps to Reproduce</h3>
            <div className="bg-background border border-border rounded-lg p-3 sm:p-4">
              <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm break-words">{bug.reproduction}</pre>
            </div>
          </div>
          {/* Solution */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3">✅ Solution</h3>
            <div className="bg-background border border-border rounded-lg p-3 sm:p-4">
              <p className="whitespace-pre-wrap break-words text-xs sm:text-base">{bug.solution}</p>
            </div>
          </div>
          {/* Tags */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3">🏷️ Tags</h3>
            <div className="flex flex-wrap gap-2">
              {bug.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-mono text-xs sm:text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
