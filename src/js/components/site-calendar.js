/*

  ДАТЫ СОБЫТИЙ — сюда вписывать реальные мероприятия.

  Формат: "YYYY-MM-DD"

*/

const EVENTS=[

    {date:"2026-08-05",title:"[Заменить: название мероприятия]"},
    {date:"2026-08-14",title:"[Заменить: название мероприятия]"},
    {date:"2026-09-02",title:"[Заменить: название мероприятия]"}

];

const WEEKDAYS=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

const MONTH_NAMES=[

    "Январь","Февраль","Март","Апрель","Май","Июнь",

    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"

];

class SiteCalendar extends HTMLElement{

    connectedCallback(){

        const today=new Date();

        this.viewYear=today.getFullYear();

        this.viewMonth=today.getMonth();

        this.innerHTML=`

<div class="calendar-box">

<div class="calendar-nav">

<button class="calendar-nav-btn" data-dir="-1" aria-label="Предыдущий месяц">‹</button>

<span class="calendar-title"></span>

<button class="calendar-nav-btn" data-dir="1" aria-label="Следующий месяц">›</button>

</div>

<div class="calendar-weekdays">
${WEEKDAYS.map(d=>`<span>${d}</span>`).join("")}
</div>

<div class="calendar-days"></div>

<div class="calendar-events-list"></div>

</div>

`;

        this.titleEl=this.querySelector(".calendar-title");

        this.daysEl=this.querySelector(".calendar-days");

        this.listEl=this.querySelector(".calendar-events-list");

        this.querySelectorAll(".calendar-nav-btn").forEach(btn=>{

            btn.addEventListener("click",()=>{

                this.viewMonth+=parseInt(btn.dataset.dir,10);

                if(this.viewMonth<0){this.viewMonth=11;this.viewYear--;}

                if(this.viewMonth>11){this.viewMonth=0;this.viewYear++;}

                this.render();

            });

        });

        this.render();

    }

    render(){

        this.titleEl.textContent=`${MONTH_NAMES[this.viewMonth]} ${this.viewYear}`;

        const firstDay=new Date(this.viewYear,this.viewMonth,1);

        const startOffset=(firstDay.getDay()+6)%7;

        const daysInMonth=new Date(this.viewYear,this.viewMonth+1,0).getDate();

        const monthEvents=EVENTS.filter(ev=>{

            const d=new Date(ev.date);

            return d.getFullYear()===this.viewYear&&d.getMonth()===this.viewMonth;

        });

        const eventDays=new Set(monthEvents.map(ev=>new Date(ev.date).getDate()));

        let cellsHtml="";

        for(let i=0;i<startOffset;i++){

            cellsHtml+=`<span class="calendar-day is-empty"></span>`;

        }

        for(let day=1;day<=daysInMonth;day++){

            const hasEvent=eventDays.has(day);

            cellsHtml+=`<span class="calendar-day${hasEvent?" has-event":""}">${day}</span>`;

        }

        this.daysEl.innerHTML=cellsHtml;

        if(monthEvents.length===0){

            this.listEl.innerHTML=`<p class="calendar-event-empty">В этом месяце пока нет мероприятий</p>`;

        }else{

            this.listEl.innerHTML=monthEvents

                .sort((a,b)=>a.date.localeCompare(b.date))

                .map(ev=>{

                    const d=new Date(ev.date);

                    const dateLabel=d.toLocaleDateString("ru-RU",{day:"numeric",month:"long"});

                    return `<div class="calendar-event-item">
<span class="calendar-event-date">${dateLabel}</span>
<span>${ev.title}</span>
</div>`;

                }).join("");

        }

    }

}

customElements.define("site-calendar",SiteCalendar);