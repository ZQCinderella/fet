/**
 * Created by Administrator on 2016/11/10.
 */
define(['jquery'],function($){
    function getCityData(){
        $.ajax({
            url:'http://10.0.161.38:8000/citywalk',
            type:'get',
            success:handleData
        });
    }
    function handleData(data){
        //根据数据长度创建节点
        $(data).each(function(index,elem){
            var divProduct = $('<div class="product"></div>');
            var img = $('<img/>');
            img.attr('src',elem['imgurl']);
            divProduct.append(img);

            //详细信息
            var proInfo = $('<div class="pro-info"></div>');
            var infoPlace = $('<span class="info-place"></span>');
            infoPlace.html(elem['address']);
            proInfo.append(infoPlace);

            //浏览量和已售件数
            var infoScan = $('<div class="info-scan"></div>');
            var browseCount = $('<span></span>');
            browseCount.html(elem['browseCount']);
            var soldCount = $('<span></span>');
            soldCount.html(elem['soldCount']);
            infoScan.append(browseCount);
            infoScan.html(infoScan.html() +'次浏览');

            // var text1 = document.createTextNode('次浏览');
            // var text2 = document.createTextNode('件已售');
            // infoScan[0].appendChild(text1);
            // infoScan[0].appendChild(text2);
            infoScan.append(soldCount);
            infoScan.html(infoScan.html() +'件已售' );
            proInfo.append(infoScan);

            //h2标题
            var h2 = $('<h2></h2>');
            var a = $('<a></a>');
            a.html(elem['title']);
            h2.append(a);
            proInfo.append(h2);

            //ul列表
            var ul = $('<ul></ul>');
            //遍历列表长度，并创建li
            $(elem['introduce']).each(function(index,elem){
                var li = $('<li></li>');
                li.html(elem);
                ul.append(li);
            });
            proInfo.append(ul);

            //商品价格
            var infoPrice = $('<div class="info-price"></div>');
            var oldPrice = $('<s></s>');
            oldPrice.html(elem['oldPrice'] + '元');
            var newPrice = $('<strong></strong>');
            newPrice.html(elem['newPrice']);
            infoPrice.append(oldPrice);
            infoPrice.append(newPrice);
            infoPrice.html(infoPrice.html() + '元起');
            proInfo.append(infoPrice);

            //提交按钮
            var submit = $('<div class="submit"></div>');
            var submitAa = $('<a href="#"></a>');
            submitAa.html('立即预订');
            submit.append(submitAa);
            proInfo.append(submit);

            divProduct.append(proInfo);
            //拼接到html中
            $('.ulDiv').append(divProduct);
        });
        //控制分页
        var pageSize = 1;
        //动态创建页数
        for(var i = 0 ; i < $('.ulDiv').children().length /pageSize ; i++){
            var a = $('<a href="#"></a>');
            a.html(i+1);
            $('.pageNum').append(a);
        }
        //控制每页显示的product数量
        $('.product:gt('+(pageSize - 1)+ ')').hide();
        //第一页默认被选中
        $('.pageNum a').eq(0).addClass('active');
        //设置超链接点击换页事件
        $('.pageNum a').on('click',function(){
            $(this).attr('class','active').siblings().removeClass('active');
            var index = parseInt($(this).html());
            if(index == 1){
                $('.product:lt('+( pageSize )+ ')').show();
                $('.product:gt('+(pageSize - 1)+ ')').hide();
            }else{
                var startIndex = (index - 1)*pageSize;
                $('.product').hide();
                $('.product:eq('+(startIndex - 1)+ ')').nextUntil( $('.product:eq('+(startIndex + pageSize)+ ')')).show();
            }
            //如果不再是第一页，则显示上一页
            if(!$('.pageNum a').eq(0).hasClass('active')){
                $('.prePage').show();
            }else{
                $('.prePage').hide();
            }
            //如果不是最后一页，则让下一页显示
            if(!$('.pageNum a').last().hasClass('active')){
                $('.nextPage').show();
            }
            return false;
        });
        //下一页事件
        $('.nextPage').on('click',function(){
             //获取将要加载的页
            var index = parseInt($('.pageNum a.active').html());
            //讲当前页的class = active移除，讲下一页的添加class
            $('.pageNum a').eq(index -1).removeClass('active').next().addClass('active');
            var startIndex = (index)*pageSize;
            $('.product').hide();
            $('.product:eq('+(startIndex - 1)+ ')').nextUntil( $('.product:eq('+(startIndex + pageSize)+ ')')).show();

            //如果不再是第一页，则显示上一页
            if(!$('.pageNum a').eq(0).hasClass('active')){
                $('.prePage').show();
            }

            //如果是最后一页，则让下一页隐藏
            if($('.pageNum a').last().hasClass('active')){
                $('.nextPage').hide();
            }
            return false;
        });
        //上一页事件
        $('.prePage').on('click',function () {
            //获取将要加载的页
            var index = parseInt($('.pageNum a.active').html());
            //讲当前页的class = active移除，讲下一页的添加class
            $('.pageNum a').eq(index -1).removeClass('active').prev().addClass('active');

            var startIndex = (index - 2)*pageSize;
            if(startIndex == 0){
                $('.product:lt('+( pageSize )+ ')').show();
                $('.product:gt('+(pageSize - 1)+ ')').hide();
                $(this).hide();
            }else{
                $('.product').hide();
                $('.product:eq('+(startIndex - 1)+ ')').nextUntil( $('.product:eq('+(startIndex + pageSize)+ ')')).show();
            }
            //如果不是最后一页，则让下一页显示
            if(!$('.pageNum a').last().hasClass('active')){
                $('.nextPage').show();
            }
            return false;
        });
    }
    return getCityData;
});