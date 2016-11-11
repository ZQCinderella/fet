/**
 * Created by Administrator on 2016/11/11.
 */
function getJson(url){
    var promise = new Promise((reslove,reject) => {
    //创建AJax对象
    var xhr  = new XMLHttpRequest();

//创建强求
    xhr.open('get',url);
    xhr.send(null);
    xhr.onreadystatechange = handler;
    function handler(){
        if(this.readyState !== 4){
            return;
        }
        if(this.status === 200){
            reslove(this.responseText);

        }
        else{
            reject(new Error(this.statusText));
        }
    };
});
    return promise;
}
getJson('http://localhost:8000/getJson').then((json) => {
    console.log('Content:' + json);
});