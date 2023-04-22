const header = document.getElementById("header");
const proshows = document.getElementById("proshows");
const proshowsHeading = document.getElementById("proshows-heading");
var showNav = false;

window.onscroll = function () {
    const proshowsHeadingTop = proshowsHeading.getBoundingClientRect().top;
    // sticky navigation bar
    if (document.documentElement.scrollTop > window.innerHeight / 8 || (proshowsHeadingTop < window.innerHeight && document.documentElement.scrollTop > 0)) {
        proshowsHeading.classList.add("scrolled");
    } else {
        proshowsHeading.classList.remove("scrolled");
    }

    // proshow heading animation
    if (document.documentElement.scrollTop > window.innerHeight / 2) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

    // proshows animation
    if (document.documentElement.scrollTop > window.innerHeight / 3 * 2) {
        proshows.classList.remove("start");
    } else {
        proshows.classList.add("start");
    }
};

function onClickMenu(x) {
    if (showNav) {
        header.classList.remove("change");
        document.body.style.overflow = "auto";
        showNav = false;
    } else {
        header.classList.add("change");
        document.body.style.overflow = "hidden";
        showNav = true;
    }
}