'use strict'

const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: 'development',
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader','sass-loader']
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
    // 热更新
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    },
    // watch文件的变化
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        // 监听到变化后300ms后执行
        aggregateTimeout: 300,
        // 一秒钟检测1000次
        poll: 1000
    }
}