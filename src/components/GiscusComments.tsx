import React, { useEffect, useRef } from 'react';

/**
 * Giscus comments component for GitHub Discussions
 * See: https://giscus.app/
 */
export function GiscusComments({
    repo,
    repoId,
    category,
    categoryId,
    mapping = 'pathname',
    reactionsEnabled = '1',
    emitMetadata = '0',
    inputPosition = 'bottom',
    theme = 'auto',
    lang = 'en',
}: {
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping?: string;
    reactionsEnabled?: string;
    emitMetadata?: string;
    inputPosition?: string;
    theme?: string;
    lang?: string;
}) {
    const giscusRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!giscusRef.current) return;
        // Remove any previous giscus iframe/script
        giscusRef.current.innerHTML = '';
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', repo);
        script.setAttribute('data-repo-id', repoId);
        script.setAttribute('data-category', category);
        script.setAttribute('data-category-id', categoryId);
        script.setAttribute('data-mapping', mapping);
        script.setAttribute('data-reactions-enabled', reactionsEnabled);
        script.setAttribute('data-emit-metadata', emitMetadata);
        script.setAttribute('data-input-position', inputPosition);
        script.setAttribute('data-theme', theme);
        script.setAttribute('data-lang', lang);
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        giscusRef.current.appendChild(script);
    }, [repo, repoId, category, categoryId, mapping, reactionsEnabled, emitMetadata, inputPosition, theme, lang]);

    return (
        <section className="mt-12">
            <div ref={giscusRef} />
            <noscript>
                Please enable JavaScript to view the comments powered by Giscus.
            </noscript>
        </section>
    );
}
