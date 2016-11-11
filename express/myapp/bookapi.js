const express = require('express');
var fs = require('fs');
var app = express();

var gData = null;
fs.readFile('d:\\bookData.json',(err,data) => {
	if(err){
		console.log(err);
		throw new Error('数据读取失败');
	}
	
	gData = data;
	//开启服务
	app.listen(5000);
	console.log('服务已启动');
});

//执行get请求时，触发
app.get('/books',function(req,res){
	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

	res.setHeader('Content-Type', 'application/json');
	res.send(gData);
	// res.end();
});
