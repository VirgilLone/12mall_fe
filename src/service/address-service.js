/*
* @Author: WYluo
* @Date:   2018-02-15 00:53:30
* @Last Modified by:   WYluo
* @Last Modified time: 2018-03-03 16:05:44
*/

'use strict';
var _mm = require('util/12mall.js');

var _address = {
    // 获取地址列表
    getAddressList : function( resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    //添加新地址
    saveAddress : function(receiverInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : receiverInfo,
            success : resolve,
            error   : reject
        });
    },
    //修改地址信息
    updateAddress : function(receiverInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : receiverInfo,
            success : resolve,
            error   : reject
        });
    },
    //删除地址信息
    deleteAddress : function(shippingId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/delete.do'),
            data    : {
                shippingId :shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    //获取单条收件人信息
    getAddress : function(shippingId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId :shippingId
            },
            success : resolve,
            error   : reject
        });
    }
    
}
module.exports = _address;