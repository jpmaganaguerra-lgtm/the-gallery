/* ============================================================
   TEXTOS DEL SITIO · EN / ES
   Un solo archivo con los dos idiomas lado a lado. Para cambiar el
   wording de la home, del menú o del panel de reserva, edita aquí
   el `en` o el `es` de la clave que quieras.
   - {llaves} son datos que el sitio rellena solo (ej. {name}, {n}).
   - Las claves con HTML (<span>, <strong>) se usan con data-i18n-html.
   Los posts del blog viven en content/posts.json (backoffice /admin).
   Los artículos largos son páginas separadas por idioma
   (living-condesa/ en español, living-condesa/en/ en inglés).
   ============================================================ */
window.STRINGS = {

  /* ---------- Meta ---------- */
  'meta.title': { en: 'THE GALLERY — Stay in the middle of everything', es: 'THE GALLERY — Quédate en el centro de todo' },
  'meta.desc':  { en: 'A design-forward stay in the heart of Condesa. Apartments, a café downstairs, bikes, and a neighborhood you actually get to live in.',
                  es: 'Una estancia de diseño en el corazón de la Condesa. Departamentos, un café en la planta baja, bicicletas y un barrio que de verdad se vive.' },

  /* ---------- Header y menú ---------- */
  'hdr.book':    { en: 'Book here', es: 'Reserva aquí' },
  'burger.open': { en: 'Open menu', es: 'Abrir menú' },
  'burger.close':{ en: 'Close menu', es: 'Cerrar menú' },
  'lang.aria':   { en: 'Language', es: 'Idioma' },
  'menu.aria':   { en: 'Main menu', es: 'Menú principal' },
  'menu.stay':   { en: 'Stay', es: 'Quédate' },
  'menu.house':  { en: 'Your home', es: 'Tu casa' },
  'menu.condesa':{ en: 'Living Condesa', es: 'Viviendo La Condesa' },
  'menu.book':   { en: 'Book', es: 'Reserva' },

  /* ---------- Hero ---------- */
  'hero.h1':  { en: 'Stay in the middle <span>of everything.</span>', es: 'Quédate en el centro <span>de todo.</span>' },
  'hero.alt': { en: 'The Gallery courtyard, with bamboo, bicycles and café tables', es: 'Patio interior de The Gallery, con bambú, bicicletas y mesas de café' },

  /* ---------- 01 · El día ---------- */
  'day.kicker': { en: '01 — The day', es: '01 — El día' },
  'day.h2':     { en: 'A day at The Gallery.', es: 'Un día en The Gallery.' },
  'day.p':      { en: "We don't sell amenities. We sell how a full day here feels, from the moment you open your eyes until you close them again.",
                  es: 'No vendemos amenidades. Vendemos cómo se siente un día completo aquí, desde que abres los ojos hasta que vuelves a cerrarlos.' },
  'day.aria':   { en: 'Moments of the day — hover to switch', es: 'Momentos del día — pasa el cursor para cambiar' },
  'day.alt':    { en: '{label} — The Gallery Condesa', es: '{label} — The Gallery Condesa' },
  'day.1.label':{ en: 'Wake up', es: 'Despierta' },
  'day.1.tag':  { en: 'Natural light through tall windows. No alarms.', es: 'Luz natural entrando por ventanas altas. Sin alarmas.' },
  'day.2.label':{ en: 'Make coffee', es: 'Un cafecito' },
  'day.2.tag':  { en: 'You head down to the café. The barista already knows how you take it.', es: 'Bajas al café. El barista ya sabe cómo te gusta.' },
  'day.3.label':{ en: 'Go out', es: 'Hora de salir' },
  'day.3.tag':  { en: 'Grab a bike. Parque México is five minutes away.', es: 'Tomas una bici. Parque México a cinco minutos.' },
  'day.4.label':{ en: 'Come back', es: 'Regresa' },
  'day.4.tag':  { en: 'Work for an hour at the long table in the common room.', es: 'Trabajas una hora en la mesa larga de la sala común.' },
  'day.5.label':{ en: 'Have a drink', es: '¿Algo de tomar?' },
  'day.5.tag':  { en: 'Mezcal on a terrace around the corner, before the sun goes down.', es: 'Mezcal en una terraza a la vuelta, antes de que anochezca.' },
  'day.6.label':{ en: 'Sleep', es: 'Descansa' },
  'day.6.tag':  { en: 'Back to your room. Tomorrow repeats itself, differently.', es: 'De vuelta al cuarto. Mañana se repite, distinto.' },

  /* ---------- Franjas ---------- */
  'strip1.big':   { en: 'Take a bike. Get lost.', es: 'Toma una bici. Piérdete.' },
  'strip1.small': { en: 'Condesa is better on two wheels →', es: 'Condesa se disfruta mejor en dos ruedas →' },
  'strip2.big':   { en: 'Coffee, therefore I am.', es: 'Café, luego existo.' },
  'strip2.small': { en: 'Start the day on the right foot →', es: 'Empieza el día con el pie derecho →' },

  /* ---------- 02 · Stay ---------- */
  'stay.kicker': { en: '02 — Stay', es: '02 — Quédate' },
  'stay.h2':     { en: 'Three ways to stay.', es: 'Tres formas de quedarte.' },
  'stay.p':      { en: 'Each space is designed for a different kind of stay, from a weekend escape to living a month in Condesa.',
                   es: 'Cada espacio está pensado para una estancia distinta, desde una escapada de fin de semana hasta vivir un mes en Condesa.' },
  'stay.btn':    { en: 'Explore space', es: 'Explorar espacio' },
  'stay.photoAlt':{ en: '{name}, The Gallery', es: '{name}, The Gallery' },
  'stay.dotAria':{ en: 'Photo {n} of {name}', es: 'Foto {n} de {name}' },

  'room.studio.name': { en: 'The Studio', es: 'Estudio' },
  'room.studio.tag':  { en: 'For slow mornings.', es: 'Para mañanas lentas.' },
  'room.studio.desc': { en: 'One well-resolved space: bed, compact kitchen, and a sitting area that turns into a desk.',
                        es: 'Un solo espacio bien resuelto: cama, cocina compacta y una zona de estar que se convierte en escritorio.' },
  'room.studio.s1v': { en: '32 m²', es: '32 m²' },   'room.studio.s1l': { en: 'Size', es: 'Superficie' },
  'room.studio.s2v': { en: '2', es: '2' },           'room.studio.s2l': { en: 'Guests', es: 'Huéspedes' },
  'room.studio.s3v': { en: '1', es: '1' },           'room.studio.s3l': { en: 'King bed', es: 'Cama king' },

  'room.loft.name': { en: 'The Loft', es: 'Loft' },
  'room.loft.tag':  { en: 'For staying a while.', es: 'Para quedarte más.' },
  'room.loft.desc': { en: 'Two levels, a full kitchen and a double-height living room that catches the afternoon light.',
                      es: 'Dos niveles, cocina completa y una sala con doble altura que recibe la luz de la tarde.' },
  'room.loft.s1v': { en: '54 m²', es: '54 m²' },     'room.loft.s1l': { en: 'Size', es: 'Superficie' },
  'room.loft.s2v': { en: '3', es: '3' },             'room.loft.s2l': { en: 'Guests', es: 'Huéspedes' },
  'room.loft.s3v': { en: 'Double height', es: 'Doble altura' }, 'room.loft.s3l': { en: 'Living room', es: 'Sala' },

  'room.corner.name': { en: 'The Corner', es: 'Esquinado' },
  'room.corner.tag':  { en: 'Discover the quiet.', es: 'Descubre la quietud.' },
  'room.corner.desc': { en: 'Windows on two façades, right on the corner.', es: 'Ventanas en dos fachadas, justo en la esquina.' },
  'room.corner.s1v': { en: '40 m²', es: '40 m²' },   'room.corner.s1l': { en: 'Size', es: 'Superficie' },
  'room.corner.s2v': { en: '2', es: '2' },           'room.corner.s2l': { en: 'Guests', es: 'Huéspedes' },
  'room.corner.s3v': { en: 'Corner', es: 'Esquina' }, 'room.corner.s3l': { en: 'Windows', es: 'Ventanas' },

  /* ---------- 03 · The House / Tu casa ---------- */
  'house.kicker': { en: '03 — Your home', es: '03 — Tu casa' },
  'house.h2':     { en: 'Great coffee downstairs and bikes at the door. The possibilities are endless.',
                    es: 'Un delicioso café abajo y las bicis en la puerta. Las posibilidades sobran.' },
  'house.p':      { en: 'What makes The Gallery feel like home, not a hotel.', es: 'Lo que hace que The Gallery se sienta como casa y no como hospedaje.' },
  'house.1.tag':  { en: 'Coffee', es: 'Café' },
  'house.1.h3':   { en: 'Specialty coffee, open to the street', es: 'Café de autor, abierto a la calle' },
  'house.1.p':    { en: "There's an excellent specialty coffee option at the front desk, or ask our staff for a delicious cup of freshly brewed coffee.",
                    es: 'Hay una excelente opción de café de autor en la recepción o bien solicita a nuestro personal una deliciosa taza de nuestro café recién hecho.' },
  'house.2.tag':  { en: 'Bikes', es: 'Bicis' },
  'house.2.h3':   { en: 'Condesa is best explored on two wheels', es: 'Condesa se recorre mejor en dos ruedas' },
  'house.2.p':    { en: 'Grab a bike on your way out. Parque México is five minutes away, Roma ten, Chapultepec fifteen.',
                    es: 'Toma una bici al salir. Parque México a cinco minutos, Roma a diez, Chapultepec a quince.' },
  'house.3.tag':  { en: 'Common areas', es: 'Espacios comunes' },
  'house.3.h3':   { en: 'A place to work, not just to sleep', es: 'Un lugar para trabajar, no solo para dormir' },
  'house.3.p':    { en: 'Long tables, good light, Wi-Fi that actually works.', es: 'Mesas largas, buena luz, wifi que de verdad funciona.' },

  /* ---------- 04 · Living Condesa ---------- */
  'lc.kicker': { en: '04 — Living Condesa', es: '04 — Viviendo La Condesa' },
  'lc.h2':     { en: 'The neighborhood, told by those who live it.', es: 'El barrio contado por quien lo vive.' },
  'lc.p':      { en: "Short stories about Condesa, the art you'll find at THE GALLERY, what to do, where to go, what's worth it and what isn't.",
                 es: 'Historias cortas sobre Condesa, el arte que podrás encontrar en THE GALLERY, qué hacer, a donde ir, qué sí vale la pena, qué no vale la pena.' },
  'lc.aria':   { en: 'Living Condesa posts', es: 'Posts de Living Condesa' },
  'lc.close':  { en: 'Close', es: 'Cerrar' },
  'lc.empty':  { en: 'No posts published yet.', es: 'Aún no hay posts publicados.' },

  /* ---------- 05 · Book ---------- */
  'book.kicker': { en: '05 — Book', es: '05 — Reserva' },
  'book.h2':     { en: 'Book your stay in Condesa.', es: 'Reserva tu estancia en Condesa.' },
  'book.p':      { en: 'A few clicks away from your next adventure.', es: 'A unos cuantos clics de tu siguiente aventura.' },
  'book.l1':     { en: 'Check-in', es: 'Llegada' },
  'book.l2':     { en: 'Check-out', es: 'Salida' },
  'book.l3':     { en: 'Guests', es: 'Huéspedes' },
  'book.btn':    { en: 'See availability', es: 'Ver disponibilidad' },
  'book.err1':   { en: 'Select a check-in and a check-out date.', es: 'Selecciona fecha de llegada y de salida.' },
  'book.err2':   { en: 'Check-out must be after check-in.', es: 'La salida debe ser después de la llegada.' },
  'book.ok':     { en: 'Opening availability…', es: 'Abriendo disponibilidad…' },

  /* ---------- Footer ---------- */
  'foot.addr':    { en: 'Francisco Márquez 149, Condesa, Mexico City.', es: 'Francisco Márquez 149, Condesa, Ciudad de México.' },
  'foot.explore': { en: 'Explore', es: 'Explorar' },
  'foot.stay':    { en: 'Stay', es: 'Quédate' },
  'foot.house':   { en: 'Your home away from home', es: 'Tu casa lejos de casa' },
  'foot.condesa': { en: 'Living Condesa', es: 'Viviendo La Condesa' },
  'foot.contact': { en: 'Contact', es: 'Contacto' },
  'foot.book':    { en: 'Book', es: 'Reservar' },

  /* ---------- Panel de reserva ---------- */
  'drw.title':  { en: 'Your stay', es: 'Tu estancia' },
  'drw.close':  { en: 'Close', es: 'Cerrar' },
  'drw.in':     { en: 'Check-in', es: 'Llegada' },
  'drw.out':    { en: 'Check-out', es: 'Salida' },
  'drw.pick':   { en: 'Choose date', es: 'Elige fecha' },
  'drw.pickIn': { en: 'Choose your check-in', es: 'Elige la llegada' },
  'drw.pickOut':{ en: 'Choose your check-out', es: 'Elige la salida' },
  'drw.night':  { en: 'night', es: 'noche' },
  'drw.nights': { en: 'nights', es: 'noches' },
  'drw.clear':  { en: 'Clear', es: 'Borrar' },
  'drw.prev':   { en: 'Previous month', es: 'Mes anterior' },
  'drw.next':   { en: 'Next month', es: 'Mes siguiente' },
  'drw.guests': { en: 'Guests', es: 'Huéspedes' },
  'drw.guest1': { en: 'guest', es: 'huésped' },
  'drw.guestN': { en: 'guests', es: 'huéspedes' },
  'drw.addG':   { en: 'Add a guest', es: 'Agregar un huésped' },
  'drw.remG':   { en: 'Remove a guest', es: 'Quitar un huésped' },
  'drw.more':   { en: 'More than {n}?', es: '¿Más de {n}?' },
  'drw.write':  { en: 'Write to us', es: 'Escríbenos' },
  'drw.go':     { en: 'See availability', es: 'Ver disponibilidad' },
  'drw.msg':    { en: "You'll see availability and rates in the booking engine.", es: 'Verás disponibilidad y tarifas en el motor de reservas.' }
};
