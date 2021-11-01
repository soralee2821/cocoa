function getArea(figure, ...arguments) {
    if (figure === 'circle') {
        if (arguments.length === 1) {
            console.log(Math.PI * (arguments[0] ** 2));
        } else {
            let answer = 0;
            for (let radius = arguments[0]; radius <= arguments[1]; radius++) {
                answer += Math.PI * (radius ** 2);
            }
            console.log(answer);
        }
    } else if (figure === 'rect') {
        console.log(arguments[0] * arguments[1]);
    } else if (figure === 'trapezoid') {
        console.log((arguments[0] + arguments[1]) * arguments[2] / 2);
    }
}

function printExecutionSequence() {
    
}

getArea('circle', 10);
getArea('rect', 10, 15);
getArea('trapezoid', 10, 15, 12);
getArea('circle', 1, 2);

printExecutionSequence();
