const header = document.getElementById("header");
const proshows = document.getElementById("proshows");
const body = document.getElementById("body");
const proshowsHeading = document.getElementById("proshows-heading");
const eventsHeading = document.getElementById("events-heading");
const tagline = document.getElementById("tagline");
const events = document.getElementById("events");
const eventCards = document.getElementsByClassName("event-card");
const proshowCards = document.getElementsByClassName("proshow-card");

const eventsCount = 5;
var showNav = false;
var currentTaglineIndex = 0;
const taglines = ["A-c-§v", "A-Wn-b-d", "Xn-c-Èo-e-"];

window.onscroll = function () {
  const proshowsHeadingTop = proshowsHeading.getBoundingClientRect().top;
  const eventsHeadingTop = eventsHeading.getBoundingClientRect().top;
  // proshow heading animation
  if (proshowsHeadingTop < window.innerHeight) {
    proshowsHeading.classList.add("scrolled");
  } else {
    proshowsHeading.classList.remove("scrolled");
  }

  // proshows animation and sticky header
  if (document.documentElement.scrollTop > (window.innerHeight / 3) * 2) {
    proshows.classList.remove("start");
    header.classList.add("sticky");
  } else {
    proshows.classList.add("start");
    header.classList.remove("sticky");
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

for (const proshowCard of proshowCards) {
  proshowCard.addEventListener('click', (e) => {
    console.log("clicked");
    const id = e.currentTarget.classList.toggle("clicked");
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