import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MDXProvider } from '@mdx-js/react';

import type { ContentItem, BaseContent } from '@/types/content';

// MDX components for consistent styling
const mdxComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-0 text-foreground leading-tight tracking-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl md:text-3xl font-semibold mb-6 mt-12 text-foreground leading-tight border-b border-border pb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-8 text-foreground leading-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl font-semibold mb-3 mt-6 text-foreground" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="mb-6 leading-7 text-foreground text-base md:text-lg" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="mb-6 ml-6 list-disc space-y-3 text-foreground marker:text-primary" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="mb-6 ml-6 list-decimal space-y-3 text-foreground marker:text-primary" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-foreground leading-7 text-base md:text-lg" {...props}>
      {children}
    </li>
  ),
  code: ({ children, className, ...props }: any) => {
    // Check if this is a code block (has language class) or inline code
    const isCodeBlock = className?.includes('language-');
    
    if (isCodeBlock) {
      return (
        <code 
          className={`${className} block text-sm font-mono leading-6`}
          {...props}
        >
          {children}
        </code>
      );
    }
    
    return (
      <code 
        className="bg-muted px-2 py-1 rounded text-sm font-mono text-primary border" 
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: any) => (
    <pre 
      className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto mb-8 border border-border font-mono text-sm leading-6 shadow-lg" 
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote 
      className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r-md" 
      {...props}
    >
      {children}
    </blockquote>
  ),
  img: ({ src, alt, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      className="rounded-lg mb-6 max-w-full h-auto shadow-md border border-border" 
      {...props} 
    />
  ),
  a: ({ href, children, ...props }: any) => (
    <a 
      href={href} 
      className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 transition-colors" 
      target="_blank" 
      rel="noopener noreferrer" 
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic text-foreground" {...props}>
      {children}
    </em>
  ),
  hr: ({ ...props }: any) => (
    <hr className="my-8 border-border" {...props} />
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border-collapse border border-border" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th className="border border-border px-4 py-2 bg-muted font-semibold text-left" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border border-border px-4 py-2" {...props}>
      {children}
    </td>
  ),
};

interface ContentPreviewProps<T extends BaseContent> {
  content: ContentItem<T>;
  onBack: () => void;
  showMetadata?: boolean;
  className?: string;
}

export function ContentPreview<T extends BaseContent>({
  content,
  onBack,
  showMetadata = true,
  className = ''
}: ContentPreviewProps<T>) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {showMetadata && (
          <div className="mb-8 p-6 border border-border rounded-md bg-muted/30">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              {(content as any).author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {(content as any).author}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(content.date)}
              </div>
              {(content as any).readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {(content as any).readTime}
                </div>
              )}
              {(content as any).timeToSolve && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Solved in {(content as any).timeToSolve}
                </div>
              )}
            </div>
            
            {content.tags && content.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {content.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        <article className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="px-8 py-12 prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h3:text-2xl prose-p:text-base prose-p:leading-7 prose-li:text-base prose-code:text-sm prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100">
              <MDXProvider components={mdxComponents}>
                <content.Component />
              </MDXProvider>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}