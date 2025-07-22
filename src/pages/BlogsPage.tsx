import { GitHubHeader } from "@/components/GitHubHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowLeft, Calendar, Clock, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContent } from "@/hooks/use-content";
import type { BlogPost, ContentItem } from "@/types/content";export default function BlogsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
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
      
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    search({ query });
  };
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
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to ohmyfork
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <h1 className="text-2xl font-bold">Developer Blog</h1>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="border border-border rounded-md bg-background">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-foreground">blogs/ directory</span>
              <span className="text-sm text-muted-foreground">{total} articles</span>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {blogPosts.map((post) => (
              <article 
                key={post.slug} 
                className="p-6 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => navigate(`/blogs/${post.slug}`)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
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
                      {post.tags.map((tag) => (
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
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Want to stay updated with my latest posts?
          </p>
          <Button className="github-button-primary">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}