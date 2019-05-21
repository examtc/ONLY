require(["../../static/conf/config.js"], function () {
    require(["jquery", "sw"], function ($, Swiper) {

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
    })
})