const http = require('http');
const fs = require('fs');
// http.createServer().listen(3000);
http.createServer(function(request, response){
    console.log(request.url);
    console.log(request.method);
    console.log(request.headers['user-agent']);

    response.setHeader('Content-type', 'text/html;charset=utf-8;')

    if(request.url == '/'){
        response.end('Main <h2>Hello</h2> Привет мир');
    } 
    else if (request.url == '/online-shop.html'){
        let mainPage = fs.readFileSync('online-shop.html');
        console.log(mainPage);
        response.end(mainPage);
    }
}).listen(3000);