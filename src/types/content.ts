export interface BaseContent {
  slug: string;
  date: string;
  tags: string[];
}

export interface BlogPost extends BaseContent {
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
}

export interface BugTale extends BaseContent {
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'solved' | 'investigating' | 'wontfix';
  description: string;
  timeToSolve: string;
  assignee: string;
  dateReported: string;
}

export interface NewsletterIssue extends BaseContent {
  title: string;
  description: string;
  topics: string[];
  readTime: string;
}

export interface Project extends BaseContent {
  name: string;
  description: string;
  technologies: string[];
  stars: number;
  language: string;
  lastUpdated: string;
  demoUrl?: string;
  githubUrl: string;
  status: 'Active' | 'Completed' | 'Archived';
}

// Generic content item with MDX component
export interface ContentItem<T = any> extends T {
  // MDX default export rendered as a React component
  Component: React.ComponentType;
  // Frontmatter fields are merged into T by loader; ensure common fields exist
  title?: string;
  section?: string;
  description?: string;
  // Alias for MDX body when consumers expect it inside frontmatter-like shape
  Content?: React.ComponentType;
}

// Search and pagination types
export interface SearchOptions {
  query?: string;
  tags?: string[];
  dateRange?: {
    start?: string;
    end?: string;
  };
  sort?: 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface ContentResult<T> {
  items: ContentItem<T>[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type ContentType = 'blogs' | 'bug-tales' | 'newsletters' | 'projects' | 'wiki';

export interface WikiNote extends BaseContent {
  title: string;
  section?: string;
  description?: string;
}
