/* ============================================================
   ARTICLE HERO SYNC — conecta la foto de portada de cada página
   de artículo con lo que se sube desde el backoffice (/admin).

   Por qué existe: la portada de un post vive en UN solo lugar,
   content/posts.json (el campo "cover", que Decap CMS escribe
   cuando subes una foto). La marquesina y el modal ya lo leían
   de ahí. Las páginas de artículo standalone (living-condesa/*.html)
   antes tenían la portada escrita a mano en el <img> — se veía bien
   al construirlas, pero se desconectaba del backoffice en cuanto
   alguien subía una foto nueva desde ahí.

   Este script hace que TODA página de artículo (actual y futura)
   quede sincronizada sola: solo necesita un <img class="article-cover">
   y un <body data-post-slug="..."> — nada de rutas hardcodeadas.
   ============================================================ */
(function () {
  var img = document.querySelector('.article-cover');
  var slug = document.body.getAttribute('data-post-slug');
  if (!img || !slug) return;

  fetch('../content/posts.json')
    .then(function (r) { if (!r.ok) throw new Error('posts.json not found'); return r.json(); })
    .then(function (data) {
      var post = (data.posts || []).find(function (p) { return p.slug === slug; });
      if (post && post.cover) {
        // Las rutas en posts.json son relativas a la raíz del sitio;
        // esta página vive un nivel abajo, en /living-condesa/.
        img.src = '../' + post.cover;
        img.onerror = function () { img.style.display = 'none'; };
      }
    })
    .catch(function () {
      // Si posts.json no carga, la imagen se queda con lo que ya
      // tenía el HTML (o se oculta por su propio onerror, como antes).
    });
})();
