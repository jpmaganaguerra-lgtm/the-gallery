
const DAY_MOMENTS = [
  { label:"Wake up", tag:"Luz natural entrando por ventanas altas. Sin alarmas.", chapter:"stay",
    img:"assets/img/day/Wake-up-at-The-Gallery-Condesa.webp" },
  { label:"Make coffee", tag:"Bajas al café. El barista ya sabe cómo te gusta.", chapter:"house",
    img:"assets/img/day/Make-Coffee-at-The-Gallery-Condesa.webp" },
  { label:"Go out", tag:"Tomas una bici. Parque México a cinco minutos.", chapter:"house",
    img:"assets/img/day/Get-Out-at-The-Gallery-Condesa.webp" },
  { label:"Come back", tag:"Trabajas una hora en la mesa larga de la sala común.", chapter:"house",
    img:"assets/img/day/Come-Back-to-The-Gallery-Condesa.webp" },
  { label:"Have a drink", tag:"Mezcal en una terraza a la vuelta, antes de que anochezca.", chapter:"condesa",
    img:"assets/img/day/Have-a-drink-at-The-Gallery-Condesa.webp" },
  { label:"Sleep", tag:"De vuelta al cuarto. Mañana se repite, distinto.", chapter:"stay",
    img:"assets/img/day/Sleep-at-The-Gallery-Condesa.webp" }
];

const ROOMS = [
  { id:"studio", name:"The Studio", tagline:"For slow mornings.", num:"01",
    specs:[["32 m²","Superficie"],["2","Huéspedes"],["1","Cama king"]],
    desc:"Un solo espacio bien resuelto: cama, cocina compacta y una zona de estar que se convierte en escritorio.",
    art:"Sobre la cama, una pieza de ", artist:"Renata Off — técnica mixta, 2023.",
    bg:"var(--cempasuchil)", img:"assets/img/stay/studio/cover.jpg" },
  { id:"loft", name:"The Loft", tagline:"For staying a while.", num:"02",
    specs:[["54 m²","Superficie"],["3","Huéspedes"],["Doble altura","Sala"]],
    desc:"Dos niveles, cocina completa y una sala con doble altura que recibe la luz de la tarde.",
    art:"En el descanso de la escalera, una serie fotográfica de ", artist:"Iker Vicente — plata en gelatina, 2022.",
    bg:"var(--nopal)", img:"assets/img/stay/loft/cover.jpg" },
  { id:"corner", name:"The Corner", tagline:"For the view.", num:"03",
    specs:[["40 m²","Superficie"],["2","Huéspedes"],["Esquina","Ventanas"]],
    desc:"Ventanas en dos fachadas, justo sobre la esquina de Amsterdam.",
    art:"Frente a la cama, un óleo de ", artist:"Constanza Rangel — óleo sobre lino, 2024.",
    bg:"var(--magenta)", img:"assets/img/stay/corner/cover.jpg" }
];

function el(tag, attrs={}, html=""){ const e=document.createElement(tag); Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v)); if(html) e.innerHTML=html; return e; }

const revealObserver = new IntersectionObserver((entries)=>{ entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('in'); }); }, {threshold:.15});
document.querySelectorAll('.reveal').forEach(e=>revealObserver.observe(e));

const header = document.getElementById('siteHeader');
window.addEventListener('scroll', ()=>{ header.classList.toggle('scrolled', window.scrollY>40); }, {passive:true});

const chapterSections = ['stay','house','condesa'].map(id=>document.getElementById(id));
const chapterObserver = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      document.body.setAttribute('data-chapter', en.target.id);
      document.querySelectorAll('nav.chapters a').forEach(a=>a.classList.toggle('active', a.dataset.target===en.target.id));
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
    alt: `${m.label} — The Gallery Condesa`,
    loading: i===0 ? 'eager' : 'lazy',
    decoding: 'async',
    'data-index': i,
    onerror: 'this.remove()'
  });
  dayPhotoWrap.appendChild(img);
});

DAY_MOMENTS.forEach((m,i)=>{
  const step = el('button', {class:'day-step'+(i===0?' active':''), role:'tab', 'aria-selected': i===0?'true':'false', 'data-index':i}, `<span class="num">0${i+1}</span>${m.label}`);
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
  momentTitle.textContent=m.label; momentTag.textContent=m.tag;
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
  const tab = el('button', {class:'room-tab'+(i===0?' active':''), 'data-id':r.id}, r.name);
  tab.addEventListener('click', ()=>renderRoom(i,true));
  roomTabsEl.appendChild(tab);
});
function renderRoom(i, animate){
  const r = ROOMS[i];
  document.querySelectorAll('.room-tab').forEach((t,idx)=>t.classList.toggle('active', idx===i));
  roomContentEl.innerHTML = `
    <div class="room-visual" style="background:${r.bg};">
      <img class="room-photo" src="${r.img}" alt="${r.name}, The Gallery"
           loading="lazy" decoding="async"
           onload="this.classList.add('loaded')"
           onerror="this.remove()">
      <div class="roomnum">${r.num}</div>
      <span class="caption">${r.name}</span>
    </div>
    <div>
      <h3 class="room-name">${r.name}</h3>
      <p class="room-tagline">${r.tagline}</p>
      <div class="room-specs">${r.specs.map(([v,l])=>`<div><strong>${v}</strong>${l}</div>`).join('')}</div>
      <p class="room-desc">${r.desc}</p>
      <p class="room-art">${r.art}<em>${r.artist}</em></p>
      <span class="link-explore">Explorar espacio</span>
    </div>`;
  if(animate){ roomContentEl.style.opacity=0; requestAnimationFrame(()=>{ roomContentEl.style.transition='opacity .35s ease'; roomContentEl.style.opacity=1; }); }
}
renderRoom(0,false);

document.getElementById('bookForm').addEventListener('submit', e=>{ e.preventDefault(); document.getElementById('bookNote').style.display='block'; });
