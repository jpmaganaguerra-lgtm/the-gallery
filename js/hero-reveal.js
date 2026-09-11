/* ============================================================
   HERO REVEAL — "pizarrón" de rosa mexicano sólido que el
   cursor va perforando con trazos gruesos, revelando la foto
   real del patio de la propiedad. Sin movimiento, vuelve a
   cubrirse sola (efecto de "sanado" continuo).

   Rendimiento:
   - Canvas dimensionado al tamaño real en pantalla × devicePixelRatio
     (tope 2) para no dibujar más píxeles de los necesarios.
   - La imagen se sirve en 3 anchos (900/1600/2400) vía <picture>;
     el navegador elige el archivo, nunca se decodifica el original.
   - El "sanado" corre en requestAnimationFrame solo mientras el
     hero está en pantalla (IntersectionObserver lo pausa fuera de vista).
   - Respeta prefers-reduced-motion: no se inicializa el canvas.
   ============================================================ */
(function () {
  document.documentElement.classList.remove('no-js');

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.classList.add('reduced-motion');
    return;
  }

  var wrap = document.getElementById('heroMedia');
  var canvas = document.getElementById('heroReveal');
  var photo = document.getElementById('heroPhoto');
  if (!wrap || !canvas || !photo) return;

  var ctx = canvas.getContext('2d', { alpha: true });
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var pinkColor = '#C41E6E'; // fallback; se sincroniza con --magenta abajo
  var cssPink = getComputedStyle(document.documentElement).getPropertyValue('--magenta').trim();
  if (cssPink) pinkColor = cssPink;

  var W = 0, H = 0;
  var running = false;
  var lastX = null, lastY = null;
  var idlePasses = 0; // cuántos frames sin movimiento reciente

  function sizeCanvas() {
    var rect = wrap.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fillSolid();
  }

  function fillSolid() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = pinkColor;
    ctx.fillRect(0, 0, W, H);
  }

  function drawStroke(x0, y0, x1, y1) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 78; // trazo grueso
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    // sello redondo extra en el punto de destino para trazos más orgánicos
    ctx.beginPath();
    ctx.arc(x1, y1, 39, 0, Math.PI * 2);
    ctx.fill();
  }

  function heal() {
    // repinta una capa translúcida de rosa: las zonas reveladas
    // se vuelven a cubrir gradualmente si el cursor no vuelve a pasar
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = pinkColor;
    ctx.globalAlpha = 0.035;
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }

  function loop() {
    if (!running) return;
    heal();
    requestAnimationFrame(loop);
  }

  function toLocal(evt) {
    var rect = canvas.getBoundingClientRect();
    var cx = (evt.touches ? evt.touches[0].clientX : evt.clientX) - rect.left;
    var cy = (evt.touches ? evt.touches[0].clientY : evt.clientY) - rect.top;
    return [cx, cy];
  }

  function onMove(evt) {
    var p = toLocal(evt);
    if (lastX === null) { lastX = p[0]; lastY = p[1]; return; }
    drawStroke(lastX, lastY, p[0], p[1]);
    lastX = p[0]; lastY = p[1];
  }

  function onLeave() { lastX = null; lastY = null; }

  wrap.addEventListener('mousemove', onMove, { passive: true });
  wrap.addEventListener('touchmove', onMove, { passive: true });
  wrap.addEventListener('mouseleave', onLeave, { passive: true });
  wrap.addEventListener('touchend', onLeave, { passive: true });

  window.addEventListener('resize', sizeCanvas, { passive: true });

  // solo corre el rAF de "sanado" mientras el hero es visible
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      running = en.isIntersecting;
      if (running) requestAnimationFrame(loop);
    });
  }, { threshold: 0.05 });

  function init() {
    sizeCanvas();
    io.observe(wrap);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }
})();
