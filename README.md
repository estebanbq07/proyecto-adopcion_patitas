# Patitas CR — Sitio de adopción

Proyecto estático sencillo para mostrar un catálogo de mascotas disponibles para adopción.

Características principales:
- Catálogo filtrable en `catalogo.html`.
- Formulario de solicitud en `registro.html` (la página se abre desde el botón "Solicitar adopción").
- Datos de mascotas en `data/mascotas.json` con fallback embebido en `catalogo.html`.
- Favoritos y selección de mascota guardados en `localStorage` (`patitas_favoritos`, `patitas_mascota_seleccionada`).

Cómo usar:
1. Abrí `index.html` en tu navegador para ver el sitio.
2. Si las imágenes o el `fetch` no cargan por abrir archivos locales, ejecutá un servidor local desde la carpeta del proyecto:

```bash
# Python 3
python -m http.server 8000

# Luego abrí http://localhost:8000 en tu navegador
```

Estructura principal:
- `index.html` — Página de inicio.
- `catalogo.html` — Catálogo de mascotas y filtros.
- `registro.html` — Formulario de solicitudes de adopción.
- `css/` — Estilos.
- `js/` — Lógica del frontend (`catalogo.js`, `main.js`, `gestion.js`).
- `data/mascotas.json` — Datos de mascotas.
- `Images/` — Imágenes utilizadas en el sitio.

Notas para desarrolladores:
- Para probar la selección de mascota desde el catálogo, hacé clic en "Solicitar adopción"; el script guarda la mascota seleccionada en `localStorage` y redirige a `registro.html`.
- Si necesitás actualizar los datos de ejemplo, editá `data/mascotas.json` o el bloque JSON embebido en `catalogo.html`.

Contacto
-Esteban Bogantes Quesada -Luis Diego Campos Murillo