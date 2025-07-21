import React from 'react';

export default function Home() {
  return (
    <section className="prose dark:prose-invert">
      <h2>Welcome to ohmyfork</h2>
      <p>
        This is a modern React app scaffolded with Vite, TypeScript, Tailwind CSS, shadcn/ui, and a rich UI ecosystem.
      </p>
      <ul>
        <li>TypeScript, ESLint (strict), TailwindCSS, PostCSS</li>
        <li>shadcn/ui (Radix UI), TanStack Query, Zod, React Hook Form</li>
        <li>Markdown rendering, next-themes, lucide-react, canvas-confetti</li>
        <li>Recharts, and more</li>
      </ul>
      <p>
        Explore the <b>Demo</b> page for example components.
      </p>
    </section>
  );
}
