function initActiveNav(){

    const sections=[...document.querySelectorAll("main section[id], footer[id], #footer")];

    const navList=document.querySelector(".nav-list");

    if(sections.length===0||!navList)return;

    const navLinks=[...navList.querySelectorAll(".nav-link")];

    if(navLinks.length===0)return;

    const thread=document.createElement("span");

    thread.className="nav-thread";

    navList.appendChild(thread);

    let activeId=null;

    const moveThread=()=>{

        const activeLink=navLinks.find(link=>link.classList.contains("is-active"));

        if(!activeLink){

            thread.style.opacity="0";

            return;

        }

        const listRect=navList.getBoundingClientRect();

        const linkRect=activeLink.getBoundingClientRect();

        thread.style.left=`${linkRect.left-listRect.left}px`;

        thread.style.width=`${linkRect.width}px`;

        thread.style.opacity="1";

    };

    const setActive=id=>{

        if(id===activeId)return;

        activeId=id;

        navLinks.forEach(link=>{

            link.classList.toggle("is-active",link.getAttribute("href").endsWith(`#${id}`));

        });

        requestAnimationFrame(moveThread);

    };

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                setActive(entry.target.id);

            }

        });

    },{rootMargin:"-40% 0px -55% 0px",threshold:0});

    sections.forEach(section=>observer.observe(section));

    window.addEventListener("resize",moveThread,{passive:true});

}

document.addEventListener("DOMContentLoaded",initActiveNav);