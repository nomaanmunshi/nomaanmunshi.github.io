(() => {
  const html = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Theme
  const themeToggle = document.querySelector(".theme-toggle");
  const themeLabel = document.querySelector(".theme-label");
  const savedTheme = localStorage.getItem("nomaan-theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  const initialTheme = savedTheme || preferredTheme;
  html.dataset.theme = initialTheme;
  updateThemeLabel();

  themeToggle?.addEventListener("click", () => {
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("nomaan-theme", html.dataset.theme);
    updateThemeLabel();
  });

  function updateThemeLabel() {
    if (!themeLabel) return;
    themeLabel.textContent = html.dataset.theme === "dark" ? "Light" : "Dark";
  }

  // Mobile menu
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  function closeMenu() {
    body.classList.remove("menu-open");
    mobileMenu?.classList.remove("is-open");
    mobileMenu?.setAttribute("aria-hidden", "true");
    menuToggle?.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("is-open");
    mobileMenu.classList.toggle("is-open", open);
    body.classList.toggle("menu-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mobileLinks.forEach(link => link.addEventListener("click", closeMenu));

  // Header state
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });

  // Real photo fallback
  const photo = document.querySelector(".profile-photo");
  photo?.addEventListener("error", () => {
    photo.style.display = "none";
  });

  // Spotlight / torch interaction
  document.querySelectorAll(".spotlight-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    });
  });

  // Custom cursor
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", event => {
      cursorDot?.animate(
        { left: `${event.clientX}px`, top: `${event.clientY}px` },
        { duration: 80, fill: "forwards" }
      );
      cursorRing?.animate(
        { left: `${event.clientX}px`, top: `${event.clientY}px` },
        { duration: 320, fill: "forwards" }
      );
    });

    document.querySelectorAll("a, button, .spotlight-card").forEach(el => {
      el.addEventListener("mouseenter", () => body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => body.classList.remove("cursor-hover"));
    });
  }

  // Magnetic hover
  if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach(item => {
      item.addEventListener("mousemove", event => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });
      item.addEventListener("mouseleave", () => {
        item.style.transform = "translate(0, 0)";
      });
    });
  }

  // Lenis + GSAP
  if (!reduceMotion && window.Lenis && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const titleLines = document.querySelectorAll(".title-line");
    gsap.from(titleLines, {
      yPercent: 115,
      opacity: 0,
      duration: 1.15,
      stagger: 0.11,
      ease: "power4.out",
      delay: 0.15
    });

    gsap.from(".hero .reveal", {
      y: 28,
      opacity: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.42
    });

    gsap.from(".portrait-frame", {
      y: 60,
      rotation: 6,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.25
    });

    gsap.from(".floating-note", {
      scale: .88,
      opacity: 0,
      duration: .8,
      stagger: .15,
      ease: "back.out(1.4)",
      delay: .8
    });

    gsap.utils.toArray(".section-heading").forEach(heading => {
      gsap.from(heading.children, {
        scrollTrigger: { trigger: heading, start: "top 82%" },
        y: 45,
        opacity: 0,
        duration: .9,
        stagger: .08,
        ease: "power3.out"
      });
    });

    gsap.from(".reveal-card", {
      scrollTrigger: { trigger: ".about-grid", start: "top 78%" },
      y: 60,
      opacity: 0,
      duration: .85,
      stagger: .1,
      ease: "power3.out"
    });

    gsap.utils.toArray(".skill-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%" },
        y: 45,
        opacity: 0,
        duration: .72,
        delay: (index % 4) * .04,
        ease: "power3.out"
      });
    });

    gsap.utils.toArray(".project-row").forEach(row => {
      gsap.from(row.children, {
        scrollTrigger: { trigger: row, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: .85,
        stagger: .08,
        ease: "power3.out"
      });
    });

    gsap.utils.toArray(".project-art").forEach(art => {
      gsap.to(art, {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: art,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
    });

    gsap.utils.toArray(".timeline-item").forEach(item => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 88%" },
        x: -24,
        opacity: 0,
        duration: .75,
        ease: "power3.out"
      });
    });

    gsap.from(".contact-panel", {
      scrollTrigger: { trigger: ".contact-panel", start: "top 82%" },
      y: 70,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
