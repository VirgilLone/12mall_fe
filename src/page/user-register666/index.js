/*
* @Author: WYluo
* @Date:   2017-11-03 01:35:36
* @Last Modified by:   WYluo
* @Last Modified time: 2017-11-05 17:44:08
*/

'use strict';

require('./index.css');


require('page/common/nav-simple/index.js');

var _mm=require('util/12mall.js');

var _user   = require('service/user-service.js');


// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// 注册页逻辑部分
var page = {
    init: function(){
        this.bindEvent2();
    },
    bindEvent2 : function(){
        var _this = this;
        // 交互后台验证用户名
        $('#username').blur(function(){
            var username=$.trim($(this).val());
            if(!username){
                return ;
            }
            //异步验证
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });
        /*$('#password').blur(function(){_this.submit();});
        $('#password').blur(function(){_this.submit();});
        $('#password-confirm').blur(function(){_this.submit();});
        $('#phone').blur(function(){_this.submit();});
        $('#email').blur(function(){_this.submit();});
        $('#question').blur(function(){_this.submit();});
        $('#answer').blur(function(){_this.submit();});*/

        // 注册按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // keyCode == 13 表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        var formData = {
                username        : $.trim($('#username').val()),
                password        : $.trim($('#password').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
                phone           : $.trim($('#phone').val()),
                email           : $.trim($('#email').val()),
                question        : $.trim($('#question').val()),
                answer          : $.trim($('#answer').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 表单验证成功
        if(validateResult.status){
            _user.register(formData, function(res){
                window.location.href = './index.html?type=register';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        else{
            // 提示错误
            formError.show(validateResult.msg);
        }

    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空！';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空！';
            return result;
        }
        if(formData.password.length<6){
            result.msg = '密码太短！';
            return result;
        }
        if(formData.password!==formData.passwordConfirm){
            result.msg = '两次输入的密码不一致！';
            return result;
        }
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式错误！';
            return result;
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式错误！';
            return result;
        }
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空！';
            return result;
        }
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空！';
            return result;
        }


        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '非空验证通过~';
        return result;
    }
};


$(function(){
    page.init();
});
