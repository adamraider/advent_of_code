const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .split(/\n/)
  .filter(Boolean);

let count = 0;

for (let row of input) {
  row = row.split(" ").map((n) => parseInt(n, 10));
  let badCheck = 0;

  const isAscending =
    row.reduce((acc, n, i, arr) => {
      if (i === 0) return acc;
      acc += arr[i] > arr[i - 1] ? 1 : -1;
      return acc;
    }, 0) > 0;
  console.log(isAscending);

  for (let i = 1; i < row.length; i++) {
    const diff = Math.abs(row[i] - row[i - 1]);
    const isAscendingLocal = row[i] - row[i - 1] > 0;

    if (isAscending !== isAscendingLocal || diff === 0 || diff > 3) {
      badCheck++;
    }

    if (badCheck <= 1 && i === row.length - 1) count++;
  }
}

console.log(count);
