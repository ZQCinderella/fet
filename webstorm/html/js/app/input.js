/**
 * Created by Administrator on 2016/11/9.
 */
define(['jquery'],function($){
    $('#top .search input').keyup(function(e){
        //1、h获取input框中的内容
        var inputValue = $(this).val();
        //清空当前查询结果，重新查询
        $('.search-result').empty();
        if(e.keyCode >= 65 && e.keyCode <= 90 && inputValue.length > 0){
            //发送ajax请求
            $.ajax({
                url:'http://localhost:8000/input?value='+inputValue+'&time='+Date.parse(new Date()),
                type:'get',
                success:handleData
            });
        }
    });
    $('#top .search input').blur(function(){
        $('.search-result').hide();
    });
    function handleData(data){
        //解析返回的数据
        var list = data['data']['list'];
        console.log(list);
        var searchResult = $('.search-result');
        $(list).each(function(index,elem){
            //创建li
            var li = $('<li></li>');
            var a = $('<a></a>');
            a.attr('href',elem['url']);
            a.html(elem['word']);
            if(elem['type_name'] == 'item'){
                li.attr('class','imgLi');
                var img = $('<img></img>');
                img.attr('src',elem['src']);
                li.append(img);
                var p = $('<p></p>');
                var span = $('<span></span>');
                span.html(elem['cn_name']);
                p.append(span);

                span = span.clone();
                span.html(elem['en_name']);
                p.append(span);
                li.append(p);

                p = p.clone();
                p.html(elem['belong_name']);
                li.append(p);

            }else{
                li.append(a);
            }
            searchResult.append(li);
        });
        searchResult.show();
    }
});
