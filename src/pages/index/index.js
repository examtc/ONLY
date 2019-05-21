require(["../../static/conf/config.js"],function(){
    require(["jquery","sw"],function($,Swiper){
        // banner轮播图
        let mySwiper = new Swiper('.slideBanner', {
            speed : 500,
            autoplay: {
                delay : 3000
            },//可选选项，自动滑动
            effect : "fade", //切换效果，淡出
            loop : true ,    //环路
            pagination: {
                el: '.swiper-pagination',
                clickable :true  
              }
            
        })
        // 两个合并的轮播图
        let showsSlide = new Swiper('.slideTogether', {
            speed : 800,
            autoplay: {
                delay : 4000
            },//可选选项，自动滑动
            loop : true ,    //环路
        })
        // 商品上新的轮播图
        let newsGoodsSlide = new Swiper('.newsShowContainer', {
            speed : 1000,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            autoplay: {
                delay : 10000
            },//可选选项，自动滑动
            loop : true ,    //环路
        })
        // 商品热卖轮播图
        let hotsaleSlide = new Swiper('.hotsaleSlide', {
            speed : 600,
            effect : "fade", //切换效果，淡出
            autoplay: {
                delay : 5000
            },//可选选项，自动滑动
            loop : true ,    //环路
            pagination:{
                el: '.swiper-pagination1',
                // 自定义分页器，必须的type类型
                type: 'custom',
                renderCustom: function(swiper,current, total){
                  var paginationHtml = "";
                  for(var i= 0; i< total; i++) {
                   // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
                     if(i === (current -1)){
                        paginationHtml = '<span class="swiper-pagination-customs swiper-pagination-customs-activ"></span>';
                      }
                        paginationHtml = '<span class="swiper-pagination-customs"></span>';
                   }
                  return paginationHtml;
               }
            }
        })


        $(".newsShow_animate_right").mouseenter(function(){
            $(this).children(".animate_right").stop().animate({
                "left" : "0"
            },500)
        })
        $(".newsShow_animate_right").mouseleave(function(){
            $(this).children(".animate_right").stop().animate({
                "left" : "495px"
            },500)
        })
        $(".newsShow_animate_left").mouseenter(function(){
            $(this).children(".animate_left").stop().animate({
                "left" : "0"
            },500)
        })
        $(".newsShow_animate_left").mouseleave(function(){
            $(this).children(".animate_left").stop().animate({
                "left" : "-495px"
            },500)
        })

        $(".bigBackground").mouseenter(function(){
            $(this).children().stop().animate({
                height : "700px",
                width : "1700px"
            },7000)
        })
        $(".bigBackground").mouseleave(function(){
            $(this).children().stop().animate({
                height : "660px",
                width : "1583px"
            },5000)
        })


        $(".bs_rows_item a img").mouseenter(function(){
            $(this).stop().animate({
                opacity : 1,
                width : "230px",
                height: "300px"
            },900)
        })
        $(".bs_rows_item a img").mouseleave(function(){
            $(this).stop().animate({
                opacity : 0.6,
                width : "222px",
                height: "284px"
            },900)
        })
        $(".NiceSelect div a img").mouseenter(function(){
            $(this).stop().animate({
                height : "400px",
                width : "455px"
            },500)
        })
        $(".NiceSelect div a img").mouseleave(function(){
            $(this).stop().animate({
                height : "389px",
                width : "438px"
            },500)
        })

//   设置登录欢迎信息
        var loginUser = localStorage.getItem("logined")
    if(loginUser != null){
        $(".index_login a").hide()
        .siblings("i").text("欢迎您"+loginUser)
        .siblings("span").show();
    }
    else{
        $(".index_login span").hide();
    }
    // 退出登录
    $(".index_login span").click(function(){
        $(this).hide().siblings("a").show()
        .siblings("i").text("");
        localStorage.removeItem("logined");

    })
    $(".index_search i").click(function(){
        $(this).hide()
        .siblings("span").hide()
        .siblings("div").css({
            display : "inline-block"
        })
    })
    $(".index_search div label").click(function(){
        $(this).parent("div").css({
            display : "none"
        })
        .siblings("span").show()
        .siblings("i").show()
    })



    })
})
