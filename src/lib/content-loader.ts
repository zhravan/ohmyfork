import type { 
  ContentType, 
  ContentItem, 
  SearchOptions, 
  PaginationOptions, 
  ContentResult,
  BaseContent 
} from '@/types/content';

// Generic content loader with search and pagination
export async function loadContent<T extends BaseContent>(
  contentType: ContentType,
  searchOptions: SearchOptions = {},
  paginationOptions: PaginationOptions = { page: 1, limit: 10 }
): Promise<ContentResult<T>> {
  const modules = import.meta.glob('../content/**/*.mdx', { eager: true });
  
  // Filter modules by content type
  const typeModules = Object.entries(modules).filter(([path]) => 
    path.includes(`/content/${contentType}/`)
  );
  
  // Transform modules to content items
  let items: ContentItem<T>[] = typeModules.map(([path, module]: [string, any]) => {
    const slug = path
      .replace(`../content/${contentType}/`, '')
      .replace('.mdx', '');
    
    return {
      // Keep all frontmatter fields first
      ...module.frontmatter,
      // Expose MDX body as both `Component` (existing) and `Content` (frontmatter-style alias)
      // so consumers that expect `frontmatter.Content` semantics can use it.
      Content: module.default,
      slug,
      Component: module.default,
    } as ContentItem<T>;
  });
  
  // Apply search filters and sorting
  items = applySearchFilters(items, searchOptions);
  
  // Apply pagination
  const total = items.length;
  const totalPages = Math.ceil(total / paginationOptions.limit);
  const startIndex = (paginationOptions.page - 1) * paginationOptions.limit;
  const paginatedItems = items.slice(startIndex, startIndex + paginationOptions.limit);
  
  return {
    items: paginatedItems,
    total,
    page: paginationOptions.page,
    totalPages,
    hasNext: paginationOptions.page < totalPages,
    hasPrev: paginationOptions.page > 1
  };
}

// Apply search and filter logic
function applySearchFilters<T extends BaseContent>(
  items: ContentItem<T>[],
  options: SearchOptions
): ContentItem<T>[] {
  let filtered = items;
  
  // Text search in title, description, excerpt, etc.
  if (options.query) {
    const query = options.query.toLowerCase();
    filtered = filtered.filter(item => {
      const searchableText = [
        (item as any).title,
        (item as any).description,
        (item as any).excerpt,
        (item as any).name,
        ...(item.tags || [])
      ].filter(Boolean).join(' ').toLowerCase();
      
      return searchableText.includes(query);
    });
  }
  
  // Tag filtering
  if (options.tags && options.tags.length > 0) {
    filtered = filtered.filter(item => 
      options.tags!.some(tag => 
        (item as any).tags?.some((itemTag: string) => 
          itemTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }
  
  // Date range filtering
  if (options.dateRange) {
    const { start, end } = options.dateRange;
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.date);
      const startDate = start ? new Date(start) : null;
      const endDate = end ? new Date(end) : null;
      
      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;
      return true;
    });
  }
  // Sorting
  const sort = options.sort || 'date-desc';
  filtered = [...filtered].sort((a, b) => {
    if (sort === 'title-asc' || sort === 'title-desc') {
      const ta = ((a as any).title || (a as any).name || '').toString().toLowerCase();
      const tb = ((b as any).title || (b as any).name || '').toString().toLowerCase();
      const cmp = ta.localeCompare(tb);
      return sort === 'title-asc' ? cmp : -cmp;
    }
    // date sort
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return sort === 'date-asc' ? da - db : db - da;
  });

  return filtered;
}

// Get all unique tags for a content type
export async function getContentTags(contentType: ContentType): Promise<string[]> {
  const result = await loadContent(contentType, {}, { page: 1, limit: 1000 });
  const allTags = result.items.flatMap(item => item.tags || []);
  return [...new Set(allTags)].sort();
}

// Get content by slug
export async function getContentBySlug<T extends BaseContent>(
  contentType: ContentType,
  slug: string
): Promise<ContentItem<T> | null> {
  const result = await loadContent<T>(contentType, {}, { page: 1, limit: 1000 });
  return result.items.find(item => item.slug === slug) || null;
}
