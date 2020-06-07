function detectType (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

function deepClone (parent, obj = {}) {
    const newObj = Array.isArray(obj) ? [] : {}
    for (let key in parent) {
        if (detectType(parent[key]) === 'array') {
            newObj[key] = parent[key].concat([])
        } else if (detectType(parent[key]) === 'regexp') {
            newObj[key] = new parent[key].constructor(obj)
        } else if (detectType(parent[key]) === 'date') {
            newObj[key] = new parent[key].constructor(parent[key].getTime())
        } else if (detectType(parent[key]) === 'object') {
            const temp = {}
            newObj[key] = temp
            deepClone(parent[key], temp)
        } else {
            newObj[key] = parent[key]
        }
    }
    return newObj
}

const oldObj = {
    q: 1,
    b: false,
    c: 'xxx',
    d: undefined,
    e: null,
    f: Symbol(1),
    g: {a: 1, b: {c:2}},
    h: new Date(),
    i: [1,2,[3,4]]
}
let res = deepClone(oldObj)
console.log(res, (res.i)[2] === (oldObj.i)[2])
