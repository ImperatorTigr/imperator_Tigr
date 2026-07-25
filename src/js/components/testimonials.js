function formatTime(seconds){

    if(!isFinite(seconds))return "0:00";

    const m=Math.floor(seconds/60);

    const s=Math.floor(seconds%60).toString().padStart(2,"0");

    return `${m}:${s}`;

}

function initAudioPlayers(){

    document.querySelectorAll(".testimonial-audio-player").forEach(player=>{

        const audio=player.querySelector("audio");

        const btn=player.querySelector(".audio-play-btn");

        const progress=player.querySelector(".audio-progress");

        const fill=player.querySelector(".audio-progress-fill");

        const time=player.querySelector(".audio-time");

        btn.addEventListener("click",()=>{

            if(audio.paused){

                document.querySelectorAll("audio").forEach(a=>{if(a!==audio)a.pause();});

                audio.play();

                btn.textContent="⏸";

            }else{

                audio.pause();

                btn.textContent="▶";

            }

        });

        audio.addEventListener("timeupdate",()=>{

            const pct=(audio.currentTime/audio.duration)*100||0;

            fill.style.width=`${pct}%`;

            time.textContent=formatTime(audio.duration-audio.currentTime);

        });

        audio.addEventListener("ended",()=>{

            btn.textContent="▶";

            fill.style.width="0%";

        });

        progress.addEventListener("click",e=>{

            const rect=progress.getBoundingClientRect();

            const ratio=(e.clientX-rect.left)/rect.width;

            if(isFinite(audio.duration))audio.currentTime=ratio*audio.duration;

        });

    });

}

function initVideoLightbox(){

    const triggers=document.querySelectorAll(".testimonial-video-trigger");

    if(triggers.length===0)return;

    const lightbox=document.createElement("div");

    lightbox.className="testimonial-lightbox";

    lightbox.innerHTML=`

<button class="testimonial-lightbox-close" aria-label="Закрыть">×</button>

<video controls playsinline></video>

`;

    document.body.appendChild(lightbox);

    const videoEl=lightbox.querySelector("video");

    const closeBtn=lightbox.querySelector(".testimonial-lightbox-close");

    const close=()=>{

        videoEl.pause();

        lightbox.classList.remove("is-open");

    };

    triggers.forEach(trigger=>{

        trigger.addEventListener("click",()=>{

            videoEl.src=trigger.dataset.video;

            lightbox.classList.add("is-open");

            videoEl.play();

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

document.addEventListener("DOMContentLoaded",()=>{

    initAudioPlayers();

    initVideoLightbox();

});