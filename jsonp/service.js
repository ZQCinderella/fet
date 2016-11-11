var express = require('express');
var app = express();
app.listen(8000);
console.log('服务器启动了');
app.get('/remote',function(req,res){
	//获取客户端发送来的数据
	var call = req.query['callback']; 
	console.log(call);
	//返回回去的变量也要用引号  引起来，因为页面中没有这个变量，所以返回到页面会出现undefined
	
	var result = '({name:"tom",age:22})';
	res.send(result); 

})
