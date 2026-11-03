/* ============================================================
   HEADER · MENÚ · PANEL DE RESERVA
   - Construye el menú a pantalla completa y el panel de reserva.
   - Cualquier elemento con [data-reserve] abre el panel.
   - Al confirmar, redirige a Octorate con fechas y huéspedes en la URL.
   Nota: el calendario NO consulta disponibilidad; la disponibilidad y
   las tarifas las muestra el motor de reservas de Octorate.
   Cargar ANTES de main.js (main.js lee window.GALLERY_CONFIG).
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Configuración (un solo lugar para la key de Octorate) ---------- */
  var CFG = window.GALLERY_CONFIG = window.GALLERY_CONFIG || {
    octorateSiteKey: 'octosite362352',
    octorateLang: 'es',
    maxGuests: 4,
    contactEmail: 'hola@thegallery.mx',
    address: 'Francisco Márquez 149, Condesa, Ciudad de México.'
  };

  /* En el home los links son "#stay"; en los artículos apuntan a ../index.html#stay */
  var isHome = document.body.hasAttribute('data-home');
  var base = isHome ? '' : '../index.html';

  var MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var DIAS = ['L','M','M','J','V','S','D'];

  /* ---------- Utilidades de fecha (SIEMPRE en hora local, no UTC) ---------- */
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function octDate(d) { return pad(d.getDate()) + '%2F' + pad(d.getMonth() + 1) + '%2F' + d.getFullYear(); }
  function short(d) { return d.getDate() + ' ' + MESES[d.getMonth()].slice(0, 3); }
  var TODAY = new Date(); TODAY.setHours(0, 0, 0, 0);
  function nights() { return S.start && S.end ? Math.round((S.end - S.start) / 864e5) : 0; }

  var S = { start: null, end: null, guests: 2, view: new Date(TODAY.getFullYear(), TODAY.getMonth(), 1) };

  /* ---------- Bloqueo de scroll compartido (menú + panel) ---------- */
  function syncLock() {
    document.body.classList.toggle('lock', menu.classList.contains('on') || drw.classList.contains('on'));
  }

  /* ============================================================
     MENÚ
     ============================================================ */
  var menu = document.createElement('div');
  menu.className = 'menu'; menu.id = 'siteMenu'; menu.setAttribute('aria-hidden', 'true'); menu.inert = true;
  menu.innerHTML =
    '<nav class="menu-inner wrap" aria-label="Menú principal"><ul>' +
      '<li><a class="menu-link" style="--i:0" href="' + base + '#stay" data-target="stay"><span class="menu-num">01</span>Quédate</a></li>' +
      '<li><a class="menu-link" style="--i:1" href="' + base + '#house" data-target="house"><span class="menu-num">02</span>Tu casa</a></li>' +
      '<li><a class="menu-link" style="--i:2" href="' + base + '#condesa" data-target="condesa"><span class="menu-num">03</span>Viviendo La Condesa</a></li>' +
      '<li><a class="menu-link" style="--i:3" href="' + base + '#book" data-reserve><span class="menu-num">04</span>Reserva</a></li>' +
    '</ul><div class="menu-foot"><span>' + CFG.address + '</span><a href="mailto:' + CFG.contactEmail + '">' + CFG.contactEmail + '</a></div></nav>';
  document.body.appendChild(menu);

  var burger = document.getElementById('menuToggle');
  function openMenu() {
    closeDrawer();
    menu.classList.add('on'); menu.inert = false; menu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Cerrar menú');
    syncLock();
  }
  function closeMenu() {
    if (!menu.classList.contains('on')) return;
    menu.classList.remove('on'); menu.inert = true; menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Abrir menú');
    syncLock();
  }
  if (burger) burger.addEventListener('click', function () { menu.classList.contains('on') ? closeMenu() : openMenu(); });
  menu.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (a && !a.hasAttribute('data-reserve')) closeMenu();
  });

  /* ============================================================
     PANEL DE RESERVA
     ============================================================ */
  var scrim = document.createElement('div');
  scrim.className = 'scrim';
  var drw = document.createElement('aside');
  drw.className = 'drw'; drw.id = 'bookingDrawer'; drw.inert = true;
  drw.setAttribute('role', 'dialog'); drw.setAttribute('aria-modal', 'true');
  drw.setAttribute('aria-labelledby', 'drwTitle'); drw.setAttribute('aria-hidden', 'true');
  drw.innerHTML =
    '<div class="drw-head"><h2 id="drwTitle">Tu estancia</h2><button type="button" class="drw-close" data-close>Cerrar</button></div>' +
    '<div class="drw-body">' +
      '<div class="dates"><div data-slot="in"><small>Llegada</small><b data-v="in"></b></div><div data-slot="out"><small>Salida</small><b data-v="out"></b></div></div>' +
      '<div data-cal></div>' +
      '<div class="guests"><div><small>Huéspedes</small><b data-v="g"></b></div>' +
        '<div class="stepper"><button type="button" data-g="-1" aria-label="Quitar un huésped">−</button><span data-v="gn"></span><button type="button" data-g="1" aria-label="Agregar un huésped">+</button></div></div>' +
      '<p class="guests-help">¿Más de ' + CFG.maxGuests + '? <a href="mailto:' + CFG.contactEmail + '">Escríbenos</a>.</p>' +
    '</div>' +
    '<div class="drw-foot"><button type="button" class="drw-go" data-go><span>Ver disponibilidad</span></button>' +
      '<p class="drw-msg">Verás disponibilidad y tarifas en el motor de reservas.</p></div>';
  document.body.appendChild(scrim);
  document.body.appendChild(drw);

  var calHost = drw.querySelector('[data-cal]');
  var goBtn = drw.querySelector('[data-go]');
  var lastFocus = null;

  function calHTML() {
    var y = S.view.getFullYear(), m = S.view.getMonth();
    var atMin = y === TODAY.getFullYear() && m === TODAY.getMonth();
    var h = '<div class="cal-head"><button type="button" data-nav="-1" aria-label="Mes anterior"' + (atMin ? ' disabled' : '') + '>←</button>' +
            '<span>' + MESES[m] + ' ' + y + '</span><button type="button" data-nav="1" aria-label="Mes siguiente">→</button></div><div class="cal-grid">';
    DIAS.forEach(function (d) { h += '<span class="wd">' + d + '</span>'; });
    var off = (new Date(y, m, 1).getDay() + 6) % 7;            // semana empieza en lunes
    for (var i = 0; i < off; i++) h += '<span></span>';
    var dim = new Date(y, m + 1, 0).getDate();
    for (var n = 1; n <= dim; n++) {
      var d = new Date(y, m, n), c = 'd', t = d.getTime();
      var isS = S.start && t === S.start.getTime(), isE = S.end && t === S.end.getTime();
      if (isS || isE) c += ' s';
      if (isS && S.end) c += ' a';
      if (isE) c += ' b';
      if (S.start && S.end && d > S.start && d < S.end) c += ' r';
      h += '<button type="button" class="' + c + '" data-d="' + iso(d) + '"' + (d < TODAY ? ' disabled' : '') + '>' + n + '</button>';
    }
    var info = S.start ? (S.end ? nights() + (nights() === 1 ? ' noche' : ' noches') : 'Elige la salida') : 'Elige la llegada';
    return h + '</div><p class="cal-info">' + info + (S.start ? '<button type="button" data-clear>Borrar</button>' : '') + '</p>';
  }

  function render() {
    var vIn = drw.querySelector('[data-v="in"]'), vOut = drw.querySelector('[data-v="out"]');
    vIn.textContent = S.start ? short(S.start) : 'Elige fecha'; vIn.className = S.start ? '' : 'ph';
    vOut.textContent = S.end ? short(S.end) : 'Elige fecha'; vOut.className = S.end ? '' : 'ph';
    drw.querySelector('[data-slot="in"]').classList.toggle('next', !S.start);
    drw.querySelector('[data-slot="out"]').classList.toggle('next', !!S.start && !S.end);
    drw.querySelector('[data-v="g"]').textContent = S.guests + (S.guests === 1 ? ' huésped' : ' huéspedes');
    drw.querySelector('[data-v="gn"]').textContent = S.guests;
    drw.querySelector('[data-g="-1"]').disabled = S.guests <= 1;
    drw.querySelector('[data-g="1"]').disabled = S.guests >= CFG.maxGuests;
    calHost.innerHTML = calHTML();
    goBtn.disabled = !(S.start && S.end);
  }

  function pickDay(s) {
    var d = new Date(s + 'T00:00:00');
    if (!S.start || (S.start && S.end)) { S.start = d; S.end = null; }
    else if (d <= S.start) { S.start = d; }
    else { S.end = d; }
    render();
  }

  function openDrawer() {
    closeMenu();
    lastFocus = document.activeElement;
    drw.classList.add('on'); scrim.classList.add('on');
    drw.inert = false; drw.setAttribute('aria-hidden', 'false');
    render(); syncLock();
    setTimeout(function () { var c = drw.querySelector('[data-close]'); if (c) c.focus(); }, 60);
  }
  function closeDrawer() {
    if (!drw.classList.contains('on')) return;
    drw.classList.remove('on'); scrim.classList.remove('on');
    drw.inert = true; drw.setAttribute('aria-hidden', 'true');
    syncLock();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  drw.addEventListener('click', function (e) {
    var t = e.target;
    var nav = t.closest('[data-nav]'), day = t.closest('[data-d]'), g = t.closest('[data-g]');
    if (t.closest('[data-close]')) { closeDrawer(); return; }
    if (nav) { S.view = new Date(S.view.getFullYear(), S.view.getMonth() + (+nav.getAttribute('data-nav')), 1); render(); return; }
    if (t.closest('[data-clear]')) { S.start = null; S.end = null; render(); return; }
    if (day) { pickDay(day.getAttribute('data-d')); return; }
    if (g) { S.guests = Math.min(CFG.maxGuests, Math.max(1, S.guests + (+g.getAttribute('data-g')))); render(); return; }
    if (t.closest('[data-go]') && S.start && S.end) {
      window.location.href = 'https://book.octorate.com/octobook/site/reservation/result.xhtml'
        + '?siteKey=' + encodeURIComponent(CFG.octorateSiteKey)
        + '&lang=' + CFG.octorateLang
        + '&ota=false'
        + '&checkin=' + octDate(S.start)
        + '&checkout=' + octDate(S.end)
        + '&pax=' + encodeURIComponent(S.guests);
    }
  });
  scrim.addEventListener('click', closeDrawer);

  /* Cualquier [data-reserve] abre el panel (el href queda como respaldo sin JS) */
  document.addEventListener('click', function (e) {
    var r = e.target.closest('[data-reserve]');
    if (r) { e.preventDefault(); openDrawer(); }
  });

  /* Escape cierra lo que esté abierto; Tab queda atrapado dentro del panel */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDrawer(); closeMenu(); return; }
    if (e.key === 'Tab' && drw.classList.contains('on')) {
      var f = drw.querySelectorAll('button:not([disabled]), a[href]');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
