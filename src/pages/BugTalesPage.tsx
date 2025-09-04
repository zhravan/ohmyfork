import { AlertTriangle, Clock, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { BugReportModal } from '@/components/BugReportModal';
import { GitHubHeader } from '@/components/GitHubHeader';
import { Badge } from '@/components/ui/badge';
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useContent, useContentTags } from '@/hooks/use-content';
import { Input } from '@/components/ui/input';
import { TagMultiSelect, SortSelect } from '@/components/filters/FilterControls';
import type { BugTale, ContentItem } from '@/types/content';

const TALES_PER_PAGE = 6;

export default function BugTalesPage() {
  const [selectedBug, setSelectedBug] = useState<ContentItem<BugTale> | null>(null);
  const [q, setQ] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<'date-desc'|'date-asc'|'title-asc'|'title-desc'>('date-desc');
  const { tags } = useContentTags('bug-tales');
  const { content: tales, total, page, totalPages, hasNext, hasPrev, goToPage, nextPage, prevPage, search } =
    useContent<BugTale>('bug-tales', {}, { page: 1, limit: TALES_PER_PAGE });
  const currentTales = tales as ContentItem<BugTale>[];
  useEffect(() => {
    search({ query: q, tags: selectedTags, sort });
  }, [q, selectedTags, sort]);

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
    <div className="min-h-screen bg-background">
      <GitHubHeader />

      <div className="container mx-auto px-4 py-6">
  <h1 className="sr-only">Bug Tales</h1>
        {/* Search + Filters */}
        <div className="mb-4 space-y-3">
          <div className="relative max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search bug tales..." className="pl-10" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <TagMultiSelect options={tags} value={selectedTags} onChange={setSelectedTags} />
            <span className="ml-auto text-xs text-muted-foreground">Sort:</span>
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>


        <div className="border border-border rounded-md bg-background">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="font-mono text-xs sm:text-sm text-foreground">bug_tales/ directory</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{total} debugging stories</span>
            </div>
          </div>

          <div className="divide-y divide-border">
            {currentTales.map((tale, index) => (
              <div
                key={index}
                className="p-3 sm:p-4 hover:bg-muted/30 transition-colors cursor-pointer overflow-hidden"
                onClick={() => setSelectedBug(tale)}
              >
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 min-w-0">
                  <AlertTriangle className="w-6 h-6 text-destructive mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 min-w-0">
                      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-foreground hover:text-primary transition-colors break-words break-all line-clamp-2 min-w-0">
                        {tale.title}
                      </h2>
                      <Badge variant={getSeverityColor(tale.severity)}>
                        {tale.severity.toUpperCase()}
                      </Badge>
                      <Badge variant={getStatusColor(tale.status)}>
                        {tale.status.toUpperCase()}
                      </Badge>
                    </div>
                    {(tale as any).description && (
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 break-words text-xs sm:text-sm">
                        {(tale as any).description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tale.timeToSolve}
                      </div>
                      <div>
                        Reported: {new Date(tale.dateReported).toLocaleDateString()}
                      </div>
                      <div className="truncate">
                        Assignee: <span className="break-all">{tale.assignee}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tale.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (hasPrev) prevPage();
                    }}
                    className={!hasPrev ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(p);
                      }}
                      isActive={page === p}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (hasNext) nextPage();
                    }}
                    className={!hasNext ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <BugReportModal
        bug={selectedBug}
        isOpen={!!selectedBug}
        onClose={() => setSelectedBug(null)}
      />
    </div>
  );
}
