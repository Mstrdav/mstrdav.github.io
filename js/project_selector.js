let currentProject = document
  .querySelector(".project-selector-item")
  .getAttribute("data-project");
console.log("Current project: " + currentProject);

const projectSelectorList = document.querySelector("#project-selector-list");
const projectSelector = document.querySelector("#project-selector");
let isProjectSelectorOpen = false;

// project info actions buttons
const piaPrev = document.querySelector("#pia-prev");
const piaNext = document.querySelector("#pia-next");
const piaGh = document.querySelector("#pia-gh");
const piaLive = document.querySelector("#pia-live");

const NB_PROJECTS = 4;

document.querySelectorAll(".project-selector-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (item.getAttribute("data-project") != currentProject) {
      if (isProjectSelectorOpen) {
        // close the project selector
        projectSelector.style.top = "calc(100% - 200px)";
        isProjectSelectorOpen = false;
      }

      // switch the project
      switchProject(item);
    } else {
      // scroll the project view to the top
      if (isProjectSelectorOpen) {
        console.log("Close project selector");
        // close the project selector
        projectSelector.style.top = "calc(100% - 200px)";
        isProjectSelectorOpen = false;
      } else {
        // open the project selector
        console.log("Open project selector");
        projectSelector.style.top = "120px";
        isProjectSelectorOpen = true;
      }
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

  // we translate the project selector by the difference between the two IDs * 290px
  let translate = (1 - newID) * 290;
  projectSelectorList.style.transform = "translateX(" + translate + "px)";
  console.log("Translate: " + translate);

  // scroll the body
  let newProject = document.querySelector(
    "#" + item.getAttribute("data-project")
  );
  // redirect to #project
  window.location.hash = item.getAttribute("data-project");

  // update the project info
  piaPrev.href = "#project-" + newID;
  piaPrev.onclick = function () {
    console.log("Clicked prev");
    switchProject(document.querySelector("#psi-" + (newID - 1)));
    return true;
  };
  piaPrev.style.display = "inline";
  piaNext.href = "#project-" + newID;
  piaNext.onclick = function () {
    console.log("Clicked next");
    switchProject(document.querySelector("#psi-" + (newID + 1)));
    return true;
  };
  piaNext.style.display = "inline";
  if (newID == 1) {
    piaPrev.style.display = "none";
  } else if (newID == NB_PROJECTS) {
    piaNext.style.display = "none";
  }
};
