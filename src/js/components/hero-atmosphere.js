function spawnParticles(container,count){
    for(let i=0;i<count;i++){
        const p=document.createElement("div");
        p.className="hero-particle";
        const size=Math.random()*3+1;
        p.style.width=`${size}px`;
        p.style.height=`${size}px`;
        p.style.left=`${Math.random()*100}%`;
        p.style.top=`${Math.random()*100}%`;
        p.style.setProperty("--p-dx",`${(Math.random()-.5)*60}px`);
        p.style.setProperty("--p-dy",`${-(Math.random()*120+40)}px`);
        p.style.setProperty("--p-op",`${Math.random()*.4+.2}`);
        p.style.animationDuration=`${Math.random()*6+6}s`;
        p.style.animationDelay=`${Math.random()*5}s`;
        container.appendChild(p);
    }
}

function initHeroParallax(hero,bg,sweep){
    let ticking=false;
    const SWEEP_SCROLL_RANGE=rect=>rect.height*.6;

    const isPortraitMobile=()=>window.innerWidth<768&&window.matchMedia("(orientation: portrait)").matches;

    const update=()=>{
        const rect=hero.getBoundingClientRect();

        if(!isPortraitMobile()){
            const bgProgress=Math.min(Math.max(-rect.top/rect.height,0),1);
            bg.style.transform=`translateY(${bgProgress*40}px)`;
        }else{
            bg.style.transform="none";
        }

        if(sweep){
            const scrolled=Math.min(Math.max(-rect.top,0),SWEEP_SCROLL_RANGE(rect));
            const sweepProgress=scrolled/SWEEP_SCROLL_RANGE(rect);

            if(isPortraitMobile()){
                // Портрет: правый край фиксирован, левый уходит влево (ширина растёт)
                const sweepWidth=sweepProgress*170;
                sweep.style.setProperty("--sweep-width",`${sweepWidth}%`);
                sweep.style.removeProperty("--sweep-left");
            }else{
                // Ландшафт / десктоп: обычный пролёт справа налево
                const sweepLeft=105-sweepProgress*155;
                sweep.style.setProperty("--sweep-left",`${sweepLeft}%`);
                sweep.style.removeProperty("--sweep-width");
            }
        }

        ticking=false;
    };

    const onScroll=()=>{
        if(ticking)return;
        ticking=true;
        requestAnimationFrame(update);
    };

    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",update,{passive:true});
    update();
}

function initHeroCinemagraph(){
    const wrapper=document.querySelector(".hero-cinemagraph");
    if(!wrapper)return;
    const video=wrapper.querySelector("video");
    const src=video?.dataset.src;
    if(!video||!src)return;
    video.addEventListener("canplaythrough",()=>{
        video.play().catch(()=>{});
        wrapper.classList.add("is-loaded");
    });
    video.addEventListener("error",()=>{});
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