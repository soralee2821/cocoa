const myReduce = (arr, callback, initialValue) => {
  if (!Array.isArray(arr)) {
    throw TypeError (`${arr} is not an array.`);
  }
  let accumulator = initialValue === undefined ? arr[0] : initialValue;
  let index = initialValue === undefined ? 1 : 0;
  for (index; index < arr.length; index++) {
    accumulator = callback(accumulator, arr[index]);
  }
  return accumulator;
}

const result = myReduce([1, 2, 3], (a, b) => a + b, 0);
console.log(result);
