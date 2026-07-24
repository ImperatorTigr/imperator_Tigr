class SiteHeader extends HTMLElement{

    connectedCallback(){

        this.innerHTML=`

<header class="site-header">

<div class="container">

<site-logo></site-logo>

</div>

</header>

`;

    }

}

customElements.define("site-header",SiteHeader);