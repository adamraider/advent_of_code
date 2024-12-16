const fs = require("fs");
const path = require("path");

const diskMap = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .trim()
  .split("")
  .map((n) => parseInt(n, 10));

// Map to a uncompacted diskMap.
let mapped = diskMap.reduce((acc, n, index) => {
  const isFreeSpace = index % 2 === 1;
  return [...acc, ...Array(n).fill(isFreeSpace ? "." : index / 2)];
}, []);

// Gather all free spaces.
const freeSpaceIndices = [];
mapped.forEach((char, i) => {
  if (char === ".") {
    freeSpaceIndices.push(i);
  }
});

// Move data from end to free spaces.
while (freeSpaceIndices.length) {
  let toMove;

  do {
    toMove = mapped.pop();
  } while (toMove === ".");

  const newLocation = freeSpaceIndices.shift();
  mapped[newLocation] = toMove;
}

mapped = mapped.filter((n) => n != undefined);

// Compute checksum
function checksum(filesystem) {
  let sum = 0;
  for (let i = 0; i < filesystem.length; i += 1) {
    sum += i * filesystem[i];
  }
  return sum;
}

console.log("Checksum", checksum(mapped));
