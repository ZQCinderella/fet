/**
 * Created by Administrator on 2016/11/7.
 */
define(['jquery'],function($){
    function getData(){
        $.ajax({
            url:'http://localhost:8000/banner',
            type:'get',
            success:handleData
        });
    }

    function handleData(data){
        //进行轮播图的设置
        //1、获取img的节点
        var img = $('.banner-img');
        var a = $('.a-banner');
        //2、创建一个数组存放图片的路径，当然也可以不使用，只是为了简便
        var imgArr = [];
        var aArr = [];
        $(data).each(function(index,elem){
            imgArr[index] = elem['imgUrl'];
            aArr[index] = elem['href'];
        });
        //3、启动定时器
        var num = 0;
        img.src = imgArr[0];
        $(img).attr('src',imgArr[0]);
        $(a).attr('href',aArr[0]);
        var bannerTimer  = setInterval(imgInterval,2000);
        //定时器函数
        function imgInterval(){
            num++;
            if(num == imgArr.length){
                num = 0;
            }
            $(img).attr('src',imgArr[num]);
            $(a).attr('href',aArr[num]);
        }

        //左侧按钮的点击事件
        $('.left-cart').on('click',function(e){
            //先清除定时器
            clearInterval(bannerTimer);
            //首先要知道当前图片时第几张，所以在数组中判断，查询索引
            var index = $.inArray($(img).attr('src'),imgArr);
            if(index > 0){
                num = index - 1;
            }else{
                num = imgArr.length - 1;
            }
            $(img).attr('src',imgArr[num]);
            //开启定时器
            bannerTimer  = setInterval(imgInterval,2000);
        });
        //右侧按钮的点击事件
        $('.right-cart').on('click',function(e){
            //先清除定时器
            clearInterval(bannerTimer);
            //首先要知道当前图片时第几张，所以在数组中判断，查询索引
            var index = $.inArray($(img).attr('src'),imgArr);
            if(index < imgArr.length -1){
                num = index+1;
            }else{
                num = 0;
            }
            $(img).attr('src',imgArr[num]);
            //开启定时器
            bannerTimer  = setInterval(imgInterval,2000);
        });
    }


    return getData;

});