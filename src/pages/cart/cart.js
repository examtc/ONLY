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


        var cart_message = JSON.parse(localStorage.getItem("cart"));
        console.log(cart_message);
        $(".cart_main_title p").children("i").text(cart_message.length)
        var cart_HTML = "";
        cart_message.forEach(ele => {
            cart_HTML +=
                `
     <li>
                 <div class="cart_goodspic">
                     <input type="checkbox">
                     <img src="https://www.only.cn/${ele.pic}">
                 </div>
                 <p class="cart_goodsname">${ele.des}</p>
                 <div class="cart_color">
                     ${ele.color}
                 </div>
                 <div class="cart_size">
                      ${ele.size}
                 </div>
                 <div class="cart_count">
                     <div>
                         <b>${ele.count}</b>
                         <div>
                             <label class="count_add">+</label>
                             <label class="count_low">-</label>
                         </div>
                     </div>
                     <p>库存:<strong>${ele.sell}</strong>件</p>
                 </div>
                 <div class="cart_oneprice">
                     ￥<i>${ele.priseNow}</i>
                 </div>
                 <p class="cart_allprice">
                     ￥<i>${ele.priseNow * ele.count}</i>
                 </p>
                 <div class="delete_cart">
                     从购物车中删除
                 </div>
             </li>
     `;
        })
        $(".cart_main_body_goodsItem ul").append(cart_HTML)
            ;
        // 删除购物车
        $(".delete_cart").click(function () {
            var deledet_index = $(this).parent("li").index();
            $(this).parent("li").remove();
            cart_message.splice(deledet_index, 1);
            localStorage.setItem("cart", JSON.stringify(cart_message))
        })

        // 清空购物车
        $(".cart_main_body_footer").children("button").click(function () {
            $(this).parent().siblings("ul").children("li").remove()
            localStorage.removeItem("cart")
        })

        // console.log($(".cart_count").find("b").text())
        // 数量加减
        $(".count_add").click(function () {
            var _number = $(this).parent("div").siblings("b").text();
            // console.log($(this).parent("div").parent("div").siblings("p").children("strong").text())
            if (_number < parseInt($(this).parent("div").parent("div").siblings("p").children("strong").text())) {
                _number++;
                $(this).parent("div").siblings("b").text(_number);
                var _danjia = $(this).parent("div").parent("div").parent("div").siblings(".cart_oneprice").children("i").text();
                $(this).parent("div").parent("div").parent("div").siblings(".cart_allprice").children("i")
                    .text((_danjia * _number).toFixed(1))
            };
            var _arr = $(".cart_main_body_goodsItem").find(":checked");
            var _sss = 0;
            for (var i = 0; i < _arr.length; i++) {
                _sss += parseFloat($(_arr[i]).parent("div").siblings(".cart_allprice").children("i").text());
            }
            $(".cart_last_all").children("i").text(_sss)
        })
        $(".count_low").click(function () {
            var _number = $(this).parent("div").siblings("b").text();
            if (_number > 1) {
                _number--;
                $(this).parent("div").siblings("b").text(_number);
                var _danjia = $(this).parent("div").parent("div").parent("div").siblings(".cart_oneprice").children("i").text();
                $(this).parent("div").parent("div").parent("div").siblings(".cart_allprice").children("i")
                    .text((_danjia * _number).toFixed(1))
            };
            var _arr = $(".cart_main_body_goodsItem").find(":checked");
            var _sss = 0;
            for (var i = 0; i < _arr.length; i++) {
                _sss += parseFloat($(_arr[i]).parent("div").siblings(".cart_allprice").children("i").text());
            }
            $(".cart_last_all").children("i").text(_sss)
        })
        $("._allcheck").children("input").change(function () {
            if ($(this).is(":checked")) {
                $(".cart_main_body_goodsItem ul").children("li").find("input").prop("checked", true)
            }
            else {
                $(".cart_main_body_goodsItem ul").children("li").find("input").prop("checked", false)
            }
        })
        $(".cart_main_body").find("input").change(function () {
            var _arr = $(".cart_main_body_goodsItem").find(":checked");
            var _sss = 0;
            for (var i = 0; i < _arr.length; i++) {
                _sss += parseFloat($(_arr[i]).parent("div").siblings(".cart_allprice").children("i").text());
            }
            $(".cart_last_all").children("i").text(_sss)
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