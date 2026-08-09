// Contact form (PLAN.md Phase 3 contract):
// fetch-first to the AJAX endpoint with inline states; the native action
// remains the no-JS path. On ambiguous failure: retain values, surface
// direct contacts, NEVER auto-resubmit (duplicate-enquiry risk).

const form = document.getElementById('contact-form') as HTMLFormElement | null;

if (form) {
  const btn = form.querySelector<HTMLButtonElement>('.submit-btn')!;
  const idle = btn.querySelector<HTMLElement>('.label-idle')!;
  const busy = btn.querySelector<HTMLElement>('.label-busy')!;
  const fail = document.getElementById('form-fail')!;
  let submitting = false;

  const setInvalid = (id: string, invalid: boolean) => {
    const field = document.getElementById(`f-${id}`);
    const err = document.getElementById(`err-${id}`);
    field?.closest('.field')?.classList.toggle('invalid', invalid);
    if (err) err.hidden = !invalid;
  };

  const validate = (): boolean => {
    let ok = true;
    const name = (document.getElementById('f-name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('f-email') as HTMLInputElement).value.trim();
    const message = (document.getElementById('f-message') as HTMLTextAreaElement).value.trim();
    setInvalid('name', !name); ok &&= !!name;
    const emailOk = /.+@.+\..+/.test(email);
    setInvalid('email', !emailOk); ok &&= emailOk;
    setInvalid('message', message.length < 10); ok &&= message.length >= 10;
    return ok;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitting) return; // duplicate-submit guard
    fail.hidden = true;
    if (!validate()) return;

    submitting = true;
    btn.disabled = true;
    idle.hidden = true;
    busy.hidden = false;

    try {
      const data = new FormData(form);
      // endpoint is base64 in markup so the delivery address never appears
      // as scrapeable plain text (owner decision: spam)
      const endpoint = atob(form.dataset.e64!);
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        window.location.assign(form.dataset.sent!);
        return;
      }
      throw new Error(`endpoint ${res.status}`);
    } catch {
      // ambiguous — retain values, show direct contacts, allow explicit retry
      fail.hidden = false;
      submitting = false;
      btn.disabled = false;
      idle.hidden = false;
      busy.hidden = true;
    }
  });
}
