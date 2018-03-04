/*
* @Author: WYluo
* @Date:   2018-02-14 22:16:31
* @Last Modified by:   WYluo
* @Last Modified time: 2018-03-03 16:38:27
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm                    = require('util/12mall.js');
var _order                 = require('service/order-service.js');
var _address               = require('service/address-service.js');
var templateAddress        = require('./address-list.string');
var templateOrderProduct   = require('./orderproduct-list.string');
var addressModal   = require('./address-modal.js');//添加或修改新地址的弹框js

var page = {
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadOrderProductList();
    },
    bindEvent : function(){
        var _this = this;
        // 地址的选择
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            //点击时拿到后台传到页面的shipping
            _this.data.selectedAddressId=$(this).data('shippingid');
        });
        // 订单的提交
        $(document).on('click', '.order-submit', function(){
            var shippingId=_this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId:shippingId
                },function(res){
                    window.location.href='./payment.html?orderNumber='+res.orderNo;
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips('请选择收获地址再提交噢~');
            }
        });
        //添加新地址
        $(document).on('click', '.address-new', function(e){
            e.stopPropagation();
            addressModal.show({
                isUpdate : false,//传过去一个isUpdate参数，代表不是update情况
                onSuccess:function(){
                    _this.loadAddressList();//添加成功 回调重新加载地址信息
                }
            });
        });
        //编辑地址
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId=$(this).parents('.address-item').data('shippingid');
            _address.getAddress(shippingId,function(res){
                addressModal.show({
                isUpdate : true,//传过去一个isUpdate参数，代表是update情况
                data     : res,
                onSuccess:function(){
                    _this.loadAddressList();//修改成功 回调重新加载地址信息
                }
                });
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
        //删除一个地址
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var id=$(this).parents('.address-item').data('shippingid');
            if(window.confirm('确定要删除该地址吗？')){
                _address.deleteAddress(id,function(){
                    _this.loadAddressList();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
        
    },
    // 加载地址列表
    loadAddressList : function(){
        var _this       = this;
        $('.address-con').html('<div class="loading"></div>');
        // 获取地址
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml=_mm.renderHtml(templateAddress,res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试~</p>');
            //_this.showCartError();
        })
    },
    //重新加载地址列表时记住选中状态
    addressFilter :function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag=false;//该地址id是否有用
            for(var i=0,length=data.list.length;i<length;i++){
                if(data.list[i].id===this.data.selectedAddressId){
                    //如果地址列表里的地址和选中的地址相同
                    data.list[i].isActive=true;
                    selectedAddressIdFlag=true;
                }
            }
            if(!selectedAddressIdFlag){
                //说明原来选择的地址无效了
                this.data.selectedAddressId=null;
            }
        }
    },
    // 加载订单商品清单
    loadOrderProductList : function(){
        var _this       = this;
        $('.product-con').html('<div class="loading"></div>');
        // 获取订单商品列表
        _order.getOrderProductList(function(res){
            var orderProductHtml=_mm.renderHtml(templateOrderProduct,res);
            $('.product-con').html(orderProductHtml);
        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">订单商品信息加载失败，请刷新后重试~</p>');
            //_this.showCartError();
        })
    },
    // 显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
};
$(function(){
    page.init();
})