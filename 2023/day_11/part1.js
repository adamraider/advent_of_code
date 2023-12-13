const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .split("\n")
  .map((l) => l.split(""));

const GALAXY = "#";

// collect horizontal empty lines
const hIndex = [];
input.forEach((line, i) => {
  if (line.every((c) => c !== GALAXY)) {
    hIndex.push(i);
  }
});

// collect vertical empty lines
const vIndex = [];
for (let i = 0; i < input[0].length; i++) {
  for (let j = 0; j < input.length; j++) {
    const isLast = j === input.length - 1;
    if (input[j][i] !== ".") {
      break;
    }
    if (input[j][i] === "." && isLast) {
      vIndex.push(i);
    }
  }
}

// add horizontal expansion
hIndex.forEach((i, offset) => {
  input.splice(i + offset, 0, Array(input[0].length).fill("."));
});

// add vertical expansion
vIndex.forEach((i, offset) => {
  input.forEach((line) => {
    line.splice(i + offset, 0, ".");
  });
});

const galaxies = input.reduce((galaxies, line, y) => {
  line.forEach((char, x) => {
    if (char === GALAXY) galaxies.push([x, y]);
  });
  return galaxies;
}, []);

function getDistance(coordsA, coordsB) {
  return Math.abs(coordsA[0] - coordsB[0]) + Math.abs(coordsA[1] - coordsB[1]);
}

let distance = 0;
galaxies.forEach((g, index) => {
  for (let i = index + 1; i < galaxies.length; i++) {
    distance += getDistance(g, galaxies[i]);
  }
});

console.log(distance);
