(() => {
  "use strict";

  const LINKEDIN_URL = "https://www.linkedin.com/in/nomaan-munshi-b92927333";
  const RESUME_URL = "assets/Nomaan_Munshi_CV.pdf";
  const RECOMMENDATION_URL = "assets/Grupa_Krotoski_Recommendation.pdf";
  const SYNAPSE_DOCUMENTATION_URL = "assets/Synapse_HEA_Phase_2_Engineering_Documentation.pdf";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  injectStylesheet();
  updateDegreeLanguage();
  addResumeActions();
  addLinkedIn();
  updateLearningDirection();
  rebuildJourney();
  buildDocumentsSection();
  enhanceProjectCards();
  installSmoothAnchorScrolling();
  installAutoHideHeader();

  function injectStylesheet() {
    const old = document.querySelector('link[href*="portfolio-enhancements.css"]');
    if (old) old.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "portfolio-enhancements.css?v=20260803-5";
    document.head.appendChild(link);
  }

  function updateDegreeLanguage() {
    const replacements = [
      ["Bachelor’s degree in Information and Communications Engineering", "Bachelor’s degree in Computer, Communications and Electronic Engineering"],
      ["Bachelor's degree in Information and Communications Engineering", "Bachelor's degree in Computer, Communications and Electronic Engineering"],
      ["Bachelor’s in Information and Communications Engineering", "Bachelor’s in Computer, Communications and Electronic Engineering"]
    ];

    document.querySelectorAll(".hero-intro, .fact-card strong, .timeline-content p").forEach(element => {
      let html = element.innerHTML;
      replacements.forEach(([from, to]) => {
        html = html.replaceAll(from, to);
      });
      element.innerHTML = html;
    });

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = "Nomaan Munshi | Computer, Communications and Electronic Engineering student at the University of Trento, focused on software engineering and backend development.";
    }
  }

  function addResumeActions() {
    const heroActions = document.querySelector(".hero-actions");
    if (heroActions) {
      heroActions.querySelectorAll("[data-resume-action]").forEach(item => item.remove());

      const download = document.createElement("a");
      download.className = "button button-secondary button-cv magnetic";
      download.href = RESUME_URL;
      download.download = "Nomaan_Munshi_CV.pdf";
      download.dataset.resumeAction = "download";
      download.textContent = "Download CV";
      heroActions.appendChild(download);
    }

    const headerActions = document.querySelector(".header-actions");
    if (headerActions) {
      headerActions.querySelectorAll(".header-cv-link").forEach(item => item.remove());

      const link = document.createElement("a");
      link.className = "header-cv-link";
      link.href = RESUME_URL;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = "CV";
      link.setAttribute("aria-label", "Open Nomaan Munshi's CV in a new tab");
      headerActions.prepend(link);
    }

    const mobileMenu = document.querySelector(".mobile-menu");
    if (mobileMenu) {
      mobileMenu.querySelectorAll('[data-mobile-cv], a[href="#credentials"]').forEach(item => item.remove());

      const link = document.createElement("a");
      link.href = RESUME_URL;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.dataset.mobileCv = "true";
      link.textContent = "CV ↗";
      const contactLink = mobileMenu.querySelector('a[href="#contact"]');
      mobileMenu.insertBefore(link, contactLink || null);
      link.addEventListener("click", closeMobileMenu);
    }
  }

  function addLinkedIn() {
    const headerActions = document.querySelector(".header-actions");
    if (headerActions && !headerActions.querySelector(".header-linkedin-link")) {
      const headerLink = document.createElement("a");
      headerLink.className = "header-linkedin-link";
      headerLink.href = LINKEDIN_URL;
      headerLink.target = "_blank";
      headerLink.rel = "noreferrer";
      headerLink.textContent = "LinkedIn";
      headerLink.setAttribute("aria-label", "Open Nomaan Munshi's LinkedIn profile");
      headerActions.prepend(headerLink);
    }

    const mobileMenu = document.querySelector(".mobile-menu");
    if (mobileMenu && !mobileMenu.querySelector('a[href*="linkedin.com"]')) {
      const mobileLink = document.createElement("a");
      mobileLink.href = LINKEDIN_URL;
      mobileLink.target = "_blank";
      mobileLink.rel = "noreferrer";
      mobileLink.textContent = "LinkedIn ↗";
      const contactLink = mobileMenu.querySelector('a[href="#contact"]');
      mobileMenu.insertBefore(mobileLink, contactLink || null);
      mobileLink.addEventListener("click", closeMobileMenu);
    }

    const contactActions = document.querySelector(".contact-actions");
    if (contactActions && !contactActions.querySelector('a[href*="linkedin.com"]')) {
      const link = document.createElement("a");
      link.className = "button button-secondary magnetic";
      link.href = LINKEDIN_URL;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = "LinkedIn";
      contactActions.appendChild(link);
    }
  }

  function updateLearningDirection() {
    const priorityCard = Array.from(document.querySelectorAll(".fact-card")).find(card =>
      card.querySelector(".fact-label")?.textContent.trim() === "Current priorities"
    );

    if (priorityCard) {
      const strong = priorityCard.querySelector("strong");
      const detail = priorityCard.querySelector(":scope > span:last-child");
      if (strong) strong.textContent = "Java · Spring · C++ DSA · Python";
      if (detail) detail.textContent = "Adding AI/ML fundamentals alongside core software engineering";
    }

    const foundationTags = document.querySelector(".skill-group-wide .skill-tags");
    if (foundationTags && !foundationTags.querySelector(".learning-tag")) {
      const learning = document.createElement("span");
      learning.className = "learning-tag";
      learning.textContent = "Learning: AI/ML fundamentals";
      foundationTags.appendChild(learning);
    }

    const meta = document.querySelector(".hero-meta");
    if (meta && !Array.from(meta.children).some(item => item.textContent.includes("AI/ML"))) {
      const item = document.createElement("span");
      item.textContent = "AI/ML fundamentals";
      meta.appendChild(item);
    }
  }

  function rebuildJourney() {
    const section = document.querySelector("#journey");
    if (!section) return;

    const kicker = section.querySelector(".kicker");
    const heading = section.querySelector("h2");
    const timeline = section.querySelector(".timeline");

    if (kicker) kicker.textContent = "International experience & leadership";
    if (heading) heading.innerHTML = "Built across borders.<br><em>Responsible at home.</em>";
    if (!timeline) return;

    timeline.innerHTML = `
      <article class="timeline-item">
        <div class="timeline-date">2024 - present</div>
        <div class="timeline-content">
          <h3>University of Trento</h3>
          <p>Bachelor's degree in Computer, Communications and Electronic Engineering, supported by a merit-based scholarship.</p>
        </div>
        <div class="timeline-tag">Education</div>
      </article>

      <article class="timeline-item">
        <div class="timeline-date">2026</div>
        <div class="timeline-content">
          <h3>Politecnico di Milano</h3>
          <p>Erasmus italiano exchange at Italy's top-ranked university in the QS World University Rankings 2027, with coursework spanning artificial intelligence, databases and remote sensing.</p>
        </div>
        <div class="timeline-tag">Erasmus italiano</div>
      </article>

      <article class="timeline-item">
        <div class="timeline-date">2025 - 2026</div>
        <div class="timeline-content">
          <h3>Linköping University · ECIU Challenge</h3>
          <p>Collaborated in an international, multidisciplinary student team on a project-based challenge, strengthening adaptability, communication and rapid problem definition.</p>
        </div>
        <div class="timeline-tag">Sweden</div>
      </article>

      <article class="timeline-item">
        <div class="timeline-date">2026</div>
        <div class="timeline-content">
          <h3>Łódź University of Technology · Grupa Krotoski</h3>
          <p>Worked on an industry challenge with Grupa Krotoski involving automotive showroom and operational workflows, including Porsche showroom context, while collaborating in an international team.</p>
        </div>
        <div class="timeline-tag">Poland</div>
      </article>

      <article class="timeline-item">
        <div class="timeline-date">Jan 2026 - present</div>
        <div class="timeline-content">
          <h3>Elected Student Representative</h3>
          <p>Represent residents of the San Bartolomeo university residence, communicate shared concerns and coordinate with housing management on community and facility matters.</p>
        </div>
        <div class="timeline-tag">Leadership</div>
      </article>
    `;
  }

  function buildDocumentsSection() {
    const contact = document.querySelector("#contact");
    if (!contact) return;

    document.querySelector("#credentials")?.remove();

    const contactNumber = contact.querySelector(".section-number");
    if (contactNumber?.textContent.trim() === "06") contactNumber.textContent = "07";

    const section = document.createElement("section");
    section.id = "credentials";
    section.className = "section-shell credentials section-pad";
    section.innerHTML = `
      <div class="section-heading">
        <span class="section-number">06</span>
        <div>
          <p class="kicker">Selected documents</p>
          <h2>The work behind the interface.<br><em>Open the original PDFs.</em></h2>
        </div>
        <p class="section-aside">Project engineering evidence, a professional recommendation and my current CV - available without a complicated viewer.</p>
      </div>

      <div class="credentials-grid">
        <article class="credential-card credential-card-featured spotlight-card">
          <span class="credential-label">Independent project evidence · 36 pages</span>
          <h3>Synapse HEA<br>Phase 2 documentation</h3>
          <p>My consolidated D1, D2 and D3 planning and design record for the independent Java full-stack rebuild - covering requirements, use cases, architecture, security, database design, APIs, testing, CI/CD and deployment.</p>
          <div class="credential-actions">
            <a class="button button-primary" href="${SYNAPSE_DOCUMENTATION_URL}" target="_blank" rel="noreferrer">Open documentation ↗</a>
            <a class="button button-secondary" href="${SYNAPSE_DOCUMENTATION_URL}" download="Synapse_HEA_Phase_2_Engineering_Documentation.pdf">Download PDF</a>
          </div>
        </article>

        <article class="credential-card spotlight-card">
          <span class="credential-label">Curriculum vitae</span>
          <h3>General CV</h3>
          <p>Education, technical skills, selected software projects, international experience and student leadership.</p>
          <div class="credential-actions">
            <a class="button button-primary" href="${RESUME_URL}" target="_blank" rel="noreferrer">Open CV ↗</a>
            <a class="button button-secondary" href="${RESUME_URL}" download="Nomaan_Munshi_CV.pdf">Download PDF</a>
          </div>
        </article>

        <article class="credential-card spotlight-card">
          <span class="credential-label">Professional reference · Original</span>
          <h3>Grupa Krotoski recommendation</h3>
          <p>Signed recommendation from Sylwia Mikołajczyk, Director of Human Resources at Grupa Krotoski, following the international ESG venture challenge.</p>
          <div class="credential-actions">
            <a class="button button-primary" href="${RECOMMENDATION_URL}" target="_blank" rel="noreferrer">Open recommendation ↗</a>
            <a class="button button-secondary" href="${RECOMMENDATION_URL}" download="Grupa_Krotoski_Recommendation.pdf">Download PDF</a>
          </div>
        </article>
      </div>
    `;

    contact.before(section);
    addSynapseDocumentationActionToProject();
    addRecommendationActionToProject();
    activateSpotlights(section);
  }

  function addSynapseDocumentationActionToProject() {
    const card = Array.from(document.querySelectorAll(".published-project")).find(item => {
      const title = item.querySelector("h3")?.textContent.toLowerCase() || "";
      return title.includes("synapse") || title.includes("healthcore") || title.includes("healthcare system");
    });
    if (!card) return;

    card.querySelectorAll("[data-synapse-documentation-link]").forEach(item => item.remove());

    const link = document.createElement("a");
    link.className = "project-document-link";
    link.href = SYNAPSE_DOCUMENTATION_URL;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.dataset.synapseDocumentationLink = "true";
    link.textContent = "View Phase 2 planning & design ↗";

    const tech = card.querySelector(".project-tech");
    tech?.after(link);
  }

  function addRecommendationActionToProject() {
    const card = Array.from(document.querySelectorAll(".published-project")).find(item =>
      item.querySelector("h3")?.textContent.includes("Krotoski")
    );
    if (!card) return;

    card.querySelectorAll("[data-recommendation-project-link]").forEach(item => item.remove());

    const link = document.createElement("a");
    link.className = "project-document-link";
    link.href = RECOMMENDATION_URL;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.dataset.recommendationProjectLink = "true";
    link.textContent = "Open recommendation ↗";

    const tech = card.querySelector(".project-tech");
    tech?.after(link);
  }

  function enhanceProjectCards() {
    document.querySelectorAll(".published-project").forEach(card => {
      const repositoryLink = Array.from(card.querySelectorAll("a[href]")).find(link =>
        link.href.includes("github.com")
      );
      if (!repositoryLink) return;

      card.dataset.cardLink = "true";
      card.tabIndex = 0;
      card.setAttribute("role", "link");
      card.setAttribute("aria-label", `${card.querySelector("h3")?.textContent || "Project"}: open repository`);

      card.addEventListener("click", event => {
        if (event.target.closest("a, button")) return;
        window.open(repositoryLink.href, "_blank", "noopener,noreferrer");
      });

      card.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (event.target.closest("a, button")) return;
        event.preventDefault();
        repositoryLink.click();
      });

      card.addEventListener("focus", () => card.classList.add("is-keyboard-focused"));
      card.addEventListener("blur", () => card.classList.remove("is-keyboard-focused"));
    });
  }

  function installSmoothAnchorScrolling() {
    document.addEventListener("click", event => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const selector = anchor.getAttribute("href");
      if (!selector || selector === "#") return;

      const target = document.querySelector(selector);
      if (!target) return;

      event.preventDefault();
      closeMobileMenu();

      if (window.nomaanLenis) {
        window.nomaanLenis.scrollTo(target, { offset: -94, duration: 1.12 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 94;
        window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      }

      history.replaceState(null, "", selector);
    });
  }


  function installAutoHideHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    let lastY = Math.max(window.scrollY, 0);
    let ticking = false;
    const topZone = 32;
    const hideAfter = 84;
    const movementThreshold = 6;

    const update = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - lastY;
      const menuOpen = document.body.classList.contains("menu-open");

      if (menuOpen || currentY <= topZone) {
        header.classList.remove("header-hidden");
      } else if (delta > movementThreshold && currentY > hideAfter) {
        header.classList.add("header-hidden");
      } else if (delta < -movementThreshold) {
        header.classList.remove("header-hidden");
      }

      lastY = currentY;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    // Keep the navigation visible while the mobile menu is being opened.
    document.querySelector(".menu-toggle")?.addEventListener("click", () => {
      header.classList.remove("header-hidden");
    });

    window.addEventListener("resize", () => {
      lastY = Math.max(window.scrollY, 0);
      if (window.scrollY <= topZone) header.classList.remove("header-hidden");
    }, { passive: true });
  }

  function activateSpotlights(root = document) {
    root.querySelectorAll(".spotlight-card").forEach(card => {
      if (card.dataset.spotlightBound) return;
      card.dataset.spotlightBound = "true";
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      });
    });
  }

  function closeMobileMenu() {
    const mobileMenu = document.querySelector(".mobile-menu");
    document.body.classList.remove("menu-open");
    mobileMenu?.classList.remove("is-open");
    mobileMenu?.setAttribute("aria-hidden", "true");
    document.querySelector(".menu-toggle")?.setAttribute("aria-expanded", "false");
  }
})();
