/*
* @Author: WYluo
* @Date:   2017-10-28 14:31:58
* @Last Modified by:   WYluo
* @Last Modified time: 2018-01-04 17:15:38
*/

'use strict';

var conf={
    serverHost : ''
};

var Hogan=require('hogan');

var _mm={
    //封装网络请求
    request : function(param){
        var _this=this;//_mm对象
        $.ajax({
            type    : param.method || 'get', 
            url     : param.url    || '',
            dataType: param.type   ||'json',
            data    : param.data   || '',
            success : function(res){
                if(1===res.status){//请求成功
                    typeof param.success==='function' && param.success(res.data,res.msg)
                }
                else if(10===res.status){//需要登录
                    //_this.doLogin();
                }
                else if(0===res.status){//请求数据错误
                    typeof param.error==='function' && param.error(res.msg)
                }
            },
            error   : function(err){
                typeof param.error==='function' && param.error(err.statusText)
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost+path;
    },
    //根据参数名称获取url参数的值
    getUrlParam : function(name){
        var reg   =new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result=window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //用hogan渲染html
    renderHtml : function(htmlTemplate,data){
        var template=Hogan.compile(htmlTemplate),//编译模板
            result  =template.render(data);
        return result;
    },
    successTips : function(msg){
        alert(msg||'操作成功！');
    },
    errorTips : function(msg){
        alert(msg||'咦，哪儿不对了~~');
    },
    //表单字段的验证 支持非空、手机、邮箱等判断
    validate : function(value,type){
        var value=$.trim(value);
        //非空验证
        if('require'===type){
            return !!value;//强制转换为布尔类型，为空则为false
        }
        //手机验证
        if('phone'===type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email'===type){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }

    },
    //统一登陆跳转
    doLogin : function(){
        window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href='./index.html';
    }

};

module.exports=_mm;
