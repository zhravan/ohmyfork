import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FileIcon } from './FileIcon';
import { loadContent } from '@/lib/content-loader';
import type { WikiNote } from '@/types/content';

interface FileNode {
  name: string;
  type: 'directory' | 'file';
  path: string; // for directories, acts as route; for files, route or anchor
  lastCommit?: string;
  commitTime?: string;
  children?: FileNode[];
}

const staticNodes: FileNode[] = [
  { name: 'blogs', type: 'directory', path: '/blogs', lastCommit: 'Add latest blog posts', commitTime: '2 days ago' },
  { name: 'projects', type: 'directory', path: '/projects', lastCommit: 'Update project showcase', commitTime: '1 week ago' },
  { name: 'contact', type: 'directory', path: '/contact', lastCommit: 'Add social links', commitTime: '3 days ago' },
  { name: 'bug_tales', type: 'directory', path: '/bug-tales', lastCommit: 'New debugging story: The vanishing CSS', commitTime: '5 days ago' },
  { name: 'newsletter', type: 'directory', path: '/newsletter', lastCommit: 'Add signup form', commitTime: '1 week ago' },
  { name: 'cv', type: 'file', path: '#cv', lastCommit: 'Update CV', commitTime: '1 day ago' },
  { name: '.gitignore', type: 'file', path: '#', lastCommit: 'Initial commit', commitTime: '2 months ago' },
  { name: 'README.md', type: 'file', path: '#readme', lastCommit: 'Update README with latest info', commitTime: '1 day ago' },
  { name: 'package.json', type: 'file', path: '#', lastCommit: 'Update dependencies', commitTime: '1 week ago' },
];

interface WikiItem extends WikiNote {
  Component: React.ComponentType;
}

export function FileExplorer() {
  const navigate = useNavigate();
  const [showCVModal, setShowCVModal] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ '/wiki': false });
  const [wikiItems, setWikiItems] = useState<WikiItem[]>([]);
  const [wikiLoading, setWikiLoading] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setWikiLoading(true);
        const res = await loadContent<WikiNote>('wiki', {}, { page: 1, limit: 1000 });
        if (!active) return;
        setWikiItems(res.items as unknown as WikiItem[]);
      } catch {
        // ignore
      } finally {
        if (active) setWikiLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const wikiTree: FileNode | null = useMemo(() => {
    if (!wikiItems.length) return {
      name: 'wiki', type: 'directory', path: '/wiki', lastCommit: 'Wiki: 0 notes', commitTime: '—', children: []
    };
    const bySection: Record<string, WikiItem[]> = {};
    for (const it of wikiItems) {
      const key = it.section || 'General';
      (bySection[key] ||= []).push(it);
    }
    // latest date for overview
    const latest = wikiItems
      .map((i) => new Date(i.date).getTime())
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => b - a)[0];
    const latestStr = latest ? new Date(latest).toISOString().slice(0, 10) : '—';
    const sectionNodes: FileNode[] = Object.entries(bySection)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([section, notes]) => ({
        name: section,
        type: 'directory',
        path: `/wiki#${encodeURIComponent(section)}`,
        children: notes
          .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
          .map((n) => ({
            name: n.title || n.slug,
            type: 'file',
            path: `/wiki/${n.slug}`,
          })),
      }));
    return { name: 'wiki', type: 'directory', path: '/wiki', lastCommit: `Wiki: ${wikiItems.length} notes`, commitTime: `2 days ago` || latestStr, children: sectionNodes };
  }, [wikiItems]);

  const fileStructure: FileNode[] = useMemo(() => {
    const nodes = [...staticNodes];
    nodes.unshift(wikiTree as FileNode);
    return nodes;
  }, [wikiTree]);

  const toggleExpand = (path: string) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleItemClick = (item: FileNode) => {
    if (item.type === 'directory') {
      // Expand/collapse directories; navigate for top-level directories other than wiki
      if (item.name === 'wiki' || item.children?.length) {
        toggleExpand(item.path);
      } else {
        navigate(item.path);
      }
    } else if (item.path === '#readme') {
      document.getElementById('readme')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.path === '#cv') {
      setShowCVModal(true);
    } else if (item.path.startsWith('/wiki/')) {
      navigate(item.path);
    }
  };

  return (
    <div className="repo-file-list bg-background w-full overflow-x-auto rounded-md border border-border">
      <div className="bg-muted/30 px-3 sm:px-4 py-3 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs sm:text-sm text-foreground">main</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs sm:text-sm text-muted-foreground">{fileStructure.length} files</span>
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground">Latest commit 1 day ago</span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {fileStructure.map((item, index) => (
          <div key={index}>
            <div
              className="file-row flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2 cursor-pointer hover:bg-muted/20 transition-colors"
              onClick={() => handleItemClick(item)}
            >
              {item.type === 'directory' ? (
                expanded[item.path] ? <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5" /> : <Folder className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : item.name === 'cv' ? (
                <FileText className="file-icon text-primary w-4 h-4 sm:w-5 sm:h-5" aria-label="CV icon" />
              ) : (
                <FileIcon type={item.type} name={item.name} className="file-icon w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="font-mono text-xs sm:text-sm text-foreground font-medium min-w-0 truncate flex-1">
                {item.name}
              </span>
              <span className="commit-message text-xs sm:text-sm truncate flex-1 min-w-0 text-muted-foreground">
                {item.lastCommit}
              </span>
              <span className="commit-time text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                {item.commitTime}
              </span>
              {item.type === 'directory' && (
                expanded[item.path] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
              )}
            </div>
            {item.type === 'directory' && expanded[item.path] && item.children && (
              <div className="border-l border-border ml-3 sm:ml-4">
                {item.children.map((child, cidx) => (
                  <div key={cidx}>
                    <div
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 cursor-pointer hover:bg-muted/10"
                      onClick={() => handleItemClick(child)}
                    >
                      {child.type === 'directory' ? (
                        expanded[child.path] ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />
                      ) : (
                        <FileIcon type={child.type} name={child.name} className="w-4 h-4" />
                      )}
                      <span className="font-mono text-xs sm:text-sm text-foreground flex-1 truncate">{child.name}</span>
                      {child.type === 'directory' && (
                        expanded[child.path] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                    {child.type === 'directory' && expanded[child.path] && child.children && (
                      <div className="border-l border-border ml-3">
                        {child.children.map((leaf, lidx) => (
                          <div
                            key={lidx}
                            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 cursor-pointer hover:bg-muted/5"
                            onClick={() => handleItemClick(leaf)}
                          >
                            <FileIcon type={leaf.type} name={leaf.name} className="w-4 h-4" />
                            <span className="font-mono text-xs text-foreground flex-1 truncate">{leaf.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {item.name === 'wiki' && wikiLoading && (
                  <div className="px-3 py-2 text-xs text-muted-foreground">Loading wiki…</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* CV Modal */}
      {showCVModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-0">
          <div className="bg-background rounded-lg shadow-lg max-w-full w-full sm:max-w-3xl p-2 sm:p-4 relative">
            <button
              className="absolute top-2 right-2 text-2xl text-muted-foreground hover:text-foreground"
              onClick={() => setShowCVModal(false)}
              aria-label="Close CV preview"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">CV Preview</h2>
            <div className="w-full h-[60vh] sm:h-[70vh] flex items-center justify-center">
              <iframe
                src={`${import.meta.env.BASE_URL}cv.pdf`}
                title="CV PDF Preview"
                className="w-full h-full rounded border border-border"
                frameBorder="0"
                aria-label="CV PDF Preview"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
