"use strict";require(["../../static/conf/config.js"],function(){require(["jquery","vali"],function(e){e(".regist_submit").click(function(){console.log(e(this)),e(".regist_phone input").validate({rules:{require:!0,minlength:11}})});var s=/^[1][3,4,5,7,8][0-9]{9}$/,i=/^\d{4}$/,t=/^[A-Za-z0-9\_\*\&\%\$\#]{6,20}$/,n=null,c=null,l=null,o=null,a=null,r=null,g=null,p=null;e(".regist_phone input").blur(function(){g=e(".regist_phone input").val().replace(/(^\s*)|(\s*$)/g,""),c=""==g?(e(this).css({borderColor:"#F64A4A"}),e(this).siblings(".faile").css({opacity:"1"}),e(this).siblings(".success").css({opacity:"0"}),e(this).siblings("p").text("手机号不能为空"),!1):s.test(g)?(e(this).siblings(".faile").css({opacity:"0"}),e(this).siblings(".success").css({opacity:"1"}),!0):(e(this).siblings("p").text("请输入正确的手机号码"),e(this).css({borderColor:"#F64A4A"}),e(this).siblings(".faile").css({opacity:"1"}),e(this).siblings(".success").css({opacity:"0"}),!1)}),e(".regist_phone input").focus(function(){e(this).siblings("p").text(""),e(this).css({borderColor:"#686666"}),e(this).siblings(".faile").css({opacity:"0"})}),e(".regist_code a").click(function(){var s=parseInt(10*Math.random()),i=parseInt(10*Math.random()),t=parseInt(10*Math.random()),c=parseInt(10*Math.random());n=parseInt("".concat(s).concat(i).concat(t).concat(c)),e(this).text(n)}),e(".regist_code input").blur(function(){var s=e(".regist_code input").val().replace(/(^\s*)|(\s*$)/g,"");i.test(s)||(e(this).siblings("p").text("请输入4位验证码"),e(this).css({borderColor:"#F64A4A"}),e(this).siblings(".faile").css({opacity:"1"}),e(this).siblings(".success").css({opacity:"0"}),l=!1),s!==n&&(e(this).siblings(".faile").css({opacity:"1"}),e(this).siblings(".success").css({opacity:"0"}),e(this).siblings("p").text("验证码错误"),l=!1),s==n&&(e(this).siblings(".faile").css({opacity:"0"}),e(this).siblings(".success").css({opacity:"1"}),e(this).siblings("p").text(""),l=!0)}),e(".regist_code input").focus(function(){e(this).siblings("p").text(""),e(this).css({borderColor:"#686666"}),e(this).siblings(".faile").css({opacity:"0"})}),e(".regist_password input").blur(function(){var s=0;""==(p=e(".regist_password input").val().replace(/(^\s*)|(\s*$)/g,""))&&(e(this).css({borderColor:"#F64A4A"}),e(this).siblings(".faile").css({opacity:"1"}),e(this).siblings(".success").css({opacity:"0"}),e(this).siblings(".faileTip").text("密码不能为空")),t.test(p)?(p.match(/[\d]+/g)&&(s+=1),p.match(/[a-zA-Z]+/g)&&(s+=1),p.match(/[\#\$\%\*]+/g)&&(s+=1),1==s&&(e(this).css({borderColor:"#F64A4A"}),e(this).siblings(".faile").css({opacity:"1"}),e(this).siblings(".success").css({opacity:"0"}),e(this).siblings(".faileTip").text("密码过于简单，有被盗风险，建议您更改为复杂密码"),o=!1),2==s&&(e(this).css({borderColor:"#686666"}),e(this).siblings(".faile").css({opacity:"0"}),e(this).siblings(".success").css({opacity:"1"}),e(this).siblings(".successTip").text("密码安全强度适中"),o=!0),2<s&&(e(this).css({borderColor:"#686666"}),e(this).siblings(".faile").css({opacity:"0"}),e(this).siblings(".success").css({opacity:"1"}),e(this).siblings(".successTip").text("你的密码很安全"),o=!0)):(e(this).css({borderColor:"#F64A4A"}),e(this).siblings(".faile").css({opacity:"1"}),e(this).siblings(".success").css({opacity:"0"}),e(this).siblings(".faileTip").text("请输入6-20位密码"),o=!1)}),e(".regist_password input").focus(function(){e(this).siblings("p").text(""),e(this).css({borderColor:"#686666"}),e(this).siblings(".faile").css({opacity:"0"})}),e(".regist_password_again input").blur(function(){var s=e(".regist_password_again input").val().replace(/(^\s*)|(\s*$)/g,"");""!=s&&null!=s||(e(this).css({borderColor:"#F64A4A"}),e(this).siblings(".faile").css({opacity:"1"}),e(this).siblings(".success").css({opacity:"0"}),e(this).siblings("p").text("请输入确认密码"),a=!1),a=s!==e(".regist_password input").val()?(e(this).css({borderColor:"#F64A4A"}),e(this).siblings(".faile").css({opacity:"1"}),e(this).siblings(".success").css({opacity:"0"}),e(this).siblings("p").text("两次输入的密码不一致，请重试"),!1):(e(this).siblings(".faile").css({opacity:"0"}),e(this).siblings(".success").css({opacity:"1"}),!0)}),e(".regist_password_again input").focus(function(){e(this).siblings("p").text(""),e(this).css({borderColor:"#686666"})}),e(".regist_submit").click(function(){if(!e(".regist_server input").is(":checked"))return alert("请勾选"),!1;r=!0;var s=JSON.parse(localStorage.getItem("userinfo")),i=[];for(var t in s)i.push(s[t]);1==c&&1==l&&1==o&&1==a&&1==r?(i.push({username:g,password:p}),localStorage.setItem("userinfo",JSON.stringify(i)),setTimeout(function(){alert("注册成功，即将为您跳转登录页面！ "),window.location="../login/login.html"})):alert("请按照提示正确填写注册信息")});var h=localStorage.getItem("logined");null!=h?e(".index_login a").hide().siblings("i").text("欢迎您"+h).siblings("span").show():e(".index_login span").hide(),e(".index_login span").click(function(){e(this).hide().siblings("a").show().siblings("i").text(""),localStorage.removeItem("logined")}),e(".index_search i").click(function(){e(this).hide().siblings("span").hide().siblings("div").css({display:"inline-block"})}),e(".index_search div label").click(function(){e(this).parent("div").css({display:"none"}).siblings("span").show().siblings("i").show()})})});