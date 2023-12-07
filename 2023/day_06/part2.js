const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const lines = input.split("\n");

function parse(lines) {
  return lines.map((line) => {
    const splits = line.split(/\s+/);
    return parseInt(splits.slice(1).reduce((str, n) => str + n, ""));
  });
}

const [time, distance] = parse(lines);

let beatableTimes = 0;
for (let i = 1; i < time; i++) {
  const t = i * time - Math.pow(i, 2);
  if (t > distance) {
    beatableTimes++;
  }
}

console.log(beatableTimes);
