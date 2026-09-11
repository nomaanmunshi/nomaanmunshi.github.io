(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const FOCUS_BY_PROJECT = [
    ["ordanis", "Reliable distributed execution"],
    ["synapse hea healthcare", "Backend workflows & access control"],
    ["digital twin", "Operational state modelling"],
    ["software engineering university", "Requirements to implementation"],
    ["taskpilot", "Application workflow design"],
    ["product sales", "Automation & data handling"],
    ["java phase 2", "Java backend iteration"]
  ];

  let motifPointerFrame = null;
  let activeMotifSection = null;

  waitForPortfolioReady();

  function waitForPortfolioReady() {
    const startedAt = performance.now();

    const check = () => {
      const projectsReady = document.querySelector('.published-project[data-project="ordanis"]');
      const enhancementsReady = document.querySelector("#credentials");

      if ((projectsReady && enhancementsReady) || performance.now() - startedAt > 2400) {
        initUpgrade();
        return;
      }

      window.setTimeout(check, 40);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", check, { once: true });
    } else {
      check();
    }
  }

  function initUpgrade() {
    if (document.documentElement.dataset.portfolioUpgradeReady === "true") return;
    document.documentElement.dataset.portfolioUpgradeReady = "true";

    updateCoursework();
    addBeyondUniversity();
    addSystemMotifs();
    enhancePublishedProjects();
    enhanceRoadmap();
    bindMotifPointer();

    // DOM geometry changed inside components, but the existing ScrollTrigger
    // configs/timings remain untouched. Refresh only their measurements.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.ScrollTrigger?.refresh?.();
      });
    });
  }

  function updateCoursework() {
    const section = document.querySelector("#coursework");
    if (!section) return;

    const kicker = section.querySelector(".kicker");
    const heading = section.querySelector(".section-heading h2");
    const aside = section.querySelector(".section-aside");
    const cards = Array.from(section.querySelectorAll(".coursework-card"));

    if (kicker) kicker.textContent = "Selected coursework";
    if (heading) heading.innerHTML = "Engineering foundations<br><em>behind the work.</em>";
    if (aside) {
      aside.textContent = "University coursework and selected upcoming subjects shaping my software-engineering foundation.";
    }

    const definitions = [
      {
        meta: "01 · SOFTWARE & SYSTEMS",
        title: "Core computing",
        courses: [
          "Software Engineering",
          "Computer Programming",
          "Processing Systems",
          "Computer Networks",
          "Computer Architecture",
          "Databases",
          "Operating Systems"
        ]
      },
      {
        meta: "02 · DATA & ENGINEERING",
        title: "Analytical foundation",
        courses: [
          "Artificial Intelligence",
          "Probability",
          "Geometry & Linear Algebra",
          "Remote Sensing Systems & Image Analysis",
          "Signal Processing",
          "Fundamentals of Electronics",
          "Fundamentals of Communications"
        ]
      },
      {
        meta: "03 · 2026/27",
        title: "Coming next",
        upcoming: true,
        courses: [
          "Advanced Programming",
          "Embedded Software for the Internet of Things",
          "Next Generation Networks",
          "Parallel Computing"
        ]
      }
    ];

    cards.slice(0, 3).forEach((card, index) => {
      const definition = definitions[index];
      if (!definition) return;

      const top = card.querySelector(".coursework-card-top");
      const title = card.querySelector("h3");
      const list = card.querySelector(".course-list");

      if (top) {
        top.innerHTML = `<span class="coursework-index">${String(index + 1).padStart(2, "0")}</span><span>${escapeHtml(definition.meta.split(" · ").slice(1).join(" · "))}</span>`;
      }
      if (title) title.textContent = definition.title;
      if (list) {
        list.innerHTML = definition.courses.map(course => `<span>${escapeHtml(course)}</span>`).join("");
      }

      card.dataset.coursework = definition.upcoming ? "upcoming" : `group-${index + 1}`;
      card.querySelector(".coursework-status")?.remove();
      if (definition.upcoming && title) {
        const status = document.createElement("span");
        status.className = "coursework-status";
        status.textContent = "Upcoming";
        title.before(status);
      }
    });
  }

  function addBeyondUniversity() {
    const grid = document.querySelector("#coursework .coursework-grid");
    if (!grid || grid.nextElementSibling?.classList.contains("beyond-university")) return;

    const strip = document.createElement("aside");
    strip.className = "beyond-university";
    strip.setAttribute("aria-label", "Independent study and focus areas");
    strip.innerHTML = `
      <div class="beyond-university__head">
        <h3>Beyond university</h3>
        <p>Independent study and engineering focus areas — separate from formal university coursework.</p>
      </div>
      <div class="beyond-university__tags" aria-label="Independent study topics">
        <span>Java &amp; Spring Boot</span>
        <span>C++ DSA</span>
        <span>Microservices</span>
        <span>Generative AI</span>
        <span>Python</span>
        <span>Testing</span>
        <span>Backend Architecture</span>
      </div>
    `;
    grid.after(strip);
  }

  function addSystemMotifs() {
    const targets = [
      [".hero", "hero"],
      ["#about", "about"],
      ["#coursework", "coursework"],
      ["#projects", "projects"],
      [".journey", "journey"],
      ["#contact", "contact"]
    ];

    targets.forEach(([selector, type]) => {
      const section = document.querySelector(selector);
      if (!section || section.querySelector(":scope > .system-motif")) return;

      const motif = document.createElement("div");
      motif.className = `system-motif system-motif--${type}`;
      motif.setAttribute("aria-hidden", "true");
      motif.innerHTML = motifSvg(type);
      section.prepend(motif);
    });
  }

  function motifSvg(type) {
    const commonStart = `<svg viewBox="0 0 1200 700" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="1">`;
    const commonEnd = `</g></svg>`;

    const motifs = {
      hero: `
        <path d="M44 160H280V80H476V190H690V116H925V256H1160" stroke-dasharray="8 14"/>
        <path d="M280 160V334H508V470H780V362H1045V530" opacity=".65"/>
        <circle cx="280" cy="160" r="6"/><circle cx="476" cy="80" r="5"/><circle cx="690" cy="190" r="6"/>
        <circle cx="508" cy="334" r="5"/><circle cx="780" cy="470" r="6"/><circle cx="1045" cy="362" r="5"/>
        <path d="M74 560H240L280 520H450" opacity=".5"/><path d="M870 610H1060L1110 560" opacity=".45"/>
      `,
      about: `
        <path d="M80 120H310V230H520V125H800V280H1090"/>
        <path d="M310 230V440H590V560H920" stroke-dasharray="5 12"/>
        <circle cx="310" cy="230" r="5"/><circle cx="520" cy="125" r="5"/><circle cx="800" cy="280" r="5"/><circle cx="590" cy="440" r="5"/>
        <rect x="920" y="520" width="120" height="70" rx="8" opacity=".5"/>
      `,
      coursework: `
        <path d="M80 110H1120M80 220H1120M80 330H1120M80 440H1120M80 550H1120" opacity=".35"/>
        <path d="M180 70V620M420 70V620M690 70V620M960 70V620" opacity=".28"/>
        <polyline points="180,440 420,330 690,330 690,220 960,220" stroke-dasharray="7 11"/>
        <circle cx="180" cy="440" r="6"/><circle cx="420" cy="330" r="6"/><circle cx="690" cy="330" r="6"/><circle cx="690" cy="220" r="6"/><circle cx="960" cy="220" r="6"/>
      `,
      projects: `
        <path d="M60 350H250L340 210H520L620 350H790L900 175H1130"/>
        <path d="M250 350V525H470M520 210V90H760M790 350V545H1050" stroke-dasharray="8 12"/>
        <circle cx="250" cy="350" r="7"/><circle cx="340" cy="210" r="6"/><circle cx="520" cy="210" r="7"/>
        <circle cx="620" cy="350" r="6"/><circle cx="790" cy="350" r="7"/><circle cx="900" cy="175" r="6"/>
        <rect x="425" y="493" width="94" height="62" rx="7" opacity=".6"/><rect x="1000" y="514" width="92" height="62" rx="7" opacity=".6"/>
      `,
      journey: `
        <path d="M180 40V650" stroke-dasharray="6 14"/>
        <path d="M180 130H460L540 210H780M180 330H650L730 410H1040M180 530H520" opacity=".7"/>
        <circle cx="180" cy="130" r="7"/><circle cx="180" cy="330" r="7"/><circle cx="180" cy="530" r="7"/>
        <circle cx="540" cy="210" r="5"/><circle cx="730" cy="410" r="5"/>
      `,
      contact: `
        <path d="M100 210H330L430 310H700L800 410H1100" stroke-dasharray="8 15" opacity=".6"/>
        <circle cx="330" cy="210" r="5"/><circle cx="430" cy="310" r="5"/><circle cx="700" cy="310" r="5"/><circle cx="800" cy="410" r="5"/>
      `
    };

    return `${commonStart}${motifs[type] || motifs.about}${commonEnd}`;
  }

  function enhancePublishedProjects() {
    const grid = document.querySelector(".published-project-grid");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".published-project"));
    cards.forEach(card => {
      if (card.dataset.upgradeProject === "true") return;
      card.dataset.upgradeProject = "true";

      const title = card.querySelector("h3");
      const description = Array.from(card.children).find(el => el.tagName === "P");
      const tech = card.querySelector(":scope > .project-tech");
      const links = Array.from(card.children).filter(el => el.tagName === "A");
      if (!title || !tech) return;

      const reveal = document.createElement("div");
      reveal.className = "project-reveal";

      if (description) reveal.appendChild(description);

      const focusLine = document.createElement("div");
      focusLine.className = "project-focus-line";
      focusLine.innerHTML = `<span>Engineering focus</span><span>${escapeHtml(projectFocus(title.textContent))}</span>`;
      reveal.appendChild(focusLine);

      if (links.length) {
        const linksWrap = document.createElement("div");
        linksWrap.className = "project-reveal__links";
        links.forEach(link => linksWrap.appendChild(link));
        reveal.appendChild(linksWrap);
      }

      title.after(reveal);
      card.insertAdjacentHTML("afterbegin", projectVisual(title.textContent));

      card.addEventListener("pointerenter", () => setActiveProject(grid, card));
      card.addEventListener("pointerleave", event => {
        if (event.relatedTarget && card.contains(event.relatedTarget)) return;
        clearActiveProject(grid, card);
      });
      card.addEventListener("focusin", () => setActiveProject(grid, card));
      card.addEventListener("focusout", event => {
        if (event.relatedTarget && card.contains(event.relatedTarget)) return;
        clearActiveProject(grid, card);
      });
    });
  }

  function setActiveProject(grid, card) {
    if (!finePointer && !card.matches(":focus-within")) return;
    grid.classList.add("has-project-focus");
    grid.querySelectorAll(".published-project").forEach(item => item.classList.toggle("is-project-active", item === card));
  }

  function clearActiveProject(grid, card) {
    card.classList.remove("is-project-active");
    if (!grid.querySelector(".published-project:hover, .published-project:focus-within")) {
      grid.classList.remove("has-project-focus");
      grid.querySelectorAll(".published-project").forEach(item => item.classList.remove("is-project-active"));
    }
  }

  function projectFocus(title) {
    const normalized = title.toLowerCase();
    return FOCUS_BY_PROJECT.find(([needle]) => normalized.includes(needle))?.[1] || "Clear system structure & implementation";
  }

  function projectVisual(title) {
    const normalized = title.toLowerCase();
    let kind = "layers";
    if (normalized.includes("ordanis")) kind = "workflow";
    else if (normalized.includes("synapse")) kind = "services";
    else if (normalized.includes("digital twin")) kind = "spatial";
    else if (normalized.includes("taskpilot")) kind = "retrieval";
    else if (normalized.includes("sales")) kind = "data";

    const visuals = {
      workflow: `<svg viewBox="0 0 280 170" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><path d="M20 88H74L98 48H148L174 88H246"/><path d="M98 48V20M174 88V136H232" stroke-dasharray="5 8"/><circle cx="74" cy="88" r="7"/><circle cx="98" cy="48" r="7"/><circle cx="148" cy="48" r="7"/><circle cx="174" cy="88" r="7"/><rect x="218" y="123" width="44" height="26" rx="5"/></g></svg>`,
      services: `<svg viewBox="0 0 280 170" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><rect x="18" y="28" width="66" height="36" rx="7"/><rect x="107" y="68" width="66" height="36" rx="7"/><rect x="196" y="28" width="66" height="36" rx="7"/><path d="M84 46H118V68M173 86H211V64M140 104V143"/><circle cx="140" cy="148" r="7"/></g></svg>`,
      spatial: `<svg viewBox="0 0 280 170" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><path d="M30 32H240V140H30z"/><path d="M30 70H240M30 108H240M80 32V140M134 32V140M190 32V140" opacity=".6"/><path d="M80 108L134 70L190 108"/><circle cx="80" cy="108" r="6"/><circle cx="134" cy="70" r="6"/><circle cx="190" cy="108" r="6"/></g></svg>`,
      retrieval: `<svg viewBox="0 0 280 170" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><circle cx="42" cy="84" r="16"/><circle cx="138" cy="46" r="16"/><circle cx="138" cy="122" r="16"/><circle cx="236" cy="84" r="16"/><path d="M58 80L122 52M58 90L122 116M154 52L220 80M154 116L220 90" stroke-dasharray="5 7"/></g></svg>`,
      data: `<svg viewBox="0 0 280 170" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><path d="M30 138H252M38 128V82H72V128M92 128V54H126V128M146 128V92H180V128M200 128V34H234V128"/><path d="M38 68L108 42L164 70L217 26" stroke-dasharray="5 7"/></g></svg>`,
      layers: `<svg viewBox="0 0 280 170" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><rect x="34" y="30" width="212" height="28" rx="6"/><rect x="54" y="72" width="172" height="28" rx="6"/><rect x="74" y="114" width="132" height="28" rx="6"/><path d="M140 58V72M140 100V114" stroke-dasharray="4 5"/></g></svg>`
    };

    return `<div class="project-schematic project-schematic--${kind}" aria-hidden="true">${visuals[kind]}</div>`;
  }

  function enhanceRoadmap() {
    const track = document.querySelector(".build-roadmap");
    if (!track || track.dataset.roadmapUpgrade === "true") return;
    track.dataset.roadmapUpgrade = "true";

    const cards = Array.from(track.querySelectorAll(":scope > .roadmap-card"));
    if (!cards.length) return;

    cards.forEach(card => {
      const title = card.querySelector("h4")?.textContent || "Project";
      const paragraph = card.querySelector("p");
      card.tabIndex = 0;
      if (paragraph && !card.querySelector(".roadmap-focus-kicker")) {
        const kicker = document.createElement("span");
        kicker.className = "roadmap-focus-kicker";
        kicker.textContent = `Engineering focus · ${roadmapFocus(title)}`;
        paragraph.before(kicker);
      }
    });

    bindRoadmapFocus(track);
  }

  function roadmapFocus(title) {
    const normalized = title.toLowerCase();
    if (normalized.includes("payment")) return "reliable distributed backend behavior";
    if (normalized.includes("ai chat")) return "retrieval + streaming application flow";
    if (normalized.includes("messaging")) return "real-time delivery semantics";
    if (normalized.includes("ticket")) return "concurrency-aware reservations";
    if (normalized.includes("cloud storage")) return "permissions + storage workflows";
    if (normalized.includes("url shortener")) return "small, clean backend primitives";
    if (normalized.includes("streamly")) return "end-to-end application structure";
    if (normalized.includes("zipcart")) return "practical full-stack implementation";
    return "implementation depth";
  }

  function bindRoadmapFocus(track) {
    track.addEventListener("pointerover", event => {
      const card = event.target.closest(".roadmap-card");
      if (!card) return;
      track.classList.add("has-roadmap-focus");
      track.querySelectorAll(".roadmap-card").forEach(item => item.classList.toggle("is-roadmap-active", item === card));
    });

    track.addEventListener("pointerout", event => {
      const card = event.target.closest(".roadmap-card");
      if (!card || (event.relatedTarget && card.contains(event.relatedTarget))) return;
      card.classList.remove("is-roadmap-active");
      if (!event.relatedTarget?.closest?.(".roadmap-card")) {
        track.classList.remove("has-roadmap-focus");
        track.querySelectorAll(".roadmap-card").forEach(item => item.classList.remove("is-roadmap-active"));
      }
    });

    track.addEventListener("focusin", event => {
      const card = event.target.closest(".roadmap-card");
      if (!card) return;
      track.classList.add("has-roadmap-focus");
      track.querySelectorAll(".roadmap-card").forEach(item => item.classList.toggle("is-roadmap-active", item === card));
    });

    track.addEventListener("focusout", event => {
      if (event.relatedTarget && track.contains(event.relatedTarget)) return;
      track.classList.remove("has-roadmap-focus");
      track.querySelectorAll(".roadmap-card").forEach(item => item.classList.remove("is-roadmap-active"));
    });
  }

  function bindMotifPointer() {
    if (!finePointer || reduceMotion) return;

    document.addEventListener("pointermove", event => {
      activeMotifSection = document.elementFromPoint(event.clientX, event.clientY)?.closest?.(
        ".hero, #about, #coursework, #projects, .journey, #contact"
      );
      if (!activeMotifSection || motifPointerFrame) return;

      const clientX = event.clientX;
      const clientY = event.clientY;
      motifPointerFrame = requestAnimationFrame(() => {
        motifPointerFrame = null;
        const rect = activeMotifSection.getBoundingClientRect();
        const x = ((clientX - rect.left) / Math.max(rect.width, 1)) * 100;
        const y = ((clientY - rect.top) / Math.max(rect.height, 1)) * 100;
        const motif = activeMotifSection.querySelector(":scope > .system-motif");
        motif?.style.setProperty("--motif-x", `${Math.max(0, Math.min(100, x))}%`);
        motif?.style.setProperty("--motif-y", `${Math.max(0, Math.min(100, y))}%`);
      });
    }, { passive: true });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
