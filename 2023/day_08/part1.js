const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const [instructions, mapLines] = input.split("\n\n");

const map = mapLines.split("\n").reduce((map, line) => {
  const [key, L, R] = line.split(/\ \=\ \(|\,\ |\)/);
  return map.set(key, { L, R });
}, new Map());

let key = "AAA";
let steps = 0;
while (key !== "ZZZ") {
  key = map.get(key)[instructions[steps % instructions.length]];
  steps++;
}

console.log(steps);
