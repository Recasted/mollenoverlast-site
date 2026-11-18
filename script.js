const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

function setMenu(open) {
  hamburger.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
  menu.inert = !open;
}

menu.classList.add("is-disclosure");
setMenu(false);
hamburger.hidden = false;

hamburger.addEventListener("click", () => {
  setMenu(hamburger.getAttribute("aria-expanded") === "false");
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    setMenu(false);
  }
});

document.addEventListener("focusin", (event) => {
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && hamburger.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    hamburger.focus();
  }
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

document.querySelector(".logo-link").addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "instant" : "smooth" });
});

const logoBar = document.querySelector(".logo-bar");
const logoWindow = logoBar.querySelector(".logo-window");
const logoTrack = logoBar.querySelector(".logo-track");
const logoGroup = logoBar.querySelector(".logo-group");
const logoToggle = logoBar.querySelector(".logo-toggle");
const copy = logoGroup.cloneNode(true);
copy.setAttribute("aria-hidden", "true");
copy.querySelectorAll("a").forEach((link) => { link.tabIndex = -1; });
logoTrack.append(copy);

logoBar.classList.add("is-ready");
logoToggle.hidden = false;

logoToggle.addEventListener("click", () => {
  const paused = logoBar.classList.toggle("is-paused");
  logoToggle.textContent = paused ? "Afspelen" : "Pauzeren";
});

logoWindow.addEventListener("focusin", (event) => {
  logoBar.classList.add("is-browsing");
  event.target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
});

logoWindow.addEventListener("focusout", (event) => {
  if (!logoWindow.contains(event.relatedTarget)) {
    logoBar.classList.remove("is-browsing");
    if (!reducedMotion.matches) logoWindow.scrollLeft = 0;
  }
});

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        reveal.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll("[data-reveal]").forEach((element) => reveal.observe(element));
}

const intro = document.querySelector(".home-hero, .page-intro");
const main = document.querySelector("main");
const glowAllowed = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
let glowFrame;

intro.addEventListener("pointermove", (event) => {
  if (!glowAllowed.matches || event.pointerType !== "mouse") return;

  cancelAnimationFrame(glowFrame);
  glowFrame = requestAnimationFrame(() => {
    const bounds = main.getBoundingClientRect();
    main.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
    main.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
    main.classList.add("has-pointer-glow");
  });
});

function clearPointerGlow() {
  cancelAnimationFrame(glowFrame);
  main.classList.remove("has-pointer-glow");
}

intro.addEventListener("pointerleave", clearPointerGlow);
glowAllowed.addEventListener("change", clearPointerGlow);
