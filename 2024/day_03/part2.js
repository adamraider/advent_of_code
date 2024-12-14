const fs = require("fs");
const path = require("path");

const raw = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

// const raw =
//   "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

// const input = raw
//   .trim()
//   .replaceAll(/(don\'t\(\).*do\(\))|(don\'t\(\).*$)/g, "");

let input = "";

console.log(input);

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
