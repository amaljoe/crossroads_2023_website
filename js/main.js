const header = document.getElementById("header");
window.onscroll = function () {
    if (document.documentElement.scrollTop > window.innerHeight / 2) {
        header.className = "sticky";
    } else {
        header.className = "";
    }
};

function onClickMenu(x) {
    header.classList.toggle("change");
}