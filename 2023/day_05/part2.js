const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const lines = input.split("\n");

const seeds = lines
  .shift()
  .substring("seeds: ".length)
  .split(" ")
  .map((str) => parseInt(str, 10));

const maps = lines.reduce((maps, line) => {
  if (line === "") {
    return maps;
  }
  if (line.includes("map")) {
    maps.push([]);
    return maps;
  }
  const [destination, source, range] = line.split(" ");
  maps[maps.length - 1].push({
    source: parseInt(source),
    destination: parseInt(destination),
    range: parseInt(range),
  });
  return maps;
}, []);

const locations = seeds.map((seed) => {
  let currentSourceValue = seed;
  for (const map of maps) {
    const match = map.find(({ source, range }) => {
      return (
        currentSourceValue >= source && currentSourceValue < source + range
      );
    });
    if (match) {
      currentSourceValue =
        match.destination + (currentSourceValue - match.source);
      console.log(match, currentSourceValue);
    }
  }
  return currentSourceValue;
});

const lowestLocation = locations.reduce(
  (minimum, val) => Math.min(minimum, val),
  locations[0]
);

console.log(lowestLocation);
