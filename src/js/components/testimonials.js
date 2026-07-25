function formatTime(seconds){

    if(!isFinite(seconds))return "0:00";

    const m=Math.floor(seconds/60);

    const s=Math.floor(seconds%60).toString().padStart(2,"0");

    return `${m}:${s}`;

}

function seededHeight(seed,i){

    const v=Math.sin(seed*999+i*57.13)*10000;

    const frac=v-Math.floor(v);

    return 22+Math.round(frac*68);

}

function buildWaveform(container,seed){

    const BARS=32;

    container.innerHTML="";

    for(let i=0;i<BARS;i++){

        const bar=document.createElement("span");

        bar.className="wave-bar";

        bar.style.height=`${seededHeight(seed,i)}%`;

        bar.style.animationDelay=`${(i%8)*0.08}s`;

        container.appendChild(bar);

    }

    return [...container.children];

}

function initAudioTestimonials(){

    document.querySelectorAll(".testimonial-audio").forEach((card,cardIndex)=>{

        const audio=card.querySelector("audio");

        const btn=card.querySelector(".audio-play-btn");

        const waveform=card.querySelector(".audio-waveform");

        const time=card.querySelector(".audio-time");

        if(!audio||!waveform)return;

        const bars=buildWaveform(waveform,cardIndex+1);

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

            const ratio=audio.currentTime/audio.duration||0;

            const playedCount=Math.floor(ratio*bars.length);

            bars.forEach((bar,i)=>bar.classList.toggle("is-past",i<playedCount));

            time.textContent=formatTime(audio.duration-audio.currentTime);

        });

        audio.addEventListener("ended",()=>{

            btn.textContent="▶";

            bars.forEach(bar=>bar.classList.remove("is-past"));

        });

        waveform.addEventListener("click",e=>{

            const rect=waveform.getBoundingClientRect();

            const ratio=(e.clientX-rect.left)/rect.width;

            if(isFinite(audio.duration))audio.currentTime=ratio*audio.duration;

        });

    });

}

function initVideoPreviews(){

    const frames=document.querySelectorAll(".testimonial-video-frame");

    frames.forEach(frame=>{

        const video=frame.querySelector("video");

        if(!video)return;

        const src=video.dataset.src;

        const load=()=>{

            if(!video.src&&src)video.src=src;

            video.play().catch(()=>{});

        };

        const stop=()=>video.pause();

        frame.addEventListener("mouseenter",load);

        frame.addEventListener("mouseleave",stop);

        if("IntersectionObserver" in window){

            const observer=new IntersectionObserver(entries=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting)load();else stop();

                });

            },{threshold:.6});

            observer.observe(frame);

        }

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

    initAudioTestimonials();

    initVideoPreviews();

    initVideoLightbox();

});