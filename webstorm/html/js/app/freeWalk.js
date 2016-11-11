/**
 * Created by Administrator on 2016/11/9.
 */
define(['jquery'],function($){
    hoverLi();
    function getFWData(){
        $.ajax({
            type:"get",
            url:"http://10.0.161.38:8000/fw",
            success:handleFw
        })
    }
    return getFWData;
})
function handleFw(data){
    $(data).each(function(index,elem) {
        $(".fwTitle li a").eq(index).text(elem.title);
        var datas = elem.data;

        $('.fwContet').eq(index).find('li').each(function(ind,ele){
            if(ind < 6){
                //设置图片
                $(this).find('img').attr('src',datas[ind]['imgUrl']);
                //设置标题和价格
                $(this).find('.price').find('em').text(datas[ind]['price']);
                $(this).find('h3').text(datas[ind]['title']);
            }
        });
    });
}
function hoverLi(){
    $(".fwTitle li").on("mouseenter",function(){
        $(".ziyouxing-content ul").eq($(this).index()).show().siblings().hide();
    })
}
