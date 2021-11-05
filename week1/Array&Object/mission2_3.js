// 3. calculate average
const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];

let averageArray = [];
grades.forEach(function (student) {
  let studentAverage = student.reduce((a, b) => a + b, 0) / student.length;
  studentAverage = studentAverage.toFixed(2);
  averageArray.push(studentAverage);
});
console.log("모든 학생의 평균 점수 목록 : ",averageArray);

let maximumArray = grades.map((student) => Math.max(...student));
const totalMaximumValue = maximumArray.reduce((a, b) => a + b, 0) / maximumArray.length;
console.log("모든 학생의 최고 점수의 평균값 : ",totalMaximumValue);
