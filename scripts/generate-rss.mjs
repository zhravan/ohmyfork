#!/usr/bin/env node
/**
 * Unified RSS generator for Blogs, Newsletters, Bug Tales, and Wiki
 * - Scans src/content/** for MDX files
 * - Reads frontmatter via gray-matter
 * - Emits public/rss.xml
 *
 * Configure site URL via env:
 *   SITE_URL or VITE_SITE_URL (fallback: https://ohmyfork.dev)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';
import fg from 'fast-glob';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CONTENT_DIR = path.join(ROOT, 'src', 'content');
const PUBLIC_DIR = path.join(ROOT, 'public');
const FEED_PATH = path.join(PUBLIC_DIR, 'rss.xml');

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://ohmyfork.dev').replace(/\/$/, '');
// Site icon used for RSS <image> and feed readers. Fallbacks to the icon used in index.html.
const SITE_ICON = (
  process.env.SITE_ICON ||
  process.env.VITE_SITE_ICON ||
  'https://ohmyscript.com/wp-content/uploads/2020/07/cropped-circle-cropped-2.png'
);

/** Map content type to route/link builder and field picks */
const typeConfig = {
  'blogs': {
    pickTitle: (fm) => fm.title || null,
    pickDescription: (fm) => fm.excerpt || fm.description || null,
    pickDate: (fm) => fm.date || null,
    linkFor: (slug) => `${SITE_URL}/blogs/${encodeURIComponent(slug)}`,
  },
  'newsletters': {
    pickTitle: (fm) => fm.title || null,
    pickDescription: (fm) => fm.description || null,
    pickDate: (fm) => fm.date || null,
    // No per-issue route today; link to the listing
    linkFor: (_slug) => `${SITE_URL}/newsletter`,
  },
  'bug-tales': {
    pickTitle: (fm) => fm.title || null,
    pickDescription: (fm) => fm.description || `Severity: ${fm.severity || 'n/a'} | Status: ${fm.status || 'n/a'}`,
    pickDate: (fm) => fm.date || fm.dateReported || null,
    // No per-tale route today; link to the listing
    linkFor: (_slug) => `${SITE_URL}/bug-tales`,
  },
  'wiki': {
    pickTitle: (fm) => fm.title || null,
    pickDescription: (fm) => fm.description || null,
    pickDate: (fm) => fm.date || null,
    linkFor: (slug) => `${SITE_URL}/wiki/${encodeURIComponent(slug)}`,
  },
};

const CONTENT_TYPES = Object.keys(typeConfig);

function xmlEscape(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function toRfc822(date) {
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) throw new Error('Invalid');
    return d.toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

async function readItemsForType(type) {
  const pattern = path.posix.join('src', 'content', type, '**/*.mdx');
  const entries = await fg(pattern, { cwd: ROOT, dot: false, onlyFiles: true });
  const cfg = typeConfig[type];

  const items = [];
  for (const rel of entries) {
    const abs = path.join(ROOT, rel);
    const raw = await fs.readFile(abs, 'utf8');
    const { data: fm } = matter(raw);

    const relFromType = rel.replace(new RegExp(`^src/content/${type}/`), '').replace(/\.mdx$/i, '');

    const tags = Array.isArray(fm.tags) ? fm.tags : [];
    // Skip hidden-tagged items
    if (tags.some((t) => String(t).toLowerCase() === 'hidden')) continue;

    const title = cfg.pickTitle(fm) || relFromType;
    const description = cfg.pickDescription(fm) || '';
    const date = cfg.pickDate(fm) || (await fs.stat(abs)).mtime.toISOString();
    const link = cfg.linkFor(relFromType);

    items.push({
      type,
      slug: relFromType,
      title,
      description,
      date,
      link,
      author: fm.author || null,
      categories: tags,
      guid: `${type}:${relFromType}`,
    });
  }
  return items;
}

async function generate() {
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  const all = (await Promise.all(CONTENT_TYPES.map(readItemsForType))).flat();
  all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const now = new Date().toUTCString();
  const channelTitle = 'OhMyFork.dev – Unified Feed';
  const channelDescription = 'Blogs, Newsletters, Bug Tales, and Wiki updates';

  const itemsXml = all.map((it) => {
    const cats = (it.categories || []).map((c) => `      <category>${xmlEscape(c)}</category>`).join('\n');
    const author = it.author ? `\n      <author>${xmlEscape(it.author)}</author>` : '';
    return `    <item>
      <title>${xmlEscape(it.title)}</title>
      <link>${xmlEscape(it.link)}</link>
      <guid isPermaLink="false">${xmlEscape(it.guid)}</guid>
      <pubDate>${toRfc822(it.date)}</pubDate>
      <description>${xmlEscape(it.description)}</description>${author}
${cats ? cats + '\n' : ''}    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(channelTitle)}</title>
    <link>${SITE_URL}</link>
    <description>${xmlEscape(channelDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link rel="self" type="application/rss+xml" href="${SITE_URL}/rss.xml" />
    <image>
      <url>${xmlEscape(SITE_ICON)}</url>
      <title>${xmlEscape(channelTitle)}</title>
      <link>${SITE_URL}</link>
      <width>128</width>
      <height>128</height>
    </image>
${itemsXml}
  </channel>
</rss>\n`;

  await fs.writeFile(FEED_PATH, xml, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Generated ${FEED_PATH} with ${all.length} items`);
}

generate().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('RSS generation failed:', err);
  process.exitCode = 1;
});
