const header = document.getElementById("header");
const proshows = document.getElementById("proshows");
var showNav = false;

window.onscroll = function () {
    if (document.documentElement.scrollTop > window.innerHeight / 2) {
        header.className = "sticky";
    } else {
        header.className = "";
    }

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