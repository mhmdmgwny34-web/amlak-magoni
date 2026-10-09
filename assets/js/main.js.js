/* ============================================
   املاک مگونی - اسکریپت اصلی
   ============================================ */

(function() {
  'use strict';

  /* ---------- منوی موبایل ---------- */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav-open');
    });
  }

  /* ---------- جستجو ---------- */
  window.handleSearch = function(e) {
    e.preventDefault();
    const type = document.getElementById('propertyType')?.value;
    const location = document.getElementById('location')?.value;
    const minPrice = document.getElementById('minPrice')?.value;
    const maxPrice = document.getElementById('maxPrice')?.value;

    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (location) params.append('location', location);
    if (minPrice) params.append('min', minPrice.replace(/,/g, ''));
    if (maxPrice) params.append('max', maxPrice.replace(/,/g, ''));

    const url = 'properties.html' + (params.toString() ? '?' + params.toString() : '');
    window.location.href = url;
  };

  /* ---------- علاقه‌مندی ---------- */
  document.querySelectorAll('.property-fav').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      this.textContent = this.textContent === '♡' ? '♥' : '♡';
      this.style.color = this.textContent === '♥' ? '#dc2626' : '';
    });
  });

  /* ---------- فرمت قیمت ---------- */
  document.querySelectorAll('input[id*="Price"]').forEach(input => {
    input.addEventListener('input', function() {
      let value = this.value.replace(/,/g, '').replace(/[^\d]/g, '');
      if (value) {
        this.value = parseInt(value, 10).toLocaleString('en-US');
      }
    });
  });

  /* ---------- توست ---------- */
  window.showToast = function(message, type) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    if (type === 'error') toast.style.background = '#dc2626';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      setTimeout(() => toast.classList.add('show'), 10);
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  /* ---------- اسکرول نرم برای لینک‌های داخلی ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- هدر چسبنده در اسکرول ---------- */
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = '';
    }
    lastScroll = currentScroll;
  });

})();