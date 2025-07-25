import { useNavigate } from "react-router-dom";
import { FileIcon } from "./FileIcon";
import { FileText } from "lucide-react";

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

import React, { useState } from "react";

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
    <div className="repo-file-list bg-background">
      <div className="bg-muted/30 px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm text-foreground">main</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{fileStructure.length} files</span>
          </div>
          <span className="text-sm text-muted-foreground">Latest commit 1 day ago</span>
        </div>
      </div>
      {fileStructure.map((item, index) => (
        <div
          key={index}
          className="file-row"
          onClick={() => handleItemClick(item)}
        >
          {item.name === 'cv' ? (
            <FileText className="file-icon text-primary" aria-label="CV icon" />
          ) : (
            <FileIcon type={item.type} name={item.name} className="file-icon" />
          )}
          <span className="font-mono text-sm text-foreground font-medium min-w-0">
            {item.name}
          </span>
          <span className="commit-message">
            {item.lastCommit}
          </span>
          <span className="commit-time">
            {item.commitTime}
          </span>
        </div>
      ))}

      {/* CV Modal */}
      {showCVModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-background rounded-lg shadow-lg max-w-3xl w-full p-4 relative">
            <button
              className="absolute top-2 right-2 text-2xl text-muted-foreground hover:text-foreground"
              onClick={() => setShowCVModal(false)}
              aria-label="Close CV preview"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">CV Preview</h2>
            <div className="w-full h-[70vh] flex items-center justify-center">
              <iframe
                src="https://raw.githubusercontent.com/shravan20/ohmyfork/refs/heads/main/public/cv.pdf"
                title="CV PDF Preview"
                className="w-full h-full rounded border border-border"
                frameBorder="0"
                aria-label="CV PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}