/*
* @Author: WYluo
* @Date:   2017-11-05 01:41:22
* @Last Modified by:   WYluo
* @Last Modified time: 2017-11-05 22:08:07
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

// 找回密码页逻辑部分
var page = {

    data:{
        username:'',
        question:'',
        answer  :'',
        token   :'',
    },

    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStep1();
    },
    bindEvent : function(){
        var _this = this;
        // 输入用户名后的下一步
        $('#submit-username').click(function(){
            var username=$.trim($('#username').val());
            if(username){
                _user.getQuestion(username,function(res){
                    //提交时把页面上的username和返回的res(question)存
                    //到page的data对象里供第二部调用
                    _this.data.username=username;
                    _this.data.question=res;
                    _this.loadStep2();//调用第二步
                },function(erroMsg){
                    formError.show(erroMsg);
                });
            }
            else{
                formError.show('请输入用户名！');
            }
        });
        // 输入密码提示问题答案后的下一步
        $('#submit-question').click(function(){
            var answer=$.trim($('#answer').val());
            if(answer){
                _user.checkAnswer({
                    username:_this.data.username,
                    question:_this.data.question,//在第一步data拿到这这两个数据
                    answer  :answer
                },function(res){
                    _this.data.username=username;
                    _this.data.token=res;
                    _this.loadStep3();//调用第三步
                },function(erroMsg){
                    formError.show(erroMsg);
                });
            }
            else{
                formError.show('请输入问题答案！');
            }
        });
        // 输入新密码后的下一步
        $('#submit-password').click(function(){
            var password=$.trim($('#password').val());
            if(password && password.length>6){
                _user.resetPassword({
                    username    :_this.data.username,
                    pwdNew      :password,
                    forgetToken :_this.data.token
                },function(res){
                    window.location.href='./result.html?type=pass-reset';
                },function(erroMsg){
                    formError.show(erroMsg);
                });
            }
            else{
                formError.show('请输入正确的新密码！');
            }
        });
        
    },
    //加载输入用户名的一步
    loadStep1 : function(){
        $('.step-username').show();
    },
    loadStep2 : function(){
        formError.hide();
        $('.step-username').hide()
        .siblings('.step-question').show()
        .find('.question').text(this.data.question);

    },
    loadStep3 : function(){
        formError.hide();
        $('.step-question').hide()
        .siblings('.step-password').show();
    }
    
};


$(function(){
    page.init();
});
