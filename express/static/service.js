var express = require('express');

var app = express();

//使用express.static('public'),就可以通过http://localhost:7000/xxxx.html访问public文件夹下的所有静态页面
//相当于一个静态页面的web服务，这样也不会造成跨域
app.use(express.static('public'));


app.get('/login/:uname/:pass',(req,res) => {
	var username = 'zq';
	var password = "bendan";

	//处理用户传递过来的数据
	//使用params 获取请求参数
	console.log(req.params.uname);
	console.log(req.params.pass);

	//解决跨域访问
	res.header('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type','application/json');
	var obj = {};
	if(username == req.params.uname && password == req.params.pass){
		obj.msg = '成功';
		obj.status = 'yes';
		
	}else{
		obj.msg = '失败';
		obj.status = 'no';
	
	}
	res.send(JSON.stringify(obj));
});

//express.static('public')开放public文件夹下的页面


app.listen(7000);
console.log('服务已启动');