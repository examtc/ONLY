require(["../../static/conf/config.js"], function () {
    require(["jquery"], function ($) {

        var userValue = null;
        var passValue = null;
        $(".login_user input").blur(function () {
            userValue = $(this).val().replace(/(^\s*)|(\s*$)/g, '');
            if (userValue == "") {
                $(this).siblings("p").text("请输入登录名");
                $(this).siblings(".faile").css({
                    opacity: "1"
                });
            }
        })
        $(".login_user input").focus(function () {
            $(this).siblings("p").text("")
            $(this).siblings(".faile").css({
                opacity: "0"
            });
        })
        $(".login_pass input").blur(function () {
            passValue = $(this).val().replace(/(^\s*)|(\s*$)/g, '');
            if (passValue == "") {
                $(this).siblings("p").text("请输入密码");
                $(this).siblings(".faile").css({
                    opacity: "1"
                });
            }
        })
        $(".login_pass input").focus(function () {
            $(this).siblings("p").text("")
            $(this).siblings(".faile").css({
                opacity: "0"
            });
        })

        $(".login_header div").click(function () {
            var _index = $(this).index();
            if (_index == 0) {
                $(this).children("h3").css({
                    color: "#F10180"
                });
                $(this).siblings().children("h3").css({
                    color: "#666"
                })
                $(".login_body_bycode").css({
                    display: "block"
                });
                $(".login_body_bypassword").css({
                    display: "none"
                })
            }
            else {
                $(this).children("h3").css({
                    color: "#F10180"
                });
                $(this).siblings().children("h3").css({
                    color: "#666"
                })
                $(".login_body_bycode").css({
                    display: "none"
                });
                $(".login_body_bypassword").css({
                    display: "block"
                })
            }
        })
        $(".login_submit").click(function () {
            var obj = JSON.parse(localStorage.getItem('userinfo'));
            var _length = obj.length;
            var count = null;
            for (var i = 0; i < _length; i++) {
                if (userValue == obj[i].username) {
                    count = i;
                }
            }
            if (count == null) {
                alert("该用户未注册")
                return false;
            }
            if (passValue == obj[count].password) {
                localStorage.setItem("logined", userValue);
                window.location = "../index/index.html";
            }
            else {
                alert("用户名与密码不匹配")
            }
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
        cart_message.forEach(ele => {
            _cartHTML +=
                `
        <li>
            <img src="https://www.only.cn${ele.pic}">
            <div>
                <p class="smCartMessage_des">
                    <label>${ele.des}</label>
                    <i>￥${ele.priseNow}</i> <b>x${ele.count}</b>
                </p>
                <p class="smCartMessage_color">
                    颜色：<i>${ele.color}</i>
                </p>
                <p class="smCartMessage_size">
                    尺码：<i>${ele.size}</i>
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