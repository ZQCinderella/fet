/**
 * Created by Administrator on 2016/11/7.
 */
function createXhr(){
    if(typeof XMLHttpRequest != 'undefined'){
        return new XMLHttpRequest();
    }
    else if(typeof ActiveXObject != 'undefined'){
        var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
        for(var i = 0; i < versions.length ; i++){
            try{
                return new ActiveXObject(versions[i]);
            }catch(e){
                console.log(e);
            }
        }
    }
    else{
        throw new Error('您的浏览器不支持AJax');
    }
}
