function solution(n, t, m, p) {
  let numberArray = [];
  let gildongNumber = [];

  for (let number = 1; number <= t; number++) {
      let convertedNumber = number.toString(n);
      convertedNumber = convertedNumber.split('');
      numberArray.push(...convertedNumber);
  }
  numberArray.forEach((element, index) => {
    if ((index + 1) % m === p) gildongNumber.push(element);
  })

  return {
    totalNumber : numberArray,
    gildong : gildongNumber,
  };
}

console.log(solution(2, 5, 3, 2));
