function detectType (obj) {
    if (typeof obj !== 'object' && typeof obj !== 'function' ) {
        return typeof obj
    } else {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    }
}

console.log(detectType(null))