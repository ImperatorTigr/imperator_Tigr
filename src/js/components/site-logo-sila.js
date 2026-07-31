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

        <!-- Фаза 1: квадрат + сетка + СИЛА (сетка и буквы остаются) -->
        <g class="sila-phase-1">
          <rect class="sila-frame" x="20" y="20" width="260" height="260" rx="26"/>
          <line class="sila-grid-line" x1="150" y1="20" x2="150" y2="280"/>
          <line class="sila-grid-line" x1="20" y1="150" x2="280" y2="150"/>

          <text class="sila-letter" style="--delay:.8s"  x="85" y="85">С</text>
          <text class="sila-letter" style="--delay:1.0s" x="85" y="215">И</text>
          <text class="sila-letter" style="--delay:1.2s" x="215" y="215">Л</text>
          <text class="sila-letter" style="--delay:1.4s" x="215" y="85">А</text>
        </g>

        <!-- Фаза 2: прямоугольники + Т + подложка + ИГРА -->
        <g class="sila-phase-2">
          <rect class="sila-rect-left"  x="20" y="20" width="120" height="260" rx="22"/>
          <rect class="sila-rect-right" x="160" y="20" width="120" height="260" rx="22"/>

          <g class="sila-t-group">
            <path class="sila-t-shape"
                  d="M90,28 L210,28 L210,56 L158,56 L158,118 L142,118 L142,56 L90,56 Z"/>
            <path class="sila-t-stripes"
                  d="M90,28 L210,28 L210,56 L158,56 L158,118 L142,118 L142,56 L90,56 Z"
                  fill="url(#tigerStripes)"/>
          </g>

          <!-- Белая подложка для ИГРА, продолжение ноги Т -->
          <rect class="sila-igra-bg" x="140" y="118" width="20" height="162" rx="4"/>

          <text class="sila-igra-letter" style="--delay:2.6s"  x="150" y="148">И</text>
          <text class="sila-igra-letter" style="--delay:2.78s" x="150" y="188">Г</text>
          <text class="sila-igra-letter" style="--delay:2.96s" x="150" y="228">Р</text>
          <text class="sila-igra-letter" style="--delay:3.14s" x="150" y="268">А</text>
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
          <rect class="sila-rect-left"  x="20" y="20" width="120" height="260" rx="22"/>
          <rect class="sila-rect-right" x="160" y="20" width="120" height="260" rx="22"/>

          <g class="sila-t-group">
            <path class="sila-t-shape"
                  d="M90,28 L210,28 L210,56 L158,56 L158,118 L142,118 L142,56 L90,56 Z"/>
            <path class="sila-t-stripes"
                  d="M90,28 L210,28 L210,56 L158,56 L158,118 L142,118 L142,56 L90,56 Z"
                  fill="url(#tigerStripesBack)"/>
          </g>

          <rect class="sila-igra-bg" x="140" y="118" width="20" height="162" rx="4"/>

          <text class="sila-igra-back" x="150" y="148">I</text>
          <text class="sila-igra-back" x="150" y="188">G</text>
          <text class="sila-igra-back" x="150" y="228">R</text>
          <text class="sila-igra-back" x="150" y="268">A</text>
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
  }
}
customElements.define("site-logo-sila", SiteLogoSila);