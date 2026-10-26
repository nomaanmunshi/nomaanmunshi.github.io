# Refresh review — 25 October 2026

## Content sources

Existing repository at 4f7286b; live portfolio; user-supplied October CV; Ordanis repository README; actual Ordanis public demo.

The latest supplied CV is the source for education dates and leadership. The CV's third-year status, coursework-completion statement and planned enrollment through 2027 are retained as user-provided statements. They are not independently verified. No internship availability appears on the site.

## Changes

Reused the static deployment, project card structure, portrait, signature and document assets. Consolidated content previously injected by three separate scripts into HTML. Centralized both palettes, restrained glass to navigation, removed scroll hijacking and continuous animation, and added accessible mobile navigation, native anchors and reduced-motion support. Included canonical, social metadata and a matching favicon.

The previous downloadable CV included an intelliCard internship claim absent from the supplied CV. It was replaced. The updated CV uses concrete descriptions instead of unmeasured high-throughput/scalability claims. Date of birth and nationality were omitted from the general public CV; technical skills, selected grades, scholarship and project/leadership content were retained. Embedded skills are labelled ongoing.

## Link review

Verified HTTP 200: GitHub profile, Ordanis repository and live demo, Synapse healthcare repository, Krotoski digital twin, TaskPilot AI and sales tracker. Updated confirmed old-account redirects to the current account. All local PDFs and images exist.

Two legacy repositories return 404: `nomannn13/SOFTWARE-ENGINEERING-UNIVERSITY-PROJECT` and `nomannn13/synapse-hea-java-phase2`. Retained their descriptions, marked source unavailable and retained original URLs in data attributes for later repair. GitHub 404 cannot distinguish private, renamed and deleted repositories. LinkedIn blocks automated access (HTTP 999); preserved the profile URL supplied in the CV. Email links are syntactically valid; delivery was not tested.

## Remaining facts to confirm

- Replacement/public links for the two unavailable repositories.
- Current status of the older roadmap items; retained as earlier plans with obsolete deadlines removed.
- Any changes since the supplied CV to education dates, coursework completion or representative role.
- Current internship availability, only if it should appear publicly.

## Validation

Browser checks cover 1440, 768, 390 and 320 px in both themes, theme persistence, system preference, mobile menu Escape behavior, internal anchor targets, image loading and runtime errors. Project content and CV links remain available with JavaScript disabled. Automated axe WCAG A/AA checks run in both themes at desktop and 320 px; see final task report for results. CV visually reviewed as a single-page PDF, with selectable text and working hyperlink annotations.

No pre-existing test suite or package build exists. Run `node --check script.js` and `git diff --check` for syntax/patch checks.
