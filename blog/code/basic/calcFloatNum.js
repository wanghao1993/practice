function transform (num1, num2, type) {
    const typeList = ['add', 'min', 'multi', 'divide']
    if (!num1 || !num2 || !type) {
        throw Error('num1 & num2 & type are required')
    }

    if (!typeList.includes(type)) {
        throw Error("There are four types can be accepted 'add', 'min', 'multi', 'divide'")
    }

    let maxLen = 0
    let copyNum1 = 0
    let copyNum2 = 0
    
    let l = num1.toString().split('.').length > 2 ? num1.toString().split('.')[1].length : 0
    let r = num2.toString().split('.').length > 2 ? num2.toString().split('.')[1].length : 0
    maxLen = l < r ? r : l
    copyNum1 = floatToInt(num1, maxLen)
    copyNum2 = floatToInt(num2, maxLen)

    if (type === 'add') {
        return (copyNum2 + copyNum1) / Math.pow(10, maxLen)
    } else if (type === 'min') {
        return (copyNum1 - copyNum2) / Math.pow(10, maxLen)
    } else if (type === 'divide') {
        return copyNum1 / copyNum2
    } else if (type === 'multi') {
        return (copyNum1 * copyNum2) / Math.pow(Math.pow(10, maxLen), 2)
    }
}

function floatToInt (num, len) {
    return num * Math.pow(10, len)
}

console.log(transform(1, 2, 'add'))
