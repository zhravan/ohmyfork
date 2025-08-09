import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MDXProvider } from '@mdx-js/react';
import { CodeBlock } from '@/components/mdx/CodeBlock';

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
  // Inline code
  code: ({ children, className, ...props }: any) => (
    <CodeBlock inline className={className} {...props}>
      {children}
    </CodeBlock>
  ),
  // Fenced code blocks come as <pre><code class="language-...">...</code></pre>
  // We intercept <pre> and render our CodeBlock using its child <code> props
  pre: ({ children }: any) => {
    // children should be a single <code> element
    const codeChild = Array.isArray(children) ? children[0] : children;
    const codeProps = codeChild?.props || {};
    const className = codeProps.className || "";
    const codeContent = codeProps.children;
    return (
      <CodeBlock className={className}>
        {codeContent}
      </CodeBlock>
    );
  },
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
      className="mx-auto block rounded-lg mb-6 max-w-full h-auto shadow-md border border-border" 
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
            <div className="blog-content px-8 py-12 prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h3:text-2xl prose-p:text-base prose-p:leading-7 prose-li:text-base">
              <MDXProvider components={mdxComponents}>
                <div className="blog-content">
                  <content.Component />
                </div>
              </MDXProvider>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}