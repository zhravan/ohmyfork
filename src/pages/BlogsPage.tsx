import { Calendar, Clock, Search, User } from 'lucide-react';
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

import type { BlogPost, ContentItem } from "@/types/content";


export default function BlogsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'>('date-desc');
  const { tags } = useContentTags('blogs');

  const {
    content: blogPosts,
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
  } = useContent<BlogPost>('blogs', {}, { page: 1, limit: 6 });

  const toggleTag = (t: string) => {
    setSelectedTags((prev) => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };
  useEffect(() => {
    search({ query: searchQuery, tags: selectedTags, sort });
  }, [searchQuery, selectedTags, sort, search]);
  const handleSearch = (query: string) => setSearchQuery(query);
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GitHubHeader />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">Loading blogs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <GitHubHeader />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <h1 className="sr-only">Blogs</h1>

        {/* Search + Filters */}
        <div className="mb-6 space-y-3" role="search">
          <div className="relative max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" aria-hidden="true" />
            <Input
              placeholder="Search blogs..."
              aria-label="Search blogs"
              autoComplete="off"
              inputMode="search"
              name="blog-search"
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
              <span className="font-mono text-xs sm:text-sm text-foreground">blogs/ directory</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{total} articles</span>
            </div>
          </div>
          <div className="divide-y divide-border">
            {blogPosts.map((post: any) => (
              <article
                key={post.slug}
                className="p-4 sm:p-6 hover:bg-muted/30 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                role="link"
                tabIndex={0}
                aria-label={`Open blog post ${post.title}`}
                onClick={() => navigate(`/blogs/${post.slug}`)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/blogs/${post.slug}`); } }}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors truncate">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
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

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(pageNum);
                      }}
                      isActive={page === pageNum}
                    >
                      {pageNum}
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

        {/* Page CTA removed in favor of global footer */}
      </div>
    </div>
  );
}
