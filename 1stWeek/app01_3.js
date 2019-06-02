// process 정보 확인
// process 속성/메소드
// argv : 프로세스 전달 패러미터
// env : 프로세스 환경 변수
// exit : 프로세스를 끝내는 메소드

// console.log(process.argv.length);
// console.log("---------------------------\n");
// console.log(process.argv);
// console.log("---------------------------\n");
// for (var i = 2; i < process.argv.length; i++) {
//   console.log(process.argv[i]);
// }
// // console.log(process.env);
// console.log("---------------------------\n");

process.argv.forEach(function(item, index) {
  console.log(`index[${index}]:`, item);
});

console.log(process.env.OS);
console.log(process.env["os"]);

this.num1 = 100;
this.num2 = 102;
this.num3 = 103;
this.num4 = 104;
console.log(this);

console.log("console.dir\n");
console.dir(process);
