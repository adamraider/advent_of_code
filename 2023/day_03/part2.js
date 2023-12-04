const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});
const lines = input.split("\n");

const gearRatios = [];

const isNumber = (char) => char <= "9" && char >= "0";
const isSymbol = (char) => (char > "9" || char < "0") && char !== ".";

lines.forEach((line, lineIndex) => {
  line.split("").forEach((char, charIndex) => {
    if (isSymbol(char)) checkAdjacent(lineIndex, charIndex);
  });
});

function checkAdjacent(lineIndex, charIndex) {
  const checked = new Map();
  const gearNumbers = [];

  [-1, 0, 1].forEach((i) => {
    const currentLine = lineIndex + i;
    checked.set(currentLine, new Set());
    [-1, 0, 1].forEach((j) => {
      const currentChar = charIndex + j;
      if (i === 0 && j === 0) return;
      if (checked.get(currentLine)?.has(currentChar)) return;

      const number = scanHorizontally(currentLine, currentChar, checked);
      if (number) gearNumbers.push(parseInt(number));
    });
  });

  if (gearNumbers.length === 2) {
    gearRatios.push(gearNumbers[0] * gearNumbers[1]);
  }
}

function scanHorizontally(l, charIndex, checked) {
  if (!isNumber(lines[l][charIndex])) return;

  checked.get(l).add(charIndex);

  let number = "" + lines[l][charIndex];
  number = lines[l][charIndex];

  let scanCharIndex = charIndex + 1;

  // scan right
  while (isNumber(lines[l][scanCharIndex])) {
    checked.get(l).add(scanCharIndex);
    number += lines[l][scanCharIndex];
    scanCharIndex++;
  }

  // scan left
  scanCharIndex = charIndex - 1;
  while (isNumber(lines[l][scanCharIndex])) {
    checked.get(l).add(scanCharIndex);
    number = lines[l][scanCharIndex] + number;
    scanCharIndex--;
  }
  return number;
}

const gearRatioSum = gearRatios.reduce((sum, n) => sum + n, 0);
console.log(gearRatioSum === 91622824);
