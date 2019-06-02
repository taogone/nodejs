// JavaScript callback function()
// 실행이 모두 완료된 뒤, 실행되는 함수
// JavaScript는 함수형 언어임. <== Lisp
// JavaScript는 모든 것이 객체이기 때문에, 변수에 함수를 담을 수 있음.

var aaa = (function() {
  console.log("자동 실행 함수");
  return {
    test: function() {
      this.name = "aaa.test()";
      return this.name;
    }
  };
})();

var myFunction = function() {
  console.log("수동 실행: MyFunction 실행.");
};

myFunction();
console.log(aaa);
console.log(aaa.test());
