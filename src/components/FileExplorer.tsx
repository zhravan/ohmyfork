import { FileText } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FileIcon } from './FileIcon';

interface FileItem {
  name: string;
  type: 'directory' | 'file';
  path: string;
  lastCommit: string;
  commitTime: string;
}

const fileStructure: FileItem[] = [
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

export function FileExplorer() {
  const navigate = useNavigate();
  const [showCVModal, setShowCVModal] = useState(false);

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'directory') {
      navigate(item.path);
    } else if (item.path === '#readme') {
      document.getElementById('readme')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.path === '#cv') {
      setShowCVModal(true);
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
          <div
            key={index}
            className="file-row flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2 cursor-pointer hover:bg-muted/20 transition-colors"
            onClick={() => handleItemClick(item)}
          >
            {item.name === 'cv' ? (
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