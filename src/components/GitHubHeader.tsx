import confetti from 'canvas-confetti';
import { Eye, GitFork, Star, Home as HomeIcon, FileText, Boxes, BookOpen, Mail as MailIcon, Bug, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useMessageHandler } from '@/hooks/message-handler';

export function GitHubHeader() {
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(48);
  const [isForking, setIsForking] = useState(false);
  const { showMessage } = useMessageHandler();

  useEffect(() => {
    const starred = localStorage.getItem('ohmyfork-starred') === 'true';
    setIsStarred(starred);
  }, []);

  const handleStar = () => {
    const newStarred = !isStarred;
    setIsStarred(newStarred);
    setStarCount(prev => newStarred ? prev + 1 : prev - 1);
    localStorage.setItem('ohmyfork-starred', newStarred.toString());

    if (newStarred) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleFork = () => {
    setIsForking(true);
    setTimeout(() => {
      setIsForking(false);
      showMessage({
        title: "Forked! Now go make something awesome.",
        description: "Repository has been forked to your account",
      });
    }, 2000);
  };

  const handleWatch = () => {
    showMessage({
      title: "You're officially watching my journey. Buckle up!",
      description: "You'll be notified of all updates to this repository",
    });
  };

  const navItems = [
    { to: '/', label: 'Home', Icon: HomeIcon },
    { to: '/blogs', label: 'Blogs', Icon: FileText },
    { to: '/projects', label: 'Projects', Icon: Boxes },
    { to: '/wiki', label: 'Wiki', Icon: BookOpen },
    { to: '/newsletter', label: 'Newsletter', Icon: MailIcon },
    { to: '/bug-tales', label: 'Bug Tales', Icon: Bug },
    { to: '/contact', label: 'Contact', Icon: MessageSquare },
  ];

  return (
    <header className="border-b border-border bg-background" role="banner">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        {/* Repo identity row (keep as is) */}
        <div className="flex items-center justify-between gap-3 flex-wrap py-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SKB</span>
              </div>
              <span className="text-base sm:text-lg font-semibold text-foreground truncate">zhravan</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-base sm:text-lg font-semibold text-foreground truncate">ohmyfork</span>
            </div>
            <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold">
              Public
            </span>
          </div>
        </div>
        {/* Global navigation (top bar) */}
        <nav className="mt-3 -mx-3 sm:mx-0 overflow-x-auto border-b border-border" aria-label="Primary">
          <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-0">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap inline-flex items-center gap-2 px-3 py-2 text-sm transition-colors border-b-2 ` +
                  (isActive
                    ? 'border-[#f78166] text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border')
                }
              >
                <item.Icon className="w-4 h-4 opacity-80" aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
        {/* Repo actions row (below nav) */}
        <div className="flex items-center justify-between gap-3 flex-wrap py-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg font-semibold text-foreground truncate">ohmyfork</span>
            <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold">
              Public
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleWatch}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-1.5 text-sm hover:bg-muted/30 transition-colors"
              aria-label="Watch repository"
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">12</span>
            </button>
            <button
              type="button"
              onClick={handleStar}
              aria-pressed={isStarred}
              aria-label={isStarred ? 'Unstar repository' : 'Star repository'}
              className={`inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm transition-colors ${isStarred ? 'bg-primary/20 hover:bg-primary/30' : 'bg-muted/20 hover:bg-muted/30'}`}
            >
              <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} aria-hidden="true" />
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{starCount}</span>
            </button>
            <button
              type="button"
              onClick={handleFork}
              disabled={isForking}
              aria-busy={isForking}
              aria-label="Fork repository"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-1.5 text-sm hover:bg-muted/30 transition-colors disabled:opacity-70"
            >
              <GitFork className={`w-4 h-4 ${isForking ? 'animate-spin' : ''}`} aria-hidden="true" />
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">7</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
