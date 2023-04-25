//local storge

let mainColor = localStorage.getItem("colors_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  //local storge add active class
  document.querySelectorAll(".color-link li").forEach((f) => {
    f.classList.remove("active");
    if (f.dataset.color === mainColor) {
      f.classList.add("active");
    }
  });
}

//دول خاصيين باال random

let backgroundInterval;
let backgroundOption = true;
let backgroundLocalest = localStorage.getItem("background_option");

if (backgroundLocalest !== null) {
  if (backgroundLocalest === "true") {
    backgroundOption === true;
  } else {
    backgroundOption === false;
  }

  document.querySelectorAll(".random span").forEach((w) => {
    w.classList.remove("active");
  });

  if (backgroundLocalest === "true") {
    document.querySelector(".random .yes").classList.add("active");
  } else {
    document.querySelector(".random .no").classList.add("active");
  }
}

//start toggel
let settIng = document.querySelector(".setting");
let icon = document.querySelector(".new-icon");

icon.onclick = function () {
  settIng.classList.toggle("open");
  this.classList.toggle("fa-spin");
};
//end toggel

//start change color
const colors = document.querySelectorAll(".color-link li");

colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("colors_option", e.target.dataset.color);

    hundelate(e);
  });
});

//end change color

//start change random images
const randomImages = document.querySelectorAll(".colors-option span");
randomImages.forEach((span) => {
  span.addEventListener("click", (e) => {
    hundelate(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

//end change random images

//start background change

let page = document.querySelector(".landing-page");

let arryPhoto = ["1.jpg", "3.jpg", "4.jpg"];

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let ranNumber = Math.floor(Math.random() * arryPhoto.length);
      page.style.backgroundImage = `url("imgs/${arryPhoto[ranNumber]}")`;
    }, 3000);
  }
}
//end background change

//start scrooling
let skills = document.querySelector(".our-skills");
window.onscroll = function () {
  let skillsOfset = skills.offsetTop;
  let skillsOfsetHight = skills.offsetHeight;
  let windwoHight = this.innerHeight;
  let windowScrollTop = this.scrollY;

  if (windowScrollTop >= skillsOfset + skillsOfsetHight - windwoHight) {
    let newSkills = document.querySelectorAll(".skill-box .skill-prog span");

    newSkills.forEach((s) => {
      s.style.width = s.dataset.progress;
    });
  }
};
//end scrooling

// start images pop up

let myImages = document.querySelectorAll(".gallery img");

myImages.forEach((imgs) => {
  imgs.addEventListener("click", (i) => {
    let overlay = document.createElement("div");
    overlay.className = "po-up";
    document.body.appendChild(overlay);
    let box = document.createElement("div");
    box.className = "any-box";

    if (imgs.alt !== null) {
      let headeR = document.createElement("h3");
      let headText = document.createTextNode(imgs.alt);
      headeR.appendChild(headText);
      box.appendChild(headeR);
    }
    let magy = document.createElement("img");
    magy.src = imgs.src;
    box.appendChild(magy);
    document.body.appendChild(box);
    let newButton = document.createElement("span");
    newButton.className = "new-button";
    let closeButton = document.createTextNode("X");
    newButton.appendChild(closeButton);
    box.appendChild(newButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "new-button") {
    e.target.parentNode.remove();
    document.querySelector(".po-up").remove();
  }
});

// end images pop up

// start bullits
let ourBull = document.querySelectorAll(".nav-bullit .bullit");
let myLinksGo = document.querySelectorAll(".links a");

function goToElements(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

goToElements(ourBull);
goToElements(myLinksGo);
// end bullets

//  start function hundel
function hundelate(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((f) => {
    f.classList.remove("active");
  });
  ev.target.classList.add("active");
}
//  end function hundel

// start disply bull
let bullSpan = document.querySelectorAll(".new-bullits span");
let bullContainer = document.querySelector(".nav-bullit");

let localBull = localStorage.getItem("new_bullits");

if (localBull !== null) {
  bullSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (localBull === "block") {
    bullContainer.style.display = "block";
    document.querySelector(".new-bullits .yes").classList.add("active");
  } else {
    bullContainer.style.display = "none";
    document.querySelector(".new-bullits .no").classList.add("active");
  }
}

bullSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.dis === "show") {
      bullContainer.style.display = "block";
      localStorage.setItem("new_bullits", "block");
    } else {
      bullContainer.style.display = "none";
      localStorage.setItem("new_bullits", "none");
    }
    hundelate(e);
  });
});

// end disply bull

let restOption = document.querySelector(".rest-option");
restOption.onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// toggel in menu
let btnToggel = document.querySelector(".toggel-menu");
let linksToggel = document.querySelector(".links");

btnToggel.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  linksToggel.classList.toggle("open");
};

document,
  addEventListener("click", (e) => {
    if (e.target !== btnToggel && e.target !== linksToggel) {
      if(linksToggel.classList.contains("open")){
        btnToggel.classList.toggle("menu-active");
        linksToggel.classList.toggle("open");
      }
    }
  });

linksToggel.onclick = function (e) {
  e.stopPropagation();
};
