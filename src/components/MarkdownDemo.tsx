import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const markdown = `# Markdown Example\n\nThis is **markdown** rendered with react-markdown.\n\n- Supports GFM (tables, strikethrough, etc)\n- Supports raw HTML\n\n<table>\n  <tr><th>Table</th><th>Support</th></tr>\n  <tr><td>Yes</td><td>✔️</td></tr>\n</table>\n`;

export default function MarkdownDemo() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h3 className="text-lg font-semibold mb-2">Markdown Example</h3>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
    </div>
  );
}
