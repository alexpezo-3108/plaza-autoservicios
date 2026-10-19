document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href="Trabaja.dc.html"]');
  if (a && !a.closest('header,nav,footer')) { try { sessionStorage.setItem('plzRestore', '1'); } catch (x) {} }
}, true);
