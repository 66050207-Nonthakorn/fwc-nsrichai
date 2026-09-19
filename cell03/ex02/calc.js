function isValidInteger(value) {
  return /^\d+$/.test(value.trim());
}

function calculate(left, operator, right) {
  switch (operator) {
    case '+': return left + right;
    case '-': return left - right;
    case '*': return left * right;
    case '/': return left / right;
    case '%': return left % right;
    default: throw new Error('Unknown operator');
  }
}

globalThis.isValidInteger = isValidInteger;
globalThis.calculate = calculate;

if (typeof document !== 'undefined') {
  document.getElementById('calculator').addEventListener('submit', (event) => {
    event.preventDefault();

    const left = document.getElementById('left').value.trim();
    const right = document.getElementById('right').value.trim();
    const operator = document.getElementById('operator').value;

    if (!isValidInteger(left) || !isValidInteger(right)) {
      alert('Error :(');
      return;
    }

    const rightNumber = Number(right);
    if ((operator === '/' || operator === '%') && rightNumber === 0) {
      alert("It's over 9000!");
      return;
    }

    const result = calculate(Number(left), operator, rightNumber);
    alert(result);
    console.log(result);
  });

  setInterval(() => alert('Please, use me...'), 30000);
}
