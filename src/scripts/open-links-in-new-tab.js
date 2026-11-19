document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest('a[href]');
  if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download')) return;
  if (link.protocol !== 'http:' && link.protocol !== 'https:') return;

  const localFragment = link.hash && link.origin === location.origin &&
    link.pathname === location.pathname && link.search === location.search;
  if (localFragment || link.getAttribute('href').trimStart().startsWith('#')) return;

  link.target = '_blank';
  link.relList.add('noopener');
}, { capture: true });
