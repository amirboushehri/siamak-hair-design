// Siamak Hair Design — site interactivity

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Smooth anchor scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (link.dataset.modalOpen) return;
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const topInfoBar = document.querySelector('.top-info-bar');
      const navbar = document.querySelector('.navbar');
      const offset = (topInfoBar?.offsetHeight || 0) + (navbar?.offsetHeight || 0) + 16;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
      history.pushState(null, '', targetId);
    });
  });

  /* ---------- Modal dialogs ---------- */
  document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById(trigger.dataset.modalOpen);
      if (!modal) return;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      modal.querySelector('[data-modal-close]')?.focus();
    });
  });

  function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.modal-backdrop').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('[data-modal-close]')) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal-backdrop.open').forEach(closeModal);
  });

  /* ---------- Mobile hamburger menu ---------- */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navbar = document.querySelector('.navbar');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('menu-open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navbar.classList.remove('menu-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Hero autoplay tabs ---------- */
  const heroTabs = Array.from(document.querySelectorAll('.hero-tab'));
  const heroFills = heroTabs.map((tab) => tab.querySelector('.hero-tab-fill'));
  const heroBgImage = document.querySelector('.hero-bg-image');
  let HERO_INTERVAL_MS = parseInt(getComputedStyle(document.body).getPropertyValue('--hero-speed')) || 5000;
  let heroIndex = 0;
  let heroTimer = null;

  function setHeroTab(idx) {
    heroTabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
    heroIndex = idx;
    if (heroBgImage && heroTabs[idx].dataset.heroImage) {
      heroBgImage.style.backgroundImage = `url("${heroTabs[idx].dataset.heroImage}")`;
    }

    // Reset all fill bars instantly (no transition), then force a reflow
    // so the browser "sees" the 0% state before we animate the new one.
    heroFills.forEach((fill) => {
      if (!fill) return;
      fill.style.transition = 'none';
      fill.style.width = '0%';
    });
    // eslint-disable-next-line no-unused-expressions
    heroFills[idx] && heroFills[idx].offsetWidth; // force reflow

    requestAnimationFrame(() => {
      const activeFill = heroFills[idx];
      if (!activeFill) return;
      activeFill.style.transition = `width ${HERO_INTERVAL_MS}ms linear`;
      activeFill.style.width = '100%';
    });
  }

  function startHeroAutoplay() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      setHeroTab((heroIndex + 1) % heroTabs.length);
    }, HERO_INTERVAL_MS);
  }

  if (heroTabs.length) {
    setHeroTab(0);
    startHeroAutoplay();
    heroTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        setHeroTab(i);
        startHeroAutoplay();
      });
    });
  }

  /* ---------- Approach tabs ---------- */
  const approachTabs = Array.from(document.querySelectorAll('.approach-tab'));
  const approachPanel = document.querySelector('.approach-panel');
  const approachData = [
    { title: "Rich, dimensional color that lasts", desc: "We craft color that looks natural and feels like you. Fresh tones, deep gloss, and perfect gray coverage." },
    { title: "Brightness placed with precision", desc: "Hand-painted or foil-wrapped highlights that catch the light. Subtle sun-kissed strands or bold, face-framing brightness." },
    { title: "Smooth, polished, frizz-free hair", desc: "A transformative treatment that eliminates frizz and adds glass-like shine. Walk out with hair that moves beautifully." },
    { title: "Beauty makeup for your moments", desc: "Clean, radiant makeup for weddings, events, or an evening out. We enhance your features, never mask them." },
    { title: "Elegant styling for events", desc: "Chignons, waves, and sculptural shapes that hold all night. Wedding and event hair crafted with care and control." },
    { title: "Lasting curl and movement", desc: "Soft waves or defined spirals with modern perm techniques. We create body that looks effortless and feels healthy." },
  ];

  if (approachTabs.length && approachPanel) {
    const titleEl = approachPanel.querySelector('h3');
    const descEl = approachPanel.querySelector('p');
    approachTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        approachTabs.forEach((t, j) => t.classList.toggle('active', j === i));
        titleEl.textContent = approachData[i].title;
        descEl.textContent = approachData[i].desc;
      });
    });
  }

  /* ---------- Generic horizontal carousels (menu, gallery, team, testimonials) ---------- */
  function initCarousel(root) {
    const track = root.querySelector('.carousel-track');
    const prevBtn = root.querySelector('.carousel-prev');
    const nextBtn = root.querySelector('.carousel-next');
    const dots = Array.from(root.querySelectorAll('.dot'));
    if (!track) return;

    function updateDots() {
      if (!dots.length) return;
      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 1);
      const ratio = track.scrollLeft / maxScroll;
      const activeIdx = Math.round(ratio * (dots.length - 1));
      dots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));
    }

    prevBtn && prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -track.clientWidth * 0.85, behavior: 'smooth' });
    });
    nextBtn && nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: track.clientWidth * 0.85, behavior: 'smooth' });
    });
    track.addEventListener('scroll', () => window.requestAnimationFrame(updateDots));
    updateDots();
  }

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);

});
