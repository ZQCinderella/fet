/**
 * Created by Administrator on 2016/11/7.
 */
var express = require('express');
var app = express();
var fs = require('fs');
// var request = require('request');
var http = require('http');
var navData = null,bannerData = null,menuData = null,fwData = null,cityData = null;
fs.readFile('data/menu.json',function(err,data){
    if(err)
        throw new Error('文件读取错误');
    navData = data;
    //请求轮播图数据
    fs.readFile('data/index/banner.json',function(err,data){
        if(err)
            throw new Error('文件读取错误');
        bannerData = data;
        //请求轮播图菜单的数据
        fs.readFile('data/index/menu.json',function(err,data){
            if(err)
                throw new Error('文件读取错误');
            menuData = data;
            //请求机酒自由行的数据
            fs.readFile('data/index/freeWalk.json',function(err,data){
                if(err){
                    throw new Error('文件读取错误');
                }
                fwData = data;
                //请求citywalk的数据
                fs.readFile('data/citywalk/cityWalkList.json',(err,data) => {
                    if(err)
                        throw new Error('文件读取错误');
                    cityData = data;
                    //启动服务器
                    app.listen(8000);
                    console.log('服务器已启动');
                });
            })

        })
    });
});
app.use(express.static('../www'));
app.all('/*',(req,res,next) => {
    //服务器解决跨域只适用于版本较高的浏览器，通常使用jsonp
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type','application/json');
    next();
});
//get请求
app.get('/nav',function(req,res){
    res.send(navData);
});
app.get('/banner',function(req,res){
    res.send(bannerData);
});
app.get('/menu',function(req,res){
    res.send(menuData);
});
app.get('/fw',function(req,res){
    res.send(fwData);
});

//测试es6
app.get('/getJson',function(req,res){
    res.send('哈哈');
});
app.get('/input',function(req,res){
    //自己的服务器向远程服务器请求数据
    // http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword=d&timer=
    var keyword = req.query['value'];
    var option = {
        host:'z.qyer.com',
        path:'/qcross/home/ajax?action=sitesearch&keyword='+ keyword,
        method:'get'
    }

     http.get('http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword='+ keyword,function(httpRes){
         var buffer = [];
         //开始发送请求
         httpRes.on('data',function(chunk){

             /**
              *
              * Nodejs中的Buffer:所谓缓冲区Buffer，就是 "临时存贮区" 的意思，是暂时存放输入输出数据的一段内存。
              JS语言自身只有字符串数据类型，没有二进制数据类型，因此NodeJS提供了一个与String对等的全局构造函数Buffer来提供对二进制数据的操作。除了可以读取文件得到Buffer的实例外，还能够直接构造
              node发送http请求：注意 "res.on('data', function(chunk) {})"，其中的参数chunk是Buffer对象，
              直接用+拼接会自动转换为字符串，对于宽字节字符可能会导致乱码产生，
              解决方法：
              (1) 通过可读流中的setEncoding()方法，该方法可以让data事件传递不再是Buffer对象，而是编码后的字符串，其内部使用了StringEncoder模块。
              (2) 将Buffer对象暂存到数组中，最后在组装成一个大Buffer让后编码转换为字符串输出。
              */
            buffer.push(chunk);
        });
        //请求结束，获取返回数据
         httpRes.on('end',function(){
             //将数组中的数据返回
            var resData = Buffer.concat(buffer);
            res.send(resData);
         });
    });

});
app.get('/citywalk',function(req,res){
    res.send(cityData);
});
