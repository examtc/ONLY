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


        //以下是详情页JS
        // 放大镜
        $(".magnifier_big").mouseover(function () {
            $(".magnifie_move").show()
            $(".magnifier_showpic").show()
        })
        $(".magnifier_big").mouseout(function () {
            $(".magnifie_move").hide()
            $(".magnifier_showpic").hide()
        })

        $(".magnifier_big").mousemove(function (e) {
            var l = e.pageX - $(".magnifier_big").offset().left - ($(".magnifie_move").width() / 2)
            var t = e.pageY - $(".magnifier_big").offset().top - ($(".magnifie_move").height() / 2)
            if (l < 0) {
                l = 0
            }
            if (l > $(this).width() - $(".magnifie_move").width()) {
                l = $(this).width() - $(".magnifie_move").width()
            }
            if (t < 0) {
                t = 0
            }
            if (t > $(this).height() - $(".magnifie_move").height()) {
                t = $(this).height() - $(".magnifie_move").height()
            }

            $(".magnifie_move").css({
                "left": l,
                "top": t
            })
            var pX = l / ($(".magnifier_big").width() - $(".magnifie_move").width())
            var pY = t / ($(".magnifier_big").height() - $(".magnifie_move").height())
            // console.log(pX,pY)
            $(".magnifier_showpic img").css({
                "left": -pX * ($(".magnifier_showpic img").width() - $(".magnifier_showpic").width()),
                "top": -pY * ($(".magnifier_showpic img").height() - $(".magnifier_showpic").height())
            })



        })

        $(".goodsSizeList ul li").click(function () {
            $(this).addClass("chooseLogo").siblings().removeClass("chooseLogo")
        })

        // 渲染列表
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
                    <ul>
                `;
                var goodslist = ele.list;
                goodslist.forEach(element => {
                    list1goodsHtml +=
                        `
                    <li>
                        <a href="?${element.classifyId}">${element.classifyName}</a>
                    </li>
                `;
                });
                list1goodsHtml +=
                    `   </ul>
                 </li>
                `
            });

            // 放入html中
            $(".detail_goodslist").append(list1goodsHtml);
            // 点击隐藏二级菜单
            $(".detail_goodslist li span").click(function () {
                $(this).siblings("ul").toggleClass(" detail__ListHide")
            })
        }


        // 渲染右边栏图片展示
        $.ajax({
            url: "http://localhost:8000/detail1",//json文件位置
            type: "GET",//请求方式为get
            dataType: "json", //返回数据格式为json
            success: function (res) {//请求成功完成后要执行的方法 
                var _json = res.data;
                var detail_rightHTML = "";
                _json.forEach(ele => {
                    detail_rightHTML +=
                        `
                    <li>
                        <a href="?design=${ele.colorCode}"><img src="https://www.only.cn${ele.picurls[0]}"></a>
                        <span>￥${ele.price}</span>
                    </li>
                    `;
                })
                $(".detail_body_right ul").append(detail_rightHTML);

            }
        })

        // 整体渲染
        $.ajax({
            url: `http://localhost:8000/detail2${window.location.search}`,//json文件位置
            type: "GET",//请求方式为get
            dataType: "json", //返回数据格式为json
            success: function (res) {//请求成功完成后要执行的方法 
                console.log(res.data);
                var _class = res.data.color;
                var str1 = "";
                var str2 = "";
                var str3 = "";
                var str4 = "";
                var str5 = "";
                var str6 = "";
                var str7 = "";
                $(".detail_main_title span").text(`首页/${res.data.goodsName}`)
                str1 +=
                    `
                <li><img src="https://www.only.cn${_class[0].picurls[0]}"></li>
                <li><img src="https://www.only.cn${_class[0].picurls[1]}"></li>
                <li><img src="https://www.only.cn${_class[0].picurls[2]}"></li>
                <li><img src="https://www.only.cn${_class[0].picurls[3]}"></li>
                `;
                $(".magnifier_sm").append(str1);

                $(".magnifier_sm li").click(function () {
                    $(this).addClass("chooseItem")
                        .css({
                            height: "170px"
                        })
                        .siblings().removeClass("chooseItem")
                        .css({
                            height: "172px"
                        })
                    var _index = $(this).index()
                    if (_index == 0) {
                        $(".magnifier_big img").attr("src", `https://www.only.cn${_class[0].picurls[0]}`);

                    }
                    if (_index == 1) {
                        $(".magnifier_big img").attr("src", `https://www.only.cn${_class[0].picurls[1]}`);

                    }
                    if (_index == 2) {
                        $(".magnifier_big img").attr("src", `https://www.only.cn${_class[0].picurls[2]}`);

                    }
                    if (_index == 3) {
                        $(".magnifier_big img").attr("src", `https://www.only.cn${_class[0].picurls[3]}`);

                    }
                })

                str2 +=
                    `
                        <span class="goods_price">价格</span>
                        <span class="goods_nowPrice">￥${_class[0].price}</span>
                        <span class="goods_lastPrice">吊牌价 ￥ ${_class[0].originalPrice}</span>
                        <i>促销</i>
                        `;
                $(".priceline").append(str2);
                str3 += `
                        <h3>${res.data.goodsName}</h3>
                        <p>产品编号:${_class[0].colorCode}</p>`;
                $(".detail_goodsInfo").prepend(str3);
                str4 +=
                    `
                        <img src="https://www.only.cn${_class[0].picurls[0]}">
                        `
                $(".magnifier_big").prepend(str4)
                $(".magnifier_showpic").append(str4);

                res.data.color.forEach(ele => {
                    str5 +=
                        `
                            <li>
                                <img src="https://www.only.cn${ele.picurls[1]}" alt="${ele.colorAlias}">
                                <span><img src="../../img/detail/rightlogo.png"></span>
                            </li>
                            `;
                });
                $(".goodsColor ul").append(str5)
                // 点击图片选择颜色
                var random_select = parseInt(Math.random() * 14 + 2)
                $(".goodsColor ul li").click(function () {
                    $(this).addClass("chooseLogo").children("span").show().parent()
                        .siblings().removeClass("chooseLogo").children("span").hide();
                    var _number = $(this).index();
                    // 显示库存
                    $(".goodsCount p i").text(random_select + _number * 3);
                    var _maxCount = $(".goodsCount p i").text();
                    $(".goodsCount span").first().click(function () {
                        var _count = parseInt($(".goodsCount div>i").text());
                        if (_count < _maxCount) {
                            _count++;
                        }

                        $(".goodsCount div>i").text(_count)
                    }).siblings().click(function () {
                        var _count = parseInt($(".goodsCount div>i").text());
                        if (_count > 1)
                            _count--;
                        $(".goodsCount div>i").text(_count)
                    })
                    str6 +=
                        `
                    <li><img src="https://www.only.cn${_class[_number].picurls[0]}"></li>
                    <li><img src="https://www.only.cn${_class[_number].picurls[1]}"></li>
                    <li><img src="https://www.only.cn${_class[_number].picurls[2]}"></li>
                    <li><img src="https://www.only.cn${_class[_number].picurls[3]}"></li>
                    `
                    $(".magnifier_sm").empty()
                    $(".magnifier_sm").append(str6);
                    $(".magnifier_big>img").attr("src", `https://www.only.cn${_class[_number].picurls[0]}`);
                    $(".magnifier_showpic>img").attr("src", `https://www.only.cn${_class[_number].picurls[0]}`)
                    str6 = "";
                    $(".magnifier_sm li").click(function () {
                        $(this).addClass("chooseItem")
                            .css({
                                height: "170px"
                            })
                            .siblings().removeClass("chooseItem")
                            .css({
                                height: "172px"
                            })
                        var _index1 = $(this).index()
                        if (_index1 == 0) {
                            $(".magnifier_big img").attr("src", `https://www.only.cn${_class[_number].picurls[0]}`);

                        }
                        if (_index1 == 1) {
                            $(".magnifier_big img").attr("src", `https://www.only.cn${_class[_number].picurls[1]}`);

                        }
                        if (_index1 == 2) {
                            $(".magnifier_big img").attr("src", `https://www.only.cn${_class[_number].picurls[2]}`);

                        }
                        if (_index1 == 3) {
                            $(".magnifier_big img").attr("src", `https://www.only.cn${_class[_number].picurls[3]}`);

                        }
                    })
                });

                _class.forEach(goodsItem => {

                    for (var i = 0; i < goodsItem.picurls.length - 1; i++) {
                        str7 +=
                            `
                        <div>
                            <img src="https://www.only.cn${goodsItem.picurls[i]}">
                        </div>    
                    `
                    }
                })
                str7 +=
                    `
                    <div class="detail_body_middle_footerpic">
                        <img src="../../img/detail/detail26.jpg">
                    </div>  
                `
                $(".detail_body_middle").append(str7)
                    ;

                console.log($(".goodsColor ul").children(".chooseLogo").length)
                // 点击加入购物车
                $(".join_cart").click(function () {
                    if ($(".goodsColor ul").children(".chooseLogo").length == 0) {
                        alert("请选择商品颜色")
                    }
                    else {
                        var select_size = $(".goodsSizeList ul").children(".chooseLogo").text();
                        console.log("尺寸=========", select_size)
                        var select_color = $(".goodsColor ul").children(".chooseLogo").children("img").attr("alt");
                        console.log("颜色=========", select_color)
                        var select_id = (window.location.search).replace(/[^0-9]/ig, "").substring(0, 9);
                        console.log("ID=========", select_id)
                        var select_count = $(".goodsCount").children("div").children("i").text();
                        console.log("数量=========", select_count)
                        var select_index = $(".goodsColor ul").children(".chooseLogo").index();
                        var select_des = res.data.goodsName;
                        console.log("描述=========", select_des)
                        var select_pic = _class[select_index].picurls[0];
                        console.log("链接=========", select_pic)
                        var select_shengyu = $(".goodsCount").children("p").children("i").text();
                        var select_priseNow = _class[select_index].price;
                        var cartM = JSON.parse(localStorage.getItem('cart'));
                        var arr = []
                        for (var i in cartM) {
                            arr.push(cartM[i]); //属性
                        }
                        arr.push({
                            size: select_size,
                            color: select_color,
                            id: select_id,
                            count: select_count,
                            index: select_index,
                            des: select_des,
                            pic: select_pic,
                            priseNow: select_priseNow,
                            sell: select_shengyu
                        });
                        localStorage.setItem('cart', JSON.stringify(arr));
                        $(".specialCart>i").text(parseInt($(".specialCart>i").text())+1);
                        $(".smCartMessage>div p i").text(parseInt($(".smCartMessage>div p i").text())+1)
                        $(".addsuccess").show()
                    };
                })
                $(".addsuccess").children("p").children("span").click(function(){
                    $(".addsuccess").hide()
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
                $(".smCartMessage ul").append(_cartHTML);
                $(".smCartMessage>div p i").text(cart_message.length)
                $(".smCartMessage ul li button").click(function () {
                    var sm_cart_count = $(this).parent("div").parent("li").index();
                    $(this).parent("div").parent("li").remove();
                    cart_message.splice(sm_cart_count, 1);
                    $(".smCartMessage>div p i").text(parseInt($(".smCartMessage>div p i").text())-1)
                    $(".specialCart>i").text(parseInt($(".specialCart>i").text())-1)
                    localStorage.setItem("cart", JSON.stringify(cart_message))
                })

                // 设置开头购物车中商品的数量
                var _cartNmuber = JSON.parse(localStorage.getItem("cart")).length;
                $(".specialCart>i").text(_cartNmuber);
            }
        })
    })
})