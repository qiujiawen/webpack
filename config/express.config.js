/**
 *  1、安装express； npm install express
 *  2、安装webpack-dev-middleware、webpack-hot-middleware； npm install --save-dev                           webpack-dev-middleware webpack-hot-middleware
 */
const webpack = require('webpack');
const devConfig = require('./webpack.dev.config');
const express = require('express');
const app = express();
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
devConfig.entry.index.push("webpack-hot-middleware/client?reload=true");
let compiler = webpack(devConfig);
//  app.use -> 安装中间件
app.use(
    webpackDevMiddleware(compiler,{
        publicPath:devConfig.output.publicPath,  //webpack资源打包的出口
        logLevel:'warn'
    })
)
    .use(webpackHotMiddleware(compiler))
    .use(express.static(devConfig.output.path))  //是 Express 内置的唯一一个中间件,负责托管 Express 应用内的静态资源
    //该静态文件夹的相对路径
    .get('/',(reg,res) => res.sendFile('../dev/index.html'))
    .listen(9002,() =>{
       console.log('服务器启动成功'); 
    });
