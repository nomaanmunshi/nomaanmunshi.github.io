(() => {
  'use strict';
  // Start times are local to Italy. Edit these entries to change the routine.
  const schedule = [
    { start: 0, state: 'sleep', label: 'Nomaan is probably sleeping', prop: '☾' },
    { start: 450, state: 'breakfast', label: 'Breakfast & getting ready', prop: '☕' },
    { start: 540, state: 'library', label: 'Usually at the library', prop: '▤' },
    { start: 750, state: 'lunch', label: 'Lunch break · Open for a chat', prop: '🍝' },
    { start: 840, state: 'work', label: 'Studying & building things', prop: '⌨' },
    { start: 1080, state: 'gym', label: 'At the gym · Be back later', prop: '🏋' },
    { start: 1170, state: 'break', label: 'Taking a break · Open for a chat', prop: '✦' },
    { start: 1200, state: 'evening', label: 'Evening projects & winding down', prop: '☾' }
  ];
  const clock = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  });
  function init() {
    const host = document.querySelector('.hero-copy');
    if (!host || document.querySelector('.routine')) return;
    const widget = document.createElement('details');
    widget.className = 'routine';
    widget.innerHTML = `<summary class="routine-pill">
      <span class="routine-bot" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none"><path d="M22 6v5" stroke="currentColor" stroke-width="2"/><circle cx="22" cy="5" r="2" fill="currentColor"/><rect x="9" y="12" width="26" height="22" rx="8" stroke="currentColor" stroke-width="1.5"/><g class="routine-eyes" fill="currentColor"><circle cx="17" cy="22" r="2"/><circle cx="27" cy="22" r="2"/></g><path class="routine-sleep-eyes" d="M14 23h6m4 0h6" stroke="currentColor" stroke-width="1.5"/><path d="M18 28q4 3 8 0M5 21v6m34-6v6M16 35v4m12-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span class="routine-prop"></span></span>
      <span class="routine-copy"><span class="routine-caption">A little of my day <span class="routine-clock"></span></span><span class="routine-label" role="status" aria-live="polite"></span></span><span class="routine-info" aria-hidden="true">⌄</span>
    </summary><div class="routine-details">Based on my usual routine · Italy time.<br>A scheduled illustration, not live activity or guaranteed availability.<a href="mailto:nomaanmunshii@gmail.com">Say hello ↗</a></div>`;
    host.prepend(widget);
    const label = widget.querySelector('.routine-label');
    const time = widget.querySelector('.routine-clock');
    const prop = widget.querySelector('.routine-prop');
    function update() {
      const parts = clock.formatToParts(new Date());
      const hour = Number(parts.find(p => p.type === 'hour').value);
      const minute = Number(parts.find(p => p.type === 'minute').value);
      const entry = [...schedule].reverse().find(item => hour * 60 + minute >= item.start);
      time.textContent = `· ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} Italy`;
      if (widget.dataset.state !== entry.state) {
        widget.dataset.state = entry.state;
        label.textContent = entry.label;
        prop.textContent = entry.prop;
      }
    }
    update();
    window.setInterval(update, 15000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
    widget.addEventListener('keydown', event => { if (event.key === 'Escape') widget.open = false; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
