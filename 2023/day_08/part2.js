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

const nodes = Array.from(map.keys()).filter((key) => key.endsWith("A"));
const stepsToZ = [];

let steps = 0;

while (Object.keys(stepsToZ).length !== nodes.length) {
  const d = instructions[steps % instructions.length];

  for (let i = 0; i < nodes.length; i++) {
    nodes[i] = map.get(nodes[i])[d];
    if (nodes[i].endsWith("Z")) {
      stepsToZ[i] = steps + 1;
    }
  }

  steps++;
}

const stepsToZAll = stepsToZ.reduce((steps, n) => lcm(steps, n), stepsToZ[0]);
console.log(stepsToZAll);

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
