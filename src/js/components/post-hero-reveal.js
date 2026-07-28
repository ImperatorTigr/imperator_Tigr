function initPostHeroReveal(){

    const stage=document.querySelector(".post-hero-logo");

    if(!stage)return;

    const photoSrc=stage.dataset.photo;

    if(!photoSrc)return;

    const photo=document.createElement("div");

    photo.className="post-hero-photo";

    photo.innerHTML=`<img src="${photoSrc}" alt="">`;

    stage.appendChild(photo);

    const REVEAL_DELAY_MS=1000;

    let timer=null;

    stage.addEventListener("mouseenter",()=>{

        timer=setTimeout(()=>{

            stage.classList.add("is-revealing");

        },REVEAL_DELAY_MS);

    });

    stage.addEventListener("mouseleave",()=>{

        clearTimeout(timer);

        stage.classList.remove("is-revealing");

    });

}

document.addEventListener("DOMContentLoaded",initPostHeroReveal);