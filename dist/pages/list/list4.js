"use strict";require(["../../static/conf/config.js"],function(){require(["jquery"],function(a){var n=localStorage.getItem("logined");null!=n?a(".index_login a").hide().siblings("i").text("欢迎您"+n).siblings("span").show():a(".index_login span").hide(),a(".index_login span").click(function(){a(this).hide().siblings("a").show().siblings("i").text(""),localStorage.removeItem("logined")}),a(".index_search i").click(function(){a(this).hide().siblings("span").hide().siblings("div").css({display:"inline-block"})}),a(".index_search div label").click(function(){a(this).parent("div").css({display:"none"}).siblings("span").show().siblings("i").show()});var s=new XMLHttpRequest;s.open("get","http://localhost:8000/home"),s.onload=function(){!function(n){var s=n.data,i="";s.forEach(function(n){0,i+="\n               <li>\n                   <span>".concat(n.classifyName,'</span>\n                   <ul class="list1_miss">\n               '),n.list.forEach(function(n){i+='\n                   <li>\n                       <a href="###">'.concat(n.classifyName,"</a>\n                   </li>\n               ")}),i+="   </ul>\n                </li>\n               "}),a(".list1_main_goodslist").append(i),a(".list1_main_goodslist li span").click(function(){a(this).siblings("ul").toggleClass(" list1_miss")})}(JSON.parse(s.response))},s.send(),a.ajax({url:"http://localhost:9999/json/list/list4.json",type:"GET",dataType:"json",success:function(n){var s="",i=n.length,t=635*Math.ceil(i/3);a(".list1_main_goods").css({height:t+"px"}),a(".list1_main_top strong b").text(i),n.forEach(function(n){s+='\n               <li>\n                   <a href="../detail/detail1.html?design='.concat(n.goodsCode,'">\n                       <img src="http://www.only.cn').concat(n.gscMaincolPath,'">\n                   </a>\n                   <p class="list1_goodsmes">\n                       <span>').concat(n.goodsName,'</span>\n                   </p>\n                   <p class="list1_goodsprise">\n                       <span class="nowprice">￥').concat(n.discountPrice,'</span>\n                       <span class="lastprice">火爆热卖不打折</span>\n                   </p>\n                   <span style="display:none">\n                       快速购买\n                   </span>\n               </li>\n               ')}),a(".list1_main_goods").append(s),a(".list1_main_goods li").hover(function(){a(this).find("img").stop().animate({height:"560px",width:"350px"},600),a(this).children("span").show(550)},function(){a(this).find("img").stop().animate({height:"535px",width:"335px"},600),a(this).children("span").hide(550)})}});var i=JSON.parse(localStorage.getItem("cart"));console.log(i);var t="";i.forEach(function(n){t+='\n                <li>\n                    <img src="https://www.only.cn'.concat(n.pic,'">\n                    <div>\n                        <p class="smCartMessage_des">\n                            <label>').concat(n.des,"</label>\n                            <i>￥").concat(n.priseNow,"</i> <b>x").concat(n.count,'</b>\n                        </p>\n                        <p class="smCartMessage_color">\n                            颜色：<i>').concat(n.color,'</i>\n                        </p>\n                        <p class="smCartMessage_size">\n                            尺码：<i>').concat(n.size,"</i>\n                        </p>\n                        <button>删除</button>\n                    </div>\n                </li>\n                ")}),a(".smCartMessage ul").prepend(t),a(".smCartMessage>div p i").text(i.length),a(".smCartMessage ul li button").click(function(){var n=a(this).parent("div").parent("li").index();a(this).parent("div").parent("li").remove(),i.splice(n,1),a(".smCartMessage>div p i").text(parseInt(a(".smCartMessage>div p i").text())-1),a(".specialCart>i").text(parseInt(a(".specialCart>i").text())-1),localStorage.setItem("cart",JSON.stringify(i))});var e=JSON.parse(localStorage.getItem("cart")).length;a(".specialCart>i").text(e)})});