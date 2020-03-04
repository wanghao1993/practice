## AMD、CMD、CommonJS、ES6 Module的区别

#### AMD一开始是commonJS规范中的一个草案，就是平常我们所说的requireJs

基本用法通过**define**来定义一个模块，然后**require**导入定义的模块

```js
// a.js
define(function () {
  return 1
})

// b.js

required(['a'], function(a) {
  console.log(a)
})
```

特点：依赖前置，提前执行，require中的js会一开始下载，然后并且执行

#### CMD是SeaJs对模块定义的规范

```js
// a.js
define(function (require, exports, module) {
  var & = require('jq')
  exports.setColor = function () {
    $('body').css('color', '#444')
  }
})

// b.js

seajs.use(['a'], function(a) {
  $('el').click(a.setColor);
})

特点：依赖就近，延迟执行，只有require时才执行
```

#### Commonjs

```js
// a.js
module.exports = funtion () {
  console.log('hello')
}
// b.js
var a = require('a')
```


##### es module

```js
// a.js
export defult function() {
  console.log(111)
}

// b.js

import xxx from './a'

xxx()
```
