function initGalleryLightbox(){

    const grid=document.querySelector(".gallery-grid");

    if(!grid)return;

    const items=[...grid.querySelectorAll(".gallery-item img")];

    let currentIndex=0;

    const lightbox=document.createElement("div");

    lightbox.className="gallery-lightbox";

    lightbox.innerHTML=`

<button class="gallery-lightbox-close" aria-label="Закрыть">×</button>

<button class="gallery-lightbox-arrow prev" aria-label="Предыдущее фото">‹</button>

<img src="" alt="">

<button class="gallery-lightbox-arrow next" aria-label="Следующее фото">›</button>

<span class="gallery-lightbox-counter"></span>

`;

    document.body.appendChild(lightbox);

    const lightboxImg=lightbox.querySelector("img");
    const closeBtn=lightbox.querySelector(".gallery-lightbox-close");
    const prevBtn=lightbox.querySelector(".prev");
    const nextBtn=lightbox.querySelector(".next");
    const counter=lightbox.querySelector(".gallery-lightbox-counter");

    const render=()=>{

        const img=items[currentIndex];

        lightboxImg.src=img.src;

        lightboxImg.alt=img.alt;

        counter.textContent=`${currentIndex+1} / ${items.length}`;

    };

    const open=index=>{

        currentIndex=index;

        render();

        lightbox.classList.add("is-open");

        document.body.classList.add("nav-open");

    };

    const close=()=>{

        lightbox.classList.remove("is-open");

        document.body.classList.remove("nav-open");

    };

    const showNext=()=>{

        currentIndex=(currentIndex+1)%items.length;

        render();

    };

    const showPrev=()=>{

        currentIndex=(currentIndex-1+items.length)%items.length;

        render();

    };

    grid.querySelectorAll(".gallery-item").forEach((item,index)=>{

        item.addEventListener("click",()=>open(index));

    });

    closeBtn.addEventListener("click",close);

    nextBtn.addEventListener("click",showNext);

    prevBtn.addEventListener("click",showPrev);

    lightbox.addEventListener("click",e=>{

        if(e.target===lightbox)close();

    });

    document.addEventListener("keydown",e=>{

        if(!lightbox.classList.contains("is-open"))return;

        if(e.key==="Escape")close();

        if(e.key==="ArrowRight")showNext();

        if(e.key==="ArrowLeft")showPrev();

    });

    let touchStartX=0;

    lightbox.addEventListener("touchstart",e=>{

        touchStartX=e.changedTouches[0].clientX;

    },{passive:true});

    lightbox.addEventListener("touchend",e=>{

        const touchEndX=e.changedTouches[0].clientX;

        const diff=touchEndX-touchStartX;

        const SWIPE_THRESHOLD=50;

        if(diff>SWIPE_THRESHOLD)showPrev();

        if(diff<-SWIPE_THRESHOLD)showNext();

    },{passive:true});

}

document.addEventListener("DOMContentLoaded",initGalleryLightbox);