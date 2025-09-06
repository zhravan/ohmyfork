import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { GitHubHeader } from '@/components/GitHubHeader';
import { Button } from '@/components/ui/button';
import { loadContent } from '@/lib/content-loader';
import { stripBackticks } from '@/lib/string-utils';
import type { WikiNote } from '@/types/content';
import { MDXProvider } from '@mdx-js/react';
import { CodeBlock } from '@/components/mdx/CodeBlock';

type WikiDoc = {
  slug: string;
  date?: string;
  tags?: string[];
  title?: string;
  section?: string;
  description?: string;
  Component?: React.ComponentType;
};

export default function WikiShell() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [docs, setDocs] = useState<WikiDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');



  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await loadContent<WikiNote>('wiki', {}, { page: 1, limit: 1000 });
        if (!active) return;
        // Keep items unsorted here; we'll derive alphabetical lists for the sidebar
        const items = (res.items as WikiDoc[]);
        setDocs(items);
      } catch (e: unknown) {
        if (!active) return;
        const msg = e && typeof e === 'object' && 'message' in e ? String((e as any).message) : 'Failed to load notes';
        setError(msg);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Redirect to Home (or first page) when visiting /wiki without a slug to match GitHub Wiki behavior
  useEffect(() => {
    if (!loading && docs.length > 0 && !slug) {
      const home = docs.find(d => (d.slug || '').toLowerCase() === 'home');
      const target = home?.slug || docs.slice().sort((a, b) => (stripBackticks(a.title || a.slug).localeCompare(stripBackticks(b.title || b.slug))))[0]?.slug;
      if (target) navigate(`/wiki/${target}`, { replace: true });
    }
  }, [loading, docs, slug, navigate]);

  // Sidebar list: alphabetical by title/slug, filtered by query
  const pagesList = useMemo(() => {
    const q = query.toLowerCase().trim();
    const list = docs
      .slice()
      .sort((a, b) => stripBackticks(a.title || a.slug).localeCompare(stripBackticks(b.title || b.slug)));
    if (!q) return list;
    return list.filter((d) =>
      [d.title, d.description, d.section, ...(d.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [docs, query]);

  const current = useMemo(() => {
    return docs.find((d) => (d.slug || '').toLowerCase() === (slug || '').toLowerCase()) || null;
  }, [docs, slug]);

  const mdxComponents = {
    h1: ({ children, ...props }: any) => (
      <h1 className="text-3xl font-bold mt-0 mb-4 tracking-tight" {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl font-semibold mt-8 mb-3 border-b border-border pb-2" {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>{children}</h3>
    ),
    p: ({ children, ...props }: any) => (
      <p className="mb-4 leading-7" {...props}>{children}</p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>{children}</ul>
    ),
    li: ({ children, ...props }: any) => (
      <li className="leading-7" {...props}>{children}</li>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground bg-muted/30 rounded-r" {...props}>{children}</blockquote>
    ),
    img: ({ src, alt, ...props }: any) => (
      <img src={src} alt={alt} className="mx-auto block rounded-lg mb-4 max-w-full h-auto border border-border" {...props} />
    ),
    a: ({ href, children, ...props }: any) => (
      <a href={href} className="text-primary underline underline-offset-4 decoration-2" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    ),
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto mb-4"><table className="min-w-full border-collapse border border-border" {...props}>{children}</table></div>
    ),
    th: ({ children, ...props }: any) => (
      <th className="border border-border px-3 py-2 bg-muted font-semibold text-left" {...props}>{children}</th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="border border-border px-3 py-2" {...props}>{children}</td>
    ),
    CodeBlock,
  };

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-6 items-start">
          {/* Sidebar: Pages list */}
          <aside className="md:sticky md:top-4 self-start">
            <div className="border border-border rounded-md bg-card">
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold">Pages</h2>
                  <span className="text-xs text-muted-foreground">{docs.length}</span>
                </div>
                <Input
                  placeholder="Find a page…"
                  aria-label="Find a page"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <nav className="max-h-[70vh] overflow-auto py-1" aria-label="Wiki pages">
                {loading && <div className="px-3 py-2 text-xs text-muted-foreground">Loading…</div>}
                {error && <div className="px-3 py-2 text-xs text-destructive">{error}</div>}
                {!loading && pagesList.length === 0 && (
                  <div className="px-3 py-2 text-xs text-muted-foreground">No matching pages</div>
                )}
                <ul>
                  {pagesList.map((p) => {
                    const isActive = (p.slug || '').toLowerCase() === (slug || '').toLowerCase();
                    return (
                      <li key={p.slug}>
                        <Link
                          to={`/wiki/${p.slug}`}
                          className={
                            `block px-3 py-2 text-sm border-b border-border last:border-b-0 hover:bg-muted/40 ` +
                            (isActive ? 'font-semibold text-foreground' : 'text-muted-foreground')
                          }
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {stripBackticks(p.title || p.slug)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <section>
            <div className="border border-border rounded-md bg-card">
              <div className="px-4 sm:px-6 py-4 border-b border-border flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/wiki">Wiki Home</Link>
                </Button>
                {current?.date && (
                  <time className="ml-auto text-xs text-muted-foreground" dateTime={current.date}>
                    Last updated {new Date(current.date).toLocaleDateString()}
                  </time>
                )}
              </div>
              <div className="px-4 sm:px-6 py-6">
                {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
                {error && <div className="text-sm text-destructive">{error}</div>}
                {!loading && !current && (
                  <div className="text-sm text-muted-foreground">Page not found.</div>
                )}
                {current && (
                  <article className="max-w-[980px]">
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                      {stripBackticks(current.title || current.slug)}
                    </h1>
                    <Separator className="my-4" />
                    <div id="wiki-article" className="prose prose-slate dark:prose-invert max-w-none prose-sm sm:prose-base prose-code:before:content-none prose-code:after:content-none">
                      {current.Component && (
                        <MDXProvider components={mdxComponents}>
                          <current.Component />
                        </MDXProvider>
                      )}
                    </div>
                  </article>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
