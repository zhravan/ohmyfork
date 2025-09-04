import { ExternalLink, Github, Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useContent, useContentTags } from '@/hooks/use-content';
import { useNavigate } from 'react-router-dom';

import { GitHubHeader } from '@/components/GitHubHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TagMultiSelect, SortSelect } from '@/components/filters/FilterControls';
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

import type { Project } from "@/types/content";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'>('date-desc');
  const { tags } = useContentTags('projects');

  const {
    content: projects,
    loading,
    error,
    total,
    page,
    totalPages,
    hasNext,
    hasPrev,
    search,
    goToPage,
    nextPage,
    prevPage
  } = useContent<Project>('projects', {}, { page: 1, limit: 6 });

  const toggleTag = (t: string) => {
    setSelectedTags((prev) => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };
  const handleSearch = (query: string) => setSearchQuery(query);
  useEffect(() => {
    search({ query: searchQuery, tags: selectedTags, sort });
  }, [searchQuery, selectedTags, sort, search]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GitHubHeader />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">Loading projects...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <GitHubHeader />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />

      <div className="container mx-auto px-2 sm:px-4 py-6">
        <h1 className="sr-only">Projects</h1>

        <div className="mb-6 space-y-3" role="search">
          <div className="relative max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" aria-hidden="true" />
            <Input
              placeholder="Search projects..."
              aria-label="Search projects"
              autoComplete="off"
              inputMode="search"
              name="project-search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <TagMultiSelect options={tags} value={selectedTags} onChange={setSelectedTags} />
            <span className="ml-auto text-xs text-muted-foreground">Sort:</span>
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="border border-border rounded-md bg-background">
          <div className="bg-muted/30 px-3 sm:px-4 py-3 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="font-mono text-xs sm:text-sm text-foreground">projects/ directory</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{total} repositories</span>
            </div>
          </div>
          <div className="divide-y divide-border">
            {projects.map((project: any, index: number) => (
              <div
                key={index}
                className="p-4 sm:p-6 hover:bg-muted/30 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                role="group"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h2
                        className="text-lg sm:text-xl font-semibold text-primary hover:underline cursor-pointer truncate focus:outline-none"
                        onClick={() => navigate(`/projects/${project.slug}`)}
                        onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/projects/${project.slug}`); }}
                        tabIndex={0}
                        aria-label={`Open project ${project.name}`}
                      >
                        {project.name}
                      </h2>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        {project.language}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {project.stars}
                      </div>
                      <div>
                        Updated {project.lastUpdated}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech: string) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => window.open(project.githubUrl, '_blank', 'noopener')}
                        aria-label={`Open GitHub code for ${project.name}`}
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </Button>
                      {project.demoUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => window.open(project.demoUrl, '_blank', 'noopener')}
                          aria-label={`Open live demo for ${project.name}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => hasPrev && prevPage()}
                    className={!hasPrev ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => goToPage(pageNum)}
                      isActive={pageNum === page}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => hasNext && nextPage()}
                    className={!hasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Page CTA removed in favor of global footer */}
      </div>
    </div>
  );
}
