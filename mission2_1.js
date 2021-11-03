function solution(n, t, m, p) {
    let numberArray = [];

    for (let number = 1; number <= t; number++) {
        let convertedNumber = number.toString(n);
        convertedNumber = convertedNumber.split('');
        numberArray.push(...convertedNumber);
        numberArray.map((item) => {
            console.log(item, index);
        });
    }
    return numberArray;
}

console.log(solution(2,3));
