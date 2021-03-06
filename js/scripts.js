document.addEventListener('DOMContentLoaded', function() {
    loaded = true;
})

includeHTML();

function navToggle() {
    let nav = document.getElementById('nav');
    let wrap = document.getElementById('wrapper');
    let navToggle = document.getElementById('hamburger');

    nav.classList.toggle('visible');
    wrap.classList.toggle('wrapper-and-nav');
    navToggle.classList.toggle('open');
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop thorugh a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain attribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the filename:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/

                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}