/*
订单确认页的收货地址部分js
* @Author: WYluo
* @Date:   2018-02-28 22:12:23
* @Last Modified by:   WYluo
* @Last Modified time: 2018-03-03 15:57:31
*/

'use strict';
var _mm                    = require('util/12mall.js');
var _address               = require('service/address-service.js');
var templateAddressModal   = require('./address-modal.string');//添加或修改新地址的弹框
var _cities                = require('util/cities/index.js');

var addressModal = {
    show : function(option){
        //option的绑定
        this.option=option;
        this.option.data=option.data||{};
        this.$modalWrap=$(".modal-wrap");
        //渲染地址页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    hide : function(){
        this.$modalWrap.empty();
    },
    loadModal : function(){
        var addressModalHtml=_mm.renderHtml(templateAddressModal,{
            isUpdate : this.option.isUpdate,
            data     : this.option.data
        });

        this.$modalWrap.html(addressModalHtml);
        //加载省市
        this.loadProvince();
        //this.loadCity();

    },
    loadProvince : function(){
        var provinces= _cities.getProvinces() || [];
        var $provinceSelect=this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));//加载出省份的所有option
        //若是更新地址切有省份信息，便做省份回填
        if(this.option.isUpdate&&this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCity(this.option.data.receiverProvince);
        }
    },
    loadCity : function(provinceName){
        var cities= _cities.getCities(provinceName) || [];
        var $citySelect=this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));//加载出市的所有option
        //若是更新地址切有城市信息，便做城市回填
        if(this.option.isUpdate&&this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    //得到select框选项数据
    getSelectOption : function(optionArray){
        var optionHtml='<option value="">请选择</option>';
        for(var i =0 ,length=optionArray.length;i<length;i++){
            optionHtml+='<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>';
        }
        return optionHtml;
    },
    bindEvent : function(){
        var _this=this;
        //省和市的二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectProvince=$(this).val();
            _this.loadCity(selectProvince);
        });
        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo=_this.getReceiverInfo(),
                isUpdate    =_this.option.isUpdate;//拿到添加新地址时传过来的isUpdate参数(index.js里)
            if(receiverInfo.status && !isUpdate){
                //验证通过且不是修改地址
                _address.saveAddress(receiverInfo.data,function(res){
                    _mm.successTips('地址添加成功~');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else if(receiverInfo.status && isUpdate){
                //此时为修改地址
                _address.updateAddress(receiverInfo.data,function(res){
                    _mm.successTips('地址修改成功~');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            //提交验证不通过
            else
                _mm.errorTips(receiverInfo.errMsg||'好像哪里不对了~');
        });
        //保证点击modal内容区的时候不关闭弹窗
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();//停止事件冒泡到别的节点
        });
        //关闭添加（修改）地址的弹窗
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        });
    },
    //获取收货地址表单信息
    getReceiverInfo : function(){
        var receiverInfo={},
            result      ={
                status : false
            };
        receiverInfo.receiverName    = $.trim($(this.$modalWrap).find('#receiver-name').val());
        receiverInfo.receiverProvince= $(this.$modalWrap).find('#receiver-province').val();
        receiverInfo.receiverCity    = $(this.$modalWrap).find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim($(this.$modalWrap).find('#receiver-address').val());
        receiverInfo.receiverPhone   = $.trim($(this.$modalWrap).find('#receiver-phone').val());
        receiverInfo.receiverZip     = $.trim($(this.$modalWrap).find('#receiver-zip').val());
        //拿到此收货地址的shippingid
        if(this.option.isUpdate){
            receiverInfo.id=this.$modalWrap.find('#receiver-id').val();
        }

        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名！';
        }else if(!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份！';
        }else if(!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市！';
        }else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入手贱人详细地址！';
        }else if(!receiverInfo.receiverPhone){
            result.errMsg = '请选择收件人手机号！';
        }
        else{
            result.status=true;
            result.data  =receiverInfo;
        }
        return result;
    }
};
module.exports=addressModal;
