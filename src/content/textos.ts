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
  antetitulo: 'Marketing e IA para negocios de Granada',
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

/* ── 2. ¿Te suena? ─────────────────────────────────────────── */
export const problema = {
  antetitulo: 'El día a día',
  titulo: '¿Te suena?',
  entradilla: 'Trabajas bien, pero el teléfono no para y no puedes estar a todo. Pulsa cada tarjeta y mira cómo se arregla.',
  verSolucion: 'Ver cómo se arregla',
  ocultarSolucion: 'Ocultar',
  tarjetas: [
    {
      icono: 'llamada',
      problema: 'Te llaman mientras estás en una obra y no puedes coger',
      solucion: 'WhatsApp Business contesta por ti y la persona sabe cuándo la vas a llamar.',
    },
    {
      icono: 'luna',
      problema: 'Contestas WhatsApps a las 11 de la noche',
      solucion: 'Respuestas rápidas y mensajes de ausencia: menos tiempo pegado al móvil.',
    },
    {
      icono: 'presupuesto',
      problema: 'Mandas presupuestos y nunca sabes en qué quedaron',
      solucion: 'Una hoja sencilla te recuerda a quién llamar y cuándo.',
    },
    {
      icono: 'estrella',
      problema: 'Trabajas bien, pero en Google casi no tienes reseñas',
      solucion: 'Un QR y un mensaje para pedir reseñas en el momento justo.',
    },
  ],
};

/* ── 3. La solución ────────────────────────────────────────── */
export const solucion = {
  antetitulo: 'La solución',
  titulo: '“Ningún cliente perdido”',
  entradilla:
    'Cuatro piezas sencillas y media hora de formación. Lo monto yo en tus cuentas y lo dejas funcionando en 14 días.',
  piezas: [
    {
      id: 'google',
      pestana: 'Ficha de Google',
      titulo: 'Tu ficha de Google, al día',
      que: 'Dejo tu Perfil de Empresa de Google completo: horario, zona de trabajo, fotos, servicios y teléfono.',
      gana: 'Cuando alguien busca “fontanero en Maracena”, es más fácil que te encuentre a ti y te llame con un toque.',
    },
    {
      id: 'whatsapp',
      pestana: 'WhatsApp Business',
      titulo: 'WhatsApp Business bien configurado',
      que: 'Saludo automático, mensaje de ausencia, respuestas rápidas y un catálogo con tus servicios.',
      gana: 'Nadie se queda sin respuesta aunque estés con las manos ocupadas, y tú contestas en dos toques.',
    },
    {
      id: 'resenas',
      pestana: 'Reseñas con QR',
      titulo: 'Un sistema para pedir reseñas',
      que: 'Un código QR con tu enlace de reseñas y un mensaje listo para mandarlo al terminar cada trabajo.',
      gana: 'Tus clientes contentos lo cuentan en Google, y eso es lo que mira el siguiente antes de llamarte.',
    },
    {
      id: 'hoja',
      pestana: 'Hoja de seguimiento',
      titulo: 'Una hoja de seguimiento de presupuestos',
      que: 'Una hoja sencilla en tu móvil con cada presupuesto, su estado y cuándo toca volver a llamar.',
      gana: 'No se te olvida nadie y recuperas trabajos que antes se quedaban en el aire.',
    },
    {
      id: 'formacion',
      pestana: 'Formación',
      titulo: '30 minutos de formación',
      que: 'Te enseño a usarlo todo con tu propio móvil, sin prisas y sin palabras raras.',
      gana: 'A partir de ahí lo manejas tú solo. Y si te atascas, me escribes.',
    },
  ],
  queEs: 'Qué es',
  queGanas: 'Qué ganas',
};

/* ── 4. Cómo funciona ──────────────────────────────────────── */
export const comoFunciona = {
  antetitulo: 'Cómo funciona',
  titulo: 'De la primera llamada a funcionando, en 14 días',
  pasos: [
    { titulo: 'Llamada de 20 minutos (gratis)', texto: 'Me cuentas cómo trabajas y qué te quita más tiempo. Sin compromiso.' },
    { titulo: 'Lo monto yo', texto: 'Preparo tu ficha de Google, tu WhatsApp Business y tu hoja de presupuestos. Tú sigues a lo tuyo.' },
    { titulo: 'Te enseño a usarlo', texto: 'Media hora, con tu móvil, hasta que lo manejes sin mí.' },
    { titulo: 'Funcionando en 14 días', texto: 'Y si no está instalado en 14 días, te devuelvo el dinero.' },
  ],
};

/* ── 5. Calculadora ────────────────────────────────────────── */
export const calculadora = {
  antetitulo: 'Haz la cuenta',
  titulo: '¿Cuánto te cuesta no contestar?',
  entradilla: 'Pon tus propios números. Nadie los ve: la cuenta se hace en tu navegador y no se guarda nada.',
  campos: {
    perdidas: { etiqueta: 'Llamadas o mensajes que no puedes atender a la semana', ayuda: 'Los que se quedan sin contestar o contestas tarde.', ejemplo: 'Ej.: 4' },
    deCada10: { etiqueta: 'De cada 10, ¿cuántos acabarían en trabajo?', ayuda: 'Un número del 0 al 10.', ejemplo: 'Ej.: 3' },
    valor: { etiqueta: 'Valor medio de un trabajo (€)', ayuda: 'Lo que sueles cobrar de media por trabajo.', ejemplo: 'Ej.: 150' },
  },
  vacio: 'Rellena los tres campos y verás la cuenta aquí.',
  resultadoMes: 'Al mes podrías estar dejando de ingresar unos',
  resultadoAno: 'Al año, unos',
  aviso: 'Es solo una cuenta orientativa con los números que tú has puesto. No es una promesa de resultados.',
  sinJs: 'La calculadora necesita JavaScript. Si lo tienes desactivado, escríbeme y hacemos la cuenta juntos.',
  boton: 'Quiero dejar de perder clientes',
};

/* ── 6. Para quién ─────────────────────────────────────────── */
export const paraQuien = {
  antetitulo: 'Para quién es',
  titulo: 'Pensado para oficios que trabajan con las manos ocupadas',
  oficios: [
    { icono: 'electricista', nombre: 'Electricistas' },
    { icono: 'fontanero', nombre: 'Fontaneros' },
    { icono: 'climatizacion', nombre: 'Climatización' },
    { icono: 'reformas', nombre: 'Reformas' },
    { icono: 'electronica', nombre: 'Reparación de electrónica' },
  ],
  otrosTitulo: '¿Tienes otro tipo de negocio local?',
  otrosTexto: 'Peluquería, tienda, taller… Escríbeme y te digo con sinceridad si te puedo ayudar.',
  otrosBoton: 'Cuéntame tu negocio',
};

/* ── 7. Precios ────────────────────────────────────────────── */
export const precios = {
  antetitulo: 'Precios',
  titulo: 'Claro desde el principio',
  oferta: {
    etiqueta: 'Precio fundador',
    nombre: 'Ningún cliente perdido',
    incluye: [
      'Ficha de Google optimizada',
      'WhatsApp Business configurado',
      'Sistema de reseñas con QR',
      'Hoja de seguimiento de presupuestos',
      '30 minutos de formación',
    ],
    garantia: 'Garantía: si no está instalado en 14 días, te devuelvo el dinero.',
    boton: 'Quiero una plaza',
  },
  mantenimiento: {
    nombre: 'Mantenimiento',
    etiqueta: 'Opcional',
    boton: 'Preguntar por el mantenimiento',
  },
  otros: {
    titulo: 'Otros servicios',
    texto: 'Si necesitas algo más, lo hablamos y te paso presupuesto.',
    lista: [
      'Gestión de redes sociales',
      'Contenido para redes con apoyo de IA',
      'Respuestas automáticas en WhatsApp e Instagram',
      'Recordatorios de citas',
      'Informe mensual de resultados',
    ],
    boton: 'Pregúntame',
  },
};

/* ── 8. Sobre mí ───────────────────────────────────────────── */
export const sobreMi = {
  antetitulo: 'Sobre mí',
  titulo: 'Soy David, de Maracena',
  parrafos: [
    'Trabajo con tecnología y me formo en IA a diario. Monté GranadinIA porque veo a muchos negocios de aquí que trabajan muy bien y pierden clientes solo por no poder coger el teléfono.',
    'La IA la uso yo para trabajar más rápido; tú solo ves el resultado: más clientes atendidos y menos tiempo con el móvil.',
    'Te lo explico sin tecnicismos y, si quieres, voy a tu negocio.',
  ],
  fotoPendiente: '[PENDIENTE: foto de David]',
  fotoAlt: 'David, de GranadinIA, sonriendo en Maracena',
};

/* ── 9. Testimonios (ocultos mientras no haya reales) ──────── */
export const testimonios = {
  antetitulo: 'Lo que dicen',
  titulo: 'Negocios de Granada que ya lo usan',
};

/* ── 10. Preguntas frecuentes ──────────────────────────────── */
export const preguntas = {
  antetitulo: 'Preguntas',
  titulo: 'Preguntas frecuentes',
  lista: [
    {
      p: '¿Tengo que saber de tecnología?',
      r: 'No. Lo monto yo y te enseño a usarlo con tu propio móvil. Si sabes mandar un WhatsApp, sabes usar esto.',
    },
    {
      p: '¿Cuánto tiempo me va a quitar?',
      r: 'Poco: la llamada inicial de 20 minutos y los 30 minutos de formación. El resto lo hago yo.',
    },
    {
      p: '¿Usáis IA para hablar con mis clientes?',
      r: 'No. La IA la uso yo para trabajar más rápido, por ejemplo para preparar textos. Los mensajes automáticos que reciben tus clientes son los que tú has leído y aprobado antes.',
    },
    {
      p: '¿Qué pasa con los datos de mis clientes?',
      r: 'Se quedan en tus cuentas: tu Google, tu WhatsApp y tu hoja. Yo no me los llevo a ningún sitio, y todo se hace cumpliendo el RGPD.',
    },
    {
      p: '¿Hay permanencia?',
      r: 'No. La instalación se paga una vez y el mantenimiento es opcional, sin permanencia.',
    },
    {
      p: '¿Trabajas fuera de Granada?',
      r: 'En persona, en Granada capital y el área metropolitana. Online, en toda España.',
    },
  ],
};

/* ── 11. Contacto ──────────────────────────────────────────── */
export const contacto = {
  antetitulo: 'Contacto',
  titulo: 'Cuéntame tu caso. Te contesto yo, no un robot.',
  entradilla: 'Elige lo que te sea más cómodo.',
  canales: {
    whatsapp: { titulo: 'WhatsApp', texto: 'Lo más rápido' },
    llamar: { titulo: 'Llamar', texto: '' },
    correo: { titulo: 'Correo', texto: '' },
  },
  formulario: {
    titulo: 'O déjame tus datos y te escribo',
    explicacion:
      'Este formulario no guarda nada en la web: al pulsar el botón se abre WhatsApp (o tu correo) con el mensaje ya escrito, y tú decides si lo envías.',
    campos: {
      nombre: { etiqueta: 'Tu nombre', error: 'Escribe tu nombre.' },
      negocio: { etiqueta: 'Tipo de negocio', ejemplo: 'Ej.: electricista, peluquería…', error: 'Dime a qué se dedica tu negocio.' },
      localidad: { etiqueta: 'Localidad', ejemplo: 'Ej.: Albolote', error: 'Escribe tu localidad.' },
      mejora: { etiqueta: '¿Qué te gustaría mejorar?', ejemplo: 'Ej.: pierdo llamadas cuando estoy trabajando', error: 'Cuéntame un poco qué te gustaría mejorar.' },
    },
    privacidadAntes: 'He leído la',
    privacidadEnlace: 'política de privacidad',
    privacidadDespues: 'y acepto que GranadinIA use estos datos para responderme.',
    privacidadError: 'Tienes que aceptar la política de privacidad para enviar el mensaje.',
    obligatorio: 'obligatorio',
    todosObligatorios: 'Todos los campos son obligatorios.',
    enviar: 'Enviar por WhatsApp',
    correo: 'Prefiero enviarlo por correo',
    resumenErrores: 'Revisa los campos marcados, por favor.',
    sinJs: 'El formulario necesita JavaScript. Sin él, usa los botones de WhatsApp, teléfono o correo de arriba.',
    mensaje: (d: { nombre: string; negocio: string; localidad: string; mejora: string }) =>
      `Hola David, vengo de la web de GranadinIA.\n\nNombre: ${d.nombre}\nNegocio: ${d.negocio}\nLocalidad: ${d.localidad}\n\nMe gustaría mejorar: ${d.mejora}`,
  },
  rgpd: {
    titulo: 'Información básica sobre protección de datos',
    filas: [
      ['Responsable', 'RESPONSABLE'],
      ['Finalidad', 'Responder a tu consulta y, si lo pides, prepararte un presupuesto.'],
      ['Base legal', 'Tu consentimiento y la aplicación de medidas precontractuales a petición tuya.'],
      ['Destinatarios', 'No se ceden datos a terceros. Según el canal que elijas, intervienen WhatsApp (Meta) o el proveedor de correo (Zoho).'],
      ['Derechos', 'Acceder, rectificar y suprimir tus datos, entre otros, escribiendo a CORREO.'],
    ],
    masInfo: 'Más información en la',
  },
};

/* ── Pie ───────────────────────────────────────────────────── */
export const pie = {
  zonaTitulo: 'Dónde trabajo',
  zonaTexto: 'En persona en Granada capital y el área metropolitana. Online, en toda España.',
  contactoTitulo: 'Contacto',
  legalTitulo: 'Legal',
  legal: [
    { href: '/aviso-legal', texto: 'Aviso legal' },
    { href: '/privacidad', texto: 'Privacidad' },
    { href: '/cookies', texto: 'Cookies' },
  ],
  instagram: 'Instagram',
  nuevaPestana: '(se abre en una pestaña nueva)',
};

/* ── 404 ───────────────────────────────────────────────────── */
export const noEncontrada = {
  titulo: 'Esta página se ha perdido por el Albaicín',
  texto: 'La dirección no existe o ha cambiado. Tranquilo: tú no te pierdes, que te contesto yo.',
  inicio: 'Volver al inicio',
};
