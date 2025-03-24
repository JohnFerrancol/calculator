const expressionContainer = document.querySelector(".expression-container");
const buttonContainer = document.querySelector(".button-container");
const OPERANDS = ["+", "-", "x", "÷", "%"];
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Storing the expressionContainer into an expression variable for readability of code
let expression = "0";

// Register the button clicked and run the processInput function
buttonContainer.addEventListener("click", (event) => {
  const buttonText = event.target.textContent;
  processInput(buttonText);
});

// Register the key pressed and run the processInput function
document.addEventListener("keydown", (event) => {
  // Change the key Input to batch with the button text to make it easier for the process input to be used with buttons and keyboard inputs
  const changeKeyInput = {
    "*": "x",
    "/": "÷",
    Enter: "=",
    Escape: "AC",
    Backspace: "⌫",
  };

  // If the key pressed is inside the changeKeyInput object, then change it, else do not
  const keyPressed = changeKeyInput[event.key]
    ? changeKeyInput[event.key]
    : event.key;

  processInput(keyPressed);
});

// Function used to handle the input given by the user from the input given
function processInput(input) {
  // Run the following functions for each input registered
  if (NUMBERS.includes(input)) {
    handleNumbers(input);
  } else if (OPERANDS.includes(input) || input === "=") {
    handleOperands(input);
  } else if (input === "AC") {
    clearCalculator();
  } else if (input === ".") {
    handleDecimals();
  } else if (input === "+/-") {
    toggleSign();
  } else if (input === "⌫") {
    handleBackspace();
  }

  // update the expressionContainer's text content every time an input is processed
  updateDisplay();
}

// Handling number inputs
function handleNumbers(input) {
  if (NUMBERS.includes(input)) {
    // If the expression is 0 or invalid override with the number, else append the number to the expression
    if (isEmptyExpression() || isInvalidExpression()) {
      expression = input;
    } else {
      expression += input;
    }
  }
}

// Handling operands button press
function handleOperands(input) {
  // Check if the expressions has any negative signs to prevent confusion between signs and operands
  let containsSign = false;
  let expressionArray = expression.split(" ");

  // Set the containsSign variable to true if there are any negative signs
  if (expressionArray.length === 1) {
    containsSign = expressionArray[0].startsWith("-") ? true : false;
  } else if (expressionArray.length === 3) {
    containsSign = expressionArray[0].startsWith("-") ? true : false;
    containsSign = expressionArray[2].startsWith("-") ? true : false;
  }

  // Do not run operations when the expression shows invalid expression
  if (!isInvalidExpression()) {
    if (input === "=") {
      // Run the evaluateExpression to get the expression
      let result = evaluateExpression(expression);

      // If the result is not valid, it is due to not having a complete expression (No two numbers and operand)
      if (!(result === "invalid expression")) {
        expression = String(result);
      }
    }

    // If it contains operands do the following
    else if (OPERANDS.some((op) => expression.includes(op)) && !containsSign) {
      // If the last button pressed is an operand, allow the user to change the operand if a different operand is pressed
      if (OPERANDS.includes(expression[expression.length - 2])) {
        expression = expression.slice(0, -3) + ` ${input} `;
      }

      // If a complete expression is already there and a user pressed another operand, evaluate the current expression and append the operand the user pressed
      else {
        let result = evaluateExpression(expression);
        expression = `${String(result)} ${input} `;
      }
    }

    // Else, just add the operand
    else {
      expression += ` ${input} `;
    }
  }
}

// Handling when the  user wants to clear the expression
function clearCalculator() {
  expression = "0";
}

// Handlign when the user wants to make a decimal/floating point number
function handleDecimals() {
  // Selecting the current number that the user is editing
  let expressionArray = expression.split(" ");
  let num1 = expressionArray.length === 1 ? expressionArray[0] : "";
  let num2 = expressionArray.length === 3 ? expressionArray[2] : "";

  // Make sure that the current number does not include a floating point
  if (!(num1.includes(".") || num2.includes("."))) {
    // Automatically add a 0 infront if the number is empty, else just append the floating point
    if (OPERANDS.includes(expression[expression.length - 2])) {
      expression += "0.";
    } else {
      expression += ".";
    }
  }
}

// Handling when the user wants to change the sign of the number
function toggleSign() {
  let expressionArray = expression.split(" ");

  // Handle changing signs, select the current number and change the sign
  if (expressionArray.length === 1) {
    expression = expression.startsWith("-")
      ? expression.slice(1)
      : `-${expression}`;
  } else if (expressionArray.length === 3) {
    let lastIndex = expressionArray.length - 1;
    expressionArray[lastIndex] = expressionArray[lastIndex].startsWith("-")
      ? expressionArray[lastIndex].slice(1)
      : `-${expressionArray[lastIndex]}`;
    expression = expressionArray.join(" ");
  }
}

// Handling when the user wants to use the backspace
function handleBackspace() {
  // Do not allow backspace for invalid expression
  if (!isInvalidExpression()) {
    // Remove additional characters for operands as there is extra spaces
    if (OPERANDS.includes(expression[expression.length - 2])) {
      expression = expression.slice(0, -3);
    } else {
      expression = expression.slice(0, -1);
    }
  }

  // If the expression becomes empty, set the cleasr the calculator
  if (expression === "") {
    clearCalculator();
  }
}

// Updating a display after changing the expression
function updateDisplay() {
  expressionContainer.textContent = expression;
}

// Function to handle when expression container is empty
function isEmptyExpression() {
  return expression === "0";
}

// Function to handle when there is an error regarding dividing by 0
function isInvalidExpression() {
  return expression === "Error! Press AC/Number";
}

// Function used to evaluate a expression string
function evaluateExpression(evaluationString) {
  let evaluationArray = evaluationString.split(" ");

  // If there is no complete expression, 2 numbers and operand do not proceed and return error
  if (evaluationArray.length != 3 || evaluationArray[2] === "") {
    return "invalid expression";
  }

  // Call the operate function to calculate the result
  let sum = operate(
    evaluationArray[1],
    Number(evaluationArray[0]),
    Number(evaluationArray[2])
  );

  return sum;
}

// Handling the arithmetic calculations between two numbers and an operand
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
