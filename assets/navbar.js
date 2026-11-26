(function () {
  if (window.__plazaNav) return; window.__plazaNav = true;
  var lastY = window.scrollY || 0, hidden = false, ticking = false;
  var root = document.documentElement;
  function hdr() { return document.querySelector('header[data-screen-label="Navbar"]'); }
  function menuOpen(h) { var b = h && h.querySelector('[aria-expanded="true"]'); return !!b; }
  function set(h, hide) {
    if (!h) return;
    if (!h.__navInit) { h.__navInit = true; h.style.transition = 'transform .38s cubic-bezier(.3,.7,.2,1)'; h.style.willChange = 'transform'; }
    if (hide === hidden && h.__navState === hide) return;
    hidden = hide; h.__navState = hide;
    h.style.transform = hide ? 'translateY(calc(-100% - 16px))' : 'translateY(0)';
    root.style.setProperty('--nav-off', hide ? '72px' : '0px');
  }
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY || 0, h = hdr(), d = y - lastY;
      if (!h) { lastY = y; return; }
      if (y < 120 || menuOpen(h)) set(h, false);
      else if (d > 6) set(h, true);
      else if (d < -6) set(h, false);
      if (Math.abs(d) > 6 || y < 120) lastY = y;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('focusin', function (e) { var h = hdr(); if (h && h.contains(e.target)) set(h, false); });
})();

(function () {
  if (window.__plazaCta) return; window.__plazaCta = true;
  var ARROW = 'M5 12h14M13 6l6 6-6 6';
  function clear() { document.querySelectorAll('.__cta-spin').forEach(function (n) { n.remove(); }); }
  window.addEventListener('pageshow', clear);
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented && !e.target.closest('a[href^="#"], button')) return;
    var el = e.target.closest('a, button');
    if (!el || el.closest('[data-no-cta-spin]') || el.disabled || el.getAttribute('aria-busy') === 'true') return;
    var path = el.querySelector('svg path[d="' + ARROW + '"]'); if (!path) return;
    var ico = path.closest('span'); if (!ico || !el.contains(ico)) return;
    var cs = getComputedStyle(ico); if (parseFloat(cs.borderTopLeftRadius) < 8) return;
    var r = ico.getBoundingClientRect(); if (!r.width) return;
    var old = document.querySelector('.__cta-spin[data-for="' + (el.__ctaId || '') + '"]'); if (old) return;
    el.__ctaId = el.__ctaId || String(Math.random()).slice(2);
    var d = document.createElement('div'); d.className = '__cta-spin'; d.setAttribute('aria-hidden', 'true'); d.dataset.for = el.__ctaId;
    d.style.cssText = 'position:absolute;z-index:2147483000;pointer-events:none;display:flex;align-items:center;justify-content:center;border-radius:50%;left:' + (r.left + scrollX) + 'px;top:' + (r.top + scrollY) + 'px;width:' + r.width + 'px;height:' + r.height + 'px;background:' + cs.backgroundColor + ';color:' + cs.color;
    var sz = Math.round(r.width * 0.5);
    d.innerHTML = '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".22" stroke-width="3"></circle><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>';
    document.body.appendChild(d);
    var s = d.firstChild; if (s.animate) s.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 700, iterations: Infinity });
    var href = el.tagName === 'A' ? el.getAttribute('href') || '' : '';
    var leaves = href && href.charAt(0) !== '#' && el.target !== '_blank' && !/^(mailto|tel):/.test(href);
    setTimeout(function () { d.remove(); }, leaves ? 5000 : 900);
  }, true);
})();

(function () {
  if (window.__plazaLenis || matchMedia('(prefers-reduced-motion: reduce)').matches) return; window.__plazaLenis = true;
  var css = document.createElement('style');
  css.textContent = 'html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}.lenis.lenis-stopped{overflow:hidden}';
  document.head.appendChild(css);
  function scrollable(n) {
    for (; n && n !== document.body && n !== document.documentElement; n = n.parentElement) {
      if (n.nodeType !== 1) continue;
      var oy = getComputedStyle(n).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 6) return n;
    }
    return null;
  }
  window.addEventListener('wheel', function (e) { var s = scrollable(e.target); if (s && !s.hasAttribute('data-lenis-prevent')) s.setAttribute('data-lenis-prevent', ''); }, { capture: true, passive: true });
  var sc = document.createElement('script');
  sc.src = 'https://unpkg.com/lenis@1.1.13/dist/lenis.min.js';
  sc.onload = function () {
    if (!window.Lenis) return;
    var lenis = new window.Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
    window.__lenis = lenis;
    var rs = function () { lenis.resize(); };
    if (window.ResizeObserver) { var ro = new ResizeObserver(rs); ro.observe(document.body); ro.observe(document.documentElement); }
    window.addEventListener('load', rs);
    [300, 1000, 2500].forEach(function (t) { setTimeout(rs, t); });
    var lastH = 0; setInterval(function () { var h = document.documentElement.scrollHeight; if (h !== lastH) { lastH = h; rs(); } }, 500);
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    function locked() {
      var b = getComputedStyle(document.body).overflow, h = document.documentElement.style.overflow;
      return b === 'hidden' || h === 'hidden' || !!document.querySelector('[role="dialog"][aria-modal="true"]');
    }
    var was = false;
    function sync() { var l = locked(); if (l !== was) { was = l; l ? lenis.stop() : lenis.start(); } }
    setInterval(sync, 250);
    sync();
  };
  document.head.appendChild(sc);
})();

(function () {
  if (window.__plazaUX) return; window.__plazaUX = true;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var css = document.createElement('style');
  css.textContent = 'html{background:#F7F7F6}@keyframes plazaIn{from{opacity:0}to{opacity:1}}body{animation:plazaIn .6s cubic-bezier(.22,1,.36,1) both}html.pt-out body{opacity:0;transition:opacity .34s cubic-bezier(.4,0,.2,1)}' + (reduce ? 'body{animation:none}html.pt-out body{transition:none}' : '');
  document.head.appendChild(css);
  window.addEventListener('pageshow', function () { document.documentElement.classList.remove('pt-out'); });
  function leave(href) {
    if (reduce) { location.href = href; return; }
    var vh = innerHeight;
    document.querySelectorAll('section, footer').forEach(function (s) { var r = s.getBoundingClientRect(); if (r.bottom > 0 && r.top < vh && s.animate) s.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-14px)' }], { duration: 340, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }); });
    document.documentElement.classList.add('pt-out');
    setTimeout(function () { location.href = href; }, 330);
  }
  function internal(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return false;
    var href = a.getAttribute('href') || ''; if (!href || href.charAt(0) === '#' || /^(mailto|tel|javascript):/i.test(href)) return false;
    var u; try { u = new URL(href, location.href); } catch (e) { return false; }
    if (u.origin !== location.origin) return false;
    if (u.pathname === location.pathname && u.search === location.search) return false;
    return u;
  }
  document.addEventListener('click', function (e) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a'); var u = internal(a); if (!u) return;
    e.preventDefault();
    leave(u.href);
  }, true);
  // spinner on any button-like control without the arrow circle
  function isBtn(el) {
    if (el.closest('header[data-screen-label="Navbar"], [data-no-cta-spin], footer nav, [role="tablist"]')) return false;
    if (el.hasAttribute('aria-pressed') || el.hasAttribute('aria-expanded') || el.getAttribute('role') === 'tab' || el.disabled) return false;
    if (el.querySelector('svg path[d="M5 12h14M13 6l6 6-6 6"]')) return false;
    var cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.height < 38 || r.height > 70 || r.width < 80 || parseFloat(cs.borderTopLeftRadius) < 8) return false;
    var bg = cs.backgroundColor, m = bg.match(/rgba?\(([^)]+)\)/), alpha = m ? (m[1].split(',')[3] === undefined ? 1 : parseFloat(m[1].split(',')[3])) : 0;
    var bw = parseFloat(cs.borderTopWidth);
    if (alpha < 0.5 && bw < 1) return false;
    return (el.textContent || '').trim().length > 1;
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button'); if (!el || !isBtn(el) || el.__spin) return;
    var cs = getComputedStyle(el), r = el.getBoundingClientRect();
    var d = document.createElement('div'); d.className = '__cta-spin'; d.setAttribute('aria-hidden', 'true');
    var bg = cs.backgroundColor; if (!/rgba?\(/.test(bg) || /, 0\)$/.test(bg)) bg = '#FFFFFF';
    d.style.cssText = 'position:absolute;z-index:2147483000;pointer-events:none;display:flex;align-items:center;justify-content:center;left:' + (r.left + scrollX) + 'px;top:' + (r.top + scrollY) + 'px;width:' + r.width + 'px;height:' + r.height + 'px;border-radius:' + cs.borderTopLeftRadius + ';background:' + bg + ';color:' + cs.color;
    d.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".25" stroke-width="3"></circle><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>';
    document.body.appendChild(d); el.__spin = true;
    var s = d.firstChild; if (s.animate) s.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 700, iterations: Infinity });
    var leaves = el.tagName === 'A' && internal(el);
    setTimeout(function () { d.remove(); el.__spin = false; }, leaves ? 5000 : 650);
  }, true);
})();
