/*
* @Author: WYluo
* @Date:   2018-03-04 13:03:03
* @Last Modified by:   WYluo
* @Last Modified time: 2018-03-04 16:33:32
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/12mall.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    //分页参数
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        //加载detail数据
        this.loadDetail();
        
    },
    bindEvent : function(){
        var _this=this;
        $(document).on('click','.order-cancel',function(){
            if(window.confirm('确认要取消订单吗？')){
                _order.cancelOrder(_this.data.orderNumber,function(){
                _mm.successTips('该订单取消成功！');
            _this.loadDetail();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
            }
            
        });
    },
    //加载订单信息
    loadDetail : function(){
        var _this=this,
            orderDetailHtml='',
            $content=$('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber,function(res){
            _this.dataFilter(res);
            orderDetailHtml=_mm.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function(errMsg){
            $content.html('<p class="err-tips">'+errMsg+'</p>');
        });
    },
    dataFilter : function(data){
        data.needPay      = data.status==10;//10为未支付
        data.isCancelable = data.status==10;
    },
    
};
$(function(){
    page.init();
});