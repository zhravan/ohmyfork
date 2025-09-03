export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-github-canvas-subtle/50">
      <div className="container mx-auto px-4 py-6 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 shadow-sm">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary/80" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground text-center">
            Made with <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">love</span> in the
            <span className="mx-1 bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent font-semibold">Quantum Realm</span>
            of Open Source
          </span>
        </div>
      </div>
    </footer>
  );
}
