const expressionContainer = document.querySelector(".expression-container");
const numberButtons = document.querySelectorAll(".number-buttons");
const operandButtons = document.querySelectorAll(".operand-buttons");
const clearButton = document.querySelector("#clear");
const signButton = document.querySelector("#sign");
const OPERANDS = ["+", "-", "x", "÷"];

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (expressionContainer.textContent === "0") {
      expressionContainer.textContent = button.textContent;
    } else {
      expressionContainer.textContent += button.textContent;
    }
  });
});

operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "=") {
      let result = evaluateExpression(expressionContainer.textContent);
      if (!(result === undefined)) {
        expressionContainer.textContent = String(result);
      }
    } else if (
      OPERANDS.some((op) => expressionContainer.textContent.includes(op))
    ) {
      let result = evaluateExpression(expressionContainer.textContent);
      if (!(result === 0 || result === "Undefined")) {
        expressionContainer.textContent = `${String(result)} ${
          button.textContent
        } `;
      }
    } else {
      expressionContainer.textContent += ` ${button.textContent} `;
    }
  });
});

clearButton.addEventListener(
  "click",
  () => (expressionContainer.textContent = "0")
);

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
      // Return an error if the user wants to divide by 0
      sum = b === 0 ? "Undefined" : divide(a, b);
      break;
  }

  return sum;
}

function evaluateExpression(evaluationString) {
  let evaluationArray = evaluationString.split(" ");
  let sum = operate(
    evaluationArray[1],
    Number(evaluationArray[0]),
    Number(evaluationArray[2])
  );

  return sum;
}
