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
var data = fs.readFileSync('d:\\data.txt',{
	"encoding":"utf-8",  //没有gbk\
	"flag":"r"  //只读
});

var file = 'c:\\data.txt';
fs.writeFile(file,data,(err,data)=>{
	if(err) throw err;
	console.log('写入成功');
});
