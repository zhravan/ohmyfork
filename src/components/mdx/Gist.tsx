import { useEffect, useMemo, useRef } from "react";

type GistProps = {
  /**
   * Full Gist page URL or .js embed URL.
   * Examples:
   * - https://gist.github.com/username/63ab0a6da0380e540f09e84be1881dc5
   * - https://gist.github.com/username/63ab0a6da0380e540f09e84be1881dc5.js
   */
  url: string;
  /** Optional filename within the gist to embed */
  file?: string;
  /** Optional title/caption shown below the embed */
  caption?: string;
  className?: string;
  /** Optional fixed height; otherwise auto-sizes to content */
  height?: number | string;
};

function isSafeGistUrl(rawUrl: string): boolean {
  try {
    const u = new URL(rawUrl);
    return u.hostname === "gist.github.com";
  } catch {
    return false;
  }
}

function toEmbedJsUrl(rawUrl: string, file?: string): string {
  const url = new URL(rawUrl);
  // Ensure path ends with .js
  if (!url.pathname.endsWith(".js")) {
    url.pathname = `${url.pathname}.js`;
  }
  if (file) {
    url.searchParams.set("file", file);
  }
  return url.toString();
}

export function Gist({ url, file, caption, className, height }: GistProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const scriptSrc = useMemo(() => {
    if (!isSafeGistUrl(url)) return "";
    return toEmbedJsUrl(url, file);
  }, [url, file]);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame || !scriptSrc) return;

    const doc = frame.contentDocument || frame.contentWindow?.document;
    if (!doc) return;

    // Write a minimal document and inject the gist script.
    doc.open();
    doc.write(`<!doctype html><html><head><base target="_parent"></head><body>
      <div id="gist-root"></div>
      <script src="${scriptSrc}"></script>
    </body></html>`);
    doc.close();

    let tries = 0;
    const maxTries = 40; // ~4s if 100ms interval
    const interval = setInterval(() => {
      tries += 1;
      const body = doc.body as HTMLBodyElement | null;
      if (!body) return;
      const newHeight = body.scrollHeight;
      if (newHeight && frame.style) {
        frame.style.height = `${newHeight}px`;
      }
      // Stop when content likely loaded
      if (newHeight > 0 || tries >= maxTries) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [scriptSrc]);

  if (!isSafeGistUrl(url)) {
    return (
      <div className={className}>
        <p>Invalid Gist URL. Expected host: gist.github.com</p>
      </div>
    );
  }

  const displayCaption = caption || file || undefined;

  return (
    <figure className={className}>
      <iframe
        ref={iframeRef}
        title={caption || "GitHub Gist"}
        style={{
          width: "100%",
          border: 0,
          height: typeof height === "number" ? `${height}px` : height || "0px"
        }}
        scrolling="no"
      />
      {displayCaption ? (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {displayCaption}
        </figcaption>
      ) : null}
    </figure>
  );
}


