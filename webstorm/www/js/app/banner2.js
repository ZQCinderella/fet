/**
 * Created by Administrator on 2016/11/8.
 */
define(['jquery'],function($) {
    function getData() {
        $.ajax({
            url: 'http://localhost:8000/banner',
            type: 'get',
            success: handleData
        });
    }
    function handleData(data){
        //1、获取img标签和a标签
        var img = $('.banner-img img');
        var a = $('.banner-img a');

        //2、为img 和 a 的属性赋值
        $(data).each(function(index,elem){
            $(img[index]).attr('src',elem['imgUrl']);
            $(a[index]).attr('href',elem['href']);
        });

        //3、s设置定时器进行轮播
        var bannerTimer  = setInterval(imgInterval,2000);
        //定时器函数
        var left = 0;
        function imgInterval(){
            //让ul 向左移动
            left -= 1920;
            if(left <= -7680){
                left = 0;
            }
            $('.banner-img').animate({
                'margin-left':left + 'px'
            },500);
        }

        //左侧按钮的点击事件
        $('.left-cart').on('click',function(e){
            //先清除定时器
            clearInterval(bannerTimer);
            //获取ul,让它的margin-left 值加 1920

            if(left < 0){
                left += 1920;
            }
            $('.banner-img').animate({
                'margin-left':left + 'px'
            },500);

            //开启定时器
            bannerTimer  = setInterval(imgInterval,2000);
        });
        //右侧按钮的点击事件
        $('.right-cart').on('click',function(e){
            //先清除定时器
            clearInterval(bannerTimer);
            //获取ul,让它的margin-left 值加 1920
            if(left > -5760){
                left -= 1920;
            }else{
                left = 0;
            }
            $('.banner-img').animate({
                'margin-left':left + 'px'
            },500);

            //开启定时器
            bannerTimer  = setInterval(imgInterval,2000);
        });
       /*
        $('.left-cart').on('click',function(e){
            //先清除定时器
            clearInterval(bannerTimer);
            //获取ul,让它的margin-left 值加 1920
            var marginLeft = parseInt($('.banner-img').css('margin-left'));
            console.log(left);
            if(marginLeft % (-1920) != 0){
            marginLeft = -1920*marginLeft/1920;
            }else{
            if(marginLeft == 0){
            marginLeft = 0;
            }else{
            marginLeft = marginLeft + 1920;
            }
            }
            if(left < 0){
            left += 1920;
            }
            $('.banner-img').animate({
            'margin-left':marginLeft + 'px'
            },500);

            //开启定时器
            bannerTimer  = setInterval(imgInterval,2000);
        });
       * */
        //右侧按钮的点击事件
        /*
         $('.right-cart').on('click',function(e){
             //先清除定时器
             clearInterval(bannerTimer);
             //获取ul,让它的margin-left 值加 1920
             var marginLeft = parseInt($('.banner-img').css('margin-left'));
             console.log(left);
             if(marginLeft % (-1920) != 0){
             marginLeft = -1920*marginLeft/1920 - 1920;
             }else{
             if(marginLeft == -7680){
             marginLeft = -7680;
             }else{
             marginLeft = marginLeft - 1920;
             }
             }
             if(left > -7680){
             left -= 1920;
             }
             $('.banner-img').animate({
             'margin-left':marginLeft + 'px'
             },500);

             //开启定时器
             bannerTimer  = setInterval(imgInterval,2000);
             });
        * */
    }

    return getData;
});