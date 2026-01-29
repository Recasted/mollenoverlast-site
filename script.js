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
