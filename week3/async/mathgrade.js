export default class GradeProgram {
  constructor(array) {
    this.array = array;
  }

  getMean() {
    const average = this.array.reduce((a, b) => a + b) / this.array.length;
    return average;
  }
  getDispersion() {
    const dispersion = this.array.map(x => Math.pow(x - this.getMean(), 2))
    .reduce((a, b) => a + b) / this.array.length;
    return dispersion;
  }
  getStandardDeviation() {
    const standardDeviation = Math.sqrt(this.getDispersion);
    return standardDeviation;
  }
  getZScore(grade) {
    const ZScore = (grade - this.getMean()) / this.getStandardDeviation();
    return ZScore;
  }
}

function printResult(array) {
  const mathGrade = new GradeProgram(array);
console.log("average : ", mathGrade.getMean().toFixed(2));
console.log("standard deviation : ", mathGrade.getStandardDeviation().toFixed(2));
console.log("Z-score 70 : ", mathGrade.getZScore(70).toFixed(2));
console.log("Z-score 80 : ", mathGrade.getZScore(80).toFixed(2));
}

const gradeArray = [89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.7, 77.97, 73.77, 84.25, 67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01];

printResult(gradeArray);
