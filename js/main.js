const header = document.getElementById("header");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 250) {
        header.className = "sticky";
    } else {
        header.className = "";
    }
};