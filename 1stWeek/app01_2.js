// 실행 시간 측정

var result = 0;

console.time("timeer start");

for (var i = 1; i <= 10000; i++) {
  result += i;
}

console.timeEnd("timer end");
console.log("result: ", result);

// 현재 파일명 확인
console.log("현재 실행 파일명:", __filename);
console.log("현재 실행 폴더명:", __dirname);
