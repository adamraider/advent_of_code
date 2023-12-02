const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const isNumber = (char) => char >= "0" && char <= "9";

function part1(input) {
  return input.split("\n").reduce((acc, line) => {
    let firstChar, lastChar;
    for (const char of line) {
      if (isNumber(char)) {
        firstChar = char;
        break;
      }
    }
    for (let i = line.length - 1; i >= 0; i--) {
      const char = line[i];
      if (isNumber(char)) {
        lastChar = char;
        break;
      }
    }
    return acc + parseInt(firstChar + lastChar);
  }, 0);
}

console.log(part1(input));
