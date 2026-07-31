class SiteLogo extends HTMLElement{

    connectedCallback(){

        const inSubfolder=window.location.pathname.includes("/blog/");
        const home=inSubfolder?"../index.html":"./";
        
        // На странице статьи — без ссылки, только hover
        const isArticle=inSubfolder;
        const hrefAttr=isArticle?``:`href="${home}"`;

        this.innerHTML=`

<a ${hrefAttr}
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

<circle class="logo-point" cx="150" cy="150" r="7"/>

<rect class="logo-frame-outer"
      x="4" y="4" width="292" height="292" rx="48"/>

<line class="logo-grid-line" x1="100" y1="20"  x2="100" y2="280"/>
<line class="logo-grid-line" x1="200" y1="20"  x2="200" y2="280"/>
<line class="logo-grid-line" x1="20"  y1="100" x2="280" y2="100"/>
<line class="logo-grid-line" x1="20"  y1="200" x2="280" y2="200"/>

<text class="logo-letter" style="--tx:100px;--ty:100px;--delay:.9s"    x="50"  y="50">I</text>
<text class="logo-letter" style="--tx:0px;--ty:100px;--delay:1.02s"    x="150" y="50">M</text>
<text class="logo-letter" style="--tx:-100px;--ty:100px;--delay:1.14s" x="250" y="50">P</text>

<text class="logo-letter" style="--tx:100px;--ty:0px;--delay:1.26s"    x="50"  y="150">E</text>
<text class="logo-letter" style="--tx:0px;--ty:0px;--delay:1.38s"      x="150" y="150">R</text>
<text class="logo-letter" style="--tx:-100px;--ty:0px;--delay:1.5s"    x="250" y="150">A</text>

<text class="logo-letter" style="--tx:100px;--ty:-100px;--delay:1.62s" x="50"  y="250">T</text>
<text class="logo-letter" style="--tx:0px;--ty:-100px;--delay:1.74s"   x="150" y="250">O</text>
<text class="logo-letter" style="--tx:-100px;--ty:-100px;--delay:1.86s" x="250" y="250">R</text>

<text class="logo-word" x="150" y="150">Tigr</text>

</svg>

</a>

`;

         const cube=this.querySelector(".logo-cube");

        setTimeout(()=>{
            cube.classList.add("logo-ready");
        },2400);

        /* ===== На странице статьи — клик отключён, точка скрыта ===== */
        if(isArticle){
            cube.classList.add("is-article");
            cube.style.cursor="default";
            cube.addEventListener("click",e=>e.preventDefault());
            return;
        }

        const hasHover=window.matchMedia("(hover:hover)").matches;

        if(!hasHover){

            cube.addEventListener("click",e=>{

                e.preventDefault();

                cube.classList.toggle("is-triggered");

            });

        }

    }

}

customElements.define("site-logo",SiteLogo);