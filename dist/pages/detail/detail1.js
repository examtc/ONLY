"use strict";require(["../../static/conf/config.js"],function(){require(["jquery","sw"],function(i,n){var s=localStorage.getItem("logined");null!=s?i(".index_login a").hide().siblings("i").text("欢迎您"+s).siblings("span").show():i(".index_login span").hide(),i(".index_login span").click(function(){i(this).hide().siblings("a").show().siblings("i").text(""),localStorage.removeItem("logined")}),i(".index_search i").click(function(){i(this).hide().siblings("span").hide().siblings("div").css({display:"inline-block"})}),i(".index_search div label").click(function(){i(this).parent("div").css({display:"none"}).siblings("span").show().siblings("i").show()})})});