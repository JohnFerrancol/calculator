let num1 = 3;
let num2 = 2;

console.log(operate("+", num1, num2));
console.log(operate("-", num1, num2));
console.log(operate("*", num1, num2));
console.log(operate("/", num1, num2));
console.log(operate("/", num1, 0));

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operand, a, b) {
  let sum;
  switch (operand) {
    case "+":
      sum = add(a, b);
      break;
    case "-":
      sum = subtract(a, b);
      break;
    case "*":
      sum = multiply(a, b);
      break;
    case "/":
      // Return an error if the user wants to divide by 0
      sum = b === 0 ? "Undefined" : divide(a, b);
      break;
  }

  return sum;
}
