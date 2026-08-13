document.addEventListener('DOMContentLoaded', () => {

    const youtubeFrames = document.querySelectorAll('.youtube-video-frame');

    youtubeFrames.forEach(frame => {

        const trigger = frame.querySelector('.youtube-play-trigger');

        if (!trigger) return;

        trigger.addEventListener('click', () => {

            const videoId = frame.dataset.youtubeId;

            if (!videoId) return;

            // Создаём iframe только после клика
            const iframe = document.createElement('iframe');

            iframe.src =
                'https://www.youtube-nocookie.com/embed/' +
                encodeURIComponent(videoId) +
                '?autoplay=1&rel=0&modestbranding=1';

            iframe.title = 'Видеоотзыв';

            iframe.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

            iframe.allowFullscreen = true;

            iframe.loading = 'lazy';

            iframe.className = 'youtube-testimonial-iframe';

            // Удаляем постер и кнопку
            frame.innerHTML = '';

            // Вставляем YouTube
            frame.appendChild(iframe);

        });

    });

});