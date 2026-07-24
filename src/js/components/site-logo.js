class SiteLogo extends HTMLElement{

    connectedCallback(){

        this.innerHTML=`

<a href="./"
   class="logo-cube"
   aria-label="IMPERATOR — Tigr">

<svg class="logo-svg"
     viewBox="0 0 300 300"
     xmlns="http://www.w3.org/2000/svg">

<defs>

<linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%"  stop-color="var(--gold-light)"/>
<stop offset="50%" stop-color="var(--gold-mid)"/>
<stop offset="100%" stop-color="var(--gold-deep)"/>
</linearGradient>

</defs>

<rect class="logo-frame-outer"
      x="4" y="4" width="292" height="292" rx="48"/>

<line class="logo-grid-line" x1="100" y1="20"  x2="100" y2="280"/>
<line class="logo-grid-line" x1="200" y1="20"  x2="200" y2="280"/>
<line class="logo-grid-line" x1="20"  y1="100" x2="280" y2="100"/>
<line class="logo-grid-line" x1="20"  y1="200" x2="280" y2="200"/>

<text class="logo-letter" x="50"  y="50">I</text>
<text class="logo-letter" x="150" y="50">M</text>
<text class="logo-letter" x="250" y="50">P</text>

<text class="logo-letter" x="50"  y="150">E</text>
<text class="logo-letter" x="150" y="150">R</text>
<text class="logo-letter" x="250" y="150">A</text>

<text class="logo-letter" x="50"  y="250">T</text>
<text class="logo-letter" x="150" y="250">O</text>
<text class="logo-letter" x="250" y="250">R</text>

<text class="logo-word" x="150" y="150">Tigr</text>

</svg>

</a>

`;

    }

}

customElements.define("site-logo",SiteLogo);