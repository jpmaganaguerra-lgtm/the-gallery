/* ============================================================
   LIVING CONDESA — motor del blog
   Lee content/posts.json (el mismo archivo que edita el backoffice
   en /admin vía Decap CMS) y arma la marquesina + el modal de lectura.
   Sin build step: fetch directo, sin servidor ni base de datos.
   ============================================================ */
(function () {
  var track = document.getElementById('marqueeTrack');
  var wrap = document.getElementById('marqueeWrap');
  var modal = document.getElementById('postModal');
  var modalBody = document.getElementById('postModalBody');
  var modalClose = document.getElementById('postModalClose');
  if (!track || !wrap) return;

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // convertidor mínimo de texto a párrafos — los posts se escriben
  // como líneas separadas por doble salto de línea en el backoffice
  function bodyToHtml(body) {
    return String(body || '')
      .split(/\n\s*\n/)
      .map(function (p) { return '<p>' + esc(p.trim()).replace(/\n/g, '<br>') + '</p>'; })
      .join('');
  }

  function cardHtml(post) {
    // Los posts con "url" son piezas SEO/GEO con página propia (indexable,
    // con su propio <title>/meta) — la tarjeta navega ahí directo, no
    // abre el modal. Los posts sin "url" (relatos cortos, "como local")
    // siguen usando el modal in-page.
    var tag = post.url ? 'a' : 'button';
    var linkAttr = post.url ? ' href="' + esc(post.url) + '"' : '';
    var dataAttr = post.url ? '' : ' data-slug="' + esc(post.slug) + '"';
    return (
      '<' + tag + ' class="post-card"' + linkAttr + dataAttr + '>' +
        '<img class="post-cover" src="' + esc(post.cover) + '" alt="' + esc(post.title) + '" loading="lazy" decoding="async" onerror="this.style.display=\'none\'">' +
        '<div class="post-body">' +
          '<span class="post-cat">' + esc(post.category) + '</span>' +
          '<h3>' + esc(post.title) + '</h3>' +
          '<p>' + esc(post.excerpt) + '</p>' +
          '<span class="post-date">' + esc(formatDate(post.date)) + '</span>' +
        '</div>' +
      '</' + tag + '>'
    );
  }

  function openPost(post) {
    modalBody.innerHTML =
      (post.cover ? '<img src="' + esc(post.cover) + '" alt="' + esc(post.title) + '" onerror="this.remove()">' : '') +
      '<span class="post-cat">' + esc(post.category) + '</span>' +
      '<h2>' + esc(post.title) + '</h2>' +
      '<span class="post-date">' + esc(formatDate(post.date)) + '</span>' +
      bodyToHtml(post.body);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePost() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose && modalClose.addEventListener('click', closePost);
  modal && modal.addEventListener('click', function (e) { if (e.target === modal) closePost(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePost(); });

  fetch('content/posts.json')
    .then(function (r) { if (!r.ok) throw new Error('posts.json not found'); return r.json(); })
    .then(function (data) {
      var posts = (data.posts || []).slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      if (!posts.length) return;

      // El track se pinta DOS veces seguidas (mismo set) para que la
      // animación (translateX -50%) haga un loop perfecto sin salto.
      var html = posts.map(cardHtml).join('') + posts.map(cardHtml).join('');
      track.innerHTML = html;

      track.addEventListener('click', function (e) {
        var card = e.target.closest('.post-card');
        if (!card) return;
        if (card.tagName === 'A') return; // tiene su propia página — navegación normal
        var post = posts.find(function (p) { return p.slug === card.dataset.slug; });
        if (post) openPost(post);
      });
    })
    .catch(function () {
      wrap.innerHTML = '<p style="font-size:14px; color:#8A8072;">Aún no hay posts publicados.</p>';
    });
})();
