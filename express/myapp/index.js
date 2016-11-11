//加载express模块
var express = require('express');
console.log(typeof express);
var app = express();  //调用构造函数，创建对象

//通过express创建get方法的服务
// app.get("访问get方法的路径","回调函数");

//通过不同的路径，能进行不同的任务，发送不同的请求	
//get请求
app.get("/",function(request,response){
	response.send('hello zq');
});

app.get("/buy",function(request,response){
	response.send('hello fet');
});

//post请求
app.post("/",function(request,response){
	response.send('hello lizaorenqing');
});

app.put("/",function(request,response){
	response.send('hello 立早人青');
});
app.listen(8000);