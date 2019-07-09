## webpack基础
### entry
入口，可以设置多入口和单入口
```js
entry: {
    index: './src/index.js',
    search: './src/search.js'
},
entry:  './src/index.js',
```
### output
出口，打包后文件位置
```js
output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
}
```

### 常用的loader
1.babel-loader 转换es6语法
2.css-loader 解析css
3.less-loader把less转换成css
4.ts-loader ts=》js
5.file-loader 图片，字体等的打包
6.raw-loader 将文件以字符串的形式导入
7.thread-loader 多进程打包js和css

### 常见plugin
作用，用于bunldle文件的优化。资源管理和环境变量注入，作用于整个构建过程
1.Commonschunkplugin 将chunks相同的模块代码提取公共js
2.cleanWebpackplugin 清理构建目录
3.extracttextwebpackplugin 将css从bundle文件里面提取成一个独立的css文件
4.copyWebpackPlugin 将文件或者文件夹拷贝到构建的输出目录
5.htmlwebpackPlugin 创建html文件去承载输出的bundle
6.uglifyjswebpackplugin 压缩js
7.zipwebpackplugin 将打包的资源生生一个zip包
 
 ### mode
 有三个值 'production', 'development', 'none'
 开启不同模式的时候会默认开启不同的插件
 如图：
 ![区别](https://github.com/wanghao1993/practice/blob/master/webpack/1560840621214.jpg)

### mudule
rules 中存在各种loader
babel-loader负责解析es6，css-loader解析css url-loader解析字体和图片等，还有sass-loader解析sass

### 文件监听
webpack开启监听的方式有两种：
    1.启动的时候加上--watch
    2.config中设置watch：true
```js
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        // 监听到变化后300ms后执行
        aggregateTimeout: 300,
        // 一秒钟检测1000次
        poll: 1000
    }
```
### 热更新
1.安装webpack-dev-server;
2.在package.json 中配置 npm script
```js
"dev": "webpack-dev-server --open"
```
3.webpack.config.js中设置devserver
```js
plugins: [
    new webpack.HotModuleReplacementPlugin()
],
devServer: {
    contentBase: './dist',
    hot: true
},
webpack.HotModuleReplacementPlugin当设置hot 为true的时候会自动加入
```

### 文件指纹
作用：项目发布时，为了解决缓存，需要进行md5签名，这时候就需要用到 hash 和 chunkhash等。
hash：和整个项目,只有项目文件修改就会改变；
chunkhash：和webpack打包的chunk有关，不同的entry会生成不同的chunkhash；
contenthash: 根据文件内容来定义hash，文件内容不变，这contenthash不变；
注意：这里需要注意的是，不能随便使用；否则可能会导致不更新的问题；js用chunkhash，css用contenthash
```js
output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
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
},
plugins: [
    new miniCssExtractPlugin({
        filename: '[name]_[contenthash:8].css'
    })
]
```

### 文件压缩
1.css压缩
```css
new optimizeCssAssetsWebpackPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor:require('cssnano')
})
需要安装optimizeCssAssetsWebpackPlugin和cssnano插件
```
2.js 
webpack4默认开启
3.html压缩
```js
new htmlWebpackPlugin({
    template: path.join(__dirname, 'src/search.html'),
    filename: 'search.html',
    chunks: ['search'],
    inject: true,
    minify: {
        html5: true,
        // 去掉空格
        collapseWhitespace: true,
        preserveLineBreaks: false,
        // 压缩内联的css和js
        minifyCSS: true,
        minifyJS: true,
        // 移除注释
        removeComments: false
    }
})
```
## webpack进阶用法
### 自动清理构建目标产物
1.通过npm script 清理 "rm -rm ./dist && webpack"
        
    打包前先清空dist
2.通过clean-webpack-plugin，具体参数请看[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

### postcss插件autoprefixer自动补齐css3前缀
1.安装postcss-loader和autoprefixer插件
2.在package.json中配置'browserslist'或者创建'.browserslistrc'也是可以的
```js
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
```
3.在webpack.prod.js中配置
```js
{
    test: /\.scss$/,
    use: [miniCssExtractPlugin.loader, 'css-loader','sass-loader', {
        loader: 'postcss-loader',
        options: {
            plugins: () => [
                require('autoprefixer')
            ]
        }
    }]
}
```
[postcss相关配置项](https://www.npmjs.com/package/postcss-loader#plugins)

### 移动端css px转rem
这里需要解决px2rem-loader里计算，还需要动态计算页面根元素的font-size的大小
1.npm i px2rem-loader -D  
2.npm i lib-flexible -S  
3.webpack中配置如下
```js
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
}
```
4.html 文件中引入lib-flexible.js
```js
<script src="../node_modules/lib-flexible/flexible.js"></script>
```
这里需要放在头部，因为需要一开始就计算好根元素的font-size

5.如果不希望转换的话在后面加上 /* no */的注释
