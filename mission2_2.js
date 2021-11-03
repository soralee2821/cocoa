function factorial(n) {
    if (n === 0) return 1; 
    return n * factorial(n - 1);
}

function calculate(m) {
    let factorialArray = [];
    for (let i = 1; i <= m; i++){
        factorialArray.push(factorial(i));
    }
    return factorialArray;
}

console.log(calculate(4));