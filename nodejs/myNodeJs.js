var censoredWords = ['sad','bad','mad'];
var customCensoredWords = [];


function censor(inStr){
	for(idx in censoredWords){
		inStr = inStr.replace(censoredWords[idx],'****');
	}
	for(idx in customCensoredWords){
		inStr = inStr.replace(customCensoredWords[idx],'****');
	}
	return inStr;
}
//添加自定义敏感词
function addCensoreWord(word){
	customCensoredWords.push(word);
}
//获取默认和自定义的敏感词
function getCensoredWords(){
	return censoredWords.concat(customCensoredWords)
}

exports.censor = censor;//把模块中的函数开放给调用者使用
exports.getCensoredWords = getCensoredWords;
exports.addCensoreWord = addCensoreWord
