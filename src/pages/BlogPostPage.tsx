import { useNavigate, useParams } from 'react-router-dom';

import { ContentPreview } from '@/components/ContentPreview';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { GiscusComments } from '@/components/GiscusComments';
import { GitHubHeader } from '@/components/GitHubHeader';
import { useContentItem } from '@/hooks/use-content';

import type { BlogPost } from '@/types/content';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const { item: blogPost, loading, error } = useContentItem<BlogPost>('blogs', slug || null);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GitHubHeader />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">Loading blog post...</div>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-background">
        <GitHubHeader />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-red-500">
            {error || 'Blog post not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <GitHubHeader />
      <ErrorBoundary>
        <ContentPreview 
          content={blogPost} 
          onBack={() => navigate('/blogs')} 
        />
      </ErrorBoundary>
      {/* Giscus comments section for blog posts */}
      <div className="container mx-auto px-4">
        <GiscusComments
          repo="zhravan/ohmyfork"
          repoId="R_kgDOPQRINQ"
          category="General"
          categoryId="DIC_kwDOPQRINc4CtijM"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="preferred_color_scheme"
          lang="en"
        />
      </div>
    </>
  );
}
