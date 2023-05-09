const header = document.getElementById("header");
const hero = document.getElementById("hero");

const proshows = document.getElementById("proshows");
const body = document.getElementById("body");
const proshowsHeading = document.getElementById("proshows-heading");
const eventsHeading = document.getElementById("events-heading");
const scheduleHeading=document.getElementById("schedule-heading");
const tagline = document.getElementById("tagline");
const events = document.getElementById("events");
const eventCards = document.getElementsByClassName("event-card");
const proshowCards = document.getElementsByClassName("proshow-card");
const scheduleContents = document.getElementsByClassName("schedule-content");
const scheduleDays = document.getElementsByClassName("schedule-day");

const loading = document.getElementById("loading");
const sideNav = document.getElementById("side-nav");
const eventsCount = 13;
var showNav = false;
var currentTaglineIndex = 0;
const taglines = ["A-Wn-b-d", "A-c-§v", "Xn-c-Èo-e-"];
var eventsIndex = {
  "battle-of-bands": -6,
  "campus-ambassador": -5,
  choreonite: -4,
  duo: -3,
  footloose: -2,
  "frame-it": -1,
  futsal: 0,
  "haute-culture": 1,
  henshin: 2,
  "mx-cr": 3,
  "rj-hunt": 4,
  voc: 5,
};

window.onscroll = function () {
  const proshowsHeadingTop = proshowsHeading.getBoundingClientRect().top;
  const eventsHeadingTop = eventsHeading.getBoundingClientRect().top;
const scheduleHeadingTop=scheduleHeading.getBoundingClientRect().top;
  // proshow heading animation
  if (
    proshowsHeadingTop < window.innerHeight &&
    document.documentElement.scrollTop > 10
  ) {
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

  // events heading animation
  if (eventsHeadingTop < window.innerHeight) {
    eventsHeading.classList.remove("start");
  } else {
    eventsHeading.classList.add("start");
  }

  // events animation
  if (eventsHeadingTop < window.innerHeight / 3) {
    events.classList.remove("start");
  } else {
    events.classList.remove("completed");
    events.classList.add("start");
  }
    // schedule heading animation
    if (scheduleHeadingTop < window.innerHeight) {
      scheduleHeading.classList.remove("start");
    } else {
      scheduleHeading.classList.add("start");
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
  eventCard.addEventListener("click", (e) => {
    const index = eventsIndex[e.currentTarget.id];
    if (index != 0) {
      e.preventDefault();
    }
    shiftEventCards(index);
  });
}

function shiftEventCards(index) {
  events.classList.add("completed");
  for (const eventCard of eventCards) {
    const id = eventCard.id;
    let newIndex = eventsIndex[id] - index;
    if (Math.abs(newIndex) > maxIndex) {
      newIndex = -1 * (newIndex + index);
      if (newIndex > 0) {
        newIndex--;
      } else {
        newIndex++;
      }
    }
    eventsIndex[id] = newIndex;
    if (Math.abs(newIndex) <= 2) {
      eventCard.className = `event-card c${newIndex}`;
    }
  }
}

tagline.addEventListener("animationend", () => {
  tagline.classList.remove("animate");
  tagline.classList.remove("start-animate");
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
  });
}
function onClickDay(x) {
  console.log(x.id);
  for (const scheduleDay of scheduleDays) {
    if (scheduleDay.dataset.day === x.dataset.day) {
      scheduleDay.classList.add("selected");
    } else {
      scheduleDay.classList.remove("selected");
    }
  }
  for (const scheduleContent of scheduleContents) {
    if (scheduleContent.dataset.day === x.dataset.day) {
      scheduleContent.classList.add("selected");
    } else {
      scheduleContent.classList.remove("selected");
    }
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function getIpAddress() {
  const response = await fetch("https://httpbin.org/ip");
  const data = await response.json();
  return data.origin;
}

async function getRegionFromIp() {
  const ipAddress = await getIpAddress();
  const regionFromCookie = getCookie(ipAddress);
  if (regionFromCookie !== "") {
    console.log(`cookie found`);
    return regionFromCookie;
  }
  console.log(`cookie not found`);
  const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
  const data = await response.json();
  setCookie(ipAddress, data.region, 10);
  return data.region;
}

getRegionFromIp()
  .then((region) => {
    console.log(region);

    for (const proshowCard of proshowCards) {
      if (
        proshowCard.id === "Day2" ||
        (proshowCard.id === "Combo" && region != "Kerala")
      ) {
        continue;
      }
      proshowCard.classList.add("clickable");
      proshowCard.addEventListener("click", (e) => {
        if (e.target.tagName === "A") return;
        const id = e.currentTarget.classList.toggle("clicked");
      });
    }
  })
  .catch((err) => {
    console.log(err);
    for (const proshowCard of proshowCards) {
      if (
        proshowCard.id === "Day2" ||
        (proshowCard.id === "Combo" && region != "Kerala")
      ) {
        continue;
      }
      proshowCard.classList.add("clickable");
      proshowCard.addEventListener("click", (e) => {
        if (e.target.tagName === "A") return;
        const id = e.currentTarget.classList.toggle("clicked");
      });
    }
  });

window.onload = () => {
  loading.classList.add("completed");
  hero.classList.remove("start");
  header.classList.remove("start");
};
