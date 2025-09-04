import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { GitHubHeader } from '@/components/GitHubHeader';
import { Button } from '@/components/ui/button';
import { loadContent } from '@/lib/content-loader';
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await loadContent<WikiNote>('wiki', {}, { page: 1, limit: 1000 });
        if (!active) return;
        const items = (res.items as WikiDoc[]).sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : 0;
          const db = b.date ? new Date(b.date).getTime() : 0;
          return db - da; // newest first
        });
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

  const allTags = useMemo(() => {
    const s = new Set<string>();
    for (const i of docs) if (i.tags) for (const t of i.tags) s.add(t);
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [docs]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const byTags = selectedTags.length
      ? docs.filter((d) => (d.tags || []).some((t) => selectedTags.includes(t)))
      : docs;
    if (!q) return byTags;
    return byTags.filter((d) => [d.title, d.section, d.description, ...(d.tags || [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(q)
    );
  }, [docs, query, selectedTags]);

  const current = useMemo(() => {
    return filtered.find((d) => (d.slug || '').toLowerCase() === (slug || '').toLowerCase()) || null;
  }, [filtered, slug]);

  const strip = (s?: string) => (s || '').replace(/`/g, '');

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
        {/* Header: Title, search, tags */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Digital Garden</h1>
              <div className="text-xs text-muted-foreground">{docs.length} notes</div>
            </div>
            <p className="text-sm text-muted-foreground">
              A living collection of notes, ideas, and references. Wander, connect, and grow thoughts over time.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Search notes, tags, thoughts…"
                aria-label="Search notes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  variant={selectedTags.length === 0 ? 'default' : 'outline'}
                  onClick={() => setSelectedTags([])}
                  className="cursor-pointer"
                >
                  All
                </Badge>
                {allTags.map((t) => {
                  const active = selectedTags.includes(t);
                  return (
                    <Badge
                      key={t}
                      variant={active ? 'default' : 'outline'}
                      onClick={() => setSelectedTags((prev) => (active ? prev.filter((x) => x !== t) : [...prev, t]))}
                      className="cursor-pointer"
                    >
                      {t}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Garden grid or Reader based on slug */}
        {!slug && (
          <section>
            {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
            {error && <div className="text-sm text-destructive">{error}</div>}
            {!loading && filtered.length === 0 && (
              <div className="text-sm text-muted-foreground">No notes found.</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((n) => (
                <Link
                  to={`/wiki/${n.slug}`}
                  key={n.slug}
                  className="group rounded-xl border border-border bg-card p-4 hover:bg-muted/30 transition-colors"
                >
                  <h3 className="text-base font-semibold tracking-tight truncate group-hover:text-primary">
                    {strip(n.title || n.slug)}
                  </h3>
                  {n.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{n.description}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {n.tags?.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] px-1 py-0.5 rounded border border-border text-muted-foreground">{t}</span>
                    ))}
                    {n.date && (
                      <time className="ml-auto text-[11px] text-muted-foreground" dateTime={n.date}>
                        {new Date(n.date).toLocaleDateString()}
                      </time>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {slug && (
          <section>
            <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card shadow-sm p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link to="/wiki">← Back to garden</Link>
                </Button>
              </div>
              {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
              {error && <div className="text-sm text-destructive">{error}</div>}
              {!loading && !current && (
                <div className="text-sm text-muted-foreground">Note not found.</div>
              )}
              {current && (
                <article>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">{strip(current.title || current.slug)}</h1>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {current.section && <span className="text-xs text-muted-foreground">{current.section}</span>}
                    {current.tags?.map((t) => (
                      <span key={t} className="text-[11px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">{t}</span>
                    ))}
                    {current.date && (
                      <time dateTime={current.date} className="text-[11px] text-muted-foreground ml-auto">{new Date(current.date).toLocaleDateString()}</time>
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div id="wiki-article" className="prose prose-slate dark:prose-invert max-w-none prose-sm sm:prose-base md:prose-lg">
                    {current.Component && (
                      <MDXProvider components={mdxComponents}>
                        <current.Component />
                      </MDXProvider>
                    )}
                  </div>
                  {current.tags && current.tags.length > 0 && (
                    <div className="mt-8">
                      <div className="text-sm font-semibold mb-2">Related notes</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {docs
                          .filter((d) => d.slug !== current.slug && d.tags && d.tags.some((t) => current.tags?.includes(t)))
                          .slice(0, 6)
                          .map((d) => (
                            <Link
                              key={d.slug}
                              to={`/wiki/${d.slug}`}
                              className="text-left p-3 border border-border rounded-md hover:bg-muted/30"
                            >
                              <div className="text-sm font-medium truncate">{strip(d.title || d.slug)}</div>
                              {d.description && <div className="text-xs text-muted-foreground truncate">{d.description}</div>}
                              {d.tags && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {d.tags.filter((t) => current.tags?.includes(t)).slice(0, 3).map((t) => (
                                    <span key={t} className="text-[10px] px-1 py-0.5 rounded border border-border text-muted-foreground">{t}</span>
                                  ))}
                                </div>
                              )}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </article>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
