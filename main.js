let user = {};

let defaultUser = {
  point: 0,
  clickBase: 1,
  clickMulti: 1,
  cost: 10,
  cost2: 100,
};

const menu = document.getElementById("menu");
const mainGame = document.getElementById("mainGame");
const playButton = document.getElementById("play");
const button1 = document.getElementById("button1");
const upgradeButton1 = document.getElementById("upgradeButton1");
const upgradeButton2 = document.getElementById("upgradeButton2");
const resetButton = document.getElementById("resetButton")
const pointText = document.getElementById("pointText");
const upgradeText = document.getElementById("upgradeText");
const upgradeText2 = document.getElementById("upgradeText2");
const rngBG = document.getElementById("randomBackground");

playButton.addEventListener("click", () => {
  menu.style.display = "none";
  mainGame.style.display = "block";
  console.log("switched from menu to game screen")
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
  upgradeText.textContent = "Cost: " + user.cost;
  upgradeText2.textContent = "Cost: " + user.cost2;
  pointText.textContent = "Point: " + user.point;
};

resetButton.addEventListener("click", () => {
  const userConfirmed = confirm("Are you sure to delete the data")
  if (userConfirmed) {
  localStorage.removeItem("userData");
  user = { ...defaultUser };
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

function randomBG() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  rngBG.style.backgroundColor = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
};

rngBG.addEventListener("click", randomBG);

loadData()
setInterval(() => {
  updateText()
}, 50)