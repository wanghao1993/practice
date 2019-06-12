// call的作用，改变this的指向
function add(c, d) {
    return this.a + this.b + c + d
}
const obj = {
    a: 1,
    b: 2
}
console.log(add.call(obj, 3, 4))

// 原本add的this指向window 但是现在指向了obj这个对象

const obj2 = {
    a: 1,
    b: 2,
    add2: function (c, d) {
        return this.a + this.b + c + d
    }
}

obj2.add2(3, 4)

// 这段代码和上面得到的结果是一样的

// call主要是改变了this的指向，所以通过上面代码的比较 我们可以三部分
// 1.obj中添加add2这个属性 2.执行add2  3.删掉add2（不能改变原对象的属性）


Function.prototype.callMock = function (context) {
    var content = context || window
    // this调用对象 function add
    content.fn = this
    var args = []
    for (var i = 1, len = arguments.length ; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('content.fn('+args+')');
    delete content.fn;
    return result;
}
add.callMock(obj, 3, 4)