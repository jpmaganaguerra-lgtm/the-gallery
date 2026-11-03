/* ============================================================
   i18n — motor de idioma (EN / ES)
   - La HOME empieza en inglés. El idioma elegido se recuerda
     (localStorage) y también acepta ?lang=es en la URL.
   - Los ARTÍCULOS son páginas separadas por idioma (<html data-lang-fixed>):
     el botón en/es lleva a la página hermana (<link rel="alternate" hreflang>).
   - Marcado en el HTML:
       data-i18n="clave"            -> textContent
       data-i18n-html="clave"       -> innerHTML
       data-i18n-attr="alt:clave;aria-label:clave"
   - Textos en js/strings.js. Cargar ANTES de header.js y main.js.
   ============================================================ */
(function () {
  'use strict';
  var KEY = 'gallery.lang';
  var root = document.documentElement;
  var fixed = root.hasAttribute('data-lang-fixed');
  var listeners = [];

  function valid(l) { return l === 'en' || l === 'es'; }
  function store(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  var lang;
  if (fixed) {
    lang = (root.lang || 'en').slice(0, 2);
    store(lang);                      // el idioma del artículo se hereda al volver a la home
  } else {
    var q = (location.search.match(/[?&]lang=(en|es)\b/) || [])[1];
    lang = q || (valid(stored()) ? stored() : 'en');
    if (q) store(q);
  }

  function t(key, vars) {
    var e = window.STRINGS && window.STRINGS[key];
    var s = e ? (e[lang] != null ? e[lang] : e.en) : key;
    if (vars) s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
    return s;
  }

  function apply() {
    root.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    if (document.body.hasAttribute('data-home')) {          // título y descripción de Google (home)
      document.title = t('meta.title');
      var m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', t('meta.desc'));
    }
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function set(l) {
    if (!valid(l) || l === lang) return;
    store(l);
    if (fixed) {                                            // artículo: ir a la página hermana
      var alt = document.querySelector('link[rel="alternate"][hreflang="' + l + '"]');
      if (alt) window.location.href = new URL(alt.href, location.href).pathname;   // ruta relativa al dominio: sirve en previews y en el dominio final
      return;
    }
    lang = l; apply();
    listeners.forEach(function (fn) { fn(lang); });
  }

  window.I18N = {
    t: t, set: set,
    get lang() { return lang; },
    onChange: function (fn) { listeners.push(fn); }
  };

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-lang]');
    if (b) set(b.getAttribute('data-lang'));
  });

  apply();
})();
