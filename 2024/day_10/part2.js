const fs = require("fs");
const path = require("path");

const map = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .trim()
  .split("\n")
  .map((row) => row.split("").map((n) => parseInt(n, 10)));

const trailheads = [];

map.forEach((row, x) => {
  row.forEach((height, y) => {
    if (height === 0) {
      trailheads.push([x, y]);
    }
  });
});

function traverse(pos) {
  let rating = 0;
  const queue = [pos];

  while (queue.length) {
    const [x, y] = queue.shift();
    const height = map[x][y];
    if (height === 9) {
      const id = `${x},${y}`;
      rating++;
    } else {
      [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ]
        .filter((newPos) => isValid(height, newPos))
        .forEach((newPos) => queue.push(newPos));
    }
  }
  return rating;
}

function isValid(currentHeight, [x, y]) {
  return (
    x >= 0 &&
    y >= 0 &&
    x < map.length &&
    y < map[0].length &&
    map[x][y] - currentHeight === 1
  );
}

const totalRating = trailheads.reduce(
  (sum, trailhead) => sum + traverse(trailhead),
  0,
);

console.log({ totalRating });
