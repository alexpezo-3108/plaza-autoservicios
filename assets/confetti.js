(function () {
  if (window.__plazaConfetti) return;
  const RX = /(Recibimos tu|Postulaci[oó]n enviada|Gracias por|¡Gracias|¡Listo|suscrit|Te avisaremos|Mensaje enviado|Solicitud enviada|Propuesta enviada)/i;
  let last = 0;
  function burst() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.createElement('canvas'), dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = window.innerWidth, H = window.innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483000';
    document.body.appendChild(c);
    const x = c.getContext('2d'); x.scale(dpr, dpr);
    const cols = ['#E1251B', '#C21D11', '#FF9015', '#FFC23D', '#E1251B', '#FF9015'];
    const P = [];
    for (let s = 0; s < 3; s++) for (let i = 0; i < 110; i++) {
      const left = s === 0, mid = s === 2, a = (mid ? -90 : left ? -60 : -120) * Math.PI / 180 + (Math.random() - .5) * (mid ? 1.4 : .9), v = (mid ? 14 : 11) + Math.random() * 10;
      P.push({ x: mid ? W / 2 + (Math.random() - .5) * 80 : left ? -10 : W + 10, y: mid ? H * .62 : H * .72, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: 8 + Math.random() * 8, h: 5 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - .5) * .35, c: cols[(Math.random() * cols.length) | 0], o: 1 });
    }
    const t0 = performance.now();
    (function f(t) {
      const el = t - t0; x.clearRect(0, 0, W, H);
      P.forEach(p => { p.vy += .32; p.vx *= .985; p.vy *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr; if (el > 2200) p.o = Math.max(0, p.o - .025);
        x.save(); x.globalAlpha = p.o; x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 1.7))); x.restore(); });
      if (el < 3600) requestAnimationFrame(f); else c.remove();
    })(t0);
  }
  function greenChecks(root) {
    root.querySelectorAll('span').forEach(s => {
      const p = s.querySelector('svg path'); if (!p) return;
      const d = p.getAttribute('d') || '';
      if (/^M5 12\.5l4\.5 4\.5L19 7\.5|^M5 13l4 4L19 7|^M20 6L9 17l-5-5/.test(d) && /225, 37, 27|#E1251B/i.test(getComputedStyle(s).backgroundColor + s.getAttribute('style'))) {
        s.style.background = '#1FA855'; s.style.boxShadow = '0 0 0 6px #DDF3E5';
        s.animate && s.animate([{ transform: 'scale(.4)', opacity: 0 }, { transform: 'scale(1.12)', opacity: 1, offset: .6 }, { transform: 'scale(1)' }], { duration: 520, easing: 'cubic-bezier(.3,.7,.3,1)' });
      }
    });
  }

  function thanksModal(opts) {
    if (opts && opts.title) return optsModal(opts);
    const blocks = [...document.querySelectorAll('[role="status"]')].filter(b => !b.closest('[role="dialog"]') && b.querySelector('svg path') && b.getClientRects().length && /Gracias|Recibimos|enviad/i.test(b.textContent));
    const b = blocks[0]; if (!b || document.getElementById('plz-thanks')) return;
    const reset = [...b.querySelectorAll('button')].pop();
    const ov = document.createElement('div'); ov.id = 'plz-thanks';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147482000;display:flex;align-items:center;justify-content:center;padding:20px';
    ov.innerHTML = '<div data-bd style="position:absolute;inset:0;background:rgba(14,10,8,.6);opacity:0;transition:opacity .25s ease"></div><div role="dialog" aria-modal="true" aria-labelledby="plz-thanks-t" data-pn style="position:relative;width:100%;max-width:520px;background:#FFFFFF;border-radius:20px;padding:44px 28px 32px;box-shadow:0 30px 80px -20px rgba(0,0,0,.45);transform:translateY(110vh);transition:transform .38s cubic-bezier(.22,1,.36,1)"></div>';
    const pn = ov.querySelector('[data-pn]'), bd = ov.querySelector('[data-bd]');
    const clone = b.cloneNode(true); clone.removeAttribute('role'); clone.querySelectorAll('button').forEach(x => x.remove());
    clone.style.padding = '0'; clone.style.background = 'transparent'; clone.style.boxShadow = 'none'; clone.style.border = '0';
    const h = clone.querySelector('h2,h3,p'); if (h) h.id = 'plz-thanks-t';
    pn.appendChild(clone);
    const btn = document.createElement('button'); btn.type = 'button'; btn.textContent = 'Cerrar';
    btn.style.cssText = 'display:flex;margin:24px auto 0;min-height:52px;min-width:180px;align-items:center;justify-content:center;padding:0 28px;border:0;border-radius:16px;background:#E1251B;color:#FFFFFF;font-family:inherit;font-size:16px;font-weight:500;cursor:pointer;transition:background .2s';
    btn.onmouseenter = () => btn.style.background = '#C21D11'; btn.onmouseleave = () => btn.style.background = '#E1251B';
    pn.appendChild(btn);
    const prevOv = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const close = () => { pn.style.transform = 'translateY(110vh)'; bd.style.transition = 'opacity .25s ease .3s'; bd.style.opacity = '0'; document.removeEventListener('keydown', onKey, true); setTimeout(() => { ov.remove(); document.body.style.overflow = prevOv; }, 560); };
    const onKey = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } if (e.key === 'Tab') { e.preventDefault(); btn.focus(); } };
    btn.onclick = close; bd.onclick = close; document.addEventListener('keydown', onKey, true);
    document.body.appendChild(ov);
    if (reset) reset.click();
    pn.querySelectorAll('span').forEach(s => { const p = s.querySelector('svg path'); if (p && /^M5 12\.5|^M5 13|^M20 6/.test(p.getAttribute('d') || '')) { s.style.background = '#1FA855'; s.style.boxShadow = '0 0 0 6px #DDF3E5'; } });
    requestAnimationFrame(() => requestAnimationFrame(() => { bd.style.opacity = '1'; pn.style.transform = 'translateY(0)'; btn.focus({ preventScroll: true }); }));
  }
  const hs = document.createElement('style');
  hs.textContent = 'html[data-plz-sending] [role="status"]:not([role="dialog"] [role="status"]){visibility:hidden!important}';
  (document.head || document.documentElement).appendChild(hs);
  function optsModal(o) {
    if (document.getElementById('plz-thanks')) return;
    const ov = document.createElement('div'); ov.id = 'plz-thanks';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147482000;display:flex;align-items:center;justify-content:center;padding:20px';
    const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
    ov.innerHTML = '<div data-bd style="position:absolute;inset:0;background:rgba(14,10,8,.6);opacity:0;transition:opacity .25s ease"></div><div role="dialog" aria-modal="true" aria-labelledby="plz-thanks-t" data-pn style="position:relative;width:100%;max-width:520px;background:#FFFFFF;border-radius:20px;padding:44px 28px 32px;box-shadow:0 30px 80px -20px rgba(0,0,0,.45);transform:translateY(110vh);transition:transform .38s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center"><span data-ck aria-hidden="true" style="width:64px;height:64px;border-radius:50%;background:#1FA855;box-shadow:0 0 0 6px #DDF3E5;color:#FFFFFF;display:flex;align-items:center;justify-content:center"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span><h2 id="plz-thanks-t" style="margin:10px 0 0;font-size:22px;font-weight:600;color:#1C1A19">' + esc(o.title) + '</h2><p style="margin:0;max-width:400px;font-size:16px;line-height:1.6;font-weight:300;color:#3A3836;text-wrap:pretty">' + esc(o.text || '') + '</p><button type="button" data-close style="margin-top:14px;min-height:52px;min-width:180px;padding:0 28px;border:0;border-radius:16px;background:#E1251B;color:#FFFFFF;font-family:inherit;font-size:16px;font-weight:500;cursor:pointer;transition:background .2s">Cerrar</button></div>';
    const pn = ov.querySelector('[data-pn]'), bd = ov.querySelector('[data-bd]'), btn = ov.querySelector('[data-close]'), ck = ov.querySelector('[data-ck]');
    btn.onmouseenter = () => btn.style.background = '#C21D11'; btn.onmouseleave = () => btn.style.background = '#E1251B';
    const prevOv = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const prevFocus = document.activeElement;
    const onKey = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } if (e.key === 'Tab') { e.preventDefault(); btn.focus(); } };
    const close = () => { pn.style.transform = 'translateY(110vh)'; bd.style.transition = 'opacity .25s ease .3s'; bd.style.opacity = '0'; document.removeEventListener('keydown', onKey, true); setTimeout(() => { ov.remove(); document.body.style.overflow = prevOv; prevFocus && prevFocus.focus && prevFocus.focus({ preventScroll: true }); }, 560); };
    btn.onclick = close; bd.onclick = close; document.addEventListener('keydown', onKey, true);
    document.body.appendChild(ov);
    requestAnimationFrame(() => requestAnimationFrame(() => { bd.style.opacity = '1'; pn.style.transform = 'translateY(0)'; btn.focus({ preventScroll: true }); ck.animate && ck.animate([{ transform: 'scale(.4)', opacity: 0 }, { transform: 'scale(1.12)', opacity: 1, offset: .6 }, { transform: 'scale(1)' }], { duration: 520, delay: 200, easing: 'cubic-bezier(.3,.7,.3,1)', fill: 'backwards' }); }));
  }
  window.__plazaConfetti = (opts) => { document.documentElement.setAttribute('data-plz-sending', ''); setTimeout(() => document.documentElement.removeAttribute('data-plz-sending'), 900); requestAnimationFrame(() => thanksModal(opts)); setTimeout(burst, 260); setTimeout(() => greenChecks(document), 80); setTimeout(() => greenChecks(document), 400); };

})();

window.__plazaFill = function () {
  const sample = [[/nombre|name|contacto/i, 'José Díaz Ramos'], [/apellido/i, 'Díaz'], [/mail|correo/i, 'jose.diaz@gmail.com'], [/cel|tel|fono/i, '987654321'], [/dni/i, '45678912'], [/ruc/i, '20123456789'], [/empresa/i, 'Distribuidora Norte SAC'], [/cantidad/i, '50'], [/fecha/i, ''], [/./, 'Información de prueba para revisar el formulario.']];
  const setVal = (el, v) => { const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v); el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); };
  const els = [...document.querySelectorAll('form input, form select, form textarea')].filter(el => el.offsetParent !== null || el.type === 'file' || el.type === 'checkbox');
  const used = {};
  els.forEach((el, i) => setTimeout(() => {
    const key = (el.id || el.name || '') + ' ' + (el.getAttribute('autocomplete') || '');
    if (el.type === 'checkbox') { if (!el.checked) el.click(); return; }
    if (el.type === 'file') { try { const dt = new DataTransfer(); dt.items.add(new File(['CV de prueba'], 'CV-Jose-Diaz.pdf', { type: 'application/pdf' })); el.files = dt.files; el.dispatchEvent(new Event('change', { bubbles: true })); } catch (e) {} return; }
    if (el.type === 'search') return;
    if (el.tagName === 'SELECT') { const opts = [...el.options].filter(o => o.value); if (!opts.length) return; const g = key.replace(/\d+/, ''); used[g] = (used[g] || 0); const o = opts[Math.min(used[g]++, opts.length - 1)]; setVal(el, o.value); return; }
    if (el.type === 'date') { const d = new Date(Date.now() + 14 * 864e5); setVal(el, d.toISOString().slice(0, 10)); return; }
    if (el.type === 'email') { setVal(el, 'jose.diaz@gmail.com'); return; }
    if (el.type === 'tel' || el.inputMode === 'numeric') { const m = +(el.getAttribute('maxlength') || 9); setVal(el, m === 8 ? '45678912' : m === 11 ? '20123456789' : '987654321'.slice(0, m)); return; }
    const s = sample.find(([re]) => re.test(key)); setVal(el, s ? s[1] : 'Prueba');
  }, i * 25));
};
