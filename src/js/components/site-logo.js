class SiteLogo extends HTMLElement{

    connectedCallback(){

        this.innerHTML=`

<a href="/"
class="logo">

IMPERATOR

</a>

`;

    }

}

customElements.define("site-logo",SiteLogo);