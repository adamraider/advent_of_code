const fs = require("fs");
const path = require("path");

const rawInput = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), {
    encoding: "utf8",
  })
  .trim()
  .split("\n");

const inputs = rawInput.map((equation) => {
  const [value, ...inputs] = equation.match(/\b\d+/g);
  return {
    value: parseInt(value, 10),
    inputs: inputs.map((n) => parseInt(n, 10)),
  };
});

const totalSumOfValidInputs = inputs.reduce((sum, { value, inputs }) => {
  const firstValue = inputs.slice(0, 1);
  if (
    recurse({
      inputs: inputs.slice(1),
      value,
      total: firstValue[0],
      computed: `${firstValue}`,
    })
  ) {
    return sum + value;
  } else {
    return sum;
  }
}, 0);

console.log("Total sum", totalSumOfValidInputs);

function recurse({ inputs, value, total = undefined, computed = "" }) {
  if (inputs.length === 0) {
    if (value === total) console.log("valid", value, total, computed);
    return value === total;
  }
  const n = inputs.shift();

  return (
    recurse({
      inputs: inputs.slice(0),
      value,
      total: total * n,
      computed: computed + `*${n}`,
    }) ||
    recurse({
      inputs: inputs.slice(0),
      value,
      total: total + n,
      computed: computed + `+${n}`,
    }) ||
    recurse({
      inputs: inputs.slice(0),
      value,
      total: parseInt("" + total + n, 10),
      computed: computed + `||${n}`,
    })
  );
}
