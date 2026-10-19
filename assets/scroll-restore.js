(function () {
  var K = 'plzScroll:' + location.pathname;
  try { history.scrollRestoration = 'manual'; } catch (e) {}
  var lastClick = 0, st;
  var save = function () { try { sessionStorage.setItem(K, String(Math.round(scrollY))); } catch (e) {} };
  addEventListener('scroll', function () { if (Date.now() - lastClick < 3000) return; clearTimeout(st); st = setTimeout(save, 150); }, { passive: true });
  document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[href*="Vacantes.dc.html"]'); if (a) { save(); lastClick = Date.now(); } }, true);
  var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  var flag = false;
  try { flag = sessionStorage.getItem('plzRestore') === '1'; sessionStorage.removeItem('plzRestore'); } catch (e) {}
  if (!flag && !(nav && nav.type === 'back_forward')) return;
  var y = 0; try { y = +sessionStorage.getItem(K) || 0; } catch (e) {}
  if (y <= 0) return;
  var t0 = Date.now(), stop = false;
  var halt = function () { stop = true; };
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (ev) { addEventListener(ev, halt, { once: true, passive: true }); });
  (function f() {
    if (stop || Date.now() - t0 > 3500) return;
    if (document.documentElement.scrollHeight - innerHeight >= y - 2 && Math.abs(scrollY - y) > 3) scrollTo(0, y);
    requestAnimationFrame(f);
  })();
})();
