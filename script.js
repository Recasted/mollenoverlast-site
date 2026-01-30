const track = document.querySelector('.logo-track');
track.innerHTML += track.innerHTML; // duplicate logos inside the track

const logo = document.querySelector('.logo-link');

logo.addEventListener('click', function(e) {
  e.preventDefault(); // prevent default anchor jump
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // smooth scroll animation
  });
});

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
