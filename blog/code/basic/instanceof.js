function myInstanceOf (left, right) {
    const rightProto = right.prototype
    let leftVaule = left.__proto__

    while (true) {
        if (leftVaule === null) {
            return false
        } else if (leftVaule === rightProto) {
            return true
        }

        leftVaule = leftVaule.__proto__
    }
}

var temp = {}
var a = {
    name: 1,
    obj: temp
}

var b = Object.create(a)
console.log(b.obj === a.obj)