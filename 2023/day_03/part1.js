const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});
const lines = input.split("\n");

const checked = new Array(lines.length)
  .fill(0)
  .map(() => new Array(lines[0].length).fill(0));
const partNumbers = [];

const isNumber = (char) => char <= "9" && char >= "0";
const isSymbol = (char) => (char > "9" || char < "0") && char !== ".";

lines.forEach((line, lineIndex) => {
  line.split("").forEach((char, charIndex) => {
    if (isSymbol(char)) {
      checkAdjacent(lineIndex, charIndex);
    }
  });
});

function checkAdjacent(lineIndex, charIndex) {
  [-1, 0, 1].forEach((i) => {
    [-1, 0, 1].forEach((j) => {
      if (i === 0 && j === 0) return;
      if (checked[lineIndex + i][charIndex + j]) return;

      const number = scanHorizontally(lineIndex + i, charIndex + j);
      if (number) partNumbers.push(parseInt(number));
    });
  });
}

function scanHorizontally(l, charIndex) {
  checked[l][charIndex] = 1;
  if (!isNumber(lines[l][charIndex])) return;
  let number = "" + lines[l][charIndex];
  number = lines[l][charIndex];

  let scanCharIndex = charIndex + 1;

  while (isNumber(lines[l][scanCharIndex])) {
    checked[l][scanCharIndex] = 1;

    number += lines[l][scanCharIndex];
    scanCharIndex++;
  }

  scanCharIndex = charIndex - 1;

  while (isNumber(lines[l][scanCharIndex])) {
    checked[l][scanCharIndex] = 1;

    number = lines[l][scanCharIndex] + number;
    scanCharIndex--;
  }
  return number;
}

const partSum = partNumbers.reduce((sum, n) => sum + n, 0);
console.log(partSum === 560670);
