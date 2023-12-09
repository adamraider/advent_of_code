const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .split("\n")
  .map((line) => line.split(" ").map((n) => parseInt(n, 10)));

function differences(line) {
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

const extrapolated = lines.map(differences).map((diffs) => {
  diffs[diffs.length - 1].push(0);
  for (let i = diffs.length - 1; i > 0; i--) {
    const x = diffs[i][diffs[i].length - 1] + diffs[i - 1][diffs[i].length - 1];
    diffs[i - 1].push(x);
  }
  return diffs[0][diffs[0].length - 1];
});

console.log(extrapolated);

const sum = extrapolated.reduce((sum, n) => sum + n, 0);
console.log(sum);
