// apply的作用，改变this的指向
function add(c, d) {
    return this.a + this.b + c + d
}
const obj = {
    a: 1,
    b: 2
}
console.log(add.apply(obj, [3, 4]))
// call主要是改变了this的指向，所以通过上面代码的比较 我们可以三部分
// 1.obj中添加add2这个属性 2.执行add2  3.删掉add2（不能改变原对象的属性）
Function.prototype.myApply2 = function (context, arr) {

    // context 是obj 对象，如果没有就取window
    var context = Object(context) || window

    // this apply点前的对象
    context.fn = this
    let result = undefined

    // 如果没有参数就直接执行context中的fn
    if (!arr) {
        result = context.fn()
    } else {
        let args = []
        for (let i = 0, len = arr.length; i < len; i++) {
            args.push(`arr[${i}]`)
        }

        console.log('context.fn(' + args + ')')
        result = eval('context.fn(' + args + ')')

        delete context.fn
        return result
    }
}
Function.prototype.myApply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
console.log(add.myApply(obj, [3, 4, 5]))
console.log(add.myApply2(obj, [3, 4, 5]))