# GranadinIA · web

Web de **[GranadinIA](https://granadinia.es)**, marketing e IA para negocios de Granada.

- **Dirección:** https://granadinia.es (también llevan ahí `www.granadinia.es`, `granadinia.com` y `www.granadinia.com`).
- **Cómo está hecha:** [Astro](https://astro.build), 100 % estática, sin cookies, sin rastreadores y sin nada cargado desde otras webs.
- **Dónde está alojada:** GitHub Pages, gratis. Se publica sola cada vez que subes un cambio.

> ⚠️ **Los textos legales son un borrador.** Antes de darle difusión a la web, que los revise un gestor o abogado y completa los datos que faltan (ver [Pendientes](#pendientes)).

---

## 1. Cambiar textos, precios y datos

Casi todo se cambia en **dos archivos**:

| Quiero cambiar… | Archivo | Qué buscar |
|---|---|---|
| Teléfono, correo, WhatsApp, Instagram | `src/config/sitio.ts` | `TELEFONO`, `CORREO_CONTACTO`… |
| Precio fundador, precio normal, mantenimiento | `src/config/sitio.ts` | `PRECIO_FUNDADOR`, `PRECIO_NORMAL`, `MANTENIMIENTO_DESDE` |
| **Plazas fundador que quedan libres** | `src/config/sitio.ts` | `PLAZAS_FUNDADOR_LIBRES` (ahora `5`) |
| Mostrar u ocultar los precios | `src/config/sitio.ts` | `MOSTRAR_PRECIOS: true` / `false` |
| Qué incluye el mantenimiento | `src/config/sitio.ts` | `MANTENIMIENTO_INCLUYE` |
| NIF, domicilio, datos de registro | `src/config/sitio.ts` | `NIF`, `DOMICILIO_NOTIFICACIONES`, `DATOS_REGISTRO` |
| Testimonios (cuando los tengas) | `src/config/sitio.ts` | `TESTIMONIOS` (vacío = la sección no aparece) |
| **Cualquier texto de la página** (titulares, preguntas frecuentes…) | `src/content/textos.ts` | Busca la frase que quieras cambiar |
| Foto de “Sobre mí” | `src/assets/david.png` | Sustituye el archivo por otro con el mismo nombre |
| Textos legales | `src/pages/aviso-legal.astro`, `privacidad.astro`, `cookies.astro` | |

**Truco:** abre el archivo, usa *Buscar* (⌘ + F) con un trozo del texto que ves en la web, cámbialo **dentro de las comillas** y guarda. No borres las comillas ni las comas del final.

**Ejemplo: se ha ocupado una plaza fundador.** En `src/config/sitio.ts` cambia

```ts
PLAZAS_FUNDADOR_LIBRES: 5,
```

por `4`, guarda y publica (ver siguiente apartado).

## 2. Ver los cambios en tu ordenador antes de publicar

En la terminal, dentro de la carpeta del proyecto:

```bash
npm run dev
```

Abre http://localhost:4321. Cada vez que guardes un archivo, la página se actualiza sola. Para pararlo: `Ctrl + C`.

(La primera vez en un ordenador nuevo, antes ejecuta `npm install`.)

## 3. Publicar

Publicar es **subir los cambios a GitHub**; la web se reconstruye y se actualiza sola en 1–2 minutos:

```bash
git add -A
```

```bash
git commit -m "Actualiza plazas fundador"
```

```bash
git push
```

Puedes ver cómo va en la pestaña **Actions** del repositorio: https://github.com/davidguerrerorodriguez21gr/granadinia-web/actions (círculo verde = publicada; cruz roja = algo ha fallado y la web sigue con la versión anterior, no se rompe).

> Si `git` o `gh` te dicen “command not found”: `gh` está en `~/.local/bin/gh`.

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
| Revisión completa de aviso legal, privacidad y cookies por un profesional | `src/pages/` |
| Testimonios reales (solo con permiso por escrito) | `src/config/sitio.ts` → `TESTIMONIOS` |
| Repaso a mano con un lector de pantalla (VoiceOver) | — |

Busca en el código `PENDIENTE`, `CONFIRMAR` o `REVISAR` para encontrarlos todos. En la web se ven **resaltados en amarillo** a propósito, para que no se olviden.

## 4. Siguientes pasos para salir en Google (SEO local)

1. **Google Search Console** (gratis) → https://search.google.com/search-console
   - Añadir propiedad de tipo **Dominio** → `granadinia.es`.
   - Google te dará un registro **TXT** (`google-site-verification=…`). Añádelo en DonDominio → granadinia.es → Zona DNS, como **registro nuevo**. No toca el correo.
   - Una vez verificado: *Sitemaps* → envía `https://granadinia.es/sitemap-index.xml`.
2. **Perfil de Empresa de Google** (la ficha de Google Maps) → https://business.google.com
   - Nombre: GranadinIA. Categoría: agencia de marketing o similar. Zona de servicio: Granada y alrededores (si no atiendes en un local, oculta la dirección).
   - Web: `https://granadinia.es`. Mismo teléfono que en la web: `746 05 66 20`.
3. Comprobar los datos estructurados en la [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results) con `https://granadinia.es`.
4. Pide a tus primeros clientes **reseñas en Google** (reales, nunca compradas) y, con su permiso, úsalas como testimonios.

## 5. Dominios y DNS — lo que NO hay que tocar

Todo está documentado en [`docs/dns-antes.txt`](docs/dns-antes.txt) y [`docs/dns-despues.txt`](docs/dns-despues.txt).

**granadinia.es** (DNS en DonDominio):

| Registro | Para qué | ¿Se puede borrar? |
|---|---|---|
| MX `mx.zoho.eu`, `mx2.zoho.eu`, `mx3.zoho.eu` | Recibir correo | ⛔ No |
| TXT `v=spf1 …`, `zoho-verification=…`, `zmail._domainkey` | Que tu correo no vaya a spam | ⛔ No |
| A `185.199.108–111.153` y AAAA `2606:50c0:8000–8003::153` | La web (GitHub Pages) | ⛔ No |
| CNAME `www` → `davidguerrerorodriguez21gr.github.io` | La web con www | ⛔ No |
| TXT `_github-pages-challenge-davidguerrerorodriguez21gr` | Prueba de que el dominio es tuyo en GitHub | ⛔ No, nunca |

**granadinia.com** (DNS en Cloudflare, plan gratuito; servidores `rajeev` y `vida.ns.cloudflare.com`): dos registros A `192.0.2.1` con la nube naranja y una regla de redirección `http*://*granadinia.com/*` → `https://granadinia.es/${3}` (301). Sin esto, la .com dejaría de redirigir.

**Recomendación opcional para más adelante:** añadir un registro **DMARC** (`_dmarc`) a granadinia.es mejora la entrega del correo. Se hace en Zoho Mail + DonDominio; conviene hacerlo con calma y probar el correo después.

## 6. Calidad comprobada en la web real (11/11/2026)

- **Lighthouse:** 100 / 100 / 100 / 100 en móvil y en ordenador (rendimiento, accesibilidad, buenas prácticas, SEO).
- **Accesibilidad:** 0 problemas graves con axe en 40 combinaciones (páginas × móvil/ordenador × modo claro/oscuro × animaciones). Recorrido completo con teclado, foco siempre visible.
- **Privacidad:** 0 cookies, 0 peticiones a otras webs. Solo se guardan en el navegador las preferencias de tema y animaciones.
- **HTML:** válido. El validador del W3C solo protesta por funciones modernas que todavía no conoce (animaciones al hacer scroll y `pathLength` en SVG 2), que los navegadores sí entienden.
- **Enlaces:** 157 revisados, 0 rotos. HTTPS con certificado de Let's Encrypt que GitHub renueva solo.

Detalles en [`docs/informe-calidad.md`](docs/informe-calidad.md).

## 7. Para quien toque el código

```
src/
  config/sitio.ts      datos, precios e interruptores
  content/textos.ts    todos los textos
  components/          una pieza por sección (Hero, Precios, Contacto…)
  layouts/             plantilla común y plantilla de páginas legales
  pages/               portada, 404 y páginas legales
  styles/              colores, tipografía y estilos comunes
public/                favicon, imagen para redes, CNAME, robots.txt, fuente Nunito
scripts/               generadores de marca, imagen OG y recorte de foto
tests/                 pruebas automáticas
.github/workflows/     publicación automática en GitHub Pages
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Web en local con recarga automática |
| `npm run build` | Genera la web final en `dist/` |
| `npm run preview` | Sirve `dist/` en http://localhost:4321 |
| `npm run check` | Revisa errores de TypeScript |
| `npm test` | Todas las pruebas (necesita `npm run build` y `npm run preview` en marcha) |

Scripts de apoyo:

- `node scripts/generar-marca.mjs`: genera favicon e iconos desde `marca-origen/` (carpeta privada, no se sube).
- `node scripts/generar-og.mjs`: genera `public/og-image.png` (la imagen que sale al compartir el enlace).
- `node scripts/quitar-fondo.mjs`: quita el fondo de la foto (necesita `npm i --no-save @imgly/background-removal-node`).
- `node tests/capturas.mjs`: capturas de cada sección en `tests/capturas/`.

Reglas del proyecto: nada de Google Analytics, píxeles, fuentes o scripts de terceros; nada inventado (testimonios, cifras, logos); nunca subir claves, datos personales ni `marca-origen/`.
