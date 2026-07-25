function initGalleryLightbox(){

    const grid=document.querySelector(".gallery-grid");

    if(!grid)return;

    const lightbox=document.createElement("div");

    lightbox.className="gallery-lightbox";

    lightbox.innerHTML=`

<button class="gallery-lightbox-close" aria-label="Закрыть">×</button>

<img src="" alt="">

`;

    document.body.appendChild(lightbox);

    const lightboxImg=lightbox.querySelector("img");
    const closeBtn=lightbox.querySelector(".gallery-lightbox-close");

    const open=(src,alt)=>{

        lightboxImg.src=src;

        lightboxImg.alt=alt;

        lightbox.classList.add("is-open");

        document.body.classList.add("nav-open");

    };

    const close=()=>{

        lightbox.classList.remove("is-open");

        document.body.classList.remove("nav-open");

    };

    grid.querySelectorAll(".gallery-item").forEach(item=>{

        item.addEventListener("click",()=>{

            const img=item.querySelector("img");

            open(img.src,img.alt);

        });

    });

    closeBtn.addEventListener("click",close);

    lightbox.addEventListener("click",e=>{

        if(e.target===lightbox)close();

    });

    document.addEventListener("keydown",e=>{

        if(e.key==="Escape")close();

    });

}

document.addEventListener("DOMContentLoaded",initGalleryLightbox);