/**
 * DATOS DEL SITIO — GranadinIA
 * ----------------------------------------------------------------
 * Este es el único archivo que necesitas tocar para cambiar datos
 * de contacto, precios, plazas o interruptores de la web.
 *
 * Los textos marcados con [PENDIENTE: …] o [CONFIRMAR …] se ven
 * resaltados en la web a propósito, para que no se te olviden.
 */

export const sitio = {
  // ── Marca ────────────────────────────────────────────────────
  NOMBRE_MARCA: 'GranadinIA',
  DESCRIPTOR: 'Marketing e IA para negocios de Granada',
  LEMA_LOGO: 'Automatizaciones e IA para tu negocio',

  // ── Dominios ─────────────────────────────────────────────────
  DOMINIO_PRINCIPAL: 'https://granadinia.es',
  DOMINIO_SECUNDARIO: 'granadinia.com', // redirige con 301 a granadinia.es

  // ── Contacto (lo único público) ─────────────────────────────
  CORREO_CONTACTO: 'dguerrero@granadinia.es',
  TELEFONO_VISIBLE: '746 05 66 20',
  TELEFONO_E164: '+34746056620',
  WHATSAPP_URL: 'https://wa.me/34746056620',
  WHATSAPP_MENSAJE: 'Hola David, vengo de la web de GranadinIA y me gustaría información',
  CORREO_ASUNTO: 'Consulta desde la web de GranadinIA',
  INSTAGRAM_URL: 'https://www.instagram.com/granadinia/',
  TIEMPO_RESPUESTA: 'Te contesto en menos de 24 horas',

  // ── Responsable y ubicación ─────────────────────────────────
  RESPONSABLE: 'David Guerrero Rodríguez',
  UBICACION: 'Maracena (Granada)',
  LOCALIDAD: 'Maracena',
  CODIGO_POSTAL: '18200',
  PROVINCIA: 'Granada',
  ZONA_PRESENCIAL: [
    'Granada',
    'Maracena',
    'Albolote',
    'Peligros',
    'Atarfe',
    'Pulianas',
    'Jun',
    'Armilla',
    'Las Gabias',
    'Churriana de la Vega',
    'Ogíjares',
    'La Zubia',
    'Santa Fe',
  ],

  // ── Datos legales (aún no existen) ──────────────────────────
  NIF: '[PENDIENTE: NIF]',
  DOMICILIO_NOTIFICACIONES: '[PENDIENTE: domicilio a efectos de notificaciones]',
  DATOS_REGISTRO: '[PENDIENTE: datos de registro, si los hubiera]',

  // ── Oferta y precios ────────────────────────────────────────
  MOSTRAR_PRECIOS: true, // pon false para ocultar toda la sección de precios
  PRECIO_FUNDADOR: 190,
  PRECIO_NORMAL: '350–450 €',
  PLAZAS_FUNDADOR_TOTAL: 5,
  /** Actualízalo a mano cada vez que entre un negocio fundador. */
  PLAZAS_FUNDADOR_LIBRES: 5,
  IVA: '+ IVA',
  MANTENIMIENTO_DESDE: 99,
  MANTENIMIENTO_INCLUYE: [
    'Todo el soporte que necesites, sin pagar aparte',
    'Cambios y ajustes en lo que ya tienes instalado',
    'Control de seguridad y actualizaciones',
  ],
  MANTENIMIENTO_NOTA:
    'Sin mantenimiento, cualquier cambio posterior se presupuesta aparte.',
  PERMANENCIA: 'Sin permanencia',
  DIAS_INSTALACION: 14,

  // ── Prueba social ───────────────────────────────────────────
  /** Solo testimonios reales, con permiso. Mientras esté vacío, la sección no se muestra. */
  TESTIMONIOS: [] as { nombre: string; negocio: string; localidad: string; texto: string }[],

  // ── Redes y repositorio ─────────────────────────────────────
  GITHUB_USUARIO: 'davidguerrerorodriguez21gr',
  REPO: 'granadinia-web',
} as const;

/** Enlace de WhatsApp con el mensaje ya escrito (tildes y eñes bien codificadas). */
export const whatsappConTexto = (texto: string = sitio.WHATSAPP_MENSAJE) =>
  `${sitio.WHATSAPP_URL}?text=${encodeURIComponent(texto)}`;

export const telefonoHref = `tel:${sitio.TELEFONO_E164}`;

/** Teléfono para mostrar, con espacios que no se parten al cambiar de línea. */
export const telefonoTexto = sitio.TELEFONO_VISIBLE.replace(/ /g, '\u00a0');

export const correoHref = (asunto: string = sitio.CORREO_ASUNTO, cuerpo?: string) =>
  `mailto:${sitio.CORREO_CONTACTO}?subject=${encodeURIComponent(asunto)}${
    cuerpo ? `&body=${encodeURIComponent(cuerpo)}` : ''
  }`;
