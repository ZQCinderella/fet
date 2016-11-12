/**
 * Created by Administrator on 2016/11/7.
 */
define(['jquery'],function($){
    function getData(){
        $.ajax({
            url:'http://localhost:8000/menu',
            type:'get',
            success:handleData
        });
    }
    function handleData(data){
        $(data).each(function(index,elem){
            //设置左侧菜单的h2标题
            $('.menu h2').eq(index).html(elem['title']);

            //设置h2标题下的小标题
            var mainCity = elem['mainCity'];
            $(mainCity).each(function(ind,ele){
                var a = $('<a></a>');
                a.html(ele);
                $('.menu li:eq('+ index + ') p').append(a);
            });

            //右侧二级菜单的内容中的h2标题
            var moreCity = elem['moreCity'];
            $(moreCity).each(function(ind,ele){
                //创建category-place
                var categoryPlace = $('<div class="category-place"></div>');
                //创建h2标签
                var h2 = $('<h2></h2>');
                h2.html(ele['cityName']);
                categoryPlace.append(h2);

                //添加二级菜单h2标题下的li 的内容
                var cityItems =ele['items'];
                //遍历li的长度，动态创建li 和 a
                var ul = $('<ul></ul>');
                $(cityItems).each(function(i,e){
                    var li = $('<li></li>');
                    var a = $('<a></a>');
                    if(index == 5){
                        var img = $('<img/>');
                        img.attr('src',e);
                        a.append(img);
                    }else{
                        $(a).html(e);
                    }
                    li.append(a);
                    ul.append(li);
                });
                categoryPlace.append(ul);

                //添加图片
                var moreCityImg = elem['moreCityImg'];
                var categoryPic = $('<div class="category-pic"></div>');
                var img = $('<img/>');
                var imgLink = $('<a href="#"></a>');
                img.attr('src',moreCityImg);
                imgLink.append(img);
                categoryPic.append(imgLink);


                //判断每列应该有几个模块
                if(ind < Math.ceil(moreCity.length /2)){
                    $('.category-content').eq(index).find('.column').eq(0).append(categoryPlace);
                }else{
                    $('.category-content').eq(index).find('.column').eq(1).append(categoryPlace).append(categoryPic);
                }
            });
        });
    }
    //鼠标经过的事件
    $('#category-menu li').each(function(index,elem){
        //获取li对应的二级菜单的div
        var menuContent = $('.category-content');
        var flag = false;
        //判断鼠标从哪个方向移入移出元素的方法
        $(elem).on("mouseenter mouseleave", function(e) {
            if(e.type == 'mouseenter'){
                $('#category-contents').show();
                menuContent.eq(index).show();
            }else if(e.type == 'mouseleave'){
                //如果是划入的右侧的菜单，则不消失

                //方法一
               /*
                    if(e.pageX > $(menuContent[index]).offset().left
                        && e.pageX < $(menuContent[index]).offset().left + $(menuContent[index]).width()
                        && e.pageY > $(menuContent[index]).offset().top
                        && e.pageY < $(menuContent[index]).offset().top + $(menuContent[index]).height()){

                        $(menuContent[index]).mouseleave(function(){
                        menuContent.eq(index).hide();
                        $('#category-contents').hide();
                        });
                        $('#category-contents').show();
                        menuContent.eq(index).show();
                        }else{
                        console.log('消失');
                        menuContent.eq(index).hide();
                        $('#category-contents').hide();
                    }
               * */

                $(menuContent[index]).mouseenter(function(e){
                    $('#category-contents').show();
                    menuContent.eq(index).show();
                }).mouseleave(function(e){
                    menuContent.eq(index).hide();
                    $('#category-contents').hide();
                });
                menuContent.eq(index).hide();
                $('#category-contents').hide();
            }
        });
    });

    return getData;
});