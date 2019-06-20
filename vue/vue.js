// 构造虚拟dom的容器
function nodeContainer(node, vm, flag) {
    console.log(node)
    var flag = flag || document.createDocumentFragment()
    var child
    // 遍历节点
    while(child = node.firstChild) {
        compile(child, vm)
        flag.appendChild(child)
        if (flag.firstChild) {
            nodeContainer(child, vm, flag)
        }
    }
    return flag
}
// 构造函数
function Vue(options) {
    this.data = options.data
    observe(this.data, this)
    var id = options.el
    console.log(id, document.getElementById(id))
    var dom = nodeContainer(document.getElementById(id), this);
    document.getElementById(id).appendChild(dom)
}
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

// 编译v-model和模板语法
function compile(node, vm) {
    var res = /\{\{(.*)\}\}/g
    // node为元素
    if (node.nodeType === 1) {
        var attr = node.attributes
        for (var i = 0; i < attr.length; i++) {
            if (attr[i].nodeName === 'v-model') {
                var name = attr[i].nodeValue
                new Watcher(vm,node,name)
                node.addEventListener('input',function(e){
                    vm[name] = e.target.value
                })
                node.value = vm.data[name]
            }
        }
    }
    // node为文本
    if (node.nodeType === 3) {
        if (res.test(node.nodeValue)) {
            var name = RegExp.$1
            name = name.trim()
            new Watcher(vm,node,name)
            node.nodeValue = vm.data[name];
        }
    }
}

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
new Vue({
    el: 'mvvm',
    data: {
        text: 10000
    }
})
