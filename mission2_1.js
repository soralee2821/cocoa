function solution(n, t, m, p) {
  const numberArray = getNumericalSystem(n, t);
  return {
    totalNumber : numberArray,
    gildong : findGildong(m, p, numberArray)
  };
}

function getNumericalSystem(n, t) {
  let numberArray = [];

  for (let number = 1; number <= t; number++) {
    let convertedNumber = number.toString(n);
    convertedNumber = convertedNumber.split('');
    numberArray.push(...convertedNumber);
  }
  return numberArray;
}

function findGildong(m, p, numberArray) {
  let gildongNumber = [];

  numberArray.forEach((element, index) => {
    if ((index + 1) % m === p) gildongNumber.push(element);
  })
  return gildongNumber;
}

console.log(solution(2, 5, 3, 2));
