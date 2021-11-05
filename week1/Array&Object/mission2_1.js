// 1. factorial function
console.log(calculate(4));

function calculate(m) {
  let factorialArray = [];
  for (let i = 1; i <= m; i++){
      factorialArray.push(factorial(i));
  }
  return factorialArray;
}

function factorial(n) {
  if (n === 0) return 1; 
  return n * factorial(n - 1);
}
