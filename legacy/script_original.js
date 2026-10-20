const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '68px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(7, 9, 15, 0.97)';
      navLinks.style.padding = '1.5rem';
      navLinks.style.gap = '1.2rem';
      navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    }
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900 && navLinks) {
      navLinks.style.display = 'none';
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.az-card, .problem-card, .why-card, .result-card, .package-card, .review-card, .process-step, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  observer.observe(el);
});
