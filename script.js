/* =========================================================
   SAHIL — Portfolio (plain HTML/CSS/JS version)
   Edit the DATA objects below to change content.
   ========================================================= */

/* ---------- 1. CONTENT DATA (edit here) ---------- */

const skills = [
  ["01", "UI/UX DESIGN", "Digital products shaped around clarity, rhythm and human behavior.", "◯"],
  ["02", "USER RESEARCH", "Turning observation and evidence into confident product decisions.", "⌁"],
  ["03", "WIREFRAMING", "Finding the strongest structure before the surface takes form.", "╱╲"],
  ["04", "PROTOTYPING", "Making ideas tangible, testable and ready to experience.", "→"],
  ["05", "VISUAL DESIGN", "Distinct systems where type, image and space work together.", "✦"],
  ["06", "BRANDING", "Identities with a clear voice and a memorable visual language.", "◇"],
  ["07", "MOTION DESIGN", "Purposeful movement that guides attention and adds character.", "↗"],
  ["08", "INTERACTION DESIGN", "Responsive details that make digital experiences feel alive.", "+"],
];

const projects = [
  { number: "01", title: "NOVA", category: "AI PRODUCTIVITY / CAREER", description: "An intelligent digital experience designed to simplify career discovery and decision-making.", tools: "FIGMA · AFTER EFFECTS", image: "assets/nova-project.jpg", alt: "NOVA career platform dashboard interface" },
  { number: "02", title: "NEXA", category: "JOB DISCOVERY PLATFORM", description: "A focused search experience that helps ambitious people find the right opportunity without the noise.", tools: "FIGMA · USER RESEARCH", image: "assets/nexa-project.jpg", alt: "NEXA job discovery platform interface" },
  { number: "03", title: "MISE", category: "RECIPE / MEAL PLANNING", description: "A calmer way to plan, discover and prepare food through an inviting editorial interface.", tools: "FIGMA · PHOTOSHOP", image: "assets/mise-project.jpg", alt: "MISE meal planning desktop and mobile interfaces" },
  { number: "04", title: "PULSE", category: "FITNESS / WELLNESS", description: "Personal routines, progress and positive momentum gathered in one precise mobile experience.", tools: "FIGMA · AFTER EFFECTS", image: "assets/pulse-project.jpg", alt: "PULSE personalized fitness mobile interfaces" },
  { number: "05", title: "FORM", category: "FASHION E-COMMERCE", description: "A confident shopping experience where product, material and editorial storytelling share the stage.", tools: "FIGMA · ILLUSTRATOR", image: "assets/form-project.jpg", alt: "FORM fashion ecommerce interface" },
];

const tools = ["Figma", "Adobe Photoshop", "Illustrator", "Adobe XD", "After Effects", "Premiere Pro", "InDesign", "VS Code", "Bootstrap"];

/* WhatsApp contact used for the contact link and project enquiries. */
const WHATSAPP_NUMBER = "917081332685";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/* ---------- 2. RENDER CONTENT INTO THE PAGE ---------- */

function renderHeroTitle() {
  const el = document.getElementById("hero-title");
  const word = "PORTFOLIO";
  el.innerHTML = "";
  [...word].forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.dataset.index = index;
    el.appendChild(span);
  });
}

function renderSkills() {
  const container = document.getElementById("skill-rows");
  container.innerHTML = "";
  const rows = [skills.slice(0, 4), skills.slice(4, 8)];
  rows.forEach((row, rowIndex) => {
    const rowEl = document.createElement("div");
    rowEl.className = `skill-row skill-row-${rowIndex + 1}`;
    // duplicate row items for the seamless marquee loop
    [...row, ...row].forEach(([number, title, description, visual]) => {
      const tile = document.createElement("article");
      tile.className = "skill-tile";
      tile.innerHTML = `
        <span class="skill-number">${number}</span>
        <span class="skill-visual">${visual}</span>
        <h3>${title}</h3>
        <p>${description}</p>
      `;
      rowEl.appendChild(tile);
    });
    container.appendChild(rowEl);
  });
}

function renderProjects() {
  const container = document.getElementById("project-stack");
  container.innerHTML = "";
  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.project = "";
    card.style.setProperty("--stack-index", index);
    const subject = encodeURIComponent(`${project.title} case study`);
    card.innerHTML = `
      <div class="project-head"><span>${project.number} / ${String(projects.length).padStart(2, "0")}</span><span>${project.category}</span></div>
      <div class="project-body">
        <div class="project-copy">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <span>${project.tools}</span>
        </div>
        <img src="${project.image}" alt="${project.alt}" loading="lazy" width="1536" height="896" />
      </div>
      <a href="${WHATSAPP_URL}?text=${subject}" class="project-link" target="_blank" rel="noopener noreferrer" data-magnetic>ASK ABOUT PROJECT <span>↗</span></a>
    `;
    container.appendChild(card);
  });
}

function renderTools() {
  const container = document.getElementById("tool-cloud");
  container.innerHTML = "";
  tools.forEach((tool, index) => {
    const span = document.createElement("span");
    if (index % 3 === 1) span.classList.add("tool-accent");
    span.dataset.cursorHover = "+";
    span.innerHTML = `<i>${String(index + 1).padStart(2, "0")}</i>${tool}`;
    container.appendChild(span);
  });
}

function wireContactLinks() {
  document.getElementById("contact-link").href = `${WHATSAPP_URL}?text=Hello%20Sahil%2C%20I%20visited%20your%20portfolio.`;
}

/* ---------- 3. NAV MENU (mobile) ---------- */

function setupMenu() {
  const menuButton = document.getElementById("menu-button");
  const menuLabel = document.getElementById("menu-button-label");
  const navLinks = document.getElementById("nav-links");

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("nav-links-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuLabel.textContent = isOpen ? "CLOSE" : "MENU";
  });

  navLinks.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav-links-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuLabel.textContent = "MENU";
    });
  });
}

/* ---------- 4. HERO LETTER HOVER EFFECT ---------- */

function setupHeroLetters() {
  const letters = document.querySelectorAll("#hero-title span");
  letters.forEach((letter) => {
    letter.addEventListener("mouseenter", () => {
      const hoveredIndex = Number(letter.dataset.index);
      letters.forEach((el) => {
        const distance = Math.abs(hoveredIndex - Number(el.dataset.index));
        el.classList.remove("hero-letter-active", "hero-letter-neighbor");
        if (distance === 0) el.classList.add("hero-letter-active");
        else if (distance === 1) el.classList.add("hero-letter-neighbor");
      });
    });
    letter.addEventListener("mouseleave", () => {
      letters.forEach((el) => el.classList.remove("hero-letter-active", "hero-letter-neighbor"));
    });
  });
}

/* ---------- 5. CUSTOM CURSOR ---------- */

function setupCursor() {
  const cursor = document.querySelector("[data-cursor]");
  const label = cursor.querySelector("span");
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer) {
    cursor.style.display = "none";
    return;
  }

  const moveX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
  const moveY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
  window.addEventListener("mousemove", (event) => {
    moveX(event.clientX);
    moveY(event.clientY);
  });

  function setMode(mode) {
    label.textContent = mode || "";
    cursor.classList.toggle("custom-cursor-active", Boolean(mode));
  }

  // Elements that change the cursor label on hover
  const hoverTargets = [
    { selector: ".skill-tile", mode: "EXPLORE" },
    { selector: ".project-card", mode: "VIEW" },
    { selector: "#contact-link", mode: "GO" },
    { selector: "[data-cursor-hover]", mode: "+" },
  ];

  hoverTargets.forEach(({ selector, mode }) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("mouseenter", () => setMode(mode));
      el.addEventListener("mouseleave", () => setMode(""));
    });
  });

  document.querySelectorAll("[data-cursor-hover]").forEach((el) => {
    el.addEventListener("mouseenter", () => setMode(el.dataset.cursorHover || "+"));
    el.addEventListener("mouseleave", () => setMode(""));
  });
}

/* ---------- 6. MAGNETIC BUTTONS (project links, contact link) ---------- */

function setupMagnetic() {
  const targets = document.querySelectorAll("[data-magnetic], #contact-link");
  targets.forEach((el) => {
    el.addEventListener("mousemove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
      gsap.to(el, { x, y, duration: 0.35, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
    });
  });
}

/* ---------- 7. SCROLL ANIMATIONS (GSAP + ScrollTrigger) ---------- */

function setupScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  // Fade/blur reveal for elements marked [data-reveal]
  gsap.utils.toArray("[data-reveal]").forEach((element) => {
    gsap.fromTo(
      element,
      { y: 48, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.15,
        ease: "power4.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
      }
    );
  });

  // Dim/brighten process steps as they enter/leave view
  gsap.utils.toArray("[data-process]").forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0.28 },
      {
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 68%",
          end: "bottom 45%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });

  // Stack/scale effect for project cards
  const projectCards = gsap.utils.toArray("[data-project]");
  projectCards.forEach((card, index) => {
    if (index < projectCards.length - 1) {
      gsap.to(card, {
        scale: 0.94,
        rotate: index % 2 ? 0.6 : -0.6,
        opacity: 0.72,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top 12%", end: "+=90%", scrub: true },
      });
    }
  });

  // Floating hero glow
  gsap.to("[data-hero-glow]", {
    xPercent: 8,
    yPercent: -6,
    scale: 1.12,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

/* ---------- 8. INIT ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderHeroTitle();
  renderSkills();
  renderProjects();
  renderTools();
  wireContactLinks();

  setupMenu();
  setupHeroLetters();
  setupCursor();
  setupMagnetic();
  setupScrollAnimations();
});
