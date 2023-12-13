const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .split("\n")
  .map((l) => l.split(""));

const AGE = 1_000_000;
const GALAXY = "#";

// Find horizontal empty space indicies.
const horizontalSpace = new Set();
for (let i = 0; i < input.length; i++) {
  if (input[i].every((c) => c !== GALAXY)) {
    horizontalSpace.add(i);
  }
}

// Find vertical empty space indicies.
const verticalSpace = new Set();
for (let i = 0; i < input[0].length; i++) {
  for (let j = 0; j < input.length; j++) {
    const isLast = j === input.length - 1;
    if (input[j][i] === GALAXY) break;
    if (isLast) verticalSpace.add(i);
  }
}

const galaxies = input.reduce((galaxies, line, y) => {
  line.forEach((char, x) => {
    if (char === GALAXY) {
      galaxies.push([x, y]);
    }
  });
  return galaxies;
}, []);

function getDistance(coordsA, coordsB) {
  return (
    Math.abs(coordsA[0] - coordsB[0]) +
    Math.abs(coordsA[1] - coordsB[1]) +
    getExpansionOffset(coordsA, coordsB)
  );
}

// Compute and sum up distance of all galaxy pairs.
let distance = 0;
galaxies.forEach((g, index) => {
  for (let i = index + 1; i < galaxies.length; i++) {
    distance += getDistance(g, galaxies[i]);
  }
});

// Computes expansion distance between two points.
function getExpansionOffset(coordsA, coordsB) {
  let expansionCount = 0;
  if (coordsA[0] != coordsB[0]) {
    const forward = coordsA[0] <= coordsB[0];
    for (
      let i = forward ? coordsA[0] : coordsB[0];
      i < (forward ? coordsB[0] : coordsA[0]);
      i++
    ) {
      if (verticalSpace.has(i)) expansionCount++;
    }
  }
  if (coordsA[1] != coordsB[1]) {
    const forward = coordsA[1] <= coordsB[1];
    for (
      let i = forward ? coordsA[1] : coordsB[1];
      i < (forward ? coordsB[1] : coordsA[1]);
      i++
    ) {
      if (horizontalSpace.has(i)) expansionCount++;
    }
  }
  return expansionCount * AGE - expansionCount;
}

console.log(distance);
