const fs = require("fs");
const path = require("path");

const diskMap = fs
  .readFileSync(path.resolve(__dirname, "./exampleinput.txt"), {
    encoding: "utf8",
  })
  .trim()
  .split("")
  .map((n) => parseInt(n, 10));

const freeSpaces = [];
const files = [];

// Map to an uncompacted diskMap.
let mapped = diskMap.reduce((acc, n, index) => {
  const isFreeSpace = index % 2 === 1;
  const fileId = index / 2;
  if (isFreeSpace) {
    freeSpaces.push({ startIndex: acc.length, space: n });
  } else {
    files.push({ startIndex: acc.length, size: n, fileId });
  }
  return [...acc, ...Array(n).fill(isFreeSpace ? "." : fileId)];
}, []);

// Move data from end to free spaces.
// while (freeSpaces.length) {
//   let toMove;
// }

mapped = mapped.filter((n) => n != undefined);
console.log({ freeSpaces, files, mapped });

for (const file of files.slice(0).reverse()) {
  for (const freeSpace of freeSpaces) {
    if (file.startIndex <= freeSpace.startIndex) break;
    if (file.size <= freeSpace.space) {
      mapped.splice(
        freeSpace.startIndex,
        file.size,
        ...mapped.splice(file.startIndex, file.size),
      );
      freeSpace.space -= file.size;
      freeSpace.startIndex += file.size;
      break;
    }
  }
}

mapped = mapped.filter((n) => n != undefined);

// Compute checksum
function checksum(filesystem) {
  let sum = 0;
  for (let i = 0; i < filesystem.length; i += 1) {
    if (filesystem[i] !== ".") sum += i * filesystem[i];
  }
  return sum;
}
console.log({ mapped: mapped.join("") });

console.log("Checksum", checksum(mapped));
