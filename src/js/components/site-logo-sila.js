function buildFace(letters,includeDefs){

    const chip=(pos,x,y,ch,delay)=>`

<rect class="sila-chip-rect" x="${x}" y="${y}" width="130" height="130" rx="18" style="--chip-delay:${delay}"/>

<text class="sila-chip-letter" x="${x+65}" y="${y+67}" style="--chip-delay:${delay}">${ch}</text>

`;

    const defs=includeDefs?`

<defs>

<linearGradient id="silaGold" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="var(--gold-light)"/>
<stop offset="50%" stop-color="var(--gold-mid)"/>
<stop offset="100%" stop-color="var(--gold-deep)"/>
</linearGradient>

</defs>

`:"";

    return `

<svg class="sila-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">

${defs}

${chip("tl",10,10,letters.tl,"0s")}
${chip("tr",160,10,letters.tr,".12s")}
${chip("bl",10,160,letters.bl,".24s")}
${chip("br",160,160,letters.br,".36s")}

<path class="sila-hint" transform="translate(150,150)"
      d="M-4 -22 C-24 -22 -32 -6 -22 10 C-14 22 6 22 14 10"/>

<path class="sila-hint" transform="translate(150,150)"
      d="M14 10 L20 4 M14 10 L6 16" fill="none"/>

<g class="sila-flag-group">

<rect class="sila-flag-shape" x="115" y="-30" width="70" height="24" rx="6"/>

<rect class="sila-flag-shape" x="137" y="-6" width="26" height="110" rx="5"/>

<line class="sila-flag-stripe" x1="122" y1="-24" x2="136" y2="-8"/>

<line class="sila-flag-stripe" x1="136" y1="-24" x2="150" y2="-8"/>

<line class="sila-flag-stripe" x1="150" y1="-24" x2="164" y2="-8"/>

<line class="sila-flag-stripe" x1="141" y1="8" x2="155" y2="22"/>

<line class="sila-flag-stripe" x1="141" y1="32" x2="155" y2="46"/>

<line class="sila-flag-stripe" x1="141" y1="56" x2="155" y2="70"/>

<line class="sila-flag-stripe" x1="141" y1="80" x2="155" y2="94"/>

</g>

<text class="sila-igra-letter" x="150" y="135">${letters.igra[0]}</text>

<text class="sila-igra-letter" x="150" y="181">${letters.igra[1]}</text>

<text class="sila-igra-letter" x="150" y="227">${letters.igra[2]}</text>

<text class="sila-igra-letter" x="150" y="273">${letters.igra[3]}</text>

</svg>

`;

}

class SiteLogoSila extends HTMLElement{

    connectedCallback(){

        const front=buildFace({tl:"С",tr:"А",bl:"И",br:"Л",igra:["И","Г","Р","А"]},true);

        const back=buildFace({tl:"S",tr:"A",bl:"I",br:"L",igra:["I","G","R","A"]},false);

        this.innerHTML=`

<a href="./" class="sila-logo" aria-label="СИЛА — Т-ИГРА">

<div class="sila-flip">

<div class="sila-face sila-face-front">${front}</div>

<div class="sila-face sila-face-back">${back}</div>

</div>

</a>

`;

        const inSubfolder=window.location.pathname.includes("/blog/");

        const home=inSubfolder?"../index.html":"./";

        const link=this.querySelector(".sila-logo");

        link.setAttribute("href",home);

        setTimeout(()=>{

            link.classList.add("is-ready");

        },3200);

        const hasHover=window.matchMedia("(hover:hover)").matches;

        if(!hasHover){

            link.addEventListener("click",e=>{

                e.preventDefault();

                link.classList.toggle("is-flipped");

            });

        }

    }

}

customElements.define("site-logo-sila",SiteLogoSila);