function Grandfather(firstName) {this.firstName = 'wang'}

function Father(age) {this.age = 12}

function Son(gender) {this.gender='man'}

Father.prototype = new Grandfather()

Son.prototype = new Father()

const xiaoming = new Son()

console.log(xiaoming.hasOwnProperty('age'))

