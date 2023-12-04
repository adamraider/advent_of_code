const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const lines = input.split("\n");

const cardScores = lines.map((cardString) => scoreCard(parseCard(cardString)));
const totalCardNumber = cardScores.reduce(
  (total, _, index) => total + countRecursive(index),
  0
);

console.log(totalCardNumber);

/**
 * Recursively counts the card clones.
 */
function countRecursive(cardIndex, n = 0) {
  for (let i = cardIndex + 1; i <= cardIndex + cardScores[cardIndex]; i++) {
    n += countRecursive(i);
  }

  // Add one to count the original card.
  return n + 1;
}

/**
 * Counts how many winning numbers the card has.
 */
function scoreCard({ winSet, numbers }) {
  return Array.from(winSet).reduce(
    (total, winner) => (numbers.has(winner) ? total + 1 : total),
    0
  );
}

/**
 * Parses a string representation of a card into two Sets representing
 * the winning numbers and the actual numbers.
 */
function parseCard(cardString) {
  cardString = cardString.split(/\:\s+/)[1];
  const [winNums, currentNums] = cardString.split(/\s+\|\s+/);
  const winSet = new Set(winNums.split(/\s+/));
  const numbers = new Set(currentNums.split(/\s+/));
  return { winSet, numbers };
}
