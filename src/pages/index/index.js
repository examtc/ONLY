require(["../../static/conf/config.js"], function () {
    require(["jquery", "sw"], function ($, Swiper) {
        // banner轮播图
        let mySwiper = new Swiper('.slideBanner', {
            speed: 500,
            autoplay: {
                delay: 3000
            },//可选选项，自动滑动
            effect: "fade", //切换效果，淡出
            loop: true,    //环路
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }

        })
        // 两个合并的轮播图
        let showsSlide = new Swiper('.slideTogether', {
            speed: 800,
            autoplay: {
                delay: 4000
            },//可选选项，自动滑动
            loop: true,    //环路
        })
        // 商品上新的轮播图
        let newsGoodsSlide = new Swiper('.newsShowContainer', {
            speed: 1000,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 10000
            },//可选选项，自动滑动
            loop: true,    //环路
        })
        // 商品热卖轮播图
        let hotsaleSlide = new Swiper('.hotsaleSlide', {
            speed: 600,
            effect: "fade", //切换效果，淡出
            autoplay: {
                delay: 5000
            },//可选选项，自动滑动
            loop: true,    //环路
            pagination: {
                el: '.swiper-pagination1',
                // 自定义分页器，必须的type类型
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    var paginationHtml = "";
                    for (var i = 0; i < total; i++) {
                        // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
                        if (i === (current - 1)) {
                            paginationHtml = '<span class="swiper-pagination-customs swiper-pagination-customs-activ"></span>';
                        }
                        paginationHtml = '<span class="swiper-pagination-customs"></span>';
                    }
                    return paginationHtml;
                }
            }
        })

        // 图片从左边或右边移入动画
        $(".newsShow_animate_right").mouseenter(function () {
            $(this).children(".animate_right").stop().animate({
                "left": "0"
            }, 500)
        })
        $(".newsShow_animate_right").mouseleave(function () {
            $(this).children(".animate_right").stop().animate({
                "left": "495px"
            }, 500)
        })
        $(".newsShow_animate_left").mouseenter(function () {
            $(this).children(".animate_left").stop().animate({
                "left": "0"
            }, 500)
        })
        $(".newsShow_animate_left").mouseleave(function () {
            $(this).children(".animate_left").stop().animate({
                "left": "-495px"
            }, 500)
        })

        // 鼠标移入大图有动画效果
        $(".bigBackground").mouseenter(function () {
            $(this).children().stop().animate({
                height: "700px",
                width: "1700px"
            }, 7000)
        })
        $(".bigBackground").mouseleave(function () {
            $(this).children().stop().animate({
                height: "660px",
                width: "1583px"
            }, 5000)
        })

        // 鼠标移入移出图片动画效果
        $(".bs_rows_item a img").mouseenter(function () {
            $(this).stop().animate({
                opacity: 1,
                width: "230px",
                height: "300px"
            }, 900)
        })
        $(".bs_rows_item a img").mouseleave(function () {
            $(this).stop().animate({
                opacity: 0.6,
                width: "222px",
                height: "284px"
            }, 900)
        })
        $(".NiceSelect div a img").mouseenter(function () {
            $(this).stop().animate({
                height: "400px",
                width: "455px"
            }, 500)
        })
        $(".NiceSelect div a img").mouseleave(function () {
            $(this).stop().animate({
                height: "389px",
                width: "438px"
            }, 500)
        })

        //   设置登录欢迎信息
        var loginUser = localStorage.getItem("logined")
        if (loginUser != null) {
            $(".index_login a").hide()
                .siblings("i").text("欢迎您" + loginUser)
                .siblings("span").show();
        }
        else {
            $(".index_login span").hide();
        }
        // 退出登录
        $(".index_login span").click(function () {
            $(this).hide().siblings("a").show()
                .siblings("i").text("");
            localStorage.removeItem("logined");

        })
        // 搜索框点击效果
        $(".index_search i").click(function () {
            $(this).hide()
                .siblings("span").hide()
                .siblings("div").css({
                    display: "inline-block"
                })
        })
        $(".index_search div label").click(function () {
            $(this).parent("div").css({
                display: "none"
            })
                .siblings("span").show()
                .siblings("i").show()
        })

        // 导航栏购物车信息
        var cart_message = JSON.parse(localStorage.getItem("cart"));
        console.log(cart_message);
        var _cartHTML = "";
        cart_message.forEach(ele1 => {
            _cartHTML +=
                `
        <li>
            <img src="https://www.only.cn${ele1.pic}">
            <div>
                <p class="smCartMessage_des">
                    <label>${ele1.des}</label>
                    <i>￥${ele1.priseNow}</i> <b>x${ele1.count}</b>
                </p>
                <p class="smCartMessage_color">
                    颜色：<i>${ele1.color}</i>
                </p>
                <p class="smCartMessage_size">
                    尺码：<i>${ele1.size}</i>
                </p>
                <button>删除</button>
            </div>
        </li>
        `
        });
        $(".smCartMessage ul").prepend(_cartHTML);
        $(".smCartMessage>div p i").text(cart_message.length)
        $(".smCartMessage ul li button").click(function () {
            var sm_cart_count = $(this).parent("div").parent("li").index();
            $(this).parent("div").parent("li").remove();
            cart_message.splice(sm_cart_count, 1);
            $(".smCartMessage>div p i").text(parseInt($(".smCartMessage>div p i").text())-1);
            $(".specialCart>i").text(parseInt($(".specialCart>i").text())-1)
            localStorage.setItem("cart", JSON.stringify(cart_message))
        })

           // 设置开头购物车中商品的数量
    var _cartNmuber = JSON.parse(localStorage.getItem("cart")).length;
    $(".specialCart>i").text(_cartNmuber);


    })
})
