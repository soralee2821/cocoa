let results = [];

getArea('circle', results, 10);
getArea('rect', results, 10, 15);
getArea('trapezoid', results, 10, 15, 12);
getArea('circle', results, 1, 2);

printExecutionSequence();

function getArea(figure, results, a = 0, b = 0, c = 0) {

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

function printExecutionSequence() {
    console.log(results);
}
