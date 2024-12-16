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
  if (antennas.length > 1) {
    antennas.forEach((resonant) =>
      resonants.add(resonant[0] + "," + resonant[1]),
    );
  }
  antennas.forEach((antenna, index) => {
    const otherAntennas = [...antennas];
    otherAntennas.splice(index, 1);
    otherAntennas.forEach((other) => {
      const xDistance = antenna[0] - other[0];
      const yDistance = antenna[1] - other[1];

      let resonant = [antenna[0] + xDistance, antenna[1] + yDistance];
      while (isValidAntinode(resonant)) {
        // rawInput[resonant[0]][resonant[1]] = "#";
        resonants.add(resonant[0] + "," + resonant[1]);
        resonant[0] += xDistance;
        resonant[1] += yDistance;
      }
    });
  });
}

function isValidAntinode([row, col]) {
  return (
    row >= 0 && row < rawInput.length && col >= 0 && col < rawInput[0].length
  );
}

console.log(rawInput.map((row) => row.join("")).join("\n"));

console.log("Unique antinodes", resonants.size);
