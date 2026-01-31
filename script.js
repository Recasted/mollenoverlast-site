const track = document.querySelector('.logo-track');

if (track) {
  track.innerHTML += track.innerHTML;
}

const logo = document.querySelector('.logo-link');

if (logo) {
  logo.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

logo.addEventListener('click', function(e) {
  e.preventDefault();

  const scrollDuration = 1000; // duration in milliseconds (1.5 seconds)
  const start = window.scrollY;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1); // 0 → 1
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
});

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');
});

