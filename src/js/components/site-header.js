function getHomePrefix(){

    const inSubfolder=window.location.pathname.includes("/blog/");

    return inSubfolder?"../index.html":"./";

}

class SiteHeader extends HTMLElement{

    connectedCallback(){

        const home=getHomePrefix();

        this.innerHTML=`

<header class="site-header">

<div class="container">

<div class="site-brand">

<site-logo-sila></site-logo-sila>

<div class="brand-text">
<span class="brand-name">Дмитрий Карякин</span>
<span class="brand-subtitle">Игропрактик</span>
</div>

</div>

<button class="nav-toggle"
        aria-label="Открыть меню"
        aria-expanded="false">
<span></span>
<span></span>
<span></span>
</button>

<nav class="nav">

<ul class="nav-list">

<li><a class="nav-link" href="${home}#hero">Главная</a></li>
<li><a class="nav-link" href="${home}#games">Игры</a></li>
<li><a class="nav-link" href="${home}#test">Тест</a></li>
<li><a class="nav-link" href="${home}#gallery">Галерея</a></li>
<li><a class="nav-link" href="${home}#about">Обо мне</a></li>
<li><a class="nav-link" href="${home}#feedbacks">Отзывы</a></li>
<li><a class="nav-link" href="${home}#footer">Инфо</a></li>

</ul>

<a class="nav-cta" href="${home}#contacts">Связь</a>

</nav>

</div>

</header>

`;

        const header=this.querySelector(".site-header");
        const toggle=this.querySelector(".nav-toggle");
        const nav=this.querySelector(".nav");

        /* ===== На страницах статей — хедер сразу сжатый ===== */
        if(window.location.pathname.includes("/blog/")){
            header.classList.add("is-scrolled");
        }

        const SCROLL_THRESHOLD=40;

        const onScroll=()=>{

            header.classList.toggle("is-scrolled",window.scrollY>SCROLL_THRESHOLD);

        };

        window.addEventListener("scroll",onScroll,{passive:true});

        onScroll();

        toggle.addEventListener("click",()=>{

            const isOpen=nav.classList.toggle("is-open");

            document.body.classList.toggle("nav-open",isOpen);

            toggle.setAttribute("aria-expanded",isOpen);

        });

        nav.querySelectorAll(".nav-link, .nav-cta").forEach(link=>{

            link.addEventListener("click",()=>{

                nav.classList.remove("is-open");

                document.body.classList.remove("nav-open");

                toggle.setAttribute("aria-expanded","false");

            });

        });

    }

}

customElements.define("site-header",SiteHeader);