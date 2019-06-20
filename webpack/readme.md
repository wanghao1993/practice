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