#### Vue原理
1.Vue通过采用Obejct.defineProperty给对象设置get和set来劫持变化，从而触发订阅-发布者模式，触发watcher，从而改变虚拟dom，然后更新虚拟dom，最后渲染真实dom
2.
```js
var obj = {}
Object.defineProperty(obj, 'hello', {
    get: function() {
        console.log("get方法被调用了")
    },
    set: function() {
        console.log("set方法被调用了")
    }
})
```
3.Vue初始化（虚拟节点的产生和编译）

3.1Vue虚拟节点容器
```js
function nodeContainer(node, vm, flag) {
    var flag = flag || document.createDocumentFragment()
    var child
    while(child = node.firstChild) {
        compile(child, vm)
        flag.appendChild(child)
        if (flag.firstChild) {
            nodeContainer(child, vm, flag)
        }
    }
    return flag
}
```
遍历所有节点，塞到碎片容器中，直到没有节点了

3.2 Vue的节点初始化编译
先声明一个Vue对象

```js
function Vue(options) {
    this.data = options.data
    
    var id = options.el
    var dom = nodeContainer(document.getElementById(id), this);
    document.getElementById(id).appendChild(dom)
}
```

编译
```js
function compile(node, vm) {
   var res = /\{\{(.*)\}\}/g
   // node为元素
   if (node.nodeType === 1) {
       var attr = node.attributes
       for (var i = 0; i < attr.length; i++) {
           if (attr[i].nodeName === 'v-model') {
               var name = attr[i].nodeValue
               node.value = vm.data[name]
           }
       }
   }
   // node为文本
   if (node.nodeType === 3) {
       if (res.test(node.nodeValue)) {
           var name = RegExp.$1
           name = name.trim()
           node.nodeValue = vm.data[name];
       }
   }
}
```
响应式声明
```js
// data中的属性设置get和set
function define(obj, key, value) {
    var dep = new Dep()
    Object.defineProperty(obj, key, {
        get: function() {
            if(Dep.global){//这里是第一次new对象Watcher的时候，初始化数据的时候，往订阅者对象里面添加对象。第二次后，就不需要再添加了
                dep.add(Dep.global);
              }
            return value
        },
        set: function(newValue) {
            if(newValue === value){
                return;//如果值没变化，不用触发新值改变
            }
            value = newValue;//改变了值
            dep.notify();
            console.log("set了最新值"+value);
        }
    })
}
// 给data中属性设置get和set
function observe (obj,vm){
    Object.keys(obj).forEach(function(key){
      define(vm,key,obj[key]);
    })
}
```
订阅和发布者模式
```js
在这里给来监听属性的变化。并且触发订阅者去更新，从而触发Object.definepropty中的get方法。然后触发视图更新
// 发布者模式
function Dep() {
    this.subs = []
}
Dep.prototype = {
    add: function(sub) {
        this.subs.push(sub)
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update()
        })
    }
}
// 订阅者
function Watcher(vm, node, name) {
    Dep.global = this
    this.name = name
    this.node = node
    this.vm = vm
    this.update()
    Dep.global = null
}
Watcher.prototype.update = function() {
    this.get()
    switch (this.node.nodeType) {
        case 1:
            this.node.value = this.value;
            break;
        case 3:
            this.node.nodeValue = this.value
            break
        default: break;
    }
}
Watcher.prototype.get = function() {
    this.value = this.vm[this.name]
}
```
最终完整代码见同目录下的Vue.js

npm install

npm run build