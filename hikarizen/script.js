
document.addEventListener('DOMContentLoaded', () => {
  if (typeof LOGO_SRC !== 'undefined') {
    const imgs = ['navLogoImg', 'aboutLogoImg', 'footerLogoImg'];
    imgs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.src = LOGO_SRC;
    });
  }

  initNav();
  initMenuFilter();
  initReveal();
  initReservation();
  setMinDate();
});

function initNav() {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  document.querySelectorAll('#navMenu .nav-link, #navMenu .btn-reserve').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navMenu');
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
}

function initMenuFilter() {
  const tabs = document.querySelectorAll('.menu-tab');
  const items = document.querySelectorAll('.menu-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;
      items.forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = '';
          setTimeout(() => item.classList.remove('hidden'), 10);
        } else {
          item.classList.add('hidden');
          setTimeout(() => {
            if (item.classList.contains('hidden')) item.style.display = 'none';
          }, 320);
        }
      });
    });
  });
}

function initReveal() {
  const targets = document.querySelectorAll(
    '.section-about .col-lg-5, .section-about .col-lg-7, ' +
    '.dish-card, .chef-card, .review-card, .contact-card, ' +
    '.section-title, .pillar-card'
  );
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

function initReservation() {
  const btn = document.getElementById('reserveBtn');
  const success = document.getElementById('reserveSuccess');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name = document.getElementById('resName');
    if (name && !name.value.trim()) {
      name.style.borderColor = '#c14c2a';
      name.focus();
      setTimeout(() => name.style.borderColor = '', 2000);
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      btn.style.display = 'none';
      success.classList.remove('d-none');
    }, 1200);
  });
}

function setMinDate() {
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
}

(function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--gold-lt)'
        : '';
    });
  }, { passive: true });
})();
