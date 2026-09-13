/* =========================================================
   CTO KINGMAN KE — WEBSITE JAVASCRIPT
   Matched to actual HTML structure
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const themeToggle = document.getElementById("theme-toggle");

  /* =========================
     MOBILE NAVIGATION
     ========================= */
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const isOpen = navMenu.classList.contains("active");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     THEME TOGGLE
     ========================= */
  const savedTheme = localStorage.getItem("cto-theme");
  if (savedTheme === "light") {
    body.classList.add("light");
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.textContent = body.classList.contains("light") ? "☀️" : "🌙";
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light");
      const theme = body.classList.contains("light") ? "light" : "dark";
      localStorage.setItem("cto-theme", theme);
      updateThemeIcon();
    });
  }

  /* =========================
     SCROLL REVEAL
     ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("active"));
  }

  /* =========================
     ESCAPE KEY
     ========================= */
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (navMenu) navMenu.classList.remove("active");
      if (hamburger) hamburger.setAttribute("aria-expanded", "false");
    }
  });

});
