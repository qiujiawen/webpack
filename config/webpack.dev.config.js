const path = require('path');
const rootPath = path.resolve(__dirname,'../');
const srcPath = path.resolve(__dirname,'../src');
const baseconfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(baseconfig,{
    mode : 'development',
    entry:{index:[]}, // 方便配置服务器时增加字段
    devtool : "cheap-module-eval-source-map",
    output : {
        path : path.resolve(__dirname,'../dev'),
        filename : 'dist/js/[name].js',
        publicPath : '/'
    },
    module:{
        rules : [
            {
                include : srcPath,
                test: /\.(sass|scss|css)$/,
                use: [{
                    loader: "style-loader"

                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            },
        ]
    },
    plugins : [
        //  热替换，在webpack内带的插件，不用安装直接用就可以，在plugins添加一项
        new webpack.HotModuleReplacementPlugin(),

        //  打开浏览器
        new OpenBrowserPlugin({
            url: 'http:localhost:9002'
        }),

        //  错误重启
        new webpack.NoEmitOnErrorsPlugin(),

        new CleanWebpackPlugin(['dev'],{root : rootPath}),
    ],
    optimization: {
        splitChunks: {
            cacheGroups:{
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true,
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    // devServer: {
    //     contentBase: path.resolve(__dirname,'../dev'),
    //     compress: true,
    //     port: 9002
    // }
});



