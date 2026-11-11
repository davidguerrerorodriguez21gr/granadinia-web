# Informe de calidad · GranadinIA

Fecha: 10 de noviembre de 2026 · Versión revisada: compilación local (`npm run build` + `npm run preview`, http://localhost:4321) · Navegador de pruebas: Google Chrome con Playwright.

## Resumen

| Comprobación | Resultado |
|---|---|
| `astro build` | ✅ 0 errores, 0 avisos (5 páginas) |
| `astro check` (TypeScript) | ✅ 0 errores, 0 avisos, 0 sugerencias |
| Accesibilidad automática (axe-core 4) | ✅ **0 violaciones** de cualquier nivel en 40 combinaciones |
| Lighthouse móvil | ✅ **100 / 100 / 100 / 100** (Rendimiento, Accesibilidad, Buenas prácticas, SEO) |
| Validación HTML | ✅ 0 errores (html-validate). Nu HTML Checker: pendiente sobre la URL publicada, ver nota |
| Enlaces rotos | ✅ 157 enlaces en 5 páginas, 0 rotos. Externos (wa.me, Instagram, aepd.es) responden 200 |
| Recorrido con teclado | ✅ De «Saltar al contenido» al envío del formulario, en escritorio y móvil |
| Foco tapado por la cabecera o barra fija (2.4.11) | ✅ 0 casos, ni siquiera parciales |
| Cookies | ✅ 0 cookies |
| Peticiones a terceros | ✅ Ninguna: todo se sirve desde el propio dominio |
| Enlaces wa.me / tel: / mailto: | ✅ Bien codificados; tildes y eñes correctas |
| Revisión de textos (palabras prohibidas, cifras, testimonios) | ✅ Sin coincidencias |
| Interacciones (tarjetas, pestañas, calculadora, formulario, interruptores) | ✅ 30 comprobaciones superadas (más 16 de teclado, privacidad y enlaces) |

Para repetir todo: `npm run build && npm run preview` y, en otra terminal, `npm test`.

## 1. Compilación

```
astro build  → 5 page(s) built · 0 warnings
astro check  → Result (36 files): 0 errors · 0 warnings · 0 hints
```

Peso de la portada: HTML 34 KB comprimido (CSS incluido), **JavaScript total 2,8 KB comprimido** (límite marcado: 50 KB). Una sola fuente (Nunito variable, 39 KB, precargada). Foto de “Sobre mí” en WebP de 24–122 KB según pantalla, con carga diferida.

## 2. Accesibilidad automática (axe-core)

Script: `tests/accesibilidad.mjs`. Reglas: WCAG 2.0, 2.1 y 2.2 niveles A y AA, más buenas prácticas.

Combinaciones: 5 páginas (`/`, `/aviso-legal`, `/privacidad`, `/cookies`, 404) × móvil (375 px) y escritorio (1440 px) × con y sin `prefers-reduced-motion` × tema claro y oscuro = **40**. Antes de analizar, la página se recorre entera para que no quede contenido animado a medias.

**Resultado final: 0 violaciones.** Corregido durante la revisión:

| Problema encontrado | Gravedad | Arreglo |
|---|---|---|
| El logo del pie mostraba el lema dentro del enlace “GranadinIA, inicio” (2.5.3, etiqueta en el nombre) | Grave | El lema sale del enlace |
| Las tablas de privacidad y cookies se desplazaban sin poder alcanzarlas con el teclado | Grave | Región con nombre y `tabindex="0"` |
| `role="tabpanel"` sobre `<article>` | Menor | Paneles como `<div>` |

## 3. Lighthouse (móvil, simulación de 4G lenta)

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT | Peso total |
|---|---|---|---|---|---|---|---|---|
| Inicio | 100 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms | 77 KB |
| Aviso legal | 100 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms | 57 KB |

INP no se puede medir en laboratorio. El indicador equivalente (TBT) es 0 ms y todo el JavaScript se ejecuta en menos de 1 ms. Informes completos en `tests/resultados/lighthouse-*.report.html`. Conviene repetirlo sobre https://granadinia.es cuando esté publicada.

## 4. Validación HTML y enlaces

- **html-validate 11** (reglas recomendadas): **0 errores** en las 5 páginas. Corregido: los números de teléfono usan espacios que no se parten; se añadió un botón «Calcular» al formulario de la calculadora (todo formulario necesita botón de envío) y las regiones usan `<section>` nativo. Desactivada solo la regla `tel-non-breaking` dentro de los enlaces de llamada, porque se quejaba de los espacios entre palabras normales («Llamar al…», «(se abre el teléfono)»), no del número, que ya no se parte.
- **Nu HTML Checker (W3C):** no está instalado en el equipo (necesita Java) y no he querido enviar la web a un servicio externo antes de publicarla. **Pendiente** de pasarlo en la fase 6 sobre la URL pública: https://validator.w3.org/nu/?doc=https://granadinia.es/
- **Enlaces:** `tests/enlaces.mjs` revisa páginas, anclas (`#problema`…) y recursos: 157 enlaces, 0 rotos.

## 5. Recorrido con teclado

Script: `tests/teclado-y-privacidad.mjs`. Solo con el tabulador, Espacio y Enter:

1. **Tab** → «Saltar al contenido» (primer elemento enfocable). Enter lleva a `<main>`.
2. Logo → menú (Problema, Solución, Cómo funciona, Precios, Sobre mí, Preguntas, Contacto) → modo oscuro → «Escríbeme por WhatsApp». En móvil: logo → modo oscuro → menú hamburguesa (Esc cierra; el foco queda atrapado dentro mientras está abierto).
3. Hero: «Escríbeme por WhatsApp» → «Ver cómo funciona».
4. «¿Te suena?»: cuatro botones «Ver cómo se arregla» (Enter o Espacio despliega la solución debajo).
5. Solución: la pestaña activa recibe el foco; **flechas** arriba/abajo (o izquierda/derecha), Inicio y Fin cambian de pieza; Tab pasa al panel.
6. Calculadora: tres campos numéricos → «Calcular» → «Quiero dejar de perder clientes».
7. «Cuéntame tu negocio» → precios («Quiero una plaza», «Preguntar por el mantenimiento», «Pregúntame»).
8. Seis preguntas frecuentes (Enter o Espacio las abre).
9. Contacto: WhatsApp, Llamar, Correo → Nombre → Tipo de negocio → Localidad → ¿Qué te gustaría mejorar? → casilla de privacidad (Espacio) → enlace a la política → **«Enviar por WhatsApp» (Enter)** → se abre WhatsApp con el mensaje escrito.

Paradas: 44 en escritorio y 37 en móvil. **Foco visible en todas** (contorno de 3 px con halo, contraste ≥ 6,8:1). **Ninguna tapada**, ni del todo ni en parte, por la cabecera fija o la barra inferior: se usa `scroll-padding` y la barra inferior del móvil se aparta mientras escribes en un campo. Sin datos, el envío pone el foco en el primer campo con error, con el mensaje en texto y `aria-invalid`.

**Lectores de pantalla:** no puedo manejar VoiceOver ni NVDA desde aquí. He revisado el árbol de accesibilidad (nombres de botones y enlaces, estados `aria-expanded`, `aria-selected`, `aria-checked`, región `aria-live` de la calculadora y estado del formulario). **Pendiente de una pasada manual con VoiceOver** (Cmd + F5 en el Mac): recorrer el menú, una tarjeta, las pestañas, la calculadora y enviar el formulario.

## 6. Otras comprobaciones WCAG

| Criterio | Comprobación | Resultado |
|---|---|---|
| 1.4.10 Reflujo (320 px / zoom 400 %) | Sin scroll horizontal a 320 px, con y sin JS | ✅ |
| 1.4.12 Espaciado de texto | Interlineado 1,5, letras 0,12 em, palabras 0,16 em, párrafos 2 em, a 320 y 1280 px | ✅ Sin scroll ni texto cortado |
| 2.2.2 Pausar, detener, ocultar | Ninguna animación dura más de 5 s ni se repite en bucle; la del hero dura menos de 3 s y se ejecuta una vez | ✅ |
| 2.3.1 Destellos | Nada parpadea | ✅ |
| 2.3.3 / preferencias | `prefers-reduced-motion` e interruptor «Reducir animaciones» (se recuerda en `localStorage`) | ✅ |
| 2.5.8 Tamaño del objetivo | Botones y enlaces de navegación ≥ 44 × 44 px | ✅ |
| Sin JavaScript | Todo el contenido se lee; ningún texto empieza invisible | ✅ |

### Contrastes (calculados con la fórmula WCAG)

| Texto / fondo | Claro | Oscuro |
|---|---|---|
| Texto principal | 10,8:1 | 15,3:1 |
| Texto secundario | 7,6:1 | 11,1:1 |
| Enlaces | 6,8:1 | 10,2:1 |
| Botón principal | 6,8:1 | 8,1:1 |
| Botón WhatsApp (blanco sobre verde) | 5,3:1 | 5,3:1 |
| Mensajes de error | 7,5:1 | 8,6:1 |
| Marcadores [PENDIENTE] | 9,7:1 | 8,3:1 |
| Bordes de campos (componentes, ≥ 3:1) | 4,3:1 | 3,9:1 |

## 7. Cookies y terceros

Recorridas las 5 páginas, usados los interruptores de tema y de animaciones:

- **Cookies: 0.**
- **Dominios contactados:** solo `localhost` (en producción, solo `granadinia.es`). Sin Google Fonts, analítica, píxeles, iframes, mapas, vídeos ni CDN.
- **localStorage:** solo `granadinia-tema` y `granadinia-movimiento`, y únicamente si se pulsan esos botones (ver `/cookies`).

En las herramientas del navegador: pestaña **Aplicación → Cookies** vacía; pestaña **Red** solo con peticiones al propio dominio. Repetir sobre la URL publicada en la fase 6.

## 8. Enlaces de contacto

| Enlace | Texto decodificado |
|---|---|
| `https://wa.me/34746056620?text=Hola%20David%2C%20vengo…gustar%C3%ADa%20informaci%C3%B3n` | Hola David, vengo de la web de GranadinIA y me gustaría información |
| `https://wa.me/34746056620?text=…` (precios) | Hola David, me interesa una plaza de “Ningún cliente perdido” a precio fundador. |
| `https://wa.me/34746056620?text=…` (mantenimiento) | Hola David, me gustaría saber más sobre el mantenimiento mensual. |
| `https://wa.me/34746056620?text=…` (otros servicios) | Hola David, quería preguntarte por otros servicios de GranadinIA. |
| `tel:+34746056620` | +34 746 05 66 20 |
| `mailto:dguerrero@granadinia.es?subject=Consulta%20desde%20la%20web%20de%20GranadinIA` | Asunto: Consulta desde la web de GranadinIA |
| Formulario → WhatsApp | «Nombre: María José … ¿cómo lo hago?» (tildes, eñes y saltos de línea correctos) |

`hola@granadinia.es` no aparece en ninguna página.

## 9. Revisión de textos

```
grep -rniE "\bCRM\b|salesforce|software a medida|desarrollo de (software|aplicaciones)|aplicaciones a medida|\+ ?[0-9]+ (negocios|clientes)|[0-9]+ ?%" src/
→ sin coincidencias en textos (solo valores de CSS)
```

Cifras visibles en la portada (todas reales o decididas por David, ninguna estadística inventada): 14 días · llamada de 20 minutos · 30 minutos de formación · 190 € + IVA para los 5 primeros negocios · después 350–450 € · quedan 5 de 5 plazas (contador manual) · mantenimiento desde 99 €/mes + IVA · te contesto en menos de 24 horas · horas de ejemplo en el chat ilustrado (18:00, 11 de la noche).

**Testimonios:** ninguno. El componente existe pero no se muestra mientras `TESTIMONIOS` esté vacío.

## 10. Capturas

En `tests/capturas/` (no se suben al repositorio; se regeneran con `node tests/capturas.mjs / seccion --completa`):

- `seccion-NN-<sección>-<360|768|1440>-<claro|oscuro>.png`: cada sección de la portada, `deviceScaleFactor: 2`.
- `aviso-legal-*`, `privacidad-*`, `cookies-*`, `404-*`: resto de páginas en los mismos anchos y temas.

## Pendiente para las fases siguientes

- Nu HTML Checker y Lighthouse sobre https://granadinia.es.
- Comprobación de cookies y red sobre la URL publicada.
- Pasada manual con VoiceOver.
