/*
* @Author: WYluo
* @Date:   2017-10-31 02:16:10
* @Last Modified by:   WYluo
* @Last Modified time: 2017-11-02 23:13:55
*/

'use strict';

require('./index.css');


require('page/common/nav-simple/index.js');
var _mm=require('util/12mall.js');

$(function(){
    var type    =_mm.getUrlParam('type')||'default',
        $element=$('.'+type+'-success').show();
    $element.show();
    
});