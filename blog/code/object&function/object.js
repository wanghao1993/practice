var person = {}

Object.defineProperty(person, 'name', {
    configurable: false,
    enumerable: true,
    value: "Nicholas"
})
console.log(person.name) // Nicholas
Object.defineProperty(person, 'hah', {
    configurable: false,
    value: "222"
})
person.name = '尼古拉斯.赵四'


delete person.hah



var person2 = {}

Object.defineProperty(person, 'text', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: "222"
})

for (let key in person) {
    console.log(key)
}


var test = {a:1}
// function constVar (key) {
//     console.log(key)
//     Object.defineProperty(window, key, {
//         Writable: false
//     })
// }

// constVar(test)

test = {a:2}
console.log(test)

var person = {}
Object.defineProperty(person, 'txt', {
    get: function () {
        console.log('我拿了txt')
    },
    set: function () {
        console.log('我设置了')
    }
})

console.log(person.txt)
person.txt = 1