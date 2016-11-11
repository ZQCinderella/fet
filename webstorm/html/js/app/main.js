/**
 * Created by Administrator on 2016/11/7.
 */
requirejs.config({
    baseUrl:'js/lib',   //baseUrl是以当前html页面（index.html）为基准的
    paths:{
        'app':'../app',    //如果路径很长，那么使用一个代号就比较简洁
        'jquery':'jquery-3.1.1',  //不加 .js
        'myutil':'../app/myUtils'
    },
    shim:{
        'myutil':{
            exports:'createXhr'
        }
    }
});
define(['jquery','app/nav','app/banner2','app/menu','app/freeWalk','app/input','app/es6'],function($, nav,banner,menu,fw,input,es6){
    //调用导航栏的请求数据的方法
    nav();

    //调用轮播图
    banner();

    //调用菜单方法
    menu();
    /*
     //原生js
         var root = document.querySelector('#nav ul');
         nav(root);
    */
    //   机酒自由行模块
    fw();
});