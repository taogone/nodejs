// sunday_app01.js

// express module 설치

// 미들웨어 등록
// 3. app 생성
// 4. http 서버 생성
// 5. app과 http 서버 실행

const express = require('express');
const http = require('http');

var app = express();

var server = http.createServer(app);

// URL path 설정

app.get('/', function(req, res){
    res.writeHead(200, {'Content-type':'text/html;Char-set=utf-8'})
    res.end('1st response');
})
app.get('/calc/plus', function(req, res){
    console.log('calc/plus 요청');
    res.end('calc/plus 실행됨');
})


// 서버 실행
server.listen(3000, function(){
    console.log('express server is started on 3000')
});