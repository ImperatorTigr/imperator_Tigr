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