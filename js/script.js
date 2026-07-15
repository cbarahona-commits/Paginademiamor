document.addEventListener('DOMContentLoaded', () => {

  // El sello lleva directo a la carta
  const seal = document.getElementById('openSeal');
  const carta = document.getElementById('carta');
  if (seal && carta) {
    seal.addEventListener('click', () => {
      carta.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Revelar cada foto del timeline cuando entra en pantalla
  const moments = document.querySelectorAll('.moment');
  const finaleBtn = document.getElementById('finaleBtn');
  const finaleHint = document.getElementById('finaleHint');
  let lastRevealed = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.35 });

  moments.forEach(m => observer.observe(m));

  // Cuando el último momento se ha visto, mostrar el botón hacia la sorpresa
  const lastMoment = moments[moments.length - 1];
  if (lastMoment && finaleBtn) {
    const finaleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !lastRevealed) {
          lastRevealed = true;
          setTimeout(() => {
            finaleBtn.classList.add('show');
            if (finaleHint) finaleHint.textContent = '';
          }, 500);
        }
      });
    }, { threshold: 0.6 });
    finaleObserver.observe(lastMoment);
    if (finaleHint) finaleHint.textContent = 'sigue bajando para verla aparecer...';
  } else if (finaleBtn) {
    finaleBtn.classList.add('show');
  }
});
