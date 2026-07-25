class SiteHeader extends HTMLElement{

    connectedCallback(){

        this.innerHTML=`

<header class="site-header">

<div class="container">

<div class="site-brand">

<site-logo></site-logo>

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

<li><a class="nav-link" href="#games">Игры</a></li>
<li><a class="nav-link" href="#events">Мероприятия</a></li>
<li><a class="nav-link" href="#gallery">Галерея</a></li>
<li><a class="nav-link" href="#about">Обо мне</a></li>
<li><a class="nav-link" href="#calendar">Календарь</a></li>
<li><a class="nav-link" href="#blog">Блог</a></li>
<li><a class="nav-link" href="#feedbacks">Отзывы</a></li>
<li><a class="nav-link" href="#contacts">Контакты</a></li>

</ul>

<a class="nav-cta" href="#contacts">Записаться</a>

</nav>

</div>

</header>

`;

        const header=this.querySelector(".site-header");
        const toggle=this.querySelector(".nav-toggle");
        const nav=this.querySelector(".nav");

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