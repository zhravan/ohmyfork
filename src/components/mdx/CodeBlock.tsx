import React, { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";

// Register a few common languages to keep bundle size small
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);

type CodeBlockProps = {
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Unified code renderer for markdown/MDX.
 * - Inline code: subtle background and border
 * - Block code: bordered, rounded, scrollable container with spacing
 */
export function CodeBlock({ children, className, inline, ...props }: CodeBlockProps) {
  const languageMatch = className && /language-(\w+)/.exec(className);
  const isInline = inline ?? !languageMatch;
  if (isInline) {
    return (
      <InlineCode className={className} {...props}>{children}</InlineCode>
    );
  }
  return (
    <BlockCode className={className} languageMatch={languageMatch} {...props}>
      {children}
    </BlockCode>
  );
}

function InlineCode({ children, className, ...props }: React.HTMLAttributes<HTMLElement> & { children: React.ReactNode; }) {
  return (
    <code
      className={
        "bg-muted px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border" +
        (className ? ` ${className}` : "")
      }
      {...props}
    >
      {children}
    </code>
  );
}

function BlockCode({ children, className, languageMatch, ...props }: React.HTMLAttributes<HTMLElement> & { children: React.ReactNode; className?: string; languageMatch: RegExpExecArray | null; }) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const languageLabel = useMemo(() => languageMatch?.[1]?.toUpperCase() ?? "CODE", [languageMatch]);

  useEffect(() => {
    const el = codeRef.current;
    if (el) {
      hljs.highlightElement(el);
    }
  }, [children, className]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  };

  return (
    <div className="group relative my-4 sm:my-6 rounded-lg border border-border bg-[#1e1e1e] overflow-hidden">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border bg-[#2a2a2a] text-[#d4d4d4]">
          {languageLabel}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded border bg-[#2a2a2a] text-[#d4d4d4] hover:bg-[#333]"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className="m-0 p-3 sm:p-4 overflow-x-auto"
        style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4' }}
      >
        <code
          ref={codeRef}
          className={(className || '').concat(' hljs') as string}
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
            fontSize: '0.9rem',
            lineHeight: 1.6
          }}
          {...props}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}


