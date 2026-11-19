document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest('a[href]');
  if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download')) return;
  if (link.protocol !== 'http:' && link.protocol !== 'https:') return;
  if (link.origin === location.origin) return;

  link.target = '_blank';
  link.relList.add('noopener');
}, { capture: true });
