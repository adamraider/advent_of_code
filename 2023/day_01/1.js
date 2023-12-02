const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const PATTERN =
  /1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine/g;
const PATTERN_REVERSED =
  /1|2|3|4|5|6|7|8|9|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g;

const WORD_TO_N = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
};

const isNumber = (char) => char >= "0" && char <= "9";
const reverseString = (str) => str.split("").reverse().join("");

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

function part2(input) {
  return input.split("\n").reduce((acc, line) => {
    const matches = line.match(PATTERN);
    const first = WORD_TO_N[matches[0]];

    const matchesReversed = reverseString(line).match(PATTERN_REVERSED);
    const last = WORD_TO_N[reverseString(matchesReversed[0])];

    const n = parseInt("" + first + last);
    return acc + n;
  }, 0);
}

console.log(part2(input));
