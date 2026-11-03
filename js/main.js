
// Los textos (EN/ES) viven en js/strings.js; aquí solo claves, fotos y colores.
const T = (k, v) => I18N.t(k, v);

const DAY_MOMENTS = [
  { k:1, chapter:"stay",    img:"assets/img/day/Wake-up-at-The-Gallery-Condesa.webp" },
  { k:2, chapter:"house",   img:"assets/img/day/Make-Coffee-at-The-Gallery-Condesa.webp" },
  { k:3, chapter:"house",   img:"assets/img/day/Get-Out-at-The-Gallery-Condesa.webp" },
  { k:4, chapter:"house",   img:"assets/img/day/Come-Back-to-The-Gallery-Condesa.webp" },
  { k:5, chapter:"condesa", img:"assets/img/day/Have-a-drink-at-The-Gallery-Condesa.webp" },
  { k:6, chapter:"stay",    img:"assets/img/day/Sleep-at-The-Gallery-Condesa.webp" }
];
const momentLabel = m => T('day.' + m.k + '.label');

const ROOMS = [
  { id:"studio", num:"01", bg:"var(--cempasuchil)",
    images:["assets/img/stay/studio/cover","assets/img/stay/studio/2","assets/img/stay/studio/3","assets/img/stay/studio/4"] },
  { id:"loft", num:"02", bg:"var(--nopal)",
    images:["assets/img/stay/loft/cover","assets/img/stay/loft/2","assets/img/stay/loft/3","assets/img/stay/loft/4"] },
  { id:"corner", num:"03", bg:"var(--magenta)",
    images:["assets/img/stay/corner/cover","assets/img/stay/corner/2","assets/img/stay/corner/3","assets/img/stay/corner/4"] }
];

function el(tag, attrs={}, html=""){ const e=document.createElement(tag); Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v)); if(html) e.innerHTML=html; return e; }

// Cada foto de la galería de Stay prueba .jpg primero; si no existe,
// prueba .webp una sola vez antes de darse por vencida (y en ese caso
// se quita a sí misma y a su punto de navegación).
function handleRoomPhotoError(img, idx){
  if(!img.dataset.triedAlt){
    img.dataset.triedAlt = '1';
    img.src = /\.jpg$/i.test(img.src) ? img.src.replace(/\.jpg$/i, '.webp') : img.src.replace(/\.webp$/i, '.jpg');
  } else {
    img.remove();
    const d = document.querySelector(`.room-dots .dot[data-index="${idx}"]`);
    if(d) d.remove();
  }
}

const revealObserver = new IntersectionObserver((entries)=>{ entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('in'); }); }, {threshold:.15});
document.querySelectorAll('.reveal').forEach(e=>revealObserver.observe(e));

const header = document.getElementById('siteHeader');
window.addEventListener('scroll', ()=>{ header.classList.toggle('scrolled', window.scrollY>40); }, {passive:true});

const chapterSections = ['stay','house','condesa'].map(id=>document.getElementById(id));
const chapterObserver = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      document.body.setAttribute('data-chapter', en.target.id);
      document.querySelectorAll('.menu-link[data-target]').forEach(a=>a.classList.toggle('active', a.dataset.target===en.target.id));
    }
  });
}, {threshold:.4});
chapterSections.forEach(s=>chapterObserver.observe(s));

const dayRail = document.getElementById('dayRail');
const dayPhotoWrap = document.getElementById('dayPhotoWrap');
const dayBanner = document.getElementById('dayBanner');
const momentTitle = document.getElementById('momentTitle');
const momentTag = document.getElementById('momentTag');
let activeMoment = 0, dayAutoTimer=null;

// Las 6 fotos se insertan una sola vez, apiladas, y se cambia de cuál
// está "activa" (opacity) — así el navegador solo las descarga una vez
// y el cambio entre momentos es un crossfade instantáneo, sin parpadeo.
DAY_MOMENTS.forEach((m,i)=>{
  const img = el('img', {
    class: 'day-photo' + (i===0 ? ' active' : ''),
    src: m.img,
    alt: T('day.alt', {label: momentLabel(m)}),
    loading: i===0 ? 'eager' : 'lazy',
    decoding: 'async',
    'data-index': i,
    onerror: 'this.remove()'
  });
  dayPhotoWrap.appendChild(img);
});

DAY_MOMENTS.forEach((m,i)=>{
  const step = el('button', {class:'day-step'+(i===0?' active':''), role:'tab', 'aria-selected': i===0?'true':'false', 'data-index':i}, `<span class="num">0${i+1}</span>${momentLabel(m)}`);
  // "Rollover": el cursor sobre la pestaña cambia la foto. click y focus
  // quedan como respaldo para touch/teclado, donde no existe hover.
  step.addEventListener('mouseenter', ()=>setMoment(i,true));
  step.addEventListener('click', ()=>setMoment(i,true));
  step.addEventListener('focus', ()=>setMoment(i,true));
  dayRail.appendChild(step);
});

const CHAPTER_BANNER = { stay:'var(--magenta)', house:'var(--cempasuchil)', condesa:'var(--nopal)' };
function setMoment(i, user){
  activeMoment=i; const m=DAY_MOMENTS[i];
  momentTitle.textContent=momentLabel(m); momentTag.textContent=T('day.'+m.k+'.tag');
  dayBanner.style.background = CHAPTER_BANNER[m.chapter] || CHAPTER_BANNER.stay;
  document.querySelectorAll('.day-photo').forEach((img,idx)=>img.classList.toggle('active', idx===i));
  document.querySelectorAll('.day-step').forEach((el,idx)=>{ el.classList.toggle('active', idx===i); el.setAttribute('aria-selected', idx===i?'true':'false'); });
  if(user) resetAuto();
}
function resetAuto(){ clearInterval(dayAutoTimer); dayAutoTimer=setInterval(()=>setMoment((activeMoment+1)%DAY_MOMENTS.length,false),4200); }
setMoment(0,false); resetAuto();
dayRail.addEventListener('keydown', e=>{
  if(e.key==='ArrowRight') setMoment((activeMoment+1)%DAY_MOMENTS.length,true);
  if(e.key==='ArrowLeft') setMoment((activeMoment-1+DAY_MOMENTS.length)%DAY_MOMENTS.length,true);
});

const roomTabsEl = document.getElementById('roomTabs');
const roomContentEl = document.getElementById('roomContent');
ROOMS.forEach((r,i)=>{
  const tab = el('button', {class:'room-tab'+(i===0?' active':''), 'data-id':r.id}, T('room.'+r.id+'.name'));
  tab.addEventListener('click', ()=>renderRoom(i,true));
  roomTabsEl.appendChild(tab);
});
let currentRoom = 0;
function renderRoom(i, animate){
  currentRoom = i;
  const r = ROOMS[i];
  const rn = T('room.'+r.id+'.name');
  const specs = [1,2,3].map(x => [T('room.'+r.id+'.s'+x+'v'), T('room.'+r.id+'.s'+x+'l')]);
  document.querySelectorAll('.room-tab').forEach((t,idx)=>t.classList.toggle('active', idx===i));

  // Las fotos se apilan (crossfade), como en "A Day at The Gallery".
  // Si un archivo no existe todavía, onerror la quita a ella Y a su
  // punto — así los puntos siempre reflejan solo las fotos que sí cargaron.
  const photosHtml = r.images.map((base, idx) => `
    <img class="room-photo-item${idx===0?' active':''}" src="${base}.jpg" alt="${T('stay.photoAlt',{name:rn})}"
         data-index="${idx}" loading="${idx===0?'eager':'lazy'}" decoding="async"
         onerror="handleRoomPhotoError(this, ${idx})">
  `).join('');
  const dotsHtml = r.images.map((_, idx) => `
    <button class="dot${idx===0?' active':''}" data-index="${idx}" aria-label="${T('stay.dotAria',{n:idx+1,name:rn})}"></button>
  `).join('');

  roomContentEl.innerHTML = `
    <div class="room-gallery">
      <div class="room-photo-wrap">
        ${photosHtml}
        <div class="room-dots">${dotsHtml}</div>
      </div>
      <div class="room-banner" style="background:${r.bg};">
        <div class="roomnum">${r.num}</div>
        <span class="caption">${rn}</span>
      </div>
    </div>
    <div>
      <h3 class="room-name">${rn}</h3>
      <p class="room-tagline">${T('room.'+r.id+'.tag')}</p>
      <div class="room-specs">${specs.map(([v,l])=>`<div><strong>${v}</strong>${l}</div>`).join('')}</div>
      <p class="room-desc">${T('room.'+r.id+'.desc')}</p>
      <span class="link-explore">${T('stay.btn')}</span>
    </div>`;

  // clic en un punto cambia la foto activa dentro de la galería de ESTE room
  roomContentEl.querySelectorAll('.room-dots .dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = dot.dataset.index;
      roomContentEl.querySelectorAll('.room-photo-item').forEach(img => img.classList.toggle('active', img.dataset.index === idx));
      roomContentEl.querySelectorAll('.room-dots .dot').forEach(d => d.classList.toggle('active', d === dot));
    });
  });

  if(animate){ roomContentEl.style.opacity=0; requestAnimationFrame(()=>{ roomContentEl.style.transition='opacity .35s ease'; roomContentEl.style.opacity=1; }); }
}
renderRoom(0,false);

// Cambio de idioma: se reescriben momentos del día, pestañas y la habitación activa.
I18N.onChange(() => {
  document.querySelectorAll('.day-photo').forEach(img => { img.alt = T('day.alt', {label: momentLabel(DAY_MOMENTS[+img.dataset.index])}); });
  document.querySelectorAll('.day-step').forEach(b => { b.lastChild.nodeValue = momentLabel(DAY_MOMENTS[+b.dataset.index]); });
  setMoment(activeMoment, false);
  document.querySelectorAll('.room-tab').forEach((b,i) => { b.textContent = T('room.'+ROOMS[i].id+'.name'); });
  renderRoom(currentRoom, false);
});

/* ============================================================
   BOOKING — conecta con el motor de reservas de Octorate.
   No se incrusta su widget oficial (renderiza su propio UI dentro
   de un iframe que Octorate controla, imposible de restylear con
   nuestro CSS). En su lugar, el formulario es 100% nuestro y al
   enviarlo redirige al motor de Octorate con fechas y huéspedes
   ya pre-cargados en la URL — mismo patrón que Octorate documenta
   para integraciones con diseño propio.
   ============================================================ */
(function () {
  // La key vive en js/header.js (window.GALLERY_CONFIG); aquí queda de respaldo.
  var CFG = window.GALLERY_CONFIG || { octorateSiteKey: 'octosite362352', octorateLang: 'es' };
  var OCTORATE_SITE_KEY = CFG.octorateSiteKey;
  var OCTORATE_LANG = CFG.octorateLang;

  var form = document.getElementById('bookForm');
  var note = document.getElementById('bookNote');
  var checkinEl = document.getElementById('checkin');
  var checkoutEl = document.getElementById('checkout');
  var guestsEl = document.getElementById('guests');
  if (!form || !checkinEl || !checkoutEl) return;

  // Solo fechas futuras, y checkout siempre después de checkin —
  // mismo criterio de validación que usa el propio Octorate en su
  // guía de integración, para no dejar que el visitante llegue a su
  // motor con un rango de fechas inválido.
  var today = new Date();
  // Fecha LOCAL (toISOString usa UTC y dejaba "hoy" bloqueado por las tardes)
  var todayIso = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
  checkinEl.setAttribute('min', todayIso);
  checkoutEl.setAttribute('min', todayIso);

  checkinEl.addEventListener('change', function () {
    if (!checkinEl.value) return;
    var minCheckout = new Date(checkinEl.value);
    minCheckout.setDate(minCheckout.getDate() + 1);
    var minIso = minCheckout.toISOString().split('T')[0];
    checkoutEl.setAttribute('min', minIso);
    if (checkoutEl.value && checkoutEl.value <= checkinEl.value) checkoutEl.value = '';
  });

  function showNote(msg, isError) {
    note.textContent = msg;
    note.classList.toggle('error', !!isError);
  }

  // YYYY-MM-DD -> DD%2FMM%2FYYYY (formato que espera la URL de Octorate)
  function toOctorateDate(iso) {
    return iso.split('-').reverse().join('%2F');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var checkin = checkinEl.value;
    var checkout = checkoutEl.value;
    var guests = guestsEl ? guestsEl.value : '2';

    if (!checkin || !checkout) {
      showNote(I18N.t('book.err1'), true);
      return;
    }
    if (checkout <= checkin) {
      showNote(I18N.t('book.err2'), true);
      return;
    }

    showNote(I18N.t('book.ok'), false);

    var url = 'https://book.octorate.com/octobook/site/reservation/result.xhtml'
      + '?siteKey=' + encodeURIComponent(OCTORATE_SITE_KEY)
      + '&lang=' + (CFG.octorateLang || I18N.lang)
      + '&ota=false'
      + '&checkin=' + toOctorateDate(checkin)
      + '&checkout=' + toOctorateDate(checkout)
      + '&pax=' + encodeURIComponent(guests);

    window.location.href = url;
  });
})();

