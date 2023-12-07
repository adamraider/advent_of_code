const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const lines = input.split("\n");

function parse(lines) {
  return lines.map((line) => {
    const splits = line.split(/\s+/);
    return splits.slice(1).map((n) => parseInt(n, 10));
  });
}

const [times, distance] = parse(lines);

const validTimes = times.map((time, index) => {
  const d = distance[index];
  const validTimes = [];
  for (let i = 1; i < time; i++) {
    const t = i * time - Math.pow(i, 2);
    if (t > d) {
      validTimes.push(i);
    }
  }
  return validTimes;
});

const productOfNumberOfBeatableTimes = validTimes.reduce(
  (product, times) => product * times.length,
  1
);

console.log(productOfNumberOfBeatableTimes);
