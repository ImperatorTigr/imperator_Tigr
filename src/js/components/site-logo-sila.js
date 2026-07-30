class SiteLogoSila extends HTMLElement {
  connectedCallback() {
    const inSubfolder = window.location.pathname.includes("/blog/");
    const home = inSubfolder ? "../index.html" : "./";

    // ── Лицевая сторона: кириллица ──
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

        <!-- Фаза 2: прямоугольники + Т + ИГРА -->
        <g class="sila-phase-2">
          <rect class="sila-rect-left"  x="20" y="20" width="120" height="260" rx="22"/>
          <rect class="sila-rect-right" x="160" y="20" width="120" height="260" rx="22"/>

          <g class="sila-t-group">
            <path class="sila-t-shape"
                  d="M100,28 L200,28 L200,56 L172,56 L172,118 L128,118 L128,56 L100,56 Z"/>
            <path class="sila-t-stripes"
                  d="M100,28 L200,28 L200,56 L172,56 L172,118 L128,118 L128,56 L100,56 Z"
                  fill="url(#tigerStripes)"/>
          </g>

          <text class="sila-igra-letter" style="--delay:2.6s"  x="150" y="142">И</text>
          <text class="sila-igra-letter" style="--delay:2.78s" x="150" y="182">Г</text>
          <text class="sila-igra-letter" style="--delay:2.96s" x="150" y="222">Р</text>
          <text class="sila-igra-letter" style="--delay:3.14s" x="150" y="262">А</text>
        </g>
      </svg>
    `;

    // ── Обратная сторона: латиница ──
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
                  d="M100,28 L200,28 L200,56 L172,56 L172,118 L128,118 L128,56 L100,56 Z"/>
            <path class="sila-t-stripes"
                  d="M100,28 L200,28 L200,56 L172,56 L172,118 L128,118 L128,56 L100,56 Z"
                  fill="url(#tigerStripesBack)"/>
          </g>

          <text class="sila-igra-back" x="150" y="142">I</text>
          <text class="sila-igra-back" x="150" y="182">G</text>
          <text class="sila-igra-back" x="150" y="222">R</text>
          <text class="sila-igra-back" x="150" y="262">A</text>
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

    setTimeout(() => {
      link.classList.add("is-ready");
    }, 4200);

    const hasHover = window.matchMedia("(hover:hover)").matches;

    if (!hasHover) {
      link.addEventListener("click", e => {
        e.preventDefault();
        link.classList.toggle("is-flipped");
      });
    }
  }
}

customElements.define("site-logo-sila", SiteLogoSila);