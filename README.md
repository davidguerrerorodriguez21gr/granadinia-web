# GranadinIA · web

Web de [GranadinIA](https://granadinia.es), marketing e IA para negocios de Granada. Hecha con [Astro](https://astro.build), 100 % estática, sin cookies ni rastreadores, y publicada gratis en GitHub Pages.

> ⚠️ **Los textos legales son un borrador.** Revisarlos con un gestor o abogado antes de publicar, y completar los datos del titular cuando esté dado de alta.

## Pendientes

| Qué | Dónde se cambia |
|---|---|
| NIF | `src/config/sitio.ts` → `NIF` |
| Domicilio a efectos de notificaciones | `src/config/sitio.ts` → `DOMICILIO_NOTIFICACIONES` |
| Datos de registro (si los hubiera) | `src/config/sitio.ts` → `DATOS_REGISTRO` |
| Plazo de conservación de consultas sin contratación | `src/pages/privacidad.astro` (apartado 5) |
| Gestoría o programa de facturación (encargado del tratamiento) | `src/pages/privacidad.astro` (apartado 6) |
| Transferencias internacionales: revisión legal | `src/pages/privacidad.astro` (apartado 6) |
| Confirmar verificación en dos pasos en correo y WhatsApp | `src/pages/privacidad.astro` (apartado 8) |
| Revisión completa de aviso legal, privacidad y cookies | `src/pages/` |
| Testimonios reales (con permiso por escrito) | `src/config/sitio.ts` → `TESTIMONIOS`. Mientras esté vacío, la sección no aparece |

Busca en el código `PENDIENTE`, `CONFIRMAR` o `REVISAR` para encontrarlos todos. En la web se ven resaltados en amarillo.

## Editar la web

- **Datos, precios, plazas e interruptores** (`MOSTRAR_PRECIOS`, `PLAZAS_FUNDADOR_LIBRES`…): `src/config/sitio.ts`
- **Textos de todas las secciones**: `src/content/textos.ts`
- **Foto de “Sobre mí”**: sustituye `src/assets/david.png`

Para verla en tu ordenador mientras editas:

```bash
npm install
npm run dev
```

y abre http://localhost:4321.

## Scripts de apoyo

- `node scripts/generar-marca.mjs`: vectoriza el icono y genera favicon e iconos desde `marca-origen/` (no se sube al repositorio).
- `node scripts/generar-og.mjs`: genera la imagen para redes `public/og-image.png`.
- `node scripts/quitar-fondo.mjs`: quita el fondo de la foto (necesita `npm i --no-save @imgly/background-removal-node`).
- `node tests/interacciones.mjs` y `node tests/capturas.mjs / seccion --completa`: pruebas y capturas (con `npm run build && npm run preview` en marcha).

## Después de publicar (SEO local)

- Dar de alta la web en **Google Search Console** con verificación por **registro TXT en DonDominio** (no toca el correo).
- Crear el **Perfil de Empresa de Google** de GranadinIA y enlazarlo a https://granadinia.es.
- Comprobar los datos estructurados en la [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results) de Google.
