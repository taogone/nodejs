function aaa(callback) {
  console.log("instance of callback", callback instanceof Function());
  console.log("typeof callback: ", typeof callback);
  if (typeof callback === "function") {
    callback();
  }
}

function bbb() {
  console.log("Callback 함수 호출: bbb function");
}

aaa(bbb);

aaa(function() {
  // 함수의 인자로 함수를 선언
  console.log("익명함수 호출");
});
