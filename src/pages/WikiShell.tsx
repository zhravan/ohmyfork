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
        out.push({ id: h.id, text, level });
      }
      setToc(out);
    }, 0);
    return () => window.clearTimeout(id);
  }, [current?.slug]);

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <div className="mb-3">
                <Input placeholder="Search wiki…" value={query} onChange={(e) => setQuery(e.target.value)} />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge variant={tag === null ? 'default' : 'outline'} onClick={() => setTag(null)} className="cursor-pointer">All</Badge>
                  {tags.map((t) => (
                    <Badge key={t} variant={tag === t ? 'default' : 'outline'} onClick={() => setTag(t)} className="cursor-pointer">{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
                <div className="">
                  {Object.entries(bySection).sort(([a],[b]) => a.localeCompare(b)).map(([section, notes]) => (
                    <div key={section} className="mb-3">
                      <div className="px-2 py-1 text-xs uppercase tracking-wide text-muted-foreground">{section}</div>
                      <ul className="mt-1">
                        {notes.sort((a,b) => (a.title || '').localeCompare(b.title || '')).map((n) => (
                          <li key={n.slug}>
                            <button
                              className={`w-full text-left px-2 py-1.5 rounded hover:bg-muted/30 text-sm ${n.slug === current?.slug ? 'bg-muted/30' : ''}`}
                              onClick={() => navigate(`/wiki/${n.slug}`)}
                          >
                              {highlightText(n.title || n.slug || '', query)}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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
            {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
            {error && <div className="text-sm text-red-500">{error}</div>}
            {current && (
              <article className="border border-border rounded-md p-4">
                <h1 className="text-2xl font-semibold tracking-tight mb-1">{stripTicks(current.title || current.slug)}</h1>
                {current.section && <div className="text-xs text-muted-foreground mb-3">{current.section}</div>}
                <Separator className="my-4" />
                <div id="wiki-article" className="prose prose-invert max-w-none">
                  {/* Render MDX */}
                  {current.Component && <current.Component />}
                </div>
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
                          className="block max-w-full truncate text-muted-foreground hover:text-foreground transition-colors"
                          href={`#${h.id}`}
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


