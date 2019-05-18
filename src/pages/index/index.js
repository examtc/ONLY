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


    })
})
