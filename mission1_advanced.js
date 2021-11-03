const readline = require('readline');
let results = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the shape of figure : ', (shape) => {
    rl.question('Please enter the first number : ', (number1) => {
        rl.question('Please enter the second number : ', (number2) => {
            rl.question('Please enter the third number : ', (number3) => {
                let result = `${getArea(results, shape, (+number1), (+number2), (+number3))}`;
                console.log(`${result}`);
                rl.close();
            });
        });
    });
});

function getArea(results, figure, a = 0, b = 0, c = 0) {

    if (figure === 'circle') {
        results.push(`${figure} : ${getCircleArea(a, b)}`);
        return results;
    } else if (figure === 'rect') {
        results.push(`${figure} : ${getRectArea(a, b)}`);
        return results;
    } else if (figure === 'trapezoid') {
        results.push(`${figure} : ${getTrapezoidArea(a, b, c)}`);
        return results;
    }
}

function getCircleArea(radius1, radius2) {
    let result = 0;
    if (!radius2) {
        result = Math.PI * Math.pow(radius1, 2);
        return result;
    } else {
        for (let radius = radius1; radius <= radius2; radius++) {
            result += Math.PI * Math.pow(radius, 2);
        }
        return result;
    }
}

function getRectArea(width, height) {
    return width * height;
}

function getTrapezoidArea(top, bottom, height) {
    return ((top + bottom) * height / 2);
}
