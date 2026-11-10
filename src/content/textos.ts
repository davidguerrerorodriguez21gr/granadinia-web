/**
 * TEXTOS DE LA WEB — GranadinIA
 * ----------------------------------------------------------------
 * Cambia aquí cualquier frase sin tocar los componentes.
 * Las palabras entre ** se muestran en negrita.
 */

export const navegacion = [
  { id: 'problema', texto: 'Problema' },
  { id: 'solucion', texto: 'Solución' },
  { id: 'como-funciona', texto: 'Cómo funciona' },
  { id: 'precios', texto: 'Precios', soloConPrecios: true },
  { id: 'sobre-mi', texto: 'Sobre mí' },
  { id: 'preguntas', texto: 'Preguntas' },
  { id: 'contacto', texto: 'Contacto' },
] as const;

export const comunes = {
  botonWhatsApp: 'Escríbeme por WhatsApp',
  botonWhatsAppCorto: 'WhatsApp',
  botonLlamar: 'Llamar',
  seAbreWhatsApp: '(se abre WhatsApp)',
  seAbreTelefono: '(se abre el teléfono)',
  seAbreCorreo: '(se abre tu correo)',
  abrirMenu: 'Abrir menú',
  cerrarMenu: 'Cerrar menú',
  temaOscuro: 'Activar modo oscuro',
  temaClaro: 'Activar modo claro',
  reducirAnimaciones: 'Reducir animaciones',
  saltar: 'Saltar al contenido',
};

export const hero = {
  antetitulo: 'GranadinIA · Marketing e IA para negocios de Granada',
  titulo: 'Que ningún cliente se te escape mientras trabajas',
  subtitulo:
    'Ayudo a electricistas, fontaneros, técnicos y negocios de Granada a conseguir más clientes y ahorrar tiempo con Google, WhatsApp y automatizaciones sencillas. Lo dejo funcionando en 14 días.',
  botonSecundario: 'Ver cómo funciona',
  confianza: ['Hecho en Maracena', 'Atención en persona en Granada', 'Sin permanencia'],
  // Conversación de ejemplo del móvil ilustrado (decorativa)
  chat: {
    contacto: 'Cliente nuevo',
    entrante: 'Hola, ¿podéis venir a mirar un enchufe que no va?',
    respuesta:
      '¡Hola! Ahora estoy en un trabajo. Te llamo hoy antes de las 18:00. Si quieres, mándame una foto.',
    estado: 'Respuesta automática',
  },
};
