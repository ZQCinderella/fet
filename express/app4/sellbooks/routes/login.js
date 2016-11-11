var express = require('express');
var router = express.Router();

/* GET home page. */

//这里完整的链接应该是/login/:uname/:pass,但是login在 app.js里面已经使用app.use('/login',login);拼接到url中了，所以在login.js中省去login不写
router.get('/:uname/:pass', function(req, res, next) {
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


//post方法
router.post('/',function(req,res,next){
	//获取post请求的数据req.body
	for(var p in req.body){
		try{
			p = JSON.parse(p);
			console.log(p.username);
			console.log(p.password);
		}catch(e){
			throw e;
		}
	}
	console.log(typeof req.body);
	console.log(req.body);
});
module.exports = router;
