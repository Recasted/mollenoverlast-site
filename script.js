// Duplicate logos only if logo track exists
const track = document.querySelector('.logo-track');

if (track) {
  track.innerHTML += track.innerHTML;
}

// Smooth scroll when clicking logo
const logo = document.querySelector('.logo-link');

if (logo) {
  logo.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
  });
}
