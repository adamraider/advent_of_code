const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const CARDS = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};

const TYPES = {
  FIVE_OF_A_KIND: 0,
  FOUR_OF_A_KIND: 1,
  FULL_HOUSE: 2,
  THREE_OF_A_KIND: 3,
  TWO_PAIR: 4,
  ONE_PAIR: 5,
  HIGH_CARD: 6,
};

const lines = input.split("\n").filter(Boolean).map(parseLine);

function parseLine(line) {
  const [handStr, bidStr] = line.split(" ");
  const rating = rateHand(handStr);
  return { handStr, rating, bid: parseInt(bidStr, 10) };
}

function rateHand(handStr) {
  const cards = handStr.split("");
  const map = cards.reduce((obj, card) => {
    obj[card] ||= 0;
    obj[card]++;
    return obj;
  }, {});
  const jokers = map.J || 0;
  delete map.J;
  const cardsUnique = Object.keys(map);
  const values = Object.values(map);

  if (values.some((n) => n + jokers === 5) || jokers === 5) {
    return TYPES.FIVE_OF_A_KIND;
  }

  if (values.some((n) => n + jokers === 4)) {
    return TYPES.FOUR_OF_A_KIND;
  }

  if (isFullHouse(values, jokers)) {
    return TYPES.FULL_HOUSE;
  }

  if (values.some((n) => n + jokers === 3)) {
    return TYPES.THREE_OF_A_KIND;
  }

  if (isTwoPair(values, jokers)) {
    return TYPES.TWO_PAIR;
  }

  if (values.some((n) => n + jokers === 2)) {
    return TYPES.ONE_PAIR;
  }

  if (cardsUnique.length === 5) {
    return TYPES.HIGH_CARD;
  }

  throw new Error("Unreachable");
}

function isFullHouse(values, jokers) {
  const vals = values.sort((a, b) => b - a);
  return (
    vals[0] + jokers >= 3 && vals[1] + Math.max(0, jokers - (3 - vals[0])) >= 2
  );
}

function isTwoPair(values, jokers) {
  const vals = values.sort((a, b) => b - a);
  return (
    vals[0] + jokers >= 2 && vals[1] + Math.max(0, jokers - (2 - vals[0])) >= 2
  );
}

const rated = lines.sort((a, b) => {
  if (a.rating === b.rating) {
    for (let i = 0; i < a.handStr.length; i++) {
      const aC = a.handStr[i];
      const bC = b.handStr[i];
      if (aC === bC) continue;
      const a2 = CARDS[aC];
      const b2 = CARDS[bC];
      return a2 - b2;
    }
  }
  return b.rating - a.rating;
});

const sum = rated.map((h, i) => h.bid * (i + 1)).reduce((sum, v) => sum + v, 0);

console.log(rated, sum);
