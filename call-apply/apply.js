// apply的作用，改变this的指向
function add(c, d) {
    return this.a + this.b + c + d
}
const obj = {
    a: 1,
    b: 2
}
console.log(add.apply(obj, [3, 4]))
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
console.log(add.myApply(obj))