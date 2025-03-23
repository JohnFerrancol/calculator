const expressionContainer = document.querySelector(".expression-container");
const numberButtons = document.querySelectorAll(".number-buttons");
const operandButtons = document.querySelectorAll(".operand-buttons");
const clearButton = document.querySelector("#clear");
const signButton = document.querySelector("#sign");
const OPERANDS = ["+", "-", "x", "÷"];

let expression = expressionContainer.textContent; // Store the expression text

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (expression === "0") {
      expression = button.textContent;
    } else {
      expression += button.textContent;
    }
    expressionContainer.textContent = expression;
  });
});

operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "=") {
      let result = evaluateExpression(expression);
      if (!(result === "invalid expression")) {
        expression = String(result);
      }
    } else if (OPERANDS.some((op) => expression.includes(op))) {
      if (OPERANDS.includes(expression[expression.length - 2])) {
        expression = expression.slice(0, -3) + ` ${button.textContent} `;
      } else {
        let result = evaluateExpression(expression);
        expression = `${String(result)} ${button.textContent} `;
      }
    } else {
      expression += ` ${button.textContent} `;
    }
    expressionContainer.textContent = expression;
  });
});

clearButton.addEventListener("click", () => {
  expression = "0";
  expressionContainer.textContent = expression;
});

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
    case "x":
      sum = multiply(a, b);
      break;
    case "÷":
      sum = b === 0 ? "Undefined" : divide(a, b);
      break;
  }
  return sum;
}

function evaluateExpression(evaluationString) {
  let evaluationArray = evaluationString.split(" ");

  if (evaluationArray.length != 3 || evaluationArray[2] === "") {
    return "invalid expression";
  }

  let sum = operate(
    evaluationArray[1],
    Number(evaluationArray[0]),
    Number(evaluationArray[2])
  );

  return sum;
}
