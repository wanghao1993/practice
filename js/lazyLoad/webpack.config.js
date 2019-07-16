const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: './lazyload.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vendor.js'
    },
    module: {
        rules: [{
            test: '/\.js$/',
            exclude: '/node_modules/',
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    watch: true,
    plugins: [
        new CleanWebpackPlugin()
       
    ]
}