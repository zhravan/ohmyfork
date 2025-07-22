import { 
  Folder, 
  FileText, 
  Code, 
  FileCode, 
  Mail, 
  Bug, 
  BookOpen,
  Rss
} from "lucide-react";

interface FileIconProps {
  type: 'directory' | 'file';
  name: string;
  className?: string;
}

export function FileIcon({ type, name, className = "" }: FileIconProps) {
  if (type === 'directory') {
    // Special icons for specific directories
    if (name === 'projects') return <Code className={`directory-icon ${className}`} />;
    if (name === 'blogs') return <BookOpen className={`directory-icon ${className}`} />;
    if (name === 'contact') return <Mail className={`directory-icon ${className}`} />;
    if (name === 'bug_tales') return <Bug className={`directory-icon ${className}`} />;
    if (name === 'newsletter') return <Rss className={`directory-icon ${className}`} />;
    
    return <Folder className={`directory-icon ${className}`} />;
  }
  
  // File icons based on extension or name
  if (name.endsWith('.md')) return <FileText className={`file-icon-text ${className}`} />;
  if (name.endsWith('.js') || name.endsWith('.ts') || name.endsWith('.tsx')) {
    return <FileCode className={`file-icon-text ${className}`} />;
  }
  
  return <FileText className={`file-icon-text ${className}`} />;
}