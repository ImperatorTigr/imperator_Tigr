class SiteLogoSila extends HTMLElement {
  connectedCallback() {
    const inSubfolder = window.location.pathname.includes("/blog/");
    const home = inSubfolder ? "../index.html" : "./";

    const svgFront = `
      <svg class="sila-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="silaGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="var(--gold-light)"/>
            <stop offset="50%" stop-color="var(--gold-mid)"/>
            <stop offset="100%" stop-color="var(--gold-deep)"/>
          </linearGradient>
          <pattern id="tigerStripes" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
            <rect width="7" height="14" fill="rgba(20,18,15,0.18)"/>
          </pattern>
        </defs>

        <!-- Фаза 1: квадрат + сетка + СИЛА -->
        <g class="sila-phase-1">
          <rect class="sila-frame" x="20" y="20" width="260" height="260" rx="26"/>
          <line class="sila-grid-line" x1="150" y1="20" x2="150" y2="280"/>
          <line class="sila-grid-line" x1="20" y1="150" x2="280" y2="150"/>

          <text class="sila-letter" style="--delay:.8s"  x="85" y="85">С</text>
          <text class="sila-letter" style="--delay:1.0s" x="85" y="215">И</text>
          <text class="sila-letter" style="--delay:1.2s" x="215" y="215">Л</text>
          <text class="sila-letter" style="--delay:1.4s" x="215" y="85">А</text>
        </g>

        <!-- Фаза 2: прямоугольники (прямые внутренние углы) + Т + подложка + ИГРА -->
        <g class="sila-phase-2">
  <path class="sila-rect-left"
        d="M20,42 A22,22 0 0,1 42,20 L140,20 L140,280 L42,280 A22,22 0 0,1 20,258 Z"/>
  <path class="sila-rect-right"
        d="M160,20 L258,20 A22,22 0 0,1 280,42 L280,258 A22,22 0 0,1 258,280 L160,280 Z"/>

  <g class="sila-t-group">
    <!-- Шапка 80px (110-190), нога 34px (133-167) -->
    <path class="sila-t-shape"
          d="M110,8 L190,8 L190,32 L167,32 L167,100 L133,100 L133,32 L110,32 Z"/>
    <path class="sila-t-stripes"
          d="M110,8 L190,8 L190,32 L167,32 L167,100 L133,100 L133,32 L110,32 Z"
          fill="url(#tigerStripes)"/>
  </g>

  <!-- Подложка: ширина = ноге Т (34px), центрирована -->
  <rect class="sila-igra-bg" x="133" y="100" width="34" height="183"/>

  <!-- Точки и ИГРА: без изменений -->
  <circle class="sila-igra-dot" cx="150" cy="145" r="2.5" style="--dot-delay:0s"/>
  <circle class="sila-igra-dot" cx="150" cy="193" r="2.5" style="--dot-delay:0.25s"/>
  <circle class="sila-igra-dot" cx="150" cy="241" r="2.5" style="--dot-delay:0.5s"/>

  <text class="sila-igra-letter" style="--delay:2.6s"  x="150" y="121">И</text>
  <text class="sila-igra-letter" style="--delay:2.78s" x="150" y="169">Г</text>
  <text class="sila-igra-letter" style="--delay:2.96s" x="150" y="217">Р</text>
  <text class="sila-igra-letter" style="--delay:3.14s" x="150" y="263">А</text>
</g>
      </svg>
    `;

    const svgBack = `
      <svg class="sila-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="silaGoldBack" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="var(--gold-light)"/>
            <stop offset="50%" stop-color="var(--gold-mid)"/>
            <stop offset="100%" stop-color="var(--gold-deep)"/>
          </linearGradient>
          <pattern id="tigerStripesBack" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
            <rect width="7" height="14" fill="rgba(20,18,15,0.18)"/>
          </pattern>
        </defs>

        <g class="sila-phase-1-back">
          <rect class="sila-frame" x="20" y="20" width="260" height="260" rx="26"/>
          <line class="sila-grid-line" x1="150" y1="20" x2="150" y2="280"/>
          <line class="sila-grid-line" x1="20" y1="150" x2="280" y2="150"/>

          <text class="sila-letter-back" x="85" y="85">S</text>
          <text class="sila-letter-back" x="85" y="215">I</text>
          <text class="sila-letter-back" x="215" y="215">L</text>
          <text class="sila-letter-back" x="215" y="85">A</text>
        </g>

        <g class="sila-phase-2-back">
  <path class="sila-rect-left"
        d="M20,42 A22,22 0 0,1 42,20 L140,20 L140,280 L42,280 A22,22 0 0,1 20,258 Z"/>
  <path class="sila-rect-right"
        d="M160,20 L258,20 A22,22 0 0,1 280,42 L280,258 A22,22 0 0,1 258,280 L160,280 Z"/>

  <g class="sila-t-group">
    <path class="sila-t-shape"
          d="M110,8 L190,8 L190,32 L167,32 L167,100 L133,100 L133,32 L110,32 Z"/>
    <path class="sila-t-stripes"
          d="M110,8 L190,8 L190,32 L167,32 L167,100 L133,100 L133,32 L110,32 Z"
          fill="url(#tigerStripesBack)"/>
  </g>

  <rect class="sila-igra-bg" x="133" y="100" width="34" height="183"/>

  <circle class="sila-igra-dot" cx="150" cy="145" r="2.5" style="--dot-delay:0s"/>
  <circle class="sila-igra-dot" cx="150" cy="193" r="2.5" style="--dot-delay:0.25s"/>
  <circle class="sila-igra-dot" cx="150" cy="241" r="2.5" style="--dot-delay:0.5s"/>

  <text class="sila-igra-back" x="150" y="121">I</text>
  <text class="sila-igra-back" x="150" y="169">G</text>
  <text class="sila-igra-back" x="150" y="217">R</text>
  <text class="sila-igra-back" x="150" y="263">A</text>
</g>
      </svg>
    `;

    this.innerHTML = `
      <a href="${home}" class="sila-logo" aria-label="СИЛА — Т-ИГРА">
        <div class="sila-flip">
          <div class="sila-face sila-face-front">${svgFront}</div>
          <div class="sila-face sila-face-back">${svgBack}</div>
        </div>
      </a>
    `;

    const link = this.querySelector(".sila-logo");
    setTimeout(() => { link.classList.add("is-ready"); }, 4200);

    const hasHover = window.matchMedia("(hover:hover)").matches;

    if (!hasHover) {
      link.addEventListener("click", e => { e.preventDefault(); link.classList.toggle("is-flipped"); });
    }

    /* ===== MAGNETIC HOVER EFFECT ===== */
    if (link && hasHover) {
      link.addEventListener("mousemove", (e) => {
        link.style.transition = "none";
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      link.addEventListener("mouseleave", () => {
        link.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        link.style.transform = "";
        setTimeout(() => { link.style.transition = ""; }, 500);
      });
    }
  }
}
customElements.define("site-logo-sila", SiteLogoSila);