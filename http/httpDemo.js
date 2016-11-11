const http = require('http');
var url = require('url');
var fs = require('fs');
/*
	var url = require('url');
	var urlStr = 'http://user:password@localhost:8080/index.html?id=aaa&name=bob';

	//url.parse(urlStr)把url转为对象
	var urlObj = url.parse(urlStr);

	//url.format(urlObj)把url对象转为字符串
	console.log(url.format(urlObj));
*/
//创建一个服务器对象
const server = http.createServer(function(request,response){
	//读请求
	fs.readFile('d:\\index.html',(err,data) => {
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write(data);
		response.end();
	});
});
//启动服务器
server.listen(8000);
console.log('服务已经启动');




