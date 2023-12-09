const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .split("\n")
  .map((line) => line.split(" ").map((n) => parseInt(n, 10)));

function computeDifferences(line) {
  let next = [...line];
  const extrapolated = [next];
  while (!next.every((val) => val === 0)) {
    next = next.reduce((next, val, i, line) => {
      if (i < line.length - 1) next.push(line[i + 1] - val);
      return next;
    }, []);
    extrapolated.push(next);
  }
  return extrapolated;
}

function extrapolateFirstValue(diffs) {
  diffs[diffs.length - 1].push(0);
  for (let i = diffs.length - 1; i > 0; i--) {
    const x = diffs[i - 1][0] - diffs[i][0];
    diffs[i - 1].unshift(x);
  }
  return diffs[0][0];
}

const sum = lines
  .map(computeDifferences)
  .map(extrapolateFirstValue)
  .reduce((sum, n) => sum + n, 0);

console.log(sum);
