import mermaid from 'mermaid';

function renderMermaidBlocks() {
  const isDark = document.documentElement.dataset.theme !== 'light';
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'neutral',
    securityLevel: 'loose',
    themeVariables: {
      fontFamily: 'var(--bc-font-sans)',
      primaryColor: 'var(--bc-surface-2)',
      primaryTextColor: 'var(--bc-text)',
      primaryBorderColor: 'var(--bc-accent)',
      lineColor: 'var(--bc-accent)',
      secondaryColor: 'var(--bc-surface-2)',
      tertiaryColor: 'var(--bc-surface)',
    },
  });

  // Cari blok kode mermaid Expressive Code atau pre.mermaid
  const targets = document.querySelectorAll('.expressive-code pre[data-language="mermaid"], pre.mermaid, code.language-mermaid');
  targets.forEach((target, index) => {
    const parent = target.closest('.expressive-code') || target.parentElement;
    if (!parent || parent.dataset.mermaidRendered) return;
    parent.dataset.mermaidRendered = 'true';

    const rawCode = target.textContent?.trim() || '';
    if (!rawCode) return;

    const container = document.createElement('div');
    container.className = 'bc-mermaid-wrapper';
    container.id = `mermaid-${Date.now()}-${index}`;

    mermaid.render(`svg-${Date.now()}-${index}`, rawCode).then(({ svg }) => {
      container.innerHTML = svg;
      parent.replaceWith(container);
    }).catch((err) => {
      console.warn('Gagal merender diagram Mermaid:', err);
    });
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderMermaidBlocks);
  } else {
    renderMermaidBlocks();
  }
  document.addEventListener('astro:page-load', renderMermaidBlocks);
}
