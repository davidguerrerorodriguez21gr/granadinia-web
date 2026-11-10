// Revela los elementos .aparece al entrar en pantalla (mejora progresiva).
// Sin JS o con “reducir animaciones” se ven siempre: la regla CSS depende de html.anima.
const elementos = document.querySelectorAll<HTMLElement>('.aparece');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  elementos.forEach((el) => io.observe(el));
} else {
  elementos.forEach((el) => el.classList.add('visible'));
}
