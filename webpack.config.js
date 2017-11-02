/*
* @Author: WYluo
* @Date:   2017-10-26 23:13:41
* @Last Modified by:   WYluo
* @Last Modified time: 2017-10-31 02:22:42
*/
 const path = require('path');

 //单独处理css的插件
 var ExtractTextPlugin = require("extract-text-webpack-plugin");
 //处理html模板的插件
 var HtmlWebpackPlugin = require('html-webpack-plugin');

 // nodejs环境变量配置，dev 、 online
 var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev_win';

 // 获取html-webpack-plugin参数的方法 
 var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};

// webpack config
 var webpack=require('webpack');
 var config = {
     //entry: './src/page/index/index.js',
     entry: {
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js'],
        'result':['./src/page/result/index.js'],
     },
     output: {
         path: path.resolve(__dirname, 'dist'),
         publicPath : '/dist',//访问文件时的路径
         filename: 'js/[name].js'
     },
     externals:{
        'jquery':'window.jQuery'
     },
     module: {
        loaders: [
            //css loader放到js里加载，但会导致css在js之后加载
            //{ test: /\.css$/, loader: "style-loader!css-loader" }
            //用ExtractTextPlugin插件把css单独打包
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            //url-loader处理加载图片文件、字体文件
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader' }
        ]
    },
     resolve : {
        alias : {
            util    : __dirname + '/src/util',
            image   : __dirname + '/src/image',
            page    : __dirname + '/src/page',
            service : __dirname + '/src/service',
            node_modules:__dirname + '/node_modules'
        }
     },
     plugins:[
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name    :'common',//加载全局模块
            filename:'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        /*new HtmlWebpackPlugin({
            template    :'./src/view/index.html',
            filename    :'view/index.html',    //目标文件的位置,dist目录下
            inject      :true,
            hash        :true,
            chunks      :['common','index','login'],//加载这三个entry里对应的文件
        }),*/
        //优化HtmlWebpackPlugin
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
     ]

 };

 if('dev_win'===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 }

 module.exports=config;