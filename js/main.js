// Ombre sur la navigation quand la page défile
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('shadow', window.scrollY > 10);
  });
}

// Active le lien de navigation correspondant à la page ou section courante
(function setActiveNav() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  const section = document.body.dataset.section;
  document.querySelectorAll('.nav-links [data-page]').forEach(link => {
    const page = link.dataset.page;
    const isActive = page === filename || (section && page === section + '.html');
    link.classList.toggle('active', isActive);
  });
})();

// Filtres de la liste des itinéraires, uniquement présents sur itineraires.html
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filtre = this.textContent.trim().toLowerCase()
        .replace(/[éè]/g, 'e').replace(/ /g, '-');
      document.querySelectorAll('#itin-grid .itin-full-card').forEach(card => {
        const match = filtre === 'tous' || card.dataset.filtre === filtre;
        card.style.display = match ? 'flex' : 'none';
        if (match) card.style.animation = 'fade-in-card .35s ease both';
      });
    });
  });
}

// Animation d'apparition des cartes lors du filtrage
const styleEl = document.createElement('style');
styleEl.textContent = '@keyframes fade-in-card { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }';
document.head.appendChild(styleEl);
