const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

let idSum = 0;

input.split("\n").forEach((line, index) => {
  // Removes "Game {id}: " prefix.
  line = line.substring(line.indexOf(":") + 2);

  const id = index + 1;
  const maxValues = line.split(/;\w?/).reduce(
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

  if (maxValues.red <= 12 && maxValues.green <= 13 && maxValues.blue <= 14) {
    idSum += id;
  }
});

console.log(idSum);
