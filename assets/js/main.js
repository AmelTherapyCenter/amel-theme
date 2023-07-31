const btn = document.querySelector(".top-nav__button");
const navLinks = document.querySelector(".top-nav__links");
const links = document.querySelectorAll(".top-nav__links li");

btn.addEventListener('click', ()=>{
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    btn.classList.toggle("toggle");
});