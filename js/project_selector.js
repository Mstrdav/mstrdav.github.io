let currentProject = document
  .querySelector(".project-selector-item")
  .getAttribute("data-project");
console.log("Current project: " + currentProject);

const projectSelectorList = document.querySelector("#project-selector-list");
const projectSelector = document.querySelector("#project-selector");

// project info actions buttons
const piaGh = document.querySelector("#pia-gh");
const piaLive = document.querySelector("#pia-live");

const NB_PROJECTS = 4;

document.querySelectorAll(".project-selector-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (item.getAttribute("data-project") != currentProject) {
      // switch the project
      switchProject(item);
    }
  });
});

// detect the actual scroll when lodition the page
window.addEventListener("load", () => {
    // get current from url
    let currentHash = window.location.hash;
    if (currentHash != "") {
        switchProject(document.querySelector("#psi-" + currentHash.split("-")[1]));
    }
});

const switchProject = (item) => {
  currentProject = item.getAttribute("data-project");
  console.log("Clicked: " + item.getAttribute("data-project"));

  // we need to change the active project:
  // transform the project selector
  // scroll the body

  // transform the project selector
  // compute the new position of the project selector
  let newID = parseInt(item.getAttribute("data-project").split("-")[1]);

  // we translate the project selector by the difference between the two IDs * the size of the project selector item
  // get the size of the project selector item
  let itemSize = item.getBoundingClientRect().width;
  console.log("Item size: " + itemSize);
  let translate = (1 - newID) * itemSize;
  projectSelectorList.style.transform = "translateX(" + translate + "px)";
  console.log("Translate: " + translate);

  // scroll the body
  let newProject = document.querySelector(
    "#" + item.getAttribute("data-project")
  );
  // redirect to #project
  window.location.hash = item.getAttribute("data-project");

  // update the project info
  // piaPrev.href = "#project-" + newID;
  // piaPrev.onclick = function () {
  //   console.log("Clicked prev");
  //   switchProject(document.querySelector("#psi-" + (newID - 1)));
  //   return true;
  // };
  // piaPrev.style.display = "inline";
  // piaNext.href = "#project-" + newID;
  // piaNext.onclick = function () {
  //   console.log("Clicked next");
  //   switchProject(document.querySelector("#psi-" + (newID + 1)));
  //   return true;
  // };
  // piaNext.style.display = "inline";
  // if (newID == 1) {
  //   piaPrev.style.display = "none";
  // } else if (newID == NB_PROJECTS) {
  //   piaNext.style.display = "none";
  // }
};

/* 
  pialive
  on click, translate the project selector and the header out of the screen
  move the project info to the bottom
  expand the canvas
*/

piaLive.addEventListener("click", (e) => {
  e.preventDefault();
  let projectInfo = document.querySelector("#project-info");
  let projectInfoPos = projectInfo.getBoundingClientRect();
  // hide the project selector
  projectSelector.style.transform = "translateY(100%)";
  // hide the header
  document.querySelector("header").style.transform = "translateY(-100%)";
  // move the project info to the bottom
  // make it disappear
  projectInfo.style.opacity = "0";

  setTimeout(() => {
    projectInfo.style.position = "fixed";
    projectInfo.style.bottom = "0px";
    projectInfo.style.paddingLeft = "40px";
    // make it reappear
    projectInfo.style.opacity = "1";
  }, 400);

  // expand the canvas
  let projectDiv = document.querySelector("#project-div");
  projectDiv.style.left = "0px";
  projectDiv.style.width = "100%";
  projectDiv.style.height = "calc(100%)";
  projectDiv.style.top = "0px";
  projectDiv.style.borderRadius = "0px";
});

/*
create a canvas in the project div
*/

const canvas = document.createElement("canvas");
canvas.id = "boids";
canvas.style.width = "100%";
canvas.style.height = "100%";
const projectDiv = document.querySelector("#project-div");
projectDiv.appendChild(canvas);

startBoids();
