/**
 * Created by Administrator on 2016/11/7.
 */
define(['jquery','myutil'],function($,createXhr){

    //使用ajax请求
     function getData(){
          $.ajax({
          url:'http://localhost:8000/nav',
          type:'get',
          success:handleData
          });
      }

      function handleData(data){
          var lis = $('#nav ul li');
          //遍历拿到的json数据

          $(data).each(function(index,elem){
          $(lis[index]).find('a').html(elem.name);
          });
     }
    return getData;
/*
    //使用原生js
     function getNavData(root){
     console.log(createXhr);
     var xhr = createXhr();
     xhr.open('get','http://localhost:8000/nav');
     xhr.send(null);
     xhr.onreadystatechange = function(){
     if(xhr.readyState == 4){
     if(xhr.status == 200){
     var data= JSON.parse(xhr.responseText);
     data.forEach(function(elem,index){
     //为li设置内容
     var li = root.getElementsByTagName('li');
     li[index].innerHTML = elem['name'];

     });
     }
     }
     }
     }
     return getNavData;
 */
});