const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const list1 = [];
const list2 = [];

// Parse input into two lists.
input
  .split(/\n/)
  .filter(Boolean)
  .forEach((line) => {
    const [item1, item2] = line.split(/\s+/);
    list1.push(item1);
    list2.push(item2);
  });

// Sort both lists.
list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

// Compute distances between lists and sum.
const totalDistance = list1
  .map((item, i) => Math.abs(item - list2[i]))
  .reduce((sum, distance) => sum + distance, 0);

console.log(totalDistance);
