const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const lines = input.split("\n");

const matchCounts = lines.reduce((matchCounts, cardString, cardNumber) => {
  const score = countMatches(parseCard(cardString));
  matchCounts.set(cardNumber + 1, score);
  return matchCounts;
}, new Map());

let totalCardNumber = 0;

function countRecursive(cardNumber) {
  totalCardNumber++;
  for (
    let i = cardNumber + 1;
    i <= cardNumber + matchCounts.get(cardNumber);
    i++
  ) {
    countRecursive(i);
  }
}

lines.forEach((_, index) => void countRecursive(index + 1));

console.log(totalCardNumber);

function countMatches({ winSet, currentSet }) {
  let score = 0;
  winSet.forEach((winner) => {
    if (currentSet.has(winner)) {
      score++;
    }
  });
  return score;
}

function parseCard(cardString) {
  cardString = cardString.split(/\:\s+/)[1];
  const [winNums, currentNums] = cardString.split(/\s+\|\s+/);
  const winSet = new Set(winNums.split(/\s+/));
  const currentSet = new Set(currentNums.split(/\s+/));
  return { winSet, currentSet };
}
