/*
* @Author: WYluo
* @Date:   2018-03-03 16:42:17
* @Last Modified by:   WYluo
* @Last Modified time: 2018-03-03 22:30:57
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/12mall.js');
var _order          = require('service/order-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    //分页参数
    data : {
        listParam : {
            pageNum         : 1,
            pageSize        : 2
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        
    },
    //加载订单列表
    loadOrderList : function(){
        var _this=this,
            orderListHtml='',
            $listCon=$('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam,function(res){
            orderListHtml=_mm.renderHtml(templateIndex,res);
            $listCon.html(orderListHtml);
            //加载分页信息
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });

        },function(errMsg){
            $listCon.html('<p class="err-tips">加载订单失败，请刷新重试~</p>');
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
    
};
$(function(){
    page.init();
});