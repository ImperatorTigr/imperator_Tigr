function spawnParticles(container,count){

    for(let i=0;i<count;i++){

        const particle=document.createElement("span");

        particle.className="hero-particle";

        const size=2+Math.random()*3;

        const startX=Math.random()*100;

        const startY=60+Math.random()*40;

        const driftX=(Math.random()*40-20);

        const duration=14+Math.random()*10;

        const delay=-Math.random()*duration;

        const opacity=0.25+Math.random()*0.35;

        particle.style.width=`${size}px`;

        particle.style.height=`${size}px`;

        particle.style.left=`${startX}%`;

        particle.style.top=`${startY}%`;

        particle.style.setProperty("--p-dx",`${driftX}px`);

        particle.style.setProperty("--p-dy",`${-(120+Math.random()*140)}px`);

        particle.style.setProperty("--p-op",opacity.toFixed(2));

        particle.style.animationDuration=`${duration}s`;

        particle.style.animationDelay=`${delay}s`;

        container.appendChild(particle);

    }

}

function initHeroParallax(hero,bg,sweep){

    let ticking=false;

    const SWEEP_SCROLL_RANGE=500;

    const update=()=>{

        const rect=hero.getBoundingClientRect();

        const bgProgress=Math.min(Math.max(-rect.top/rect.height,0),1);

        bg.style.transform=`translateY(${bgProgress*40}px)`;

        if(sweep){

            const scrolled=Math.min(Math.max(-rect.top,0),SWEEP_SCROLL_RANGE);

            const sweepProgress=scrolled/SWEEP_SCROLL_RANGE;

            const sweepLeft=105-sweepProgress*155;

            sweep.style.setProperty("--sweep-left",`${sweepLeft}%`);

        }

        ticking=false;

    };

    const onScroll=()=>{

        if(ticking)return;

        ticking=true;

        requestAnimationFrame(update);

    };

    window.addEventListener("scroll",onScroll,{passive:true});

    update();

}

function initHeroCinemagraph(){

    const wrapper=document.querySelector(".hero-cinemagraph");

    if(!wrapper)return;

    const video=wrapper.querySelector("video");

    const src=video?.dataset.src;

    if(!video||!src)return;

    /*

      Заготовка под будущее видео-улучшение.

      Пока файла нет — video.dataset.src просто указывает на путь,

      которого физически не существует, ошибка загрузки тихо игнорируется,

      и остаётся CSS/JS-версия атмосферы (слои света, пылинок, дыхания).

    */

    video.addEventListener("canplaythrough",()=>{

        video.play().catch(()=>{});

        wrapper.classList.add("is-loaded");

    });

    video.addEventListener("error",()=>{

        /* видео недоступно — просто остаёмся на статичном фото + CSS-атмосфере */

    });

    video.src=src;

}

function initHero(){

    const hero=document.querySelector(".hero");

    if(!hero)return;

    const bg=hero.querySelector(".hero-bg");

    const sweep=hero.querySelector(".hero-light-sweep");

    const particlesContainer=hero.querySelector(".hero-particles");

    if(particlesContainer){

        const particleCount=window.innerWidth<600?8:16;

        spawnParticles(particlesContainer,particleCount);

    }

    if(bg){

        initHeroParallax(hero,bg,sweep);

    }

    initHeroCinemagraph();

}

document.addEventListener("DOMContentLoaded",initHero);