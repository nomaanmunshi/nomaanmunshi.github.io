(() => {
  "use strict";

  const PROJECT = {
    title: "Ordanis",
    repositoryUrl: "https://github.com/nomaanmunshi/ordanis",
    liveUrl: "https://nomaanmunshi.github.io/ordanis/"
  };

  const init = () => {
    const grid = document.querySelector(".published-project-grid");
    if (!grid) return;

    grid.querySelector('[data-project="ordanis"]')?.remove();
    grid.querySelectorAll(".published-project").forEach(card => card.classList.remove("project-large"));

    const card = document.createElement("article");
    card.className = "published-project spotlight-card project-large";
    card.dataset.project = "ordanis";
    card.innerHTML = `
      <div class="project-card-top">
        <span>01</span>
        <span class="repo-status">Published · Live</span>
      </div>
      <h3>${PROJECT.title}</h3>
      <p>A distributed workflow and execution platform for reliable multi-step jobs. It compiles dependency graphs, persists execution state, leases work across Java workers, and handles retries, timeouts, cancellation, idempotency and worker loss.</p>
      <div class="project-tech">
        <span>Java 21</span>
        <span>Spring Boot</span>
        <span>gRPC</span>
        <span>PostgreSQL</span>
        <span>React</span>
        <span>Docker</span>
      </div>
      <a class="project-document-link" href="${PROJECT.liveUrl}" target="_blank" rel="noreferrer">Open live web demo ↗</a>
      <a href="${PROJECT.repositoryUrl}" target="_blank" rel="noreferrer">View source code ↗</a>
    `;

    grid.prepend(card);
    renumberProjects(grid);
    updateProjectCount(grid);
    activateSpotlight(card);
    animateCard(card);
  };

  function renumberProjects(grid) {
    grid.querySelectorAll(".published-project").forEach((card, index) => {
      const number = card.querySelector(".project-card-top > span:first-child");
      if (number) number.textContent = String(index + 1).padStart(2, "0");
    });
  }

  function updateProjectCount(grid) {
    const count = grid.querySelectorAll(".published-project").length;
    const countLabel = document.querySelector(".project-subhead span:last-child");
    if (countLabel) countLabel.textContent = `${String(count).padStart(2, "0")} projects`;
  }

  function activateSpotlight(card) {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    });
  }

  function animateCard(card) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !window.gsap) return;

    window.gsap.from(card, {
      y: 38,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
