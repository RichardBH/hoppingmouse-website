// Simulated tag values — honesty rules from PLAN.md:
// fixed plausible setpoints, drift ±amp every 2–4s, states never leave GOOD,
// pauses when the tab is hidden or reduced-motion is set.

const vals = Array.from(document.querySelectorAll<SVGTSpanElement>('.t-val[data-base]'));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (vals.length && !reduced) {
  let timer: number;

  const tick = () => {
    for (const el of vals) {
      const base = parseFloat(el.dataset.base ?? '0');
      const amp = parseFloat(el.dataset.amp ?? '0.2');
      const unit = el.dataset.unit ?? '';
      const isInt = 'int' in el.dataset;
      const v = base + (Math.random() * 2 - 1) * amp;
      el.textContent = `= ${isInt ? Math.round(v) : v.toFixed(1)}${unit}`;
    }
    timer = window.setTimeout(tick, 2000 + Math.random() * 2000);
  };

  const onVisibility = () => {
    clearTimeout(timer);
    if (!document.hidden) tick();
  };

  document.addEventListener('visibilitychange', onVisibility);
  tick();
}

// Draw-once entrance for schematic connector lines (getTotalLength — never
// hand-maintained dash values; geometry edits stay safe).
if (!reduced && 'IntersectionObserver' in window) {
  const paths = document.querySelectorAll<SVGPathElement>('.pid-svg .draw');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const p = e.target as SVGPathElement;
        const len = p.getTotalLength();
        const dashed = p.getAttribute('stroke-dasharray');
        if (!dashed) {
          p.style.strokeDasharray = String(len);
          p.style.strokeDashoffset = String(len);
          p.getBoundingClientRect(); // flush
          p.style.transition = 'stroke-dashoffset 600ms ease-out';
          p.style.strokeDashoffset = '0';
        }
        io.unobserve(p);
      }
    },
    { threshold: 0.4 },
  );
  paths.forEach((p) => io.observe(p));
}
