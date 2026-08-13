function initGalleryLightbox(){

    const galleryGrid=document.querySelector(".gallery-grid");
    const aboutPhotos=[...document.querySelectorAll(".about-photo")];

    if(!galleryGrid && !aboutPhotos.length)return;

    const galleryItems=galleryGrid
        ? [...galleryGrid.querySelectorAll(".gallery-item img")]
        : [];

    let items=[];
    let currentIndex=0;
    let mode="gallery";

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


    const getFullImageSrc=(img)=>{
        const picture=img.closest("picture");

        if(picture){
            const source=picture.querySelector("source[srcset]");

            if(source){
                return source.srcset.split(",")[0].trim().split(" ")[0];
            }
        }

        return img.currentSrc || img.src;
    };


    const render=()=>{

        const img=items[currentIndex];

        lightboxImg.src=getFullImageSrc(img);
        lightboxImg.alt=img.alt || "";

        if(mode==="gallery"){

            counter.textContent=`${currentIndex+1} / ${items.length}`;

            prevBtn.style.display="";
            nextBtn.style.display="";

        }else{

            counter.textContent="";

            prevBtn.style.display="none";
            nextBtn.style.display="none";
        }
    };


    const openGallery=index=>{

        mode="gallery";
        items=galleryItems;
        currentIndex=index;

        render();

        lightbox.classList.add("is-open");
        document.body.classList.add("nav-open");
    };


    const openAbout=img=>{

        mode="about";
        items=[img];
        currentIndex=0;

        render();

        lightbox.classList.add("is-open");
        document.body.classList.add("nav-open");
    };


    const close=()=>{

        lightbox.classList.remove("is-open");
        document.body.classList.remove("nav-open");

        lightboxImg.src="";
    };


    const showNext=()=>{

        if(mode!=="gallery")return;

        currentIndex=(currentIndex+1)%items.length;
        render();
    };


    const showPrev=()=>{

        if(mode!=="gallery")return;

        currentIndex=(currentIndex-1+items.length)%items.length;
        render();
    };


    if(galleryGrid){

        galleryGrid.querySelectorAll(".gallery-item").forEach((item,index)=>{

            item.addEventListener("click",()=>openGallery(index));

        });

    }


    aboutPhotos.forEach(photo=>{

        const img=photo.querySelector("img");

        if(!img)return;

        photo.addEventListener("click",()=>openAbout(img));

        photo.addEventListener("keydown",e=>{

            if(e.key==="Enter" || e.key===" "){

                e.preventDefault();
                openAbout(img);

            }

        });

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

        if(mode!=="gallery")return;

        const touchEndX=e.changedTouches[0].clientX;
        const diff=touchEndX-touchStartX;
        const SWIPE_THRESHOLD=50;

        if(diff>SWIPE_THRESHOLD)showPrev();

        if(diff<-SWIPE_THRESHOLD)showNext();

    },{passive:true});

}


document.addEventListener("DOMContentLoaded",initGalleryLightbox);