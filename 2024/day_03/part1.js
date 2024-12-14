const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .trim();

const total = Array.from(input.matchAll(/mul\(\d+\,\d+\)/g))
  .map((match) => {
    const [x, y] = match[0]
      .substring(4, match[0].length - 1)
      .split(",")
      .map((n) => parseInt(n, 10));
    return x * y;
  })
  .reduce((acc, num) => acc + num, 0);

console.log(total);
