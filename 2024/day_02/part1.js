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
  const isAscending = row[1] - row[0] > 0;

  for (let i = 1; i < row.length; i++) {
    const diff = Math.abs(row[i] - row[i - 1]);
    const isAscendingLocal = row[i] - row[i - 1] > 0;
    if (isAscending !== isAscendingLocal) break;
    if (diff === 0 || diff > 3) break;

    if (i === row.length - 1) count++;
  }
}

console.log(count);
