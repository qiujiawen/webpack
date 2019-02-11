
//  webpack基础配置

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry : {
        index : [path.resolve(__dirname,'../src/page/index.js')],
        vendor : ["react", "react-dom", "prop-types", "react-router-dom",]
    },
    output : {},
    module: {
            rules: [
                {
                    //配置js结尾的文件的规则
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['env', "react", "stage-2"]
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    //配置图片的规则
                    test: /\.(jpg|png|jpeg|gif)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8012,
                                name: "dist/img/[name].[ext]",
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    //配置字体图标的规则
                    test: /\.(ttf|eot|woff|woff2|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "dist/fonts/[name].[ext]",
                            }
                        }
                    ],
                    exclude: /node_modules/
                }, {
                    //配置视频、音频的规则
                    test: /\.(wav|mp3|ogg|mpeg4|webm)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "dist/media/[name].[ext]",
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
            ]
        },
    plugins : [
        new HtmlWebpackPlugin({
            title : "my app",
            template:  path.resolve(__dirname, "../src/index.html"),
            filename: "index.html",
            hash: true
        }),

        // 自动加载模块
        new webpack.ProvidePlugin({
            React: "React",
            ReactDOM: "ReactDom",
            PropTypes: "PropTypes",
            ReactRouterDom: "ReactRouterDOM",
        })
    ],
    resolve: {
        //  配置别名，方便引入模块
        alias: {
            React: "react",
            ReactDom: "react-dom",
            PropTypes: "prop-types",
            ReactRouterDOM: "react-router-dom",
        },

        // 能够在文件引入模块时不带扩展
        extensions: [".js", ".jsx", ".css", ".json"],

        // 告诉 webpack 解析模块时应该搜索的目录
        modules: [
            "node_modules",
            path.resolve(__dirname,'../src')
        ]
    }
};




