var board;
var rows = 4;
var columns = 4;
var score = 0;
localStorage.setItem("hs", 0);
window.onload = function () {
  startGame();
};

function startGame() {
  score = 0;
  let pop = document.getElementById("popup");
  pop.classList.remove("visible");
  let boardContainer = document.getElementById("board");
  while (boardContainer.firstChild) {
    boardContainer.removeChild(boardContainer.firstChild);
  }
  let sc = document.getElementById("score");
  sc.innerHTML = "Score:<br>" + score;
  let hsc = document.getElementById("highest-score");
  hsc.innerHTML = "Top:<br>" + localStorage.getItem("hs");
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      let box = document.createElement("div");
      box.id = row.toString() + col.toString();
      box.setAttribute("data-text", "");
      box.classList.add("box");
      document.getElementById("board").appendChild(box);
    }
  }
  newBox();
}

function space() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (board[row][col] == 0) {
        return true;
      }
    }
  }
  return false;
}

function newBox() {
  if (!space()) {
    let fs = document.getElementById("final-score");
    fs.innerHTML = "Score: " + score;
    let pop = document.getElementById("popup");
    pop.style.display = "block";
    pop.classList.add("visible");
    startGame();
  }
  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] === 0) {
      found = true;
      board[r][c] = 2;
      updateBox(r, c, board[r][c]);
    }
  }
}

function updateBox(r, c, num) {
  let box = document.getElementById(r.toString() + c.toString());
  box.setAttribute("data-text", num != 0 ? num.toString() : "");
  box.classList.value = "";
  box.classList.add("box");
  box.classList.add("b-" + num.toString());
}

document.addEventListener("keyup", function (event) {
  switch (event.code) {
    case "ArrowLeft":
      left();
      break;
    case "ArrowRight":
      right();
      break;
    case "ArrowDown":
      down();
      break;
    case "ArrowUp":
      up();
      break;
  }
  newBox();
});

function left() {
  for (let r = 0; r < rows; r++) {
    board[r] = compress(board[r]);
    for (let c = 0; c < rows; c++) {
      updateBox(r, c, board[r][c]);
    }
  }
}

function right() {
  for (let r = 0; r < rows; r++) {
    board[r] = compress(board[r].reverse()).reverse();
    for (let c = 0; c < rows; c++) {
      updateBox(r, c, board[r][c]);
    }
  }
}

function up() {
  for (let r = 0; r < rows; r++) {
    [board[0][r], board[1][r], board[2][r], board[3][r]] = compress([
      board[0][r],
      board[1][r],
      board[2][r],
      board[3][r],
    ]);
    for (let i = 0; i < rows; i++) {
      updateBox(i, r, board[i][r]);
    }
  }
}

function down() {
  for (let r = 0; r < rows; r++) {
    [board[0][r], board[1][r], board[2][r], board[3][r]] = compress([
      board[3][r],
      board[2][r],
      board[1][r],
      board[0][r],
    ]).reverse();
    for (let i = 0; i < rows; i++) {
      updateBox(i, r, board[i][r]);
    }
  }
}

function compress(array) {
  array = array.filter((a) => a != 0);
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === array[i + 1]) {
      array[i] *= 2;
      array[i + 1] = 0;
      score += array[i];
      let sc = document.getElementById("score");
      sc.innerHTML = "Score:<br>" + score;
      let hsc = document.getElementById("highest-score");
      let currentHighestScore = localStorage.getItem("hs") || 0;
      hsc.innerHTML =
        "Top:<br>" +
        (currentHighestScore > score ? currentHighestScore : score).toString();
      localStorage.setItem("hs", Math.max(currentHighestScore, score));
    }
    array = array.filter((a) => a != 0);
  }
  while (array.length < rows) {
    array.push(0);
  }
  return array;
}

document.getElementById("restartButton").addEventListener("click", function () {
  document.getElementById("board").innerHTML = "";
  startGame();
});

document.getElementById("gameOverButton").addEventListener("click", function () {
    console.log("Clicked!");
    let pop = document.getElementById("popup");
    pop.style.display = "none";
    pop.classList.remove("visible");
    startGame();
  });
