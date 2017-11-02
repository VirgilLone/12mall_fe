/*
* @Author: WYluo
* @Date:   2017-10-31 00:44:36
* @Last Modified by:   WYluo
* @Last Modified time: 2017-10-31 01:58:50
*/

'use strict';
require('./index.css');
var _mm             = require('util/12mall.js');
var templateIndex   = require('./index.string');

// 侧边导航
var navSide = {
    option : {
        name : '',
        navSideList : [
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'order-list',desc:'我的订单',href:'./order-list.html'},
            {name:'update-pass',desc:'修改密码',href:'./update-pass.html'},
            {name:'about',desc:'关于yier街',href:'./about.html'}
        ]
    },
    init : function(option){
        // 合并选项
        $.extend(this.option,option);
        this.renderNav();//渲染导航菜单
    },
    // 渲染导航菜单
    renderNav : function(){
        // 对navSideList遍历是否存在传来的name，需要追加active属性
        for(var i = 0, iLength = this.option.navSideList.length; i < iLength; i++){
            if(this.option.navSideList[i].name === this.option.name){
                this.option.navSideList[i].isActive = true;
            }
        };
        // 渲染list数据
        var navHtml= _mm.renderHtml(templateIndex,{
            navSideList : this.option.navSideList
        });
        // 把html放入容器
        $('.nav-side').html(navHtml);
    },
    
};

module.exports = navSide;