let user = {};

let defaultUser = {
  point: 0,
  clickBase: 1,
  clickMulti: 1,
  cost: 10,
  cost2: 100,
  bgColor: "#ffffff"
};

const menu = document.getElementById("menu");
const mainGame = document.getElementById("mainGame");
const playButton = document.getElementById("play");
const returnMenu = document.getElementById("returnMenu");
const button1 = document.getElementById("button1");
const upgradeButton1 = document.getElementById("upgradeButton1");
const upgradeButton2 = document.getElementById("upgradeButton2");
const resetButton = document.getElementById("resetButton")
const pointText = document.getElementById("pointText");
const upgradeText = document.getElementById("upgradeText");
const upgradeText2 = document.getElementById("upgradeText2");
const colorBtn = document.getElementById("colorBtn");
const colorPicker = document.getElementById("colorPicker");

colorBtn.addEventListener("click", () => {
  colorPicker.click();
});

colorPicker.addEventListener("input", () => {
  user.bgColor = colorPicker.value;
  document.body.style.backgroundColor = user.bgColor;
  saveData();
});


playButton.addEventListener("click", () => {
  menu.style.display = "none";
  mainGame.style.display = "block";
  console.log("switched from menu to game screen")
})

returnMenu.addEventListener("click", () => {
  menu.style.display = "flex";
  mainGame.style.display = "none";
  console.log("switched from game to menu screen")
})

function saveData() {
  localStorage.setItem("userData", JSON.stringify(user));
};

function loadData() {
  const savedData = JSON.parse(localStorage.getItem("userData")) || {};
  if (savedData) {
    user = { ...defaultUser, ...savedData };
  };
};

function clickPower() {
  return user.clickBase * user.clickMulti;
}

function updateText() {
  upgradeText.querySelector("span").textContent = user.cost;
  upgradeText2.querySelector("span").textContent = user.cost2;
  pointText.querySelector("span").textContent = user.point;
};

resetButton.addEventListener("click", () => {
  const userConfirmed = confirm("Are you sure to delete the data")
  if (userConfirmed) {
  localStorage.removeItem("userData");
  user = { ...defaultUser };
  document.body.style.backgroundColor = defaultUser.bgColor;
  colorPicker.value = defaultUser.bgColor;
  updateText()
  console.log("resetted")
  }
  else {
    console.log("cancelled")
  }
});

button1.addEventListener("click", () => {
  user.point += clickPower();
  console.clear()
  console.log(clickPower())
  saveData()
});

upgradeButton1.addEventListener("click", () => {
  if (user.point >= user.cost) {
    user.clickBase += 1;
    user.point -= user.cost;
    user.cost = Math.floor(user.cost * 1.5);
    saveData();
  } else {
    console.log("not enough point to upgrade");
  }
});

upgradeButton2.addEventListener("click", () => {
  if (user.point >= user.cost2) {
    user.clickMulti *= 2;
    user.point -= user.cost2;
    user.cost2 = Math.floor(user.cost2 * 3);
    saveData();
  } else {
    console.log("not enough point to upgrade")
  }
})

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return; // clicked something else, ignore

  const rect = btn.getBoundingClientRect();

  // get click position
  const x = e.clientX;
  const y = e.clientY;

  // grab button background color
  const btnColor = getComputedStyle(btn).backgroundColor;

  const particleCount = 8;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    
    p.style.filter = "brightness(1.8)";

    // random burst direction
    const offsetX = (Math.random() - 0.5) * 160 + "px";
    const offsetY = (Math.random() - 0.5) * 160 + "px";

    p.style.setProperty("--x", offsetX);
    p.style.setProperty("--y", offsetY);
    p.style.setProperty("--pColor", btnColor);

    p.style.left = x + "px";
    p.style.top = y + "px";

    document.body.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
});

loadData();

if (user.bgColor) {
  document.body.style.backgroundColor = user.bgColor;
  colorPicker.value = user.bgColor;
}

setInterval(() => {
  updateText()
}, 50)