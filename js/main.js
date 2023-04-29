const header = document.getElementById("header");
const proshows = document.getElementById("proshows");
const body = document.getElementById("body");
const proshowsHeading = document.getElementById("proshows-heading");
const eventsHeading = document.getElementById("events-heading");
const tagline = document.getElementById("tagline");
const events = document.getElementById("events");
const eventCards = document.getElementsByClassName("event-card");
const proshowCards = document.getElementsByClassName("proshow-card");
const loading = document.getElementById("loading");
const sideNav = document.getElementById("side-nav");


const eventsCount = 5;
var showNav = false;
var currentTaglineIndex = 0;
const taglines = ["A-c-§v", "A-Wn-b-d", "Xn-c-Èo-e-"];

window.onscroll = function () {
  const proshowsHeadingTop = proshowsHeading.getBoundingClientRect().top;
  const eventsHeadingTop = eventsHeading.getBoundingClientRect().top;
  // proshow heading animation
  if (proshowsHeadingTop < window.innerHeight && document.documentElement.scrollTop > 10) {
    proshowsHeading.classList.add("scrolled");
  } else {
    proshowsHeading.classList.remove("scrolled");
  }

  // proshows animation and sticky header
  if (document.documentElement.scrollTop > window.innerHeight / 4) {
    proshows.classList.remove("start");
    header.classList.add("sticky");
  } else {
    proshows.classList.add("start");
    if (!showNav) {
      header.classList.remove("sticky");
    }
    for (const proshowCard of proshowCards) {
      proshowCard.classList.remove("clicked");
    }
  }

  // events animation
  if (eventsHeadingTop < window.innerHeight / 3) {
    events.classList.remove("start");
  } else {
    events.classList.remove("completed");
    events.classList.add("start");
  }
};

function onClickMenu(x) {
  if (showNav) {
    header.classList.remove("change");
    body.classList.remove("no-scroll");
    showNav = false;
  } else {
    header.classList.add("change");
    body.classList.add("no-scroll");
    showNav = true;
  }
}

function onClickEventsLeftArrow(x) {
  shiftEventCards(-1);
}

function onClickEventsRightArrow(x) {
  shiftEventCards(1);
}

const maxIndex = Math.ceil((eventsCount - 1) / 2);
for (const eventCard of eventCards) {
  eventCard.addEventListener('click', (e) => {
    const id = e.currentTarget.id;
    const index = parseInt(id.substring(1));
    shiftEventCards(index);
  })
}

function shiftEventCards(index) {
  events.classList.add('completed');
  for (const eventCard of eventCards) {
    let newIndex = parseInt(eventCard.id.substring(1)) - index;
    if (Math.abs(newIndex) > maxIndex) {
      newIndex = -1 * (newIndex + index);
    }
    eventCard.id = "c" + newIndex;
  }
}

tagline.addEventListener("animationend", () => {
  tagline.classList.remove("animate");
  currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
  tagline.innerHTML = taglines[currentTaglineIndex];
  void tagline.offsetWidth;
  tagline.classList.add("animate");
});

for (const child of sideNav.getElementsByTagName("a")) {
  child.addEventListener("click", () => {
    header.classList.remove("change");
    body.classList.remove("no-scroll");
    showNav = false;
  })
}

async function getIpAddress() {
  const response = await fetch('https://httpbin.org/ip');
  const data = await response.json();
  return data.origin;
}

async function getRegionFromIp() {
  const ipAddress = await getIpAddress();
  const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
  const data = await response.json();
  if (data.status === 'success') {
    return data;
  }
  return null;
}

getRegionFromIp().then((data) => {
  console.log(data.region);
  if (data.region === "KL" && data.countryCode === "IN") {
    for (const proshowCard of proshowCards) {
      proshowCard.addEventListener('click', (e) => {
        if (e.target.tagName === "A") return;
        const id = e.currentTarget.classList.toggle("clicked");
      })
    }
  }
});

window.onload = () => {
  loading.style.display = "none";
}