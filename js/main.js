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
    const closeMenu = () => {
      navbar.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('menu-open');
      document.body.classList.toggle('menu-open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeMenu);
    const closeBtn = document.querySelector('.mobile-menu-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbar.classList.contains('menu-open')) closeMenu();
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
      // eslint-disable-next-line no-unused-expressions
      fill.offsetWidth; // force reflow on each so transition:none commits
    });

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

  // Open/closed status based on Toronto time.
  // Hours: Tue–Fri 10:00–18:00, Sat 09:00–18:00, Sun/Mon closed.
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const FULL_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // Opening minutes-since-midnight per weekday index (0=Sun … 6=Sat). null = closed.
  const OPEN_MINS = [null, null, 600, 600, 600, 600, 540];
  const CLOSE_MINS = [null, null, 1080, 1080, 1080, 1080, 1080];

  function torontoParts() {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Toronto',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).formatToParts(new Date());
    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    return {
      dayIdx: DAY_NAMES.indexOf(map.weekday),
      hour: parseInt(map.hour, 10),
      minute: parseInt(map.minute, 10),
    };
  }

  function formatOpenTime(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const suffix = h >= 12 ? 'PM' : 'AM';
    const display = ((h + 11) % 12) + 1;
    return m === 0 ? `${display} ${suffix}` : `${display}:${String(m).padStart(2,'0')} ${suffix}`;
  }

  function nextOpening(dayIdx, nowMins) {
    // Check today first.
    if (OPEN_MINS[dayIdx] !== null && nowMins < OPEN_MINS[dayIdx]) {
      return { daysAhead: 0, dayIdx, mins: OPEN_MINS[dayIdx] };
    }
    // Search forward.
    for (let i = 1; i <= 7; i++) {
      const idx = (dayIdx + i) % 7;
      if (OPEN_MINS[idx] !== null) return { daysAhead: i, dayIdx: idx, mins: OPEN_MINS[idx] };
    }
    return null;
  }

  function updateStatus() {
    const { dayIdx, hour, minute } = torontoParts();
    const nowMins = hour * 60 + minute;
    const openMins = OPEN_MINS[dayIdx];
    const closeMins = CLOSE_MINS[dayIdx];
    const isOpen = openMins !== null && nowMins >= openMins && nowMins < closeMins;

    let statusText = 'Open';
    if (!isOpen) {
      const next = nextOpening(dayIdx, nowMins);
      if (next) {
        if (next.daysAhead === 0) statusText = `Open today at ${formatOpenTime(next.mins)}`;
        else if (next.daysAhead === 1) statusText = `Open tomorrow at ${formatOpenTime(next.mins)}`;
        else statusText = `Closed until ${FULL_DAY_NAMES[next.dayIdx]}`;
      } else statusText = 'Closed';
    }

    const dot = document.querySelector('.status-dot');
    if (dot) {
      dot.classList.toggle('closed', !isOpen);
      dot.setAttribute('aria-label', isOpen ? 'Open now' : 'Closed');
    }
    const bar = document.querySelector('.top-info-bar');
    if (bar) bar.classList.toggle('closed', !isOpen);
    document.querySelectorAll('.btn-status').forEach((statusPill) => {
      const defaultLabel = statusPill.querySelector('.status-default');
      const hoverLabel = statusPill.querySelector('.status-hover');
      if (defaultLabel) defaultLabel.textContent = statusText;
      if (hoverLabel && !isOpen) {
        const next = nextOpening(dayIdx, nowMins);
        const target = next ? FULL_DAY_NAMES[next.dayIdx] : '';
        hoverLabel.textContent = target ? `Book for ${target}` : 'Book';
      }
      statusPill.classList.toggle('open', isOpen);
    });
  }
  const updateStatusDot = updateStatus;
  updateStatusDot();
  setInterval(updateStatusDot, 60 * 1000);

  // Hide navbar + top info bar on scroll down, show on scroll up.
  // Also toggle `.scrolled` (solid navbar background) when past the hero.
  const navbarEl = document.querySelector('.navbar');
  const stackEl = document.querySelector('.site-header-stack');
  const heroEl = document.querySelector('.hero');
  if (navbarEl && stackEl) {
    const getY = () => window.scrollY || document.documentElement.scrollTop || 0;
    let lastY = getY();
    let queued = false;
    const solidThreshold = () => (heroEl ? heroEl.offsetHeight - 120 : 200);

    const onScroll = () => {
      queued = false;
      const y = getY();
      const delta = y - lastY;

      // Never hide while the mobile menu is open.
      if (navbarEl.classList.contains('menu-open')) {
        stackEl.classList.remove('nav-hidden');
      } else if (y <= 0) {
        stackEl.classList.remove('nav-hidden');
      } else if (delta > 2) {
        stackEl.classList.add('nav-hidden');
      } else if (delta < -2) {
        stackEl.classList.remove('nav-hidden');
      }

      const pastHero = y > solidThreshold();
      navbarEl.classList.toggle('scrolled', pastHero);
      const fab = document.querySelector('.whatsapp-fab');
      if (fab) fab.classList.toggle('on-light', pastHero);

      if (Math.abs(delta) > 2) lastY = y;
    };

    window.addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(onScroll);
    }, { passive: true });
    onScroll();
  }

});
