var person = {}

Object.defineProperty(person, 'name', {
    configurable: false,
    value: "Nicholas"
})
console.log(person.name) // Nicholas
Object.defineProperty(person, 'hah', {
    configurable: false,
    value: "222"
})
person.name = '尼古拉斯.赵四'

console.log(person.name) // Nicholas

delete person.hah
console.log(person.hah) // 222

console.log(person)