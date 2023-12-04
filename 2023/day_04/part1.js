const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const lines = input.split("\n");

const SCORE_MULTIPLIER = 2;

const totalScore = lines
  .map((cardString) => {
    const { winSet, currentSet } = parseCard(cardString);
    return computeScore({ winSet, currentSet });
  })
  .reduce((total, n) => total + n, 0);

console.log(totalScore);

function computeScore({ winSet, currentSet }) {
  let score = 0;
  winSet.forEach((winner) => {
    if (currentSet.has(winner)) {
      score = score === 0 ? 1 : score * SCORE_MULTIPLIER;
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
