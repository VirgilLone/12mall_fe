/*
* @Author: WYluo
* @Date:   2017-10-25 00:27:19
* @Last Modified by:   WYluo
* @Last Modified time: 2017-12-02 17:57:55
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');

require('page/common/header/index.js');
require('util/slider/index.js');
var templateBanner=require("./banner.string");

var _mm=require('util/12mall.js');

/*初始化unslider轮播*/
$(function() {
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var $slider=$('.banner').unslider({
        speed: 500,               //  The speed to animate each slide (in milliseconds)
        delay: 4000,              //  The delay between slide animations (in milliseconds)
        complete: function() {},  //  A function that gets called after every slide animation
        //keys: true,               //  Enable keyboard (left, right) arrow shortcuts
        dots: true,               //  Display dot navigation
        //fluid: false              //  Support responsive design. May break non-responsive designs

    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });

});


var navSide=require('page/common/nav-side/index.js');
navSide.init({
    name:'user-center'
});