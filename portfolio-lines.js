(() => {
  'use strict';
  const ns = 'http://www.w3.org/2000/svg';
  const protectedContent = [
    '.hero-copy', '.hero-visual', '.section-heading', '.about-main',
    '.fact-card', '.coursework-card', '.beyond-university',
    '.project-subhead', '.published-project', '.roadmap-head',
    '.roadmap-card', '.timeline', '.contact-panel'
  ].join(',');
  const records = new Map();
  let pending = false;
  function element(name, attrs) {
    const node = document.createElementNS(ns, name);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    return node;
  }
  function discover() {
    document.querySelectorAll('.system-motif').forEach(motif => {
      if (records.has(motif)) return;
      const svg = motif.querySelector('svg');
      const drawing = svg?.querySelector(':scope > g');
      if (!drawing) return;
      const id = `portfolio-content-mask-${records.size}`;
      const defs = element('defs', {});
      const filter = element('filter', { id: `${id}-soft`, x: '-100%', y: '-100%', width: '300%', height: '300%', 'color-interpolation-filters': 'sRGB' });
      // Feather the cutout, with enough padding to keep its centre opaque.
      filter.append(element('feGaussianBlur', { stdDeviation: '5' }));
      const mask = element('mask', { id, maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse', x: 0, y: 0, width: 1200, height: 700, 'mask-type': 'luminance' });
      mask.append(element('rect', { x: 0, y: 0, width: 1200, height: 700, fill: 'white' }));
      const cutouts = element('g', { fill: 'black', filter: `url(#${id}-soft)` });
      mask.append(cutouts);
      defs.append(filter, mask);
      svg.prepend(defs);
      drawing.setAttribute('mask', `url(#${id})`);
      records.set(motif, { svg, cutouts, rectangles: [] });
    });
    queue();
  }
  function paint() {
    pending = false;
    for (const [motif, record] of records) {
      const bounds = record.svg.getBoundingClientRect();
      if (!bounds.width || !bounds.height) continue;
      // Measure the SVG itself: on phones its minimum height can exceed the section.
      const sx = 1200 / bounds.width, sy = 700 / bounds.height;
      const boxes = [...motif.parentElement.querySelectorAll(protectedContent)]
        .map(node => node.getBoundingClientRect()).filter(box => box.width && box.height);
      while (record.rectangles.length > boxes.length) record.rectangles.pop().remove();
      boxes.forEach((box, i) => {
        let rect = record.rectangles[i];
        if (!rect) {
          rect = element('rect', { rx: 10 });
          record.cutouts.append(rect);
          record.rectangles.push(rect);
        }
        // Minimum SVG-space padding keeps even the feathered edge clear of text.
        const px = Math.max(18, 14 * sx), py = Math.max(18, 14 * sy);
        const attrs = {
          x: (box.left - bounds.left) * sx - px,
          y: (box.top - bounds.top) * sy - py,
          width: box.width * sx + 2 * px,
          height: box.height * sy + 2 * py
        };
        for (const [key, value] of Object.entries(attrs)) {
          const rounded = value.toFixed(1);
          if (rect.getAttribute(key) !== rounded) rect.setAttribute(key, rounded);
        }
      });
      motif.setAttribute('data-content-mask', 'ready');
    }
  }
  function queue() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(paint);
  }
  function init() {
    discover();
    // Existing enhancements add sections and motifs asynchronously.
    const observer = new MutationObserver(changes => {
      if (changes.some(change => !change.target.closest?.('.system-motif, .routine'))) discover();
    });
    observer.observe(document.querySelector('main'), { childList: true, subtree: true });
    const resize = new ResizeObserver(queue);
    document.querySelectorAll('main, main section').forEach(node => resize.observe(node));
    document.fonts?.ready.then(queue);
    window.addEventListener('resize', queue, { passive: true });
    window.addEventListener('scroll', queue, { passive: true });
    document.addEventListener('load', queue, true);
    document.addEventListener('toggle', queue, true);
    // Refresh masks after card-hover transitions and entrance animations settle.
    document.addEventListener('transitionend', queue, true);
    setTimeout(discover, 3000);
    setTimeout(queue, 4500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
