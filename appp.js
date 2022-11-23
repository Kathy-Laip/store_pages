const http = require('http');
// http.createServer().listen(3000);
http.createServer(function(request, response){
    console.log(request.url);
    if(request.url == '/'){
        response.end('Main');
    } else if(request.url == 'cat'){
        response.end('Category');
    }
}).listen(3000);