// Adapter untuk setter protected Starlight 0.43.1; verifikasi ulang saat upgrade.
(async () => {
  const elements = [...document.querySelectorAll('starlight-toc, mobile-starlight-toc')];
  if (!elements.length) return;
  await Promise.all([...new Set(elements.map(element => element.localName))].map(tag => customElements.whenDefined(tag)));
  const findSetter = element => {
    for (let prototype = Object.getPrototypeOf(element); prototype; prototype = Object.getPrototypeOf(prototype)) {
      const setter = Object.getOwnPropertyDescriptor(prototype, 'current')?.set;
      if (setter) return setter;
    }
  };
  const entries = elements.map(element => ({
    element,
    setCurrent: findSetter(element),
    last: [...element.querySelectorAll('a')].at(-1),
  })).filter(entry => entry.setCurrent && entry.last);
  let queued = false;
  const sync = () => {
    queued = false;
    const root = document.scrollingElement;
    if (!root || root.scrollHeight - root.clientHeight <= 1 || root.scrollTop + root.clientHeight < root.scrollHeight - 1) return;
    for (const { element, setCurrent, last } of entries) {
      if (element.querySelector('a[aria-current="true"]') !== last) setCurrent.call(element, last);
    }
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(sync);
  };
  const observer = new MutationObserver(schedule);
  for (const { element } of entries) observer.observe(element, { subtree: true, attributes: true, attributeFilter: ['aria-current'] });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  schedule();
})();
