import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { GitHubHeader } from '@/components/GitHubHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { loadContent } from '@/lib/content-loader';
import type { WikiNote, ContentItem } from '@/types/content';
import { MDXProvider } from '@mdx-js/react';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';


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
  const [items, setItems] = useState<WikiDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [hoveredDoc, setHoveredDoc] = useState<WikiDoc | null>(null);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await loadContent<WikiNote>('wiki', {}, { page: 1, limit: 1000 });
        if (!active) return;
        setItems(res.items as unknown as WikiDoc[]);
      } catch (e: unknown) {
        if (!active) return;
        const msg = e && typeof e === 'object' && 'message' in e ? String((e as any).message) : 'Failed to load wiki';
        setError(msg);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const docs = items;
  const tags = useMemo(() => {
    const s = new Set<string>();
    for (const i of docs) if (i.tags) for (const t of i.tags) s.add(t);
    return Array.from(s).sort();
  }, [docs]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const list = tag ? docs.filter((d) => (d.tags || []).includes(tag)) : docs;
    if (!q) return list;
    return list.filter((d) => [d.title, d.section, d.description].filter(Boolean).join(' ').toLowerCase().includes(q));
  }, [docs, query, tag]);

  const bySection = useMemo(() => {
    return filtered.reduce<Record<string, WikiDoc[]>>((acc, it) => {
      const key = it.section || 'General';
      (acc[key] ||= []).push(it);
      return acc;
    }, {});
  }, [filtered]);

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const highlightText = (text: string, q: string) => {
    const clean = (text || '').replace(/`/g, '');
    const queryStr = q.trim();
    if (!queryStr) return clean;
    try {
      const parts = clean.split(new RegExp(`(${escapeRegExp(queryStr)})`, 'ig'));
      return parts.map((part, idx) =>
        part.toLowerCase() === queryStr.toLowerCase() ? (
          <mark key={idx} className="bg-yellow-500/20 text-foreground rounded px-0.5">{part}</mark>
        ) : (
          <span key={idx}>{part}</span>
        )
      );
    } catch {
      return clean;
    }
  };

  const stripTicks = (s?: string) => (s || '').replace(/`/g, '');

  // MDX components for consistent wiki styling (compact, readable)
  const mdxComponents = {
    h1: ({ children, ...props }: any) => (
      <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-0 leading-tight tracking-tight" {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-10 leading-tight border-b border-border pb-2" {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl md:text-2xl font-semibold mb-3 mt-6" {...props}>{children}</h3>
    ),
    p: ({ children, ...props }: any) => (
      <p className="mb-4 leading-7 text-base md:text-[17px]" {...props}>{children}</p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 marker:text-primary" {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 marker:text-primary" {...props}>{children}</ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="leading-7 text-base md:text-[17px]" {...props}>{children}</li>
    ),
    code: ({ children, className, ...props }: any) => (
      <code className={className} {...props}>{children}</code>
    ),
    pre: ({ children, ...props }: any) => (
      <pre {...props}>{children}</pre>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground bg-muted/30 rounded-r-md" {...props}>{children}</blockquote>
    ),
    img: ({ src, alt, ...props }: any) => (
      <img src={src} alt={alt} className="mx-auto block rounded-lg mb-4 max-w-full h-auto shadow-sm border border-border" {...props} />
    ),
    a: ({ href, children, ...props }: any) => (
      <a href={href} className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
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

  const current = useMemo(() => {
    const match = docs.find((d) => (d.slug || '').toLowerCase() === (slug || '').toLowerCase());
    return match || docs[0];
  }, [docs, slug]);

  useEffect(() => {
    if (!slug && docs.length > 0) navigate(`/wiki/${docs[0].slug}`, { replace: true });
  }, [slug, docs, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const el = document.getElementById('wiki-article');
      if (!el) return;
      const hs = Array.from(el.querySelectorAll('h1, h2, h3, h4')) as HTMLElement[];
      const out: { id: string; text: string; level: number }[] = [];
      const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
      for (const h of hs) {
        const text = h.textContent || '';
        if (!text) continue;
        const level = Number(h.tagName.substring(1));
        if (!h.id) h.id = slugify(text);
        // add anchor copy button once
        if (!h.dataset.anchorDecorated) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground hover:text-foreground';
          btn.title = 'Copy link to section';
          btn.textContent = '#';
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = `${window.location.origin}${window.location.pathname}#${h.id}`;
            navigator.clipboard?.writeText(url).catch(() => {});
          });
          const wrap = document.createElement('span');
          wrap.className = 'group inline-flex items-center';
          // Append button at end of heading
          h.appendChild(wrap);
          wrap.appendChild(btn);
          h.dataset.anchorDecorated = '1';
        }
        out.push({ id: h.id, text, level });
      }
      setToc(out);
    }, 0);
    return () => window.clearTimeout(id);
  }, [current?.slug]);

  // Scrollspy for active heading
  useEffect(() => {
    const root = document.getElementById('wiki-article');
    if (!root) return;
    const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4')) as HTMLElement[];
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible[0]?.target) {
          setActiveHeading((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: [0.1, 0.25, 0.5] }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  // Reading progress (sticky bar above article)
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('wiki-article');
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const height = el.offsetHeight;
      const viewport = window.innerHeight;
      const max = Math.max(1, height - viewport);
      const scrolled = Math.min(Math.max(0, window.scrollY - top), max);
      const pct = Math.round((scrolled / max) * 100);
      setReadProgress(Number.isFinite(pct) ? pct : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [current?.slug]);

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <div className="mb-3">
                <div role="search">
                  <Input placeholder="Search wiki…" aria-label="Search wiki notes" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <Badge variant={tag === null ? 'default' : 'outline'} onClick={() => setTag(null)} className="cursor-pointer">All</Badge>
                  {tags.map((t) => (
                    <Badge key={t} variant={tag === t ? 'default' : 'outline'} onClick={() => setTag(t)} className="cursor-pointer">{t}</Badge>
                  ))}
                  {(query || tag) && (
                    <button
                      type="button"
                      onClick={() => { setQuery(''); setTag(null); }}
                      className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                      aria-label="Clear filters"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{filtered.length} results</div>
              </div>
              <div className="max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
                <div className="">
                  {Object.entries(bySection).sort(([a],[b]) => a.localeCompare(b)).map(([section, notes]) => (
                    <div key={section} className="mb-3">
                      <div className="px-2 py-1 text-xs uppercase tracking-wide text-muted-foreground">{section}</div>
                      <ul className="mt-1">
                        {notes.sort((a,b) => (a.title || '').localeCompare(b.title || '')).map((n) => {
                          const isActive = n.slug === current?.slug;
                          const isNew = n.date && (Date.now() - new Date(n.date).getTime()) < 1000 * 60 * 60 * 24 * 14;
                          return (
                            <li key={n.slug}
                              onMouseEnter={() => setHoveredDoc(n)}
                              onMouseLeave={() => setHoveredDoc((prev) => (prev?.slug === n.slug ? null : prev))}
                            >
                              <button
                                className={`w-full text-left px-2 py-1.5 rounded hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-sm ${isActive ? 'bg-muted/30' : ''}`}
                                onClick={() => navigate(`/wiki/${n.slug}`)}
                                aria-current={isActive ? 'page' : undefined}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="truncate">{highlightText(n.title || n.slug || '', query)}</span>
                                  {isNew && <span className="text-[10px] text-green-500">New</span>}
                                </div>
                                {n.description && (
                                  <div className="text-[11px] text-muted-foreground truncate">
                                    {highlightText(n.description, query)}
                                  </div>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                  </div>
              </div>
              {/* Quick Peek panel */}
              <div className="mt-3 p-3 border border-border rounded-md bg-muted/20">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Quick peek</div>
                {hoveredDoc ? (
                  <div>
                    <div className="text-sm font-medium truncate">{stripTicks(hoveredDoc.title || hoveredDoc.slug)}</div>
                    {hoveredDoc.description && (
                      <div className="text-xs text-muted-foreground line-clamp-3">{hoveredDoc.description}</div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">Hover notes to preview here</div>
                )}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8 xl:col-span-7">
            <div className="flex items-center justify-between mb-3">
              <Button variant="outline" size="sm" onClick={() => navigate('/') }>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsPaletteOpen(true)}>⌘K Search</Button>
            </div>
            {/* Reading progress (sticky within viewport) */}
            <div className="sticky top-16 z-20 h-1 bg-transparent">
              <div className="h-1 bg-gradient-to-r from-primary to-emerald-500 rounded-r" style={{ width: `${readProgress}%` }} aria-hidden="true" />
            </div>
            {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
            {error && <div className="text-sm text-red-500">{error}</div>}
            {!loading && filtered.length === 0 && (
              <div className="text-sm text-muted-foreground">No notes found. Try a different search or tag.</div>
            )}
            {current && (
              <article className="border border-border rounded-md p-4">
                <h1 className="text-2xl font-semibold tracking-tight mb-1">{stripTicks(current.title || current.slug)}</h1>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {current.section && <div className="text-xs text-muted-foreground">{current.section}</div>}
                  {current.tags?.map((t) => (
                    <span key={t} className="text-[11px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">{t}</span>
                  ))}
                  {current.date && (
                    <time dateTime={current.date} className="text-[11px] text-muted-foreground ml-auto">{new Date(current.date).toLocaleDateString()}</time>
                  )}
                </div>
                <Separator className="my-4" />
                <div id="wiki-article" className="prose prose-slate dark:prose-invert max-w-none prose-sm sm:prose-base md:prose-lg prose-headings:font-bold prose-h2:border-b prose-h2:border-border prose-h2:pb-2">
                  {/* Render MDX with consistent components */}
                  {current.Component && (
                    <MDXProvider components={mdxComponents}>
                      <current.Component />
                    </MDXProvider>
                  )}
                </div>
                {/* Related notes */}
                {current.tags && current.tags.length > 0 && (
                  <div className="mt-8">
                    <div className="text-sm font-semibold mb-2">Related notes</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {docs
                        .filter((d) => d.slug !== current.slug && d.tags && d.tags.some((t) => current.tags?.includes(t)))
                        .slice(0, 6)
                        .map((d) => (
                          <button
                            key={d.slug}
                            onClick={() => navigate(`/wiki/${d.slug}`)}
                            className="text-left p-3 border border-border rounded-md hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <div className="text-sm font-medium truncate">{stripTicks(d.title || d.slug)}</div>
                            {d.description && <div className="text-xs text-muted-foreground truncate">{d.description}</div>}
                            {d.tags && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {d.tags.filter((t) => current.tags?.includes(t)).slice(0, 3).map((t) => (
                                  <span key={t} className="text-[10px] px-1 py-0.5 rounded border border-border text-muted-foreground">{t}</span>
                                ))}
                              </div>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </article>
            )}
          </main>
          <aside className="hidden xl:block xl:col-span-2">
            <div className="sticky top-24 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
              <div className="border-l border-border pl-3">
                <div className="mb-1 text-[11px] font-semibold tracking-wide text-muted-foreground">On this page</div>
                <ul className="space-y-0.5 text-xs leading-snug">
                  {toc.length === 0 && <li className="text-muted-foreground">No headings</li>}
                  {toc.map((h) => {
                    const indent = h.level >= 4 ? 'pl-6' : h.level >= 3 ? 'pl-3' : '';
                    return (
                      <li key={h.id} className={`truncate ${indent}`}>
                        <a
                          className={`block max-w-full truncate transition-colors ${activeHeading === h.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                          href={`#${h.id}`}
                          aria-current={activeHeading === h.id ? 'true' : undefined}
                        >
                          {h.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <CommandDialog open={isPaletteOpen} onOpenChange={setIsPaletteOpen}>
        <Command>
          <CommandInput placeholder="Search notes…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(bySection).sort(([a],[b]) => a.localeCompare(b)).map(([section, notes]) => (
              <CommandGroup key={section} heading={section}>
                {notes.map((n) => (
                  <CommandItem
                    key={n.slug}
                    value={`${stripTicks(n.title || n.slug)} ${section}`}
                    onSelect={() => {
                      navigate(`/wiki/${n.slug}`);
                      setIsPaletteOpen(false);
                    }}
                  >
                    {stripTicks(n.title || n.slug)}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
