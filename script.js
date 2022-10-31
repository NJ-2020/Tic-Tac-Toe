const x = document.querySelector(".btn button:first-child");
const o = document.querySelector(".btn button:last-child");
const playGround = document.querySelectorAll(".play-ground div");
let patterns = ["", "", "", "", "", "", "", "", ""];
let userChoice = "x";
let computerChoice = "";
let compSelections = ["x", "o"];
let divId = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

x.addEventListener("click", function () {
  userChoice = "x";
});

o.addEventListener("click", function () {
  userChoice = "o";
});

let gaveIsOver = false;
playGround.forEach((el) => {
  el.addEventListener("click", function () {
    if (gaveIsOver === true) return;
    patterns[divId.indexOf(el.id)] = userChoice;
    winner();
    // el.id = id pada el yg diklik, say "c"
    // indexOf = indexnya brp "c", say 2
    // patterns[2] = userChoice

    el.innerHTML = userChoice;
    if (userChoice === "x") {
      computerChoice = "o";
    } else {
      computerChoice = "x";
    }
    abi();
  });
});

// computer start to select his choice
function abi() {
  if (!patterns.includes("")) return; // if doesn't contains an empty box, stop it

  let randomIndex = Math.floor(Math.random() * patterns.length);

  if (patterns[randomIndex - 1] === "") {
    const pc = document.querySelector(`#${divId[randomIndex - 1]}`);
    // const pc = document.querySelector("#" + divId[randomIndex - 1])
    // divId[2]
    // select a node in HTML at index 2, say c.
    // assign it to pc
    // pc = #c

    patterns[randomIndex - 1] = computerChoice;
    pc.innerHTML = computerChoice;
  } else {
    return abi();
  }
}

const restart = document.querySelector(".restart");
restart.addEventListener("click", function () {
  patterns = ["", "", "", "", "", "", "", "", ""];
  playGround.forEach(function (el) {
    el.innerHTML = "";
  });
  userChoice = "x";
  gaveIsOver = false;
});

const line = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let result = document.querySelector(".result");
function winner() {
  for (let i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (patterns[a] === "" && patterns[b] === "" && patterns[c] === "") break;
    if (patterns[a] === patterns[b] && patterns[b] === patterns[c]) {
      console.log("The winner is " + patterns[a]);
      result.innerHTML = "The winner is " + patterns[a];
      gaveIsOver = true;
      break;
    }
  }

  if (!patterns.includes("")) {
    result.innerHTML = "Tie";
    console.log("Tie");
    gaveIsOver = true;
  }
}
