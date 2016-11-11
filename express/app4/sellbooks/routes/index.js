var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//render是渲染的意思
	//{ title: 'Express' }就是访问站点跟目录时页面中的内容

	//第一个参数是加载的view文件夹下的index.jade
  	res.render('index', { title: 'ZQZQZQ' });
});

module.exports = router;
