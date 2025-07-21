import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, User, Tag, GitCommit, X } from "lucide-react";

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <div>
                <DialogTitle className="text-xl font-mono">{bug.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={getSeverityColor(bug.severity)}>
                    {bug.severity.toUpperCase()}
                  </Badge>
                  <Badge variant={getStatusColor(bug.status)}>
                    {bug.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Bug Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                <strong>Assignee:</strong> {bug.assignee}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                <strong>Time to Solve:</strong> {bug.timeToSolve}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                <strong>Reported:</strong> {bug.dateReported}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Description
            </h3>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="whitespace-pre-wrap">{bug.description}</p>
            </div>
          </div>

          {/* Steps to Reproduce */}
          <div>
            <h3 className="text-lg font-semibold mb-3">🔄 Steps to Reproduce</h3>
            <div className="bg-background border border-border rounded-lg p-4">
              <pre className="whitespace-pre-wrap font-mono text-sm">{bug.reproduction}</pre>
            </div>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-lg font-semibold mb-3">✅ Solution</h3>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="whitespace-pre-wrap">{bug.solution}</p>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-3">🏷️ Tags</h3>
            <div className="flex flex-wrap gap-2">
              {bug.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-mono">
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