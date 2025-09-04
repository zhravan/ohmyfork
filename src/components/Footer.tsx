import { Coffee, GitFork, Rocket, Sparkles, Wand2 } from 'lucide-react';
import { useMemo } from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  const tagline = useMemo(() => {
    const lines = [
      'Fork boldly. Merge responsibly.',
      'Tiny PRs, massive vibes.',
      'Bugs feared the rubber duck and fled.',
      'Chaotic good commit energy.',
      'Semicolons? Optional. Kindness? Required.',
      'Built with caffeine and curiosity.',
      'Zero downtime for playtime.',
      'Quantum commits: both shipped and WIP.'
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }, []);

  return (
    <footer className="mt-12 border-t border-border bg-github-canvas-subtle/50 no-page-gutter">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center gap-3">
        {/* Core vibe pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 shadow-sm">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary/80" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground text-center">
            Made with <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">love</span> in the
            <span className="mx-1 bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent font-semibold">Quantum Realm</span>
            of Open Source • {year}
          </span>
        </div>

        {/* Quirky badges row */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-2.5 py-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span className="text-muted-foreground">{tagline}</span>
          </span>

          <a
            href="https://github.com/zhravan/ohmyfork"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/20 px-2.5 py-1 hover:bg-muted/30 transition-colors"
            aria-label="Open repository on GitHub"
          >
            <GitFork className="h-3.5 w-3.5" aria-hidden />
            <span>Fork this repo</span>
          </a>

          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/20 px-2.5 py-1"
            title="Mostly decaf. Mostly."
          >
            <Coffee className="h-3.5 w-3.5" aria-hidden />
            <span>Fueled by caffeine</span>
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/20 px-2.5 py-1">
            <Wand2 className="h-3.5 w-3.5" aria-hidden />
            <span>Whimsy mode: on</span>
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/20 px-2.5 py-1">
            <Rocket className="h-3.5 w-3.5" aria-hidden />
            <span>To prod and beyond</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
