require(["../../static/conf/config.js"],function(){
    require(["jquery","vali"],function($){
        $(".regist_submit").click(function(){
            console.log($(this))
            $(".regist_phone input").validate({
                rules : {
                    require : true,
                    minlength : 11
                }
            })
        })

        var telReg =/^[1][3,4,5,7,8][0-9]{9}$/;
    var codeReg=/^\d{4}$/;
    var passwordReg=/^[A-Za-z0-9\_\*\&\%\$\#]{6,20}$/;
    var randomCode= null;
    var status1=null;
    var status2=null;
    var status3=null;
    var status4=null;
    var status5=null;
    var telValue=null;
    var passwordValue=null;
    // 手机号验证
    $(".regist_phone input").blur(function(){
        telValue=$(".regist_phone input").val().replace(/(^\s*)|(\s*$)/g, '');
        if(telValue==""){
            $(this).css({
                borderColor : "#F64A4A"
            });
            $(this).siblings(".faile").css({
                opacity : "1"
            })
            $(this).siblings(".success").css({
            opacity : "0"
            })
            $(this).siblings("p").text("手机号不能为空");
            status1=false;
        }
        else if(!telReg.test(telValue)){
            $(this).siblings("p").text("请输入正确的手机号码");
            $(this).css({
                borderColor : "#F64A4A"
            })
            $(this).siblings(".faile").css({
                opacity : "1"
            })
            $(this).siblings(".success").css({
            opacity : "0"
            })
            status1=false;
        }
        else{
            $(this).siblings(".faile").css({
                opacity : "0"
            });
            $(this).siblings(".success").css({
            opacity : "1"
            })
            status1 = true;
        }
    })
    $(".regist_phone input").focus(function(){
        $(this).siblings("p").text("");
        $(this).css({
                borderColor : "#686666"
            });
        $(this).siblings(".faile").css({
        opacity : "0"
        })
    })
    // 手机验证码验证
    $(".regist_code a").click(function(){
        var random1=parseInt(Math.random()*10);
        var random2=parseInt(Math.random()*10);
        var random3=parseInt(Math.random()*10);
        var random4=parseInt(Math.random()*10);
        randomCode=parseInt(`${random1}${random2}${random3}${random4}`);//四位随机验证码
        $(this).text(randomCode)
    })
    $(".regist_code input").blur(function(){
        var codeValue=$(".regist_code input").val().replace(/(^\s*)|(\s*$)/g, '');
        if(!codeReg.test(codeValue)){
            $(this).siblings("p").text("请输入4位验证码");
            $(this).css({
                borderColor : "#F64A4A"
            });
            $(this).siblings(".faile").css({
            opacity : "1"
            });
            $(this).siblings(".success").css({
            opacity : "0"
            })
            status2=false;
        }
        if(codeValue !== randomCode){
            $(this).siblings(".faile").css({
            opacity : "1"
            });
            $(this).siblings(".success").css({
            opacity : "0"
            })
            $(this).siblings("p").text("验证码错误");
            status2=false;
        }
        if(codeValue == randomCode){
            $(this).siblings(".faile").css({
            opacity : "0"
            });
            $(this).siblings(".success").css({
            opacity : "1"
            });
            $(this).siblings("p").text("")
            status2=true;
        }
    })
    $(".regist_code input").focus(function(){
        $(this).siblings("p").text("");
        $(this).css({
                borderColor : "#686666"
            });
        $(this).siblings(".faile").css({
        opacity : "0"
        });
    })
    // 密码验证
    $(".regist_password input").blur(function(){
        passwordValue=$(".regist_password input").val().replace(/(^\s*)|(\s*$)/g, '');
        var strength=0;
        if(passwordValue==""){
            $(this).css({
                borderColor : "#F64A4A"
            })
            $(this).siblings(".faile").css({
            opacity : "1"
            });
            $(this).siblings(".success").css({
            opacity : "0"
            })
            $(this).siblings(".faileTip").text("密码不能为空")
        }
        if(!passwordReg.test(passwordValue)){
            $(this).css({
                borderColor : "#F64A4A"
            })
            $(this).siblings(".faile").css({
            opacity : "1"
            });
            $(this).siblings(".success").css({
            opacity : "0"
            })
            $(this).siblings(".faileTip").text("请输入6-20位密码");
            status3=false;
        }
        else {
            if(passwordValue.match(/[\d]+/g)){
            strength=strength+1;
            }
            if(passwordValue.match(/[a-zA-Z]+/g)){
            strength=strength+1;
            }
            if(passwordValue.match(/[\#\$\%\*]+/g)){
            strength=strength+1;
            }
            if(strength == 1){
                $(this).css({
                    borderColor : "#F64A4A"
                })
                $(this).siblings(".faile").css({
                opacity : "1"
                });
                $(this).siblings(".success").css({
                opacity : "0"
                })
                $(this).siblings(".faileTip").text("密码过于简单，有被盗风险，建议您更改为复杂密码");
                status3=false;
            }
            if(strength == 2){
                $(this).css({
                    borderColor : "#686666"
                })
                $(this).siblings(".faile").css({
                opacity : "0"
                });
                $(this).siblings(".success").css({
                opacity : "1"
                })
                $(this).siblings(".successTip").text("密码安全强度适中");
                status3=true;
            }
            if(strength>2){
                $(this).css({
                    borderColor : "#686666"
                })
                $(this).siblings(".faile").css({
                opacity : "0"
                });
                $(this).siblings(".success").css({
                opacity : "1"
                })
                $(this).siblings(".successTip").text("你的密码很安全");
                status3=true;
            }
        }
    })
    $(".regist_password input").focus(function(){
        $(this).siblings("p").text("");
        $(this).css({
                borderColor : "#686666"
            });
        $(this).siblings(".faile").css({
        opacity : "0"
        });
    })
    // 再次输入密码
    $(".regist_password_again input").blur(function(){
        var password2Value=$(".regist_password_again input").val().replace(/(^\s*)|(\s*$)/g, '');
        if(password2Value == "" || password2Value == undefined){
            $(this).css({
                borderColor : "#F64A4A"
            });
            $(this).siblings(".faile").css({
                opacity : "1"
            });
            $(this).siblings(".success").css({
                opacity : "0"
            });
            $(this).siblings("p").text("请输入确认密码");
            status4=false;
        }
        if(password2Value !== $(".regist_password input").val()){
            $(this).css({
                borderColor : "#F64A4A"
            });
            $(this).siblings(".faile").css({
                opacity : "1"
            });
            $(this).siblings(".success").css({
                opacity : "0"
            });
            $(this).siblings("p").text("两次输入的密码不一致，请重试");
            status4=false;
        }
        else{
            $(this).siblings(".faile").css({
            opacity : "0"
            });
            $(this).siblings(".success").css({
            opacity : "1"
            })
            status4=true;
        }
    })
    $(".regist_password_again input").focus(function(){
        $(this).siblings("p").text("");
        $(this).css({
                borderColor : "#686666"
            })
    })

    // var _message={};
    // $(".regist_submit").click(function(){
    //     if(status1==true && status2==true && status3==true && status4==true){
    //         _message={
    //             "name" : telValue,
    //             "password" : passwordValue
    //         }
    //         document.cookie=" name = " + telValue ;
    //         document.cookie=" password = " + passwordValue ;
    //     }
    // })
    $(".regist_submit").click(function(){
        if($(".regist_server input").is(":checked")) {
           status5=true;
        }
        else{
            alert("请勾选");
            return false;
        };
        var jsonData = JSON.parse(localStorage.getItem('userinfo'));
           var arr = []
        for (var i in jsonData) {
            arr.push(jsonData[i]); //属性
        }
        if(status1==true && status2==true && status3==true && status4==true && status5==true){
            arr.push({
				username : telValue,
				password :passwordValue,
            })
            localStorage.setItem('userinfo',JSON.stringify(arr));
            setTimeout(function(){
                alert("注册成功，即将为您跳转登录页面！ ")
                window.location="../login/login.html"
            })
        }
        else{
            alert("请按照提示正确填写注册信息");
        }
    })

    //   设置登录欢迎信息
    var loginUser = localStorage.getItem("logined")
    if(loginUser != null){
        $(".index_login a").hide()
        .siblings("i").text("欢迎您"+loginUser)
        .siblings("span").show();
    }
    else{
        $(".index_login span").hide();
    }
    // 退出登录
    $(".index_login span").click(function(){
        $(this).hide().siblings("a").show()
        .siblings("i").text("");
        localStorage.removeItem("logined");

    })
    $(".index_search i").click(function(){
        $(this).hide()
        .siblings("span").hide()
        .siblings("div").css({
            display : "inline-block"
        })
    })
    $(".index_search div label").click(function(){
        $(this).parent("div").css({
            display : "none"
        })
        .siblings("span").show()
        .siblings("i").show()
    })
        
    })
})