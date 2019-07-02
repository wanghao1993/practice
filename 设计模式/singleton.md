#### 单例模式
提供将代码组织作为唯一的单元的手段，这个单元在任何一处出现都是同一个。
大概思路就是：创建一个类，判断如果有就返回实例，如果没有就新建一个返回
#### 优点
1.可以用来划分命名空间,排除重名和相互影响的可能性；
```js
var a = 1
var a = 2
这样子变量a很容易被篡改；

如果使用单利模式，可以达到命名空间的效果，例如：
var nameSpaceA = {
    a: 1
}
var nameSpaceB = {
    b: 1
}
这样子就不会被随便篡改和影响
```
2.能够使得代码可读性提高，易于维护；
3.可以被实例化，且只会实例化一次
```js
var instance = null

function Singleton (name) {
    this.name = name
    this.sayName = function () {
        console.log(this.name)
    }
}

function getSingleTon (name) {
    if (!instance) {
        instance = new Singleton(name)
        return instance
    }
    return instance
}
getSingleTon('xiaoming') === getSingleTon('xiaoming2')
true
```
因为返回的总是同一个，所以等于true也永远等于第一次实例化的哪个，后面是不能够再实例化的。

#### 缺点
1.不适用变化的对象；
2.降低了js的灵活度，因为js是弱类型的语言本身具备很强的灵活性；

#### 使用场景
例如登录