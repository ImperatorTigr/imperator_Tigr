const CHIP_DELAYS={tl:"0s",bl:".12s",br:".24s",tr:".36s"};

function buildFace(letters){

    const chip=(pos,ch)=>`

<div class="sila-chip" style="--chip-delay:${CHIP_DELAYS[pos]}">
<span class="sila-chip-letter">${ch}</span>
</div>

`;

    return `

<div class="sila-grid">

${chip("tl",letters.tl)}
${chip("tr",letters.tr)}
${chip("bl",letters.bl)}
${chip("br",letters.br)}

</div>

<div class="sila-flag" aria-hidden="true">
<span class="sila-flag-top"></span>
<span class="sila-flag-stem"></span>
</div>

<div class="sila-igra" aria-hidden="true">
<span>${letters.igra[0]}</span>
<span>${letters.igra[1]}</span>
<span>${letters.igra[2]}</span>
<span>${letters.igra[3]}</span>
</div>

`;

}

class SiteLogoSila extends HTMLElement{

    connectedCallback(){

        const front=buildFace({tl:"С",tr:"А",bl:"И",br:"Л",igra:["И","Г","Р","А"]});

        const back=buildFace({tl:"S",tr:"A",bl:"I",br:"L",igra:["I","G","R","A"]});

        this.innerHTML=`

<a href="./" class="sila-logo" aria-label="СИЛА — Т-ИГРА">

<div class="sila-flip">

<div class="sila-face sila-face-front">

${front}

<div class="sila-hint" aria-hidden="true">
<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
<path d="M28 10 C14 10 8 20 14 28 C18 33 26 32 28 26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
<path d="M28 26 L32 24 M28 26 L26 21" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>

</div>

<div class="sila-face sila-face-back">

${back}

</div>

</div>

</a>

`;

        const inSubfolder=window.location.pathname.includes("/blog/");

        const home=inSubfolder?"../index.html":"./";

        const link=this.querySelector(".sila-logo");

        link.setAttribute("href",home);

        setTimeout(()=>{

            link.classList.add("is-ready");

        },3600);

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