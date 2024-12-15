const fs = require("fs");
const path = require("path");

const rows = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .trim()
  .split("\n");

const WORD = "XMAS";
const WORD_REVERSED = WORD.split("").reverse().join("");

let wordCount = 0;

function count(input) {
  for (const line of input) {
    wordCount +=
      line.matchAll(WORD)?.length ??
      0 + line.matchAll(WORD_REVERSED)?.length ??
      0;
  }
}

const cols = [];
for (let i = 0; i < rows[0].length; i++) {
  const col = [];
  for (let j = 0; j < rows.length; j++) {
    col.push(rows[j][i]);
  }
  cols.push(col.join(""));
}
function diagonalStrings(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const diagonals = [];

  // Primary diagonals (top-left to bottom-right)
  for (let i = 0; i < m; i++) {
    let diagonalStr = "";
    let j = 0;
    while (i < m && j < n) {
      diagonalStr += matrix[i][j];
      i++;
      j++;
    }
    diagonals.push(diagonalStr);
  }

  for (let j = 1; j < n; j++) {
    let diagonalStr = "";
    let i = 0;
    while (i < m && j < n) {
      diagonalStr += matrix[i][j];
      i++;
      j++;
    }
    diagonals.push(diagonalStr);
  }

  // Secondary diagonals (top-right to bottom-left)
  for (let i = m - 1; i >= 0; i--) {
    let diagonalStr = "";
    let j = 0;
    while (i >= 0 && j < n) {
      diagonalStr += matrix[i][j];
      i--;
      j++;
    }
    diagonals.push(diagonalStr);
  }

  for (let j = 1; j < n; j++) {
    let diagonalStr = "";
    let i = m - 1;
    while (i >= 0 && j < n) {
      diagonalStr += matrix[i][j];
      i--;
      j++;
    }
    diagonals.push(diagonalStr);
  }

  return diagonals;
}

count(rows);
count(cols);
console.log(diagonalStrings(rows.map((row) => row.split(""))));
