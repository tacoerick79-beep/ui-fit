// UI Fit — piezas repetidas de los mockups: navegación, racha en cuadritos y barras por bloques.
(function () {
  var TODAY = new Date(2026, 9, 6);

  var icons = {
    inicio: '<path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z"/>',
    entreno: '<path d="M2 9v6M5 6v12M19 6v12M22 9v6M5 12h14"/>',
    finanzas: '<rect x="3" y="6" width="18" height="13"/><path d="M3 10h18M15 15h3"/>',
    ajustes: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'
  };
  var links = { inicio: '01-inicio.html', entreno: '02-entreno.html', finanzas: '04-finanzas.html', ajustes: '#' };

  document.querySelectorAll('nav.nav').forEach(function (nav) {
    var active = nav.dataset.active;
    nav.innerHTML = Object.keys(icons).map(function (k) {
      var on = k === active;
      return '<a href="' + links[k] + '"' + (on ? ' class="on" aria-current="page"' : '') + '>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true">' + icons[k] + '</svg>' + k.toUpperCase() + '</a>';
    }).join('');
  });

  // Patrón de ejemplo: lun, mar, jue y vie entrenados, con algún día fallado.
  window.trained = function (y, m, d) {
    var dow = new Date(y, m, d).getDay();
    return [1, 2, 4, 5].indexOf(dow) >= 0 && (d * 3 + m) % 7 !== 0;
  };

  document.querySelectorAll('.cells[data-month]').forEach(function (el) {
    var parts = el.dataset.month.split('-');
    var y = +parts[0], m = +parts[1] - 1;
    var off = (new Date(y, m, 1).getDay() + 6) % 7;
    var n = new Date(y, m + 1, 0).getDate();
    var html = '';
    for (var k = 0; k < off; k++) html += '<i class="b"></i>';
    for (var d = 1; d <= n; d++) {
      var dt = new Date(y, m, d), c = '';
      if (dt > TODAY) c = 'f';
      else if (dt.getTime() === TODAY.getTime()) c = 't';
      else if (window.trained(y, m, d)) c = 'd';
      html += '<i class="' + c + '"></i>';
    }
    el.innerHTML = html;
  });

  document.querySelectorAll('.segbar[data-pct]').forEach(function (el) {
    var on = Math.round(+el.dataset.pct / 5), html = '';
    for (var i = 0; i < 20; i++) html += '<i' + (i < on ? ' class="on"' : '') + '></i>';
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', el.dataset.pct + '%');
    el.innerHTML = html;
  });
})();
