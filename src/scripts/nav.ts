// Progressive enhancement only — nav works without JS via the CSS checkbox.
// JS adds: focus trap while open, Escape to close, focus return, idle easter egg.

const box = document.getElementById('nav-toggle') as HTMLInputElement | null;
const toggle = document.querySelector<HTMLElement>('.nav-toggle');
const nav = document.querySelector<HTMLElement>('nav[aria-label="Main"]');

if (box && toggle && nav) {
  toggle.setAttribute('role', 'button');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('tabindex', '0');

  const links = () => Array.from(nav.querySelectorAll<HTMLAnchorElement>('a'));

  const onKeydown = (e: KeyboardEvent) => {
    if (!box.checked) return;
    if (e.key === 'Escape') {
      box.checked = false;
      sync();
      toggle.focus();
    } else if (e.key === 'Tab') {
      const l = links();
      const first = l[0];
      const last = l[l.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const sync = () => toggle.setAttribute('aria-expanded', String(box.checked));

  box.addEventListener('change', () => {
    sync();
    if (box.checked) links()[0]?.focus();
  });
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      box.checked = !box.checked;
      box.dispatchEvent(new Event('change'));
    }
  });
  document.addEventListener('keydown', onKeydown);
}

// The mouse blinks if you idle past 3 minutes. Night creature. Still watching.
const eye = document.querySelector<SVGCircleElement>('.mouse-eye');
if (eye && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let idleTimer: number;
  const blink = () => {
    eye.animate(
      [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.1)' }, { transform: 'scaleY(1)' }],
      { duration: 180, iterations: 2, delay: 120 },
    );
    idleTimer = window.setTimeout(blink, 8000);
  };
  const reset = () => {
    clearTimeout(idleTimer);
    idleTimer = window.setTimeout(blink, 180_000);
  };
  ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach((ev) =>
    window.addEventListener(ev, reset, { passive: true }),
  );
  reset();
}
