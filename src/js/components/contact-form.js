function generateMathChallenge(){

    const a=Math.floor(Math.random()*8)+1;

    const b=Math.floor(Math.random()*8)+1;

    return {a,b,answer:a+b};

}

function initContactForm(){

    const form=document.querySelector("#contact-form");

    if(!form)return;

    const CONTACT_EMAIL="[ЗАМЕНИТЬ: your@email.com]";

    const MIN_FILL_TIME_MS=4000;

    const formOpenedAt=Date.now();

    const challenge=generateMathChallenge();

    const challengeLabel=form.querySelector("#cf-math-label");

    const challengeInput=form.querySelector("#cf-math");

    const errorBox=form.querySelector("#cf-error");

    if(challengeLabel){

        challengeLabel.textContent=`Проверка: сколько будет ${challenge.a} + ${challenge.b}?`;

    }

    const showError=text=>{

        errorBox.textContent=text;

        errorBox.classList.add("is-visible");

    };

    const hideError=()=>{

        errorBox.classList.remove("is-visible");

    };

    form.addEventListener("submit",e=>{

        e.preventDefault();

        hideError();

        const honeypot=form.querySelector("#cf-website").value.trim();

        if(honeypot!==""){

            /* Бот заполнил невидимое поле — молча блокируем, не показывая причину */

            return;

        }

        const elapsed=Date.now()-formOpenedAt;

        if(elapsed<MIN_FILL_TIME_MS){

            showError("Форма заполнена слишком быстро. Попробуйте ещё раз через несколько секунд.");

            return;

        }

        const userAnswer=parseInt(challengeInput.value.trim(),10);

        if(userAnswer!==challenge.answer){

            showError("Неверный ответ на проверочный вопрос. Попробуйте ещё раз.");

            return;

        }

        const name=form.querySelector("#cf-name").value.trim();

        const contact=form.querySelector("#cf-contact").value.trim();

        const message=form.querySelector("#cf-message").value.trim();

        const subject=encodeURIComponent(`Заявка с сайта — ${name}`);

        const body=encodeURIComponent(

            `Имя: ${name}\nКонтакт для связи: ${contact}\n\nСообщение:\n${message}`

        );

        window.location.href=`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    });

}

document.addEventListener("DOMContentLoaded",initContactForm);