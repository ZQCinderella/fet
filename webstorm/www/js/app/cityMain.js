/**
 * Created by Administrator on 2016/11/10.
 */
requirejs.config({
    baseUrl:'js/lib',
    paths:{
        'app':'../app',
        'jquery':'jquery-3.1.1',
        'myutil':'../app/myUtils'
    },
    shim:{
        myutil:{
            exports:'createXhr'
        }
    }
});
define(['jquery','app/citywalk','app/nav','app/input'],function($,citywalk,nav){
    nav();
    //调用函数，获取请求数据
    citywalk();
});