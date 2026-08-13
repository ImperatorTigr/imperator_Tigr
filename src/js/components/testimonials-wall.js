/* =========================================================
   TESTIMONIALS WALL
   - Audio testimonials
   - Text testimonials with fullscreen reader
   - YouTube testimonials loaded only after click
   ========================================================= */

function formatTime(seconds) {
    if (!isFinite(seconds)) return "0:00";

    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");

    return `${m}:${s}`;
}


/* =========================================================
   AUDIO TESTIMONIALS
   ========================================================= */

function seededHeight(seed, i) {
    const v = Math.sin(seed * 999 + i * 57.13) * 10000;
    const frac = v - Math.floor(v);

    return 22 + Math.round(frac * 68);
}

function buildWaveform(container, seed) {
    const BARS = 32;

    container.innerHTML = "";

    for (let i = 0; i < BARS; i++) {
        const bar = document.createElement("span");

        bar.className = "wave-bar";
        bar.style.height = `${seededHeight(seed, i)}%`;
        bar.style.animationDelay = `${(i % 8) * 0.08}s`;

        container.appendChild(bar);
    }

    return [...container.children];
}

function initAudioTestimonials() {

    document.querySelectorAll(".testimonial-audio").forEach((card, cardIndex) => {

        const audio = card.querySelector("audio");
        const btn = card.querySelector(".audio-play-btn");
        const waveform = card.querySelector(".audio-waveform");
        const time = card.querySelector(".audio-time");

        if (!audio || !waveform || !btn) return;

        const bars = buildWaveform(waveform, cardIndex + 1);

        btn.addEventListener("click", () => {

            if (audio.paused) {

                document.querySelectorAll("audio").forEach(a => {
                    if (a !== audio) a.pause();
                });

                audio.play().catch(() => {});
                btn.textContent = "⏸";

            } else {

                audio.pause();
                btn.textContent = "▶";

            }

        });

        audio.addEventListener("timeupdate", () => {

            const ratio = audio.currentTime / audio.duration || 0;
            const playedCount = Math.floor(ratio * bars.length);

            bars.forEach((bar, i) => {
                bar.classList.toggle("is-past", i < playedCount);
            });

            time.textContent = formatTime(
                audio.duration - audio.currentTime
            );

        });

        audio.addEventListener("ended", () => {

            btn.textContent = "▶";

            bars.forEach(bar => {
                bar.classList.remove("is-past");
            });

            time.textContent = "0:00";

        });

        waveform.addEventListener("click", e => {

            const rect = waveform.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;

            if (isFinite(audio.duration)) {
                audio.currentTime =
                    Math.max(0, Math.min(1, ratio)) * audio.duration;
            }

        });

    });

}


/* =========================================================
   TEXT TESTIMONIALS
   ========================================================= */

function initTextTestimonials() {

    const cards = document.querySelectorAll(".testimonial-text");

    if (!cards.length) return;

    cards.forEach(card => {

        const body = card.querySelector(".testimonial-text-body");

        if (!body) return;

        let button = card.querySelector(".testimonial-read-more");

        /*
         * Кнопка создаётся автоматически.
         * Поэтому добавлять её вручную в HTML не нужно.
         */
        if (!button) {

            button = document.createElement("button");

            button.type = "button";
            button.className = "testimonial-read-more";
            button.textContent = "Читать полностью →";

            body.insertAdjacentElement("afterend", button);

        }

        const checkOverflow = () => {

            /*
             * Сначала убираем класс ограничения,
             * чтобы определить реальную высоту полного текста.
             */
            card.classList.remove("is-truncated");

            const isLong =
                body.scrollHeight > body.clientHeight + 2;

            card.classList.toggle("is-truncated", isLong);

            button.setAttribute(
                "aria-hidden",
                isLong ? "false" : "true"
            );

        };

        checkOverflow();

        if ("ResizeObserver" in window) {

            const resizeObserver =
                new ResizeObserver(checkOverflow);

            resizeObserver.observe(body);

        } else {

            window.addEventListener("resize", checkOverflow);

        }

        button.addEventListener("click", e => {

            e.preventDefault();
            e.stopPropagation();

            openTestimonialReader(card);

        });

    });

}


/* =========================================================
   FULLSCREEN TEXT READER
   ========================================================= */

let testimonialReader = null;
let testimonialReaderPreviousFocus = null;

function createTestimonialReader() {

    if (testimonialReader) return testimonialReader;

    testimonialReader = document.createElement("div");

    testimonialReader.className = "testimonial-reader";

    testimonialReader.setAttribute("aria-hidden", "true");

    testimonialReader.innerHTML = `

        <div class="testimonial-reader-panel"
             role="dialog"
             aria-modal="true"
             aria-label="Полный текст отзыва">

            <button
                class="testimonial-reader-close"
                type="button"
                aria-label="Закрыть">
                ×
            </button>

            <div class="testimonial-reader-content">

                <div class="testimonial-reader-badge"></div>

                <div class="testimonial-reader-quote"></div>

                <div class="testimonial-reader-meta">

                    <span class="testimonial-reader-avatar">
                        <img src="" alt="">
                    </span>

                    <span class="testimonial-reader-name"></span>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(testimonialReader);

    const closeButton =
        testimonialReader.querySelector(
            ".testimonial-reader-close"
        );

    closeButton.addEventListener(
        "click",
        closeTestimonialReader
    );

    testimonialReader.addEventListener("click", e => {

        if (e.target === testimonialReader) {
            closeTestimonialReader();
        }

    });

    document.addEventListener("keydown", e => {

        if (
            e.key === "Escape" &&
            testimonialReader.classList.contains("is-open")
        ) {
            closeTestimonialReader();
        }

    });

    return testimonialReader;
}

function openTestimonialReader(card) {

    const reader = createTestimonialReader();

    const body =
        card.querySelector(".testimonial-text-body");

    const badge =
        card.querySelector(".testimonial-badge");

    const name =
        card.querySelector(".testimonial-name");

    const avatar =
        card.querySelector(".testimonial-avatar img");

    const readerBadge =
        reader.querySelector(
            ".testimonial-reader-badge"
        );

    const readerQuote =
        reader.querySelector(
            ".testimonial-reader-quote"
        );

    const readerName =
        reader.querySelector(
            ".testimonial-reader-name"
        );

    const readerAvatar =
        reader.querySelector(
            ".testimonial-reader-avatar img"
        );

    readerBadge.textContent =
        badge ? badge.textContent.trim() : "Отзыв";

    readerQuote.textContent =
        body ? body.textContent.trim() : "";

    readerName.textContent =
        name ? name.textContent.trim() : "";

    if (avatar && avatar.src) {

        readerAvatar.src = avatar.src;

        readerAvatar.alt =
            name ? name.textContent.trim() : "";

        readerAvatar.parentElement.style.display = "";

    } else {

        readerAvatar.removeAttribute("src");

        readerAvatar.parentElement.style.display = "none";

    }

    testimonialReaderPreviousFocus =
        document.activeElement;

    document.documentElement.classList.add(
        "testimonial-reader-open"
    );

    reader.classList.add("is-open");

    reader.setAttribute(
        "aria-hidden",
        "false"
    );

    reader
        .querySelector(".testimonial-reader-content")
        .scrollTop = 0;

    requestAnimationFrame(() => {

        reader
            .querySelector(".testimonial-reader-close")
            .focus();

    });

}

function closeTestimonialReader() {

    if (!testimonialReader) return;

    testimonialReader.classList.remove("is-open");

    testimonialReader.setAttribute(
        "aria-hidden",
        "true"
    );

    document.documentElement.classList.remove(
        "testimonial-reader-open"
    );

    if (
        testimonialReaderPreviousFocus &&
        typeof testimonialReaderPreviousFocus.focus === "function"
    ) {

        testimonialReaderPreviousFocus.focus();

    }

}


/* =========================================================
   YOUTUBE VIDEO TESTIMONIALS
   ========================================================= */

function initYouTubeTestimonials() {

    const facades =
        document.querySelectorAll(".youtube-facade");

    facades.forEach(facade => {

        const videoId =
            facade.dataset.youtube;

        if (!videoId) return;

        const activate = () => {

            if (
                facade.classList.contains("is-loaded")
            ) {
                return;
            }

            facade.classList.add("is-loaded");

            const iframe =
                document.createElement("iframe");

            iframe.src =
                `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;

            iframe.title = "Видеоотзыв";

            iframe.loading = "lazy";

            iframe.allow =
                "autoplay; encrypted-media; picture-in-picture";

            iframe.allowFullscreen = true;

            facade.innerHTML = "";

            facade.appendChild(iframe);

        };

        facade.addEventListener(
            "click",
            activate
        );

        facade.addEventListener("keydown", e => {

            if (
                e.key === "Enter" ||
                e.key === " "
            ) {

                e.preventDefault();

                activate();

            }

        });

    });

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initAudioTestimonials();

        initTextTestimonials();

        initYouTubeTestimonials();

    }
);