import { useNavigate } from "react-router-dom";
import { FileIcon } from "./FileIcon";

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
  { name: '.gitignore', type: 'file', path: '#', lastCommit: 'Initial commit', commitTime: '2 months ago' },
  { name: 'README.md', type: 'file', path: '#readme', lastCommit: 'Update README with latest info', commitTime: '1 day ago' },
  { name: 'package.json', type: 'file', path: '#', lastCommit: 'Update dependencies', commitTime: '1 week ago' },
];

export function FileExplorer() {
  const navigate = useNavigate();

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'directory') {
      navigate(item.path);
    } else if (item.path === '#readme') {
      document.getElementById('readme')?.scrollIntoView({ behavior: 'smooth' });
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
          <FileIcon type={item.type} name={item.name} className="file-icon" />
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
    </div>
  );
}