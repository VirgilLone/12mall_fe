/*
* @Author: WYluo
* @Date:   2017-10-31 02:16:10
* @Last Modified by:   WYluo
* @Last Modified time: 2018-03-04 15:46:21
*/

'use strict';

require('./index.css');


require('page/common/nav-simple/index.js');
var _mm=require('util/12mall.js');

$(function(){
    var type    =_mm.getUrlParam('type')||'default',
        $element=$('.'+type+'-success').show();
    if(type==='payment'){
        var orderNumber=_mm.getUrlParam('type'),
            $orderNumber=$element.find('.order-number');
        $orderNumber.attr('href',$orderNumber.attr('href')+orderNumber);
    }
    $element.show();
    
});