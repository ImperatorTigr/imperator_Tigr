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

        const SCROLL_THRESHOLD=40;
        const isArticlePage=window.location.pathname.includes("/blog/");
        let forceScrolled=false;

        const onScroll=()=>{
            if(forceScrolled) return;
            header.classList.toggle("is-scrolled",window.scrollY>SCROLL_THRESHOLD);
        };

        window.addEventListener("scroll",onScroll,{passive:true});

        if(isArticlePage){
            header.classList.add("is-scrolled");
            forceScrolled=true;
        } else {
            onScroll();
        }

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

        /* ===== Подсветка активного пункта меню ===== */
        const links=Array.from(nav.querySelectorAll(".nav-link"));

        function setActive(hash){
            links.forEach(l=>{
                const lHash=l.getAttribute("href").split("#")[1];
                if(lHash===hash){
                    l.classList.add("is-active");
                }else{
                    l.classList.remove("is-active");
                }
            });
        }

        links.forEach(link=>{
            link.addEventListener("click",()=>{
                const hash=link.getAttribute("href").split("#")[1];
                setActive(hash);
            });
        });

        const sections=["hero","games","test","gallery","about","feedbacks","footer"];
        const observerOptions={rootMargin:"-40% 0px -55% 0px",threshold:0};

        const observer=new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    setActive(entry.target.id);
                }
            });
        },observerOptions);

        sections.forEach(id=>{
            const el=document.getElementById(id);
            if(el) observer.observe(el);
        });

        if(window.location.hash){
            setActive(window.location.hash.replace("#",""));
        }

    }
}

customElements.define("site-header",SiteHeader);