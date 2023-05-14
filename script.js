const slope = (f, x, dx) => {
  dx = dx || 0.0000001;
  return (f(x + dx) - f(x)) / dx;
};

const square = (x) => {
  return Math.pow(x, 2);
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

const arr = [
  { tooltip: "y = x^2", func: square },
  { tooltip: "y = cos(x)", func: (x) => Math.cos(x) },
];

const mySelect = document.getElementById("mySelect");
console.log(mySelect);
arr.forEach(({ tooltip }, index) => {
  const option = document.createElement("option");
  option.innerText = tooltip;
  option.setAttribute("value", index);
  mySelect.appendChild(option);
});

function myFunction() {
  const { value } = document.getElementById("mySelect");
  const { func } = arr[value];
  let x = document.getElementById("function-input-x").value;
  let e = document.getElementById("function-input-x").value;
  
  const calculatedValue = calculate(x, e, func);
  document.getElementById("demo").innerText = calculatedValue.x;
}
