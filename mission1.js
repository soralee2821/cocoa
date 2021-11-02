let results = [];

getArea('circle', results, 10);
getArea('rect', results, 10, 15);
getArea('trapezoid', results, 10, 15, 12);
getArea('circle', results, 1, 2);

printExecutionSequence();

function getArea(figure, results, ...arguments) {
    const parameters = [...arguments];

    if (figure === 'circle') {
        results.push('circle');
        results.push(getCircleArea(parameters));
        return results;
    } else if (figure === 'rect') {
        results.push('rect');
        results.push(getRectArea(parameters));
        return results;
    } else if (figure === 'trapezoid') {
        results.push('trapezoid');
        results.push(getTrapezoidArea(parameters));
        return results;
    }
}

function getCircleArea(parameters) {
    let result = 0;
    if (parameters.length === 1) {
        result = Math.PI * Math.pow(parameters[0], 2);
        return result;
    } else if (parameters.length === 2) {
        for (let radius = parameters[0]; radius <= parameters[1]; radius++) {
            result += Math.PI * Math.pow(radius, 2);
        }
        return result;
    }
}

function getRectArea(parameters) {
    return parameters[0] * parameters[1];
}

function getTrapezoidArea(parameters) {
    return ((parameters[0] + parameters[1]) * parameters[2] / 2);
}

function printExecutionSequence() {
    console.log(results);
}
