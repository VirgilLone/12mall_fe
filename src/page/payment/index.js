/*
* @Author: WYluo
* @Date:   2018-03-04 14:55:05
* @Last Modified by:   WYluo
* @Last Modified time: 2018-03-04 16:01:09
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/12mall.js');
var _payment        = require('service/payment-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    //分页参数
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadPaymentInfo();
    },
    
    //加载订单信息
    loadPaymentInfo : function(){
        var _this=this,
            paymentlHtml='',
            $pageWrap=$('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber,function(res){
            //渲染html
            paymentlHtml=_mm.renderHtml(templateIndex,res);
            $pageWrap.html(paymentlHtml);
            _this.listenOrderStatus();
        },function(errMsg){
            $pageWrap.html('<p class="err-tips">'+errMsg+'</p>');
        });
    },
    //二维码界面监听订单状态
    listenOrderStatus : function(){
        var _this=this;
        this.paymentTimer=window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber,function(res){
                if(res == true){
                    window.location.href
                    ='./result.html?type=payment&orderNumber='+_this.data.orderNumber;
                }
            });
        },5e3);
    },
    
    
};
$(function(){
    page.init();
});