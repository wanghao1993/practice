// 原型链继承
function Grandfather(firstName) {
    this.firstName = 'wang'
    this.colors = ['red', 'green']
}

function Father(age) {this.age = 12}

function Son(gender) {this.gender='man'}

Father.prototype = new Grandfather()

Son.prototype = new Father()

const xiaoming = new Son()
xiaoming.colors.push('yellow')

const xiaohong = new Son()

console.log(xiaohong.colors === xiaoming.colors, '相等吗')


// 缺点
// 从中我们能看到一个明显的确定，当继承父类的属性中存在引用类型的数据就会出问题。当我修改一个实例的时候 另一个实例也发生了改变


// 构造函数继承

function superType (name) {
    this.colors = ['red', 'green']
    this.name = name
}
superType.prototype.sayHello = function () {
    console.log('hello')
}
function subType () {
    superType.call(this, 'xiaobai')
    this.age = 23
}

const xiaoabai = new subType()
xiaoabai.colors.push('black')

const xiaojin = new subType()
// console.log(xiaoabai.sayHello(), xiaojin) // 此处会报错

// 优缺点：可以独立有自己属性和方法，并且支持单独传参，但是无法获取到原型上的方法


// 组合继承，同时使用原型链和组合

function First(name) {
    this.weight = {
        a: '1'
    }
    this.colors = ['red']
    this.name = name
}

First.prototype.sayHello = function () {
    console.log(this.name, 'name')
}

function Second(name, age = 12) {
    this.age = age
    First.call(this, name, age)
}

Second.prototype = new First()

// 此处需要修正constructor 通常情况下一个函数的prototype的constructor是自己本身
Second.prototype.constructor = Second

Second.prototype.sayAge = function () {
    console.log(this.age, 'age')
}
const xiaozhu = new Second('小猪')
xiaozhu.colors.push('小老虎')
const xiaonniu = new Second('小牛')

console.log(xiaozhu.weight === xiaonniu.weight) // false

// 优缺点这时候就很明显了，首先有点就是 消耗内存，同样的是weight的属性，是一样的，但是一个实例需要创建一个。


// 寄生继承

function createAnother(original) {
    const clone = Object.create(original)

    clone.sayHi = function () {
        console.log('hi')
    }

    return clone
}

const person = {
    name: 'nicholas',
    friends: ['shell', 'command', 'van']
}

const xiaoche = new createAnother(person)


xiaoche.name = 'grey'
xiaoche.friends.push('小火车～')


var yetAnotherPerson = createAnother(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(xiaoche.friends, yetAnotherPerson.friends);
