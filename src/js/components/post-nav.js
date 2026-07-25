import {POSTS} from "../data/posts.js";

function initPostNav(){

    const container=document.querySelector("#post-nav");

    if(!container)return;

    const currentSlug=document.body.dataset.postSlug;

    const index=POSTS.findIndex(p=>p.slug===currentSlug);

    if(index===-1)return;

    const prev=POSTS[(index-1+POSTS.length)%POSTS.length];

    const next=POSTS[(index+1)%POSTS.length];

    container.innerHTML=`

<a class="post-nav-link prev" href="${prev.slug}.html">
<span class="post-nav-label">← Предыдущая</span>
<span class="post-nav-title">${prev.title}</span>
</a>

<a class="post-nav-link next" href="${next.slug}.html">
<span class="post-nav-label">Следующая →</span>
<span class="post-nav-title">${next.title}</span>
</a>

`;

}

document.addEventListener("DOMContentLoaded",initPostNav);