function buildFace(faceId,letters){

    const chip=(pos,cx,cy,rx,ry,ch,delay)=>`

<rect class="sila-chip-rect sila-chip-${pos}" x="${cx}" y="${cy}" width="${rx}" height="${ry}" rx="18" style="--chip-delay:${delay}"/>

<text class="sila-chip-letter" x="${cx+rx/2}" y="${cy+ry/2+2}" style="--chip-delay:${delay}">${ch}</text>

`;

    return `

<svg class="sila-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">

<defs>

<linearGradient id="silaGold${faceId}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="var(--gold-light)"/>
<stop offset="50%" stop-color="var(--gold-mid)"/>
<stop offset="100%" stop-color="var(--gold-deep)"/>
</linearGradient>

</defs>

${chip("tl",10,10,130,130,letters.tl,"0s")}
${chip("tr",160,10,130,130,letters.tr,".12s")}
${chip("bl",10,160,130,130,letters.bl,".24s")}
${chip("br",160,160,130,130,letters.br,".36s")}

<path class="sila-hint" transform="translate(150,150)"
      d="M-4 -22 C-24 -22 -32 -6 -22 10 C-14 22 6 22 14 10"/>

<path class="sila-hint" transform="translate(150,150)"
      d="M14 10 L20 4 M14 10 L6 16" fill="none"/>

<g class="sila-flag-group">

<rect class="sila-flag-shape" x="118" y="-22" width="64" height="26" rx="6"/>

<rect class="sila-flag-shape" x="138" y="0" width="24" height="30" rx="4"/>

<line class="sila-flag-stripe" x1="126" y1="-16" x2="140" y2="0"/>

<line class="sila-flag-stripe" x1="140" y1="-16" x2="154" y2="0"/>

<line class="sila-flag-stripe" x1="154" y1="-16" x2="168" y2="0"/>

<line class="sila-flag-stripe" x1="144" y1="6" x2="156" y2="18"/>

</g>

<text class="sila-igra-letter" x="150" y="60">${letters.igra[0]}</text>

<text class="sila-igra-letter" x="150" y="92">${letters.igra[1]}</text>

<text class="sila-igra-letter" x="150" y="208">${letters.igra[2]}</text>

<text class="sila-igra-letter" x="150" y="240">${letters.igra[3]}</text>

</svg>

`;

}

class SiteLogoSila extends HTMLElement{

    connectedCallback(){

        const front=buildFace("Front",{tl:"С",tr:"А",bl:"И",br:"Л",igra:["И","Г","Р","А"]});

        const back=buildFace("Back",{tl:"S",tr:"A",bl:"I",br:"L",igra:["I","G","R","A"]});

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

            link.classList.add("is-split");

        },400);

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