const reg = new RegExp('abc', 'i')

const reg1 = new RegExp(/abc/i)

const reg2 = new RegExp(/abc/ig, 'i')


// const str = 'abcd'
console.log(reg, reg1, reg2)


console.log(/\cM/.test("回车符\r"))

var a = ' a     ad dd \n \rdd 1     '
console.log(a.replace(/\s/g, ''))

var sentence = "my name is hanmeimie    , what's your name?    "
console.log(sentence.match(/(\w+|\w+'\w)\??\s/g))



function transform(num, unit = 3) {
    if (!num) {
        throw new Error('请输入数字')
        return
    }

    if (unit < 0) {
        throw new Error('unit需要大于0')
        return
    }
    const reg = new RegExp(`(\\d{${unit}})`, 'g')
    return num.toString().split('').reverse().join('').replace(reg, '$1,').split('').reverse().join('').replace(/^,/, '')
}
console.log(transform(1234567890, 2))
