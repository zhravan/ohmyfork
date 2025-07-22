import { useState, useEffect, useCallback } from 'react';
import { 
  loadContent, 
  getContentTags, 
  getContentBySlug 
} from '@/lib/content-loader';
import type { 
  ContentType, 
  ContentResult, 
  SearchOptions, 
  PaginationOptions,
  BaseContent,
  ContentItem
} from '@/types/content';

// Main content hook with search and pagination
export function useContent<T extends BaseContent>(
  contentType: ContentType,
  initialSearchOptions: SearchOptions = {},
  initialPaginationOptions: PaginationOptions = { page: 1, limit: 10 }
) {
  const [result, setResult] = useState<ContentResult<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOptions, setSearchOptions] = useState(initialSearchOptions);
  const [paginationOptions, setPaginationOptions] = useState(initialPaginationOptions);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadContent<T>(contentType, searchOptions, paginationOptions);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [contentType, searchOptions, paginationOptions]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Search functions
  const search = useCallback((newSearchOptions: SearchOptions) => {
    setSearchOptions(newSearchOptions);
    setPaginationOptions(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  const clearSearch = useCallback(() => {
    setSearchOptions({});
    setPaginationOptions(prev => ({ ...prev, page: 1 }));
  }, []);

  // Pagination functions
  const goToPage = useCallback((page: number) => {
    setPaginationOptions(prev => ({ ...prev, page }));
  }, []);

  const nextPage = useCallback(() => {
    if (result?.hasNext) {
      setPaginationOptions(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [result?.hasNext]);

  const prevPage = useCallback(() => {
    if (result?.hasPrev) {
      setPaginationOptions(prev => ({ ...prev, page: prev.page - 1 }));
    }
  }, [result?.hasPrev]);

  const setPageSize = useCallback((limit: number) => {
    setPaginationOptions(prev => ({ ...prev, limit, page: 1 }));
  }, []);

  return {
    // Data
    content: result?.items || [],
    total: result?.total || 0,
    page: result?.page || 1,
    totalPages: result?.totalPages || 0,
    hasNext: result?.hasNext || false,
    hasPrev: result?.hasPrev || false,
    
    // State
    loading,
    error,
    searchOptions,
    paginationOptions,
    
    // Actions
    search,
    clearSearch,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    reload: loadData
  };
}

// Hook for getting available tags
export function useContentTags(contentType: ContentType) {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContentTags(contentType)
      .then(setTags)
      .finally(() => setLoading(false));
  }, [contentType]);

  return { tags, loading };
}

// Hook for getting single content item by slug
export function useContentItem<T extends BaseContent>(
  contentType: ContentType,
  slug: string | null
) {
  const [item, setItem] = useState<ContentItem<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setItem(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    getContentBySlug<T>(contentType, slug)
      .then(setItem)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load content'))
      .finally(() => setLoading(false));
  }, [contentType, slug]);

  return { item, loading, error };
}