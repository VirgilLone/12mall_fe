/*
* @Author: WYluo
* @Date:   2017-10-30 01:12:52
* @Last Modified by:   WYluo
* @Last Modified time: 2018-02-28 16:42:57
*/

'use strict';
require('./index.css');
var _mm     = require('util/12mall.js');
var _user   = require('service/user-service.js');
var _cart   = require('service/cart-service.js');
// 导航
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // 登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        /*_user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.in-login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            $('.user.not-login').show().siblings('.user.in-login').hide();
        });*/
        //此处和加载购物车数量的逻辑不用12mall.js里封装的网络请求，避免不登录的情况下总是跳转登录页
        $.ajax({
            type    : 'POST', 
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            dataType: 'json',
            //data    : '',
            success : function(res){
                if(1===res.status){
                    $('.user.not-login').hide().siblings('.user.in-login').show()
                .find('.username').text(res.data.username);
                }
                else {//未登录或者其他情况下
                    $('.user.not-login').show().siblings('.user.in-login').hide();
                }
            },
            error   : function(erro){
                $('.user.not-login').show().siblings('.user.in-login').hide();
            }
        });
    },
    // 加载购物车数量
    loadCartCount : function(){
        /*_cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg){
            $('.nav .cart-count').text(0);
        });*/
        $.ajax({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            //data    : '',
            success : function(res){
                if(1===res.status){
                   $('.nav .cart-count').text(res.data || 0);
                }
                else {//未登录或者其他情况下
                   $('.nav .cart-count').text(0);
                }
            },
            error   : function(erro){
                $('.nav .cart-count').text(0);
            }
        });
    }
};

module.exports = nav.init();