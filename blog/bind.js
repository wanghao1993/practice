Function.prototype.mybind = function(args) {
    if (typeof this !== 'function') {
        throw TypeError('its not a function')
    }
    const argus = Array.prototype.slice.call(arguments, 1)
    const _that = this
    const nop = function() {}

    const bound = function() {
        return _that.apply(this instanceof nop ? this : arguments,
            argus.concat(Array.prototype.slice.call(arguments)))
    }

    if (this.prototype) {
        nop.prototype = this.prototype
    }

    return bound
}

var Father = {
    age: '12'
}

function Son() {
    this.age = '13'
    hello = function () {
        console.log(this.age)
    }
}

var a = Son.mybind(Father)

console.log(a)


Function.prototype.mybind = function (args) {
    if (typeof args !== 'function') {
        throw TypeError('must function')
    }

    const thisArgs = Array.prototype.slice.call(arguments, 1)

    const nop = function() {}

    const that = this
    const bound =  function() {
        return that.apply(args, thisArgs.concat(Array.prototype.slice.call(arguments)))
    }

    if (this.prototype) {
        nop.prototype = this.prototype
    }
    bound.prototype = new nop()
    return bound
}

Function.prototype.mycall = function (thisArg) {
    if (typeof this !== 'function') {
        throw TypeError('must function')
    }
    const fn = Symbol('fn')
    const thisArgs = thisArg || window
    thisArgs[fn] = this
    const args = Array.prototype.slice.call(arguments, 1)
    const result = thisArg[fn](...args)
    delete thisArg[fn]

    return result
}

Function.prototype.myapply = function (thisArg) {
    if (typeof this !== 'function') {
        throw TypeError('must function')
    }
    const fn = Symbol('fn')
    const thisArgs = thisArg || window
    thisArgs[fn] = this
    let args = arguments[1]
    const result = thisArg[fn](...args)
    delete thisArg[fn]

    return result
}


class A {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

class B extends A {
    constructor(name,age,height) {
        console.log(super)
        super(name, age)
        this.height = height
    }
}

let c = new B('小明', 12, 40)

const data = {
    num: 1
}
Object.defineProperty(data, 'num', {
    set(newVal) {
        console.log(newVal)
    }
})