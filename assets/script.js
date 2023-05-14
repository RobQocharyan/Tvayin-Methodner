const slope = (f, x, dx) => {
  dx = dx || 0.0000001;
  return (f(x + dx) - f(x)) / dx;
};

const calculate = (x, e, f) => {
  let n = 0;
  let z = x;
  let y = x + 2 * e;

  while (Math.abs(y - z) >= e) {
    z = x;
    y = x - f(x) / slope(f, x, 1);
    n = n + 1;
    x = y;
  }

  return { n, x };
};

const functionsDictionary = [
  { tooltip: "y = x", func: (x) => x },
  { tooltip: "y = x ^ 2", func: (x) => Math.pow(x, 2) },
  { tooltip: "y = x ^ 3", func: (x) => Math.pow(x, 3) },
  { tooltip: "y = √x", func: (x) => Math.sqrt(x) },
  { tooltip: "y = cos(x)", func: (x) => Math.cos(x) },
  { tooltip: "y = sin(x)", func: (x) => Math.sin(x) },
  { tooltip: "y = tan(x)", func: (x) => Math.tan(x) },
  { tooltip: "y = log(x)", func: (x) => Math.log(x) },
];

const functionSelector = document.getElementById("function-selector");

functionsDictionary.forEach(({ tooltip }, index) => {
  const option = document.createElement("option");
  option.innerText = tooltip;
  option.setAttribute("value", index);
  functionSelector.appendChild(option);
});

function methodChecker() {
  const { value } = document.getElementById("function-selector");
  const { func } = functionsDictionary[value];
  const x = document.getElementById("function-input-x").value;
  const e = document.getElementById("function-input-x").value;
  const calculatedValue = calculate(x, e, func);

  document.getElementById("demo").innerText = calculatedValue.x;
}
