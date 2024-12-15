const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .trim()
  .split("\n");

console.log(input);

const GUARD = ["<", ">", "^", "v"];
const OBSTRUCTION = "#";

let position = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (GUARD.includes(input[i][j])) {
      position = [i, j];
    }
  }
}

console.log("Starting position", position);

const charToDirection = {
  ">": "RIGHT",
  v: "DOWN",
  "<": "LEFT",
  "^": "UP",
};

let direction = charToDirection[input[position[0]][position[1]]];
console.log("Starting direction", direction);
const tiles = new Set();

function move() {
  const [row, col] = position;
  console.log(`${row}|${col}|${direction}`);
  tiles.add(`${row}|${col}`);
  switch (direction) {
    case "LEFT":
      if (input[row]?.[col - 1] === OBSTRUCTION) {
        turnRight();
      } else if (input[row]?.[col - 1] === undefined) {
        return "HALT";
      } else {
        position[1]--;
      }
      break;
    case "RIGHT":
      if (input[row]?.[col + 1] === OBSTRUCTION) {
        turnRight();
      } else if (input[row]?.[col + 1] === undefined) {
        return "HALT";
      } else {
        position[1]++;
      }
      break;
    case "UP":
      if (input[row - 1]?.[col] === OBSTRUCTION) {
        turnRight();
      } else if (input[row - 1]?.[col] === undefined) {
        return "HALT";
      } else {
        position[0]--;
      }
      break;
    case "DOWN":
      if (input[row + 1]?.[col] === OBSTRUCTION) {
        turnRight();
      } else if (input[row + 1]?.[col] === undefined) {
        return "HALT";
      } else {
        position[0]++;
      }
      break;
  }
}

while (true) {
  if (move() === "HALT") break;
}

function turnRight() {
  switch (direction) {
    case "LEFT":
      direction = "UP";
      break;
    case "RIGHT":
      direction = "DOWN";
      break;
    case "UP":
      direction = "RIGHT";
      break;
    case "DOWN":
      direction = "LEFT";
      break;
  }
}

console.log(tiles.size + " tiles");
