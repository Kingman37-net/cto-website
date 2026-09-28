/* =========================================================
   CTO KINGMAN KE — WEBSITE JAVASCRIPT
   Global navigation, theme, reveal effects and form handling
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const themeToggle = document.getElementById("theme-toggle");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  /* =========================
     JAVASCRIPT STATE
     ========================= */

  body.classList.add("js-enabled");


  /* =========================
     MOBILE NAVIGATION
     ========================= */

  function closeMenu() {
    if (!navMenu || !hamburger) return;

    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!navMenu || !hamburger) return;

    navMenu.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    body.classList.add("menu-open");
  }

  if (hamburger && navMenu) {

    hamburger.addEventListener("click", () => {

      const isOpen = navMenu.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });


    navMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


    document.addEventListener("click", event => {

      const target = event.target;

      if (
        navMenu.classList.contains("active") &&
        target instanceof Node &&
        !navMenu.contains(target) &&
        !hamburger.contains(target)
      ) {
        closeMenu();
      }

    });


    window.addEventListener("resize", () => {

      if (window.innerWidth > 920) {
        closeMenu();
      }

    });

  }


  /* =========================
     THEME TOGGLE
     ========================= */

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("cto-theme");
  } catch (error) {
    savedTheme = null;
  }

  if (savedTheme === "light") {
    body.classList.add("light");
  }


  function updateThemeState() {

    if (!themeToggle) return;

    const isLight = body.classList.contains("light");

    themeToggle.textContent = isLight ? "☀️" : "🌙";

    themeToggle.setAttribute(
      "aria-pressed",
      isLight ? "true" : "false"
    );

    themeToggle.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark theme"
        : "Switch to light theme"
    );

  }

  updateThemeState();


  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      body.classList.toggle("light");

      const theme = body.classList.contains("light")
        ? "light"
        : "dark";

      try {
        localStorage.setItem("cto-theme", theme);
      } catch (error) {
        /* Theme still works for the current session. */
      }

      updateThemeState();

    });

  }


  /* =========================
     SCROLL REVEAL
     ========================= */

  const revealElements = document.querySelectorAll(".reveal");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(element => {
      element.classList.add("active");
    });

  } else {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


    revealElements.forEach(element => {
      observer.observe(element);
    });

  }


  /* =========================
     CONTACT FORM
     ========================= */

  if (contactForm) {

    contactForm.addEventListener("submit", event => {

      const action = (
        contactForm.getAttribute("action") || ""
      ).trim();


      /*
        The form currently has no production backend.
        Prevent accidental "#" submission until a real
        endpoint is configured.
      */

      if (!action || action === "#") {

        event.preventDefault();

        if (formStatus) {

          formStatus.textContent =
            "The inquiry form is ready, but its submission service has not been connected yet. Please use Email or WhatsApp for now.";

        }

      }

    });

  }


  /* =========================
     ESCAPE KEY
     ========================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeMenu();

      if (hamburger) {
        hamburger.focus();
      }

    }

  });

});
