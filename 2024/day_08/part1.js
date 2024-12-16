const fs = require("fs");
const path = require("path");

const rawInput = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const nodeMap = {};

rawInput.forEach((row, rowIndex) => {
  row.forEach((node, colIndex) => {
    if (node !== ".") {
      nodeMap[node] ??= [];
      nodeMap[node].push([rowIndex, colIndex]);
    }
  });
});

const resonants = new Set();
for (const frequency of Object.keys(nodeMap)) {
  const antennas = nodeMap[frequency];
  antennas.forEach((antenna, index) => {
    const otherAntennas = [...antennas];
    otherAntennas.splice(index, 1);
    otherAntennas.forEach((other) => {
      const resonant = [
        antenna[0] + antenna[0] - other[0],
        antenna[1] + antenna[1] - other[1],
      ];

      if (isValidAntinode(resonant)) {
        resonants.add(resonant[0] + "," + resonant[1]);
      }
    });
  });
}

function isValidAntinode([row, col]) {
  return (
    row >= 0 && row < rawInput.length && col >= 0 && col < rawInput[0].length
  );
}

console.log("Unique antinodes", resonants.size);
