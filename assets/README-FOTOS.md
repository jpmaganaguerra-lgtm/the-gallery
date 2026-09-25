# Guía de fotos — THE GALLERY

Sube cada foto exactamente con el nombre y en la carpeta indicados. El sitio ya está
conectado a estas rutas: en cuanto subas el archivo con el nombre correcto, aparece
automáticamente — no requiere tocar código. Mientras el archivo no exista, esa zona
muestra el bloque de color de respaldo (nunca se rompe el diseño).

## Formato recomendado
- **Formato:** `.jpg` (calidad 75–85) o `.webp` — evita `.png` para fotografía.
- **Peso objetivo:** bajo 300 KB por imagen ya comprimida.
- **Orientación:** vertical (retrato) para Stay, horizontal para House/Condesa.

---

## `assets/img/hero/`
Ya está poblada con la foto del patio que enviaste (`hero-courtyard-900/1600/2400.webp`).
Si quieres cambiarla más adelante, sustituye los tres tamaños con los mismos nombres.

## `assets/img/day/`
Ya conectada — 6 fotos, una por momento de "A Day at The Gallery". Nombres exactos usados
en el código (horizontal, 16:10 aprox.):
- `Wake-up-at-The-Gallery-Condesa.webp`
- `Make-Coffee-at-The-Gallery-Condesa.webp`
- `Get-Out-at-The-Gallery-Condesa.webp`
- `Come-Back-to-The-Gallery-Condesa.webp`
- `Have-a-drink-at-The-Gallery-Condesa.webp`
- `Sleep-at-The-Gallery-Condesa.webp`

## `assets/img/stay/studio/` — `assets/img/stay/loft/` — `assets/img/stay/corner/`
Cada habitación ahora es una galería (retrato, 4:5), no una sola foto. Sube hasta 4
fotos por habitación, con estos nombres exactos dentro de su carpeta:
- `cover.jpg` (obligatoria, la primera que se ve)
- `2.jpg`, `3.jpg`, `4.jpg` (opcionales — si no existen, esos puntos de la galería
  simplemente no aparecen, no rompen nada)

## `assets/img/house/cafe/cover.jpg`
## `assets/img/house/bikes/cover.jpg`
## `assets/img/house/common/cover.jpg`
Una foto por tarjeta de "The House" (horizontal). Se muestran como textura semitransparente
detrás del color — no reemplazan el bloque, lo enriquecen.

## `assets/img/blog/`
Portadas de los posts de "Living Condesa". Se suben desde el backoffice en `/admin`,
en el campo "Foto de portada" de cada post — **esa misma foto ya es automáticamente
el hero de la página del artículo** (si el post tiene página propia), no hace falta
tocar ningún HTML. Los dos artículos actuales ya están conectados a esto:
- `guia-ruido-condesa.jpg`
- `donde-hospedarte-condesa.jpg`

(Los nombres de archivo de arriba son solo referencia — si subes la foto desde el
backoffice con otro nombre, funciona igual: la página siempre usa lo que diga
`content/posts.json`.)

## `assets/logo/`
Logotipo de The Gallery en PNG con fondo transparente, variante oscura y variante clara,
más favicon (32×32 y 180×180 para iOS).
