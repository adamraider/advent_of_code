const fs = require("fs");
const { default: test } = require("node:test");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .trim()
  .split("\n");

console.log(input);

function duplicateInput(input) {
  return input.map((row) => [...row]);
}

const GUARD = ["<", ">", "^", "v"];
const OBSTRUCTION = "#";

// Get start pos.
let startPosition = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (GUARD.includes(input[i][j])) {
      startPosition = [i, j];
    }
  }
}

const charToDirection = {
  ">": "RIGHT",
  v: "DOWN",
  "<": "LEFT",
  "^": "UP",
};

const startDirection =
  charToDirection[input[startPosition[0]][startPosition[1]]];

let obstructionCount = 0;

function traverse(input) {
  const tiles = new Set();
  const vectors = new Set();
  let direction = startDirection;
  let position = [...startPosition];

  while (true) {
    switch (move(input, tiles, vectors, direction, position)) {
      case "TURN":
        direction = turnRight(direction);
        break;
      case "LOOP":
        obstructionCount++;
        return { tiles };
      case "HALT":
        return { tiles };
      case "FORWARD":
        switch (direction) {
          case "LEFT":
            position[1]--;
            break;
          case "RIGHT":
            position[1]++;
            break;
          case "UP":
            position[0]--;
            break;
          case "DOWN":
            position[0]++;
            break;
        }
        break;
    }
  }
}

function move(input, tiles, vectors, direction, [row, col]) {
  tiles.add(`${row}|${col}`);
  vectors.add(`${row}|${col}|${direction}`);
  switch (direction) {
    case "LEFT":
      col--;
      break;
    case "RIGHT":
      col++;
      break;
    case "UP":
      row--;
      break;
    case "DOWN":
      row++;
      break;
  }

  if (vectors.has(`${row}|${col}|${direction}`)) {
    return "LOOP";
  } else if (input[row]?.[col] === OBSTRUCTION) {
    return "TURN";
  } else if (input[row]?.[col] === undefined) {
    return "HALT";
  } else {
    return "FORWARD";
  }
}

function turnRight(direction) {
  switch (direction) {
    case "LEFT":
      return "UP";
    case "RIGHT":
      return "DOWN";
    case "UP":
      return "RIGHT";
    case "DOWN":
      return "LEFT";
  }
}

const { tiles: actualTileset } = traverse(input);

for (const tile of actualTileset) {
  const [row, col] = tile.split("|");
  const testInput = duplicateInput(input);
  testInput[row][col] = OBSTRUCTION;
  traverse(testInput);
}

console.log(obstructionCount);
