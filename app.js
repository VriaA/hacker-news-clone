import routerHandler from "./router.js";

//STYLES THE LINK OF THE CURRENT PAGE IN THE NAVIGATION BAR
function setActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link')
    navLinks.forEach(link => {
        const currentPath = window.location.hash
        const linkHref = link.getAttribute('href')
        if(linkHref === currentPath) {
            link.classList.add('active')
        } else {
            link.classList.remove('active')
        }
    })
}

//CALLS theSetActiveLink FUNCTION ON PAGE LOAD
window.onload = () => {
    setActiveLink()
}

//CALLS THE setActiveLink FUNCTION ON HASH CHANGE
window.onhashchange = () => {
    setActiveLink()
}

//RUNS THE APP WHEN INSTANTIATED
class App {
    constructor() {
        new routerHandler()
    }
}

new App()
