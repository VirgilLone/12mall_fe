/*
* @Author: WYluo
* @Date:   2018-03-04 15:18:01
* @Last Modified by:   WYluo
* @Last Modified time: 2018-03-04 15:32:26
*/

'use strict';

var _mm = require('util/12mall.js');

var _payment = {
    //拿到支付二维码
    getPaymentInfo : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    //监听订单状态
    getPaymentStatus : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _payment;