var fs = require('fs');
// var fet = require('fetTool');

// //fs.readFile('文件名')；
// fs.readFile('d:\\data.txt',(err,data) =>{
// 	if(err){
// 		throw err;
// 	}
// 	console.log(data.toString());
// 	fet.print(data.toString());
// });
/*	
	//同步操作
	var data = fs.readFileSync('d:\\data.txt',{
	"encoding":"utf-8",  //没有gbk\
	"flag":"r"  //只读
	});

	var file = 'c:\\data.txt';
	fs.writeFile(file,data,(err,data)=>{
		if(err) throw err;
		console.log('写入成功');
	});
*/
//异步操作，必须等待读操作完成之后才能执行写操作
fs.readFile('d:\\data.txt',(err,data)=>{
	if(err)
		throw new Error('文件的读取出错');
	//在回调函数中执行写操作，即当读文件的操作完毕
	fs.writeFile('c:\\datas.txt',data,(err,data)=>{
		if(err)
			throw new Error('文件写入出错');
		console.log('写入成功');
	});
});