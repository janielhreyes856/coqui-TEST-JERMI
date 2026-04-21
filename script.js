/* ===== COQUI EATS — SHARED SCRIPT ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MOBILE MENU ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
    });
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ---------- DISHES CAROUSEL ---------- */
  const carousel = document.querySelector('.dishes-carousel');
  if (carousel) {
    const cards = Array.from(carousel.querySelectorAll('.dish-card'));
    let perView = getPerView();
    let idx = 0;

    function getPerView() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) return 3;
      return 4;
    }

    function update() {
      perView = getPerView();
      const maxIdx = Math.max(0, cards.length - perView);
      idx = Math.min(idx, maxIdx);
      const pct = (100 / perView) * idx;
      carousel.style.transform = `translateX(-${pct}%)`;
      carousel.style.display = 'grid';
    }

    // Override grid with flex for sliding
    carousel.style.display = 'flex';
    carousel.style.transition = 'transform 0.4s ease';
    carousel.style.gap = '24px';
    cards.forEach(c => {
      c.style.flex = `0 0 calc(${100 / getPerView()}% - 18px)`;
      c.style.minWidth = `calc(${100 / getPerView()}% - 18px)`;
    });

    document.querySelector('.carousel-btn.prev')?.addEventListener('click', () => {
      if (idx > 0) { idx--; update(); }
    });

    document.querySelector('.carousel-btn.next')?.addEventListener('click', () => {
      const maxIdx = Math.max(0, cards.length - perView);
      if (idx < maxIdx) { idx++; update(); }
    });

    window.addEventListener('resize', () => {
      cards.forEach(c => {
        c.style.flex = `0 0 calc(${100 / getPerView()}% - 18px)`;
        c.style.minWidth = `calc(${100 / getPerView()}% - 18px)`;
      });
      update();
    });
  }

  /* ---------- REVIEWS CAROUSEL ---------- */
  const reviewsCarousel = document.querySelector('.reviews-grid');
  if (reviewsCarousel) {
    const reviewCards = Array.from(reviewsCarousel.querySelectorAll('.review-card'));
    let rIdx = 0;
    let rPerView = getReviewPerView();

    function getReviewPerView() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 1;
      return 3;
    }

    reviewsCarousel.style.display = 'flex';
    reviewsCarousel.style.transition = 'transform 0.4s ease';
    reviewsCarousel.style.gap = '24px';
    reviewsCarousel.style.overflow = 'hidden';

    function setReviewWidths() {
      rPerView = getReviewPerView();
      reviewCards.forEach(c => {
        c.style.flex = `0 0 calc(${100 / rPerView}% - 16px)`;
        c.style.minWidth = `calc(${100 / rPerView}% - 16px)`;
      });
    }

    function updateReviews() {
      rPerView = getReviewPerView();
      const maxIdx = Math.max(0, reviewCards.length - rPerView);
      rIdx = Math.min(rIdx, maxIdx);
      const pct = (100 / rPerView) * rIdx;
      reviewsCarousel.style.transform = `translateX(-${pct * (rPerView === 1 ? 1.08 : 1)}%)`;
    }

    setReviewWidths();
    updateReviews();

    document.querySelector('.reviews-carousel-wrapper .carousel-btn.prev')?.addEventListener('click', () => {
      if (rIdx > 0) { rIdx--; updateReviews(); }
    });
    document.querySelector('.reviews-carousel-wrapper .carousel-btn.next')?.addEventListener('click', () => {
      const maxIdx = Math.max(0, reviewCards.length - getReviewPerView());
      if (rIdx < maxIdx) { rIdx++; updateReviews(); }
    });

    window.addEventListener('resize', () => { setReviewWidths(); updateReviews(); });
  }

  /* ---------- MENU FILTERS ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCategories = document.querySelectorAll('.menu-category');

  if (filterBtns.length && menuCategories.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        menuCategories.forEach(cat => {
          if (filter === 'all' || cat.dataset.category === filter) {
            cat.style.display = 'block';
          } else {
            cat.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- CONTACT FORM ---------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#2d6a2f';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ---------- NAVBAR SCROLL ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 30px rgba(0,0,0,0.5)'
        : '0 2px 20px rgba(0,0,0,0.4)';
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const reveals = document.querySelectorAll('.dish-card, .menu-item-card, .review-card, .feature-card, .covered-item, .how-step, .gallery-img');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = entry.target.style.transform.replace('translateY(20px)', 'translateY(0)');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
      observer.observe(el);
    });
  }

});
