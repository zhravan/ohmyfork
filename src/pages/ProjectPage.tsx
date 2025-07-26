import { useNavigate, useParams } from 'react-router-dom';

import { ContentPreview } from '@/components/ContentPreview';
import { GitHubHeader } from '@/components/GitHubHeader';
import { useContentItem } from '@/hooks/use-content';

import type { Project } from '@/types/content';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const { item: project, loading, error } = useContentItem<Project>('projects', slug || null);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GitHubHeader />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">Loading project...</div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <GitHubHeader />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-red-500">
            {error || 'Project not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <GitHubHeader />
      <ContentPreview 
        content={project} 
        onBack={() => navigate('/projects')} 
      />
    </>
  );
}