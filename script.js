(() => {
  "use strict";
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const system = matchMedia("(prefers-color-scheme: dark)");
  let explicit = false;
  try {
    explicit = ["dark", "light"].includes(localStorage.getItem("nomaan-theme"));
  } catch {}
  function apply(theme) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    toggle.querySelector(".theme-label").textContent = dark ? "Light" : "Dark";
    toggle.setAttribute(
      "aria-label",
      `Switch to ${dark ? "light" : "dark"} mode`,
    );
    toggle.setAttribute("aria-pressed", String(dark));
    document.querySelector('meta[name="theme-color"]').content = dark
      ? "#191B1D"
      : "#F7F5F0";
  }
  apply(root.dataset.theme);
  toggle.addEventListener("click", () => {
    explicit = true;
    apply(root.dataset.theme === "dark" ? "light" : "dark");
    try {
      localStorage.setItem("nomaan-theme", root.dataset.theme);
    } catch {}
  });
  system.addEventListener("change", (event) => {
    if (!explicit) apply(event.matches ? "dark" : "light");
  });
  const menu = document.querySelector(".mobile-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  function setMenu(open, restoreFocus = false) {
    menu.hidden = !open;
    menu.setAttribute("aria-hidden", String(!open));
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    if (restoreFocus) menuToggle.focus();
  }
  menuToggle.addEventListener("click", () => setMenu(menu.hidden));
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) setMenu(false, true);
  });
  document.addEventListener("click", (event) => {
    if (
      !menu.hidden &&
      !menu.contains(event.target) &&
      !menuToggle.contains(event.target)
    )
      setMenu(false);
  });
  document.addEventListener("focusin", (event) => {
    if (
      !menu.hidden &&
      !menu.contains(event.target) &&
      !menuToggle.contains(event.target)
    )
      setMenu(false);
  });
  matchMedia("(min-width:701px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });
  document.getElementById("year").textContent = new Date().getFullYear();
  if ("IntersectionObserver" in window) {
    const links = [...document.querySelectorAll(".desktop-nav a")];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            if (link.hash === "#" + entry.target.id)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }),
      { rootMargin: "-15% 0px -60% 0px" },
    );
    links.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (section) observer.observe(section);
    });
  }
})();
