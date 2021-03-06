require(["../../static/conf/config.js"], function () {
    require(["jquery"], function ($) {

        //    设置登录欢迎信息
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

        // 加载左边栏菜单数据
        var xhr = new XMLHttpRequest();
        xhr.open("get", "http://localhost:8000/home");
        xhr.onload = function () {
            var res = JSON.parse(xhr.response)
            render(res)
        }
        xhr.send();
        // 渲染左边栏菜单
        function render(res) {
            var leftItem = res.data;

            var list1goodsHtml = "";
            var count = 0;
            leftItem.forEach(ele => {
                count++;
                list1goodsHtml +=
                    `
                <li>
                    <span>${ele.classifyName}</span>
                    <ul class="list1_miss">
                `;
                var goodslist = ele.list;
                // console.log(ele.classifyName)
                goodslist.forEach(element => {
                    // console.log(element.classifyName)
                    list1goodsHtml +=
                        `
                    <li>
                        <a href="">${element.classifyName}</a>
                    </li>
                `;
                });
                list1goodsHtml +=
                    `   </ul>
                 </li>
                `
            });

            // 放入html中
            $(".list1_main_goodslist").append(list1goodsHtml);
            // 点击隐藏二级菜单
            $(".list1_main_goodslist li span").click(function () {
                $(this).siblings("ul").toggleClass(" list1_miss")
            })
        }

        $.ajax({
            url: "http://localhost:9999/json/list/list1.json",//json文件位置
            type: "GET",//请求方式为get
            dataType: "json", //返回数据格式为json
            success: function (data) {//请求成功完成后要执行的方法 
                var goodsHTML = "";
                var _number = data.length;
                var _count = Math.ceil(_number / 3) * 635;
                $(".list1_main_goods").css({
                    height: _count + "px"
                });
                $(".list1_main_top strong b").text(_number)
                data.forEach(ele => {
                    goodsHTML +=
                        `
                <li>
                    <a href="../detail/detail1.html?design=${ele.goodsCode}">
                        <img src="http://www.only.cn${ele.gscMaincolPath}">
                    </a>
                    <p class="list1_goodsmes">
                        <span>${ele.goodsName}</span>
                        <i>${ele.discount * 10}.0折</i>
                    </p>
                    <p class="list1_goodsprise">
                        <span class="nowprice">￥${ele.discountPrice}</span>
                        <span class="lastprice">￥${ele.originalPrice}</span>
                    </p>
                    <span style="display:none">
                        快速购买
                    </span>
                </li>
                `;
                });
                $(".list1_main_goods").append(goodsHTML);
                // 鼠标移入移出效果
                $(".list1_main_goods li").hover(function(){
                    $(this).find("img").stop().animate({
                        height: "560px",
                        width: "350px"
                    }, 600);
                    $(this).children("span").stop().show(300);
                },function(){
                    $(this).find("img").stop().animate({
                        height: "535px",
                        width: "335px"
                    }, 600);
                    $(this).children("span").stop().hide(300);
                })

            }
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