(function () {
  if (window.__plazaDelivery) return; window.__plazaDelivery = true;
  function mount() {
    if (document.getElementById('plz-delivery')) return;
    const wrap = document.createElement('div');
    wrap.id = 'plz-delivery';
    wrap.style.cssText = 'position:fixed;right:max(22px, env(safe-area-inset-right));bottom:max(26px, env(safe-area-inset-bottom));z-index:150;display:flex;align-items:center;gap:12px;pointer-events:none';
    wrap.innerHTML =
      '<a href="https://wa.me/51987589037?text=Hola%2C%20quiero%20hacer%20un%20pedido%20delivery" target="_blank" rel="noopener" tabindex="-1" role="tooltip" id="plz-delivery-tip" style="text-decoration:none;cursor:pointer;pointer-events:none;opacity:0;transform:translateX(8px) scale(.96);transform-origin:right center;transition:opacity .22s ease, transform .3s cubic-bezier(.22,1,.36,1);position:relative;padding:10px 14px;border-radius:14px;background:#FFFFFF;box-shadow:0 12px 30px -10px rgba(28,26,25,.35);white-space:nowrap;font-family:inherit">' +
        '<span style="display:block;font-size:14px;font-weight:600;line-height:1.3;color:#1C1A19">¡Delivery disponible!</span>' +
        '<span aria-hidden="true" style="position:absolute;right:-5px;top:50%;width:10px;height:10px;margin-top:-5px;background:#FFFFFF;transform:rotate(45deg)"></span>' +
      '</a>' +
      '<a href="https://wa.me/51987589037?text=Hola%2C%20quiero%20hacer%20un%20pedido%20delivery" target="_blank" rel="noopener" aria-label="Pedir delivery por WhatsApp (se abre en una pestaña nueva)" aria-describedby="plz-delivery-tip" style="pointer-events:auto;position:relative;width:72px;height:72px;border-radius:50%;background:transparent;color:#FFFFFF;display:flex;align-items:center;justify-content:center;transition:transform .25s cubic-bezier(.3,.7,.2,1), background .2s;text-decoration:none">' +
        '<span aria-hidden="true" data-ring style="display:none;position:absolute;inset:0;border-radius:50%;border:2px solid #E1251B"></span>' +
        '<span data-moto aria-hidden="true" style="position:absolute;inset:0;border-radius:50%;overflow:hidden;background-color:#BFE6F5;background-image:linear-gradient(90deg,#8CC6DE 0 14px,transparent 14px),linear-gradient(90deg,#8CC6DE 0 20px,transparent 20px),linear-gradient(90deg,#8CC6DE 0 10px,transparent 10px),linear-gradient(90deg,#8CC6DE 0 16px,transparent 16px),linear-gradient(90deg,#8CC6DE 0 12px,transparent 12px),linear-gradient(90deg,#8CC6DE 0 18px,transparent 18px);background-size:32px 1px,48px 1px,28px 1px,40px 1px,36px 1px,44px 1px;background-repeat:repeat-x;background-position:0 12px,0 21px,0 31px,0 41px,0 51px,0 60px;box-shadow:inset 0 0 0 3px #FFFFFF, 0 4px 8px -3px rgba(28,26,25,.33)"></span><span data-lines aria-hidden="true" style="position:absolute;left:-14px;top:50%;width:16px;height:14px;margin-top:-7px;opacity:0;transition:opacity .2s;background:linear-gradient(#E1251B,#E1251B) 0 0/100% 2px no-repeat,linear-gradient(#FF9015,#FF9015) 5px 6px/11px 2px no-repeat,linear-gradient(#E1251B,#E1251B) 2px 12px/14px 2px no-repeat"></span>' +
        '<img src="assets/plazito-moto.webp" alt="" aria-hidden="true" style="position:absolute;left:50%;top:-14px;width:77px;height:auto;max-width:none;transform:translateX(-50%);pointer-events:none">' +
      '</a>';
    document.body.appendChild(wrap);
    { const st = document.createElement('style'); st.textContent = '@media (max-width: 640px){#plz-delivery{right:max(14px, env(safe-area-inset-right)) !important;bottom:max(16px, env(safe-area-inset-bottom)) !important}#plz-delivery a[aria-label]{width:56px !important;height:56px !important}#plz-delivery img[src*="plazito-moto"]{width:60px !important;top:-11px !important}}'; document.head.appendChild(st); }
    const a = wrap.querySelector('a[aria-label]'), tip = wrap.querySelector('[role="tooltip"]'), ring = wrap.querySelector('[data-ring]');
    let onRed = false;
    const paint = () => {};
    let hov = false;
    const spin = wrap.querySelector('[data-spin]'); if (spin && spin.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) spin.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: 18000, iterations: Infinity });
    { const bg = wrap.querySelector('[data-moto]'), rider = wrap.querySelector('img[src*="plazito-moto"]'); if (bg && rider && bg.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const btn = wrap.querySelector('a[aria-label]'), mob = window.matchMedia('(max-width: 640px)').matches, k = mob ? 1.8 : 1; const intro = (d0) => { rider.animate([{ translate: '110px 0' }, { translate: '0 0' }], { duration: 420 * k, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards', delay: d0 }); bg.animate([{ scale: '0' }, { scale: '1' }], { duration: 280 * k, easing: 'cubic-bezier(.34,1.4,.64,1)', fill: 'backwards', delay: d0 + 370 * k }); }; let seen = false; try { seen = sessionStorage.getItem('plzDeliveryIntro') === '1'; sessionStorage.setItem('plzDeliveryIntro', '1'); } catch (e) {} if (!seen) intro(150); bg.animate([{ backgroundPosition: '0 12px, 0 21px, 0 31px, 0 41px, 0 51px, 0 60px' }, { backgroundPosition: '32px 12px, 48px 21px, 28px 31px, 40px 41px, 36px 51px, 44px 60px' }], { duration: 420, iterations: Infinity }); } }
    const moto = wrap.querySelector('[data-moto] img'), lines = wrap.querySelector('[data-lines]'); let vAnim;
    const show = () => { hov = true; if (moto && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {  } tip.style.pointerEvents = 'auto'; tip.style.opacity = '1'; tip.style.transform = 'translateX(0) scale(1)'; a.style.transform = 'scale(1.08)'; paint(true); };
    const hide2 = () => { if (moto) { moto.style.transform = 'translate(-50%,-50%)'; lines.style.opacity = '0'; vAnim && vAnim.cancel(); lines.getAnimations && lines.getAnimations().forEach(x => x.cancel()); } };
    const hide = () => { hide2(); hov = false; tip.style.pointerEvents = 'none'; tip.style.opacity = '0'; tip.style.transform = 'translateX(8px) scale(.96)'; a.style.transform = 'scale(1)'; paint(false); };
    a.style.transition += ', color .25s, box-shadow .25s';
    const bgAt = (x, y) => { const els = document.elementsFromPoint(x, y).filter(el => !wrap.contains(el)); for (const el of els) { const cs = getComputedStyle(el); if (el.tagName === 'IMG' || el.tagName === 'CANVAS' || el.tagName === 'IFRAME') return null; const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/); if (m) { const p = m[1].split(',').map(Number); if (p[3] === undefined || p[3] > .5) return p; } if (cs.backgroundImage && cs.backgroundImage !== 'none' && /gradient/.test(cs.backgroundImage)) { const g = cs.backgroundImage.match(/rgba?\(([^)]+)\)/); if (g) return g[1].split(',').map(Number); } } return null; };
    let tk = false;
    const check = () => { if (tk) return; tk = true; requestAnimationFrame(() => { tk = false; const rc = a.getBoundingClientRect(); const p = bgAt(rc.left + rc.width / 2, rc.top + rc.height / 2); const red = !!p && p[0] > 170 && p[1] < 90 && p[2] < 90; if (red !== onRed) { onRed = red; paint(hov); } }); };
    window.addEventListener('scroll', check, { passive: true }); window.addEventListener('resize', check); setTimeout(check, 400); setInterval(check, 1500);
    let ht; const enter = () => { clearTimeout(ht); show(); }, leave = () => { ht = setTimeout(hide, 180); };
    a.addEventListener('mouseenter', enter); a.addEventListener('mouseleave', leave); tip.addEventListener('mouseenter', enter); tip.addEventListener('mouseleave', leave); a.addEventListener('focus', show); a.addEventListener('blur', hide);
    let atFooter = false, busy = false;
    wrap.style.transition = 'opacity .3s ease, transform .35s cubic-bezier(.22,1,.36,1), visibility 0s linear 0s';
    const apply = () => { const off = atFooter || busy; wrap.style.opacity = off ? '0' : '1'; wrap.style.transform = off ? 'translateY(16px)' : 'translateY(0)'; wrap.style.visibility = off ? 'hidden' : 'visible'; wrap.style.transitionDelay = off ? '0s, 0s, .35s' : '0s'; };
    const hideWhenModal = () => { busy = document.body.style.overflow === 'hidden'; apply(); };
    const watchFooter = () => { const ft = document.querySelector('footer'); if (!ft) return setTimeout(watchFooter, 800); if (!('IntersectionObserver' in window)) return; new IntersectionObserver(es => { atFooter = es[0].isIntersecting; apply(); }, { rootMargin: '0px 0px -40px 0px' }).observe(ft); };
    watchFooter();
    new MutationObserver(hideWhenModal).observe(document.body, { attributes: true, attributeFilter: ['style'] });
  }
  const heroReady = () => new Promise(res => {
    let done = false; const go = () => { if (!done) { done = true; res(); } };
    setTimeout(go, 8000);
    const wait = () => {
      const sec = document.querySelector('main section, section, header + *');
      const imgs = sec ? [...sec.querySelectorAll('img')] : [];
      if (!sec || (!imgs.length && document.readyState !== 'complete')) return setTimeout(wait, 150);
      Promise.all(imgs.map(i => i.complete && i.naturalWidth ? Promise.resolve() : new Promise(r => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }))).then(() => setTimeout(go, 250));
    };
    if (document.readyState === 'complete') wait(); else window.addEventListener('load', wait, { once: true });
  });
  heroReady().then(mount);
})();
