const expressionContainer = document.querySelector(".expression-container");
const numberButtons = document.querySelectorAll(".number-buttons");
const operandButtons = document.querySelectorAll(".operand-buttons");
const clearButton = document.querySelector("#clear");
const signButton = document.querySelector("#sign");
const decimalButton = document.querySelector("#decimal");
const deleteButton = document.querySelector("#delete");
const changeSignButton = document.querySelector("#sign");
const OPERANDS = ["+", "-", "x", "÷", "%"];

let expression = expressionContainer.textContent; // Store the expression text

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (expression === "0" || expression === "Error! Press AC/Number") {
      expression = button.textContent;
    } else {
      expression += button.textContent;
    }
    expressionContainer.textContent = expression;
  });
});

operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let containsSign = false;
    let expressionArray = expression.split(" ");
    if (expressionArray.length === 1) {
      containsSign = expressionArray[0].startsWith("-") ? true : false;
    } else if (expressionArray.length === 3) {
      containsSign = expressionArray[0].startsWith("-") ? true : false;
      containsSign = expressionArray[2].startsWith("-") ? true : false;
    }
    if (!(expression === "Error! Press AC/Number")) {
      if (button.textContent === "=") {
        let result = evaluateExpression(expression);
        if (!(result === "invalid expression")) {
          expression = String(result);
        }
      } else if (
        OPERANDS.some((op) => expression.includes(op)) &&
        !containsSign
      ) {
        if (OPERANDS.includes(expression[expression.length - 2])) {
          expression = expression.slice(0, -3) + ` ${button.textContent} `;
        } else {
          let result = evaluateExpression(expression);
          expression = `${String(result)} ${button.textContent} `;
        }
      } else {
        expression += ` ${button.textContent} `;
      }
    }
    expressionContainer.textContent = expression;
  });
});

clearButton.addEventListener("click", () => {
  expression = "0";
  expressionContainer.textContent = expression;
});

decimalButton.addEventListener("click", () => {
  let expressionArray = expression.split(" ");
  let num1 = expressionArray.length === 1 ? expressionArray[0] : "";
  let num2 = expressionArray.length === 3 ? expressionArray[2] : "";
  if (!(num1.includes(".") || num2.includes("."))) {
    if (OPERANDS.includes(expression[expression.length - 2])) {
      expression += "0.";
    } else {
      expression += ".";
    }
  }
  expressionContainer.textContent = expression;
});

changeSignButton.addEventListener("click", () => {
  let expressionArray = expression.split(" ");
  if (expressionArray.length === 1) {
    expression = expression.startsWith("-")
      ? expression.slice(1)
      : `-${expression}`;
  } else if (expressionArray.length === 3) {
    let lastIndex = expressionArray.length - 1;
    expressionArray[lastIndex] = expressionArray[lastIndex].startsWith("-")
      ? expression.slice(1)
      : `-${expressionArray[lastIndex]}`;
    expression = expressionArray.join(" ");
  }

  expressionContainer.textContent = expression;
});

deleteButton.addEventListener("click", () => {
  if (!(expression === "Error! Press AC/Number")) {
    if (OPERANDS.includes(expression[expression.length - 2])) {
      expression = expression.slice(0, -3);
    } else {
      expression = expression.slice(0, -1);
    }
  }
  if (expression === "") {
    expression = "0";
    expressionContainer.textContent = expression;
  } else {
    expressionContainer.textContent = expression;
  }
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

function modulus(a, b) {
  return a % b;
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
      sum = b === 0 ? "Error! Press AC/Number" : divide(a, b);
      break;
    case "%":
      sum = modulus(a, b);
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
