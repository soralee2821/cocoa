const gradeArray = [89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.7, 77.97, 73.77, 84.25, 67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01];

class GradeProgram {
  constructor(array) {
    this.array = array;
  }

  getMean() {
    const average = this.array.reduce((a, b) => a + b) / this.array.length;
    return average;
  }
  getStandardDeviation() {
    let standardDeviation = this.array.map(x => Math.pow(x - this.getMean(), 2));
    standardDeviation = standardDeviation.reduce((a, b) => a + b) / this.array.length;
    standardDeviation = Math.sqrt(standardDeviation);
    return standardDeviation;
  }
  getZScore(grade) {
    const ZScore = (grade - this.getMean()) / this.getStandardDeviation();
    return ZScore;
  }
}

const mathGrade = new GradeProgram(gradeArray);
console.log(mathGrade.getZScore(70));
console.log(mathGrade.getZScore(80));
