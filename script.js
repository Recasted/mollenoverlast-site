document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // 1) Logo bar: infinite scroll
  // ----------------------------
  const track = document.querySelector(".logo-track");

  if (track) {
    // Prevent re-duplicating if script runs again (hot reload / bfcache / etc.)
    if (!track.dataset.duplicated) {
      track.innerHTML += track.innerHTML;
      track.dataset.duplicated = "true";
    }
  }

  // ------------------------------------
  // 2) Header logo: smooth scroll to top
  // ------------------------------------
  const logoLink = document.querySelector(".logo-link");

  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();

      // If already at top, do nothing
      if (window.scrollY <= 0) return;

      // Smooth, non-snappy scroll
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ----------------------------
  // 3) Hamburger menu
  // ----------------------------
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  const closeMenu = () => {
    hamburger?.classList.remove("active");
    menu?.classList.remove("active");
  };

  const toggleMenu = () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  };

  if (hamburger && menu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation(); // don't trigger outside-click close
      toggleMenu();
    });

    // Close menu when a link is clicked
    menu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) closeMenu();
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      const clickedInsideMenu =
        menu.contains(e.target) || hamburger.contains(e.target);
      if (!clickedInsideMenu) closeMenu();
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }
});
