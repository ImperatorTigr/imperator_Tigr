function initPostHeroReveal(){

    const stage=document.querySelector(".post-hero-logo");

    if(!stage)return;

    const photoSrc=stage.dataset.photo;

    if(!photoSrc)return;

    const photo=document.createElement("div");

    photo.className="post-hero-photo";

    photo.innerHTML=`<img src="${photoSrc}" alt="">`;

    stage.appendChild(photo);

    const cube=stage.querySelector(".logo-cube");

    const hasHover=window.matchMedia("(hover:hover)").matches;

    if(hasHover){

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

        return;

    }

    /*

      Touch-сценарий: буквы уже сами загружаются и "замирают"

      (см. site-logo.js — класс logo-ready ставится через 2400мс).

      Дальше — без участия пользователя — один раз проигрываем

      трансформацию в Tigr, затем показываем фото и на этом

      останавливаемся насовсем, до перезагрузки страницы.

    */

    const LETTERS_SETTLE_MS=2400;

    const PAUSE_BEFORE_TRANSFORM_MS=500;

    const TRANSFORM_TO_PHOTO_MS=900;

    setTimeout(()=>{

        if(cube)cube.classList.add("is-triggered");

        setTimeout(()=>{

            stage.classList.add("is-revealing");

        },TRANSFORM_TO_PHOTO_MS);

    },LETTERS_SETTLE_MS+PAUSE_BEFORE_TRANSFORM_MS);

}

document.addEventListener("DOMContentLoaded",initPostHeroReveal);