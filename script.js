/* ==========================================================
   AURELIA — Interactions
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Année courante ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- En-tête : état "scrollé" + retour en haut ---------- */
  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (backToTop) backToTop.classList.toggle('visible', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  const closeMenu = () => {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('menu-open');
  };

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.classList.toggle('menu-open', isOpen);
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', e => {
      if (mainNav.classList.contains('open') &&
          !mainNav.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ---------- Révélations au scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Navigation active selon la section visible ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav > a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === id;
          link.style.color = isActive ? 'var(--gold-light)' : '';
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(section => navObserver.observe(section));
  }

  /* ---------- Validation du formulaire de contact ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      let valid = true;
      let firstInvalid = null;

      contactForm.querySelectorAll('[required]').forEach(field => {
        const wrapper = field.closest('.field');
        const value = field.value.trim();
        let ok = value !== '';

        if (ok && field.type === 'email') {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        }

        if (wrapper) wrapper.classList.toggle('invalid', !ok);
        if (!ok && !firstInvalid) firstInvalid = field;
        if (!ok) valid = false;
      });

      if (!valid) {
        formStatus.classList.add('error');
        formStatus.textContent = 'Merci de vérifier les champs signalés.';
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours…';
      }

      // Simulation d'envoi : remplacer par un appel à votre service d'envoi.
      window.setTimeout(() => {
        const name = contactForm.elements.nom.value.trim().split(' ')[0];
        formStatus.textContent = `Merci ${name} ! Votre demande a bien été enregistrée. Nous revenons vers vous sous 48 heures.`;
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Envoyer ma demande <span aria-hidden="true">→</span>';
        }
      }, 900);
    });

    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        const wrapper = field.closest('.field');
        if (wrapper) wrapper.classList.remove('invalid');
        formStatus.textContent = '';
      });
    });
  }

  /* ---------- Newsletter ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterStatus = document.getElementById('newsletterStatus');

  if (newsletterForm && newsletterStatus) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (!input) return;

      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      if (!ok) {
        newsletterStatus.textContent = 'Veuillez saisir une adresse e-mail valide.';
        input.focus();
        return;
      }

      newsletterStatus.textContent = 'Merci, votre inscription est confirmée.';
      newsletterForm.reset();
    });
  }

  /* ---------- Lien "retour en haut" : état actif natif via CSS smooth scroll ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
