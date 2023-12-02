const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

function getPowerSum(input) {
  const powers = input.split("\n").map((line, index) => {
    // Removes "Game {id}: " prefix.
    line = line.substring(line.indexOf(":") + 2);

    const minCubes = minCubesRequiredInRound(line);
    const power = Object.values(minCubes).reduce(
      (product, n) => n * product,
      1
    );
    return power;
  });

  return powers.reduce((sum, n) => sum + n, 0);
}

function minCubesRequiredInRound(line) {
  return line.split(/;\w?/).reduce(
    (highestValues, round) => {
      round
        .trim()
        .split(",")
        .forEach((colorString) => {
          const [num, color] = colorString.trim().split(" ");
          highestValues[color] = Math.max(highestValues[color], num);
        });
      return highestValues;
    },
    { red: 0, blue: 0, green: 0 }
  );
}

console.log(getPowerSum(input));
