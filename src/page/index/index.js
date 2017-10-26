/*
* @Author: WYluo
* @Date:   2017-10-25 00:27:19
* @Last Modified by:   WYluo
* @Last Modified time: 2017-10-27 00:45:24
*/

'use strict';

//$('body').html('script jquery loaded');
var $$= require('jquery');
$$('body').html('module jquery loaded');
console.log('hello index/index');



require('./index.css');//js加载css模块，但会导致css在js之后加载
require('../module.js');
