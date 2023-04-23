const header = document.getElementById("header");
const proshows = document.getElementById("proshows");
const proshowsHeading = document.getElementById("proshows-heading");
var showNav = false;

window.onscroll = function () {
    const proshowsHeadingTop = proshowsHeading.getBoundingClientRect().top;
    // proshow heading animation
    if (document.documentElement.scrollTop > window.innerHeight / 8 || (proshowsHeadingTop < window.innerHeight && document.documentElement.scrollTop > 0)) {
        proshowsHeading.classList.add("scrolled");
    } else {
        proshowsHeading.classList.remove("scrolled");
    }

    // proshows animation and sticky header
    if (document.documentElement.scrollTop > window.innerHeight / 3 * 2) {
        proshows.classList.remove("start");
        header.classList.add("sticky");
    } else {
        proshows.classList.add("start");
        header.classList.remove("sticky");
    }
};

function onClickMenu(x) {
    if (showNav) {
        header.classList.remove("change");
        showNav = false;
    } else {
        header.classList.add("change");
        showNav = true;
    }
}