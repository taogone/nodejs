function behavior(data, callback) {
  console.log(data);
  callback({ name: "김영기", age: 23 });
}

behavior({ greet: "Hello this is behavior." }, function(err, message) {
  if (err) {
    console.log("CallBack 함수 실행 중 에러 발생");
    return;
  }
  console.log("CallBack 함수 실행");
  console.log(message);
});
