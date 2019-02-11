const path = require('path');
const rootPath = path.resolve(__dirname,'../');
const srcPath = path.resolve(__dirname,'../src');
const baseconfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(baseconfig,{
    mode: 'production',
    devtool : 'source-map',
    output : {
        path : path.resolve(__dirname,'../build'),
        filename : 'dist/js/[name].min.[chunkhash:10].js',
        chunkFilename : 'dist/chunk/[name].min.[chunkhash:10].js',
        publicPath : '/'
    },
    module: {
        rules: [
            {
                include : srcPath,
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: true,
                        }
                    },
                    'sass-loader',
                    {
                        //  css3自动添加前缀
                        loader: "postcss-loader",
                        options: {
                            plugins: loader => [
                                require('autoprefixer')(),
                            ],
                        }
                    }
                ]
            },
        ]
    },
    // 提取出应用中公共(重复运用)的代码
    optimization: {
        minimizer :[
            //js文件压缩插件
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true , //生成sourceMap文件
            }),
            // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
            new OptimizeCSSPlugin({ cssProcessorOptions: { safe: true } }),
        ],
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
                },
                styles: {
                    name: 'styles',
                    test: /\.scss|css$/,
                    chunks: 'all',
                    enforce: true,
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        },
    },
    plugins : [
        new CleanWebpackPlugin(['build'],{root : rootPath}),
        //  从js文件中分离出独立的css文件
        new MiniCssExtractPlugin({
            filename: 'dist/css/[name].min.[chunkhash:10].css'
        }),
        // 压缩文件
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ]
});