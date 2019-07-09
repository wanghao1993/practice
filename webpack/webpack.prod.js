'use strict'

const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    // 输入目录和名称
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    // 解析规则
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                // style-loader 和 miniCssExtractPlugin.loader原则性冲突，所以用miniCssExtractPlugin替换掉
                use: [miniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [miniCssExtractPlugin.loader, 'css-loader','sass-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')
                        ]
                    }
                }, {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75, // 1rem = 75px;
                        remPrecesion: 8 // 小数点保留位数
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        // limit: 10240,
                        name: '[name][hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    stats: { children: false },
    plugins: [
        new miniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new optimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor:require('cssnano')
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src/search.html'),
            filename: 'search.html',
            chunks: ['search'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                // 压缩内联的css和js
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new CleanWebpackPlugin()
    ]
}