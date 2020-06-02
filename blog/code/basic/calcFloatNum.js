class transform {
    constructor (num) {
        if (typeof num === 'number' && !isNaN(num)) {
            this.num = num
        } else {
            throw Error('arg must be a number')
        }
    }
    
    _isInterger () {
        return Math.floor(this.num) === this.num
    }

    floatToInt () {
        if (this._isInterger()) {
            return this.num
        }
        const len = this.num.toString().split('.')[1].length
        return this.num * Math.pow(10, len)
    }

    intToFloat (number, len) {
        return number / Math.pow(10, len)
    }
}

console.log((new transform(1.2).floatToInt() / new transform(1.6).floatToInt()))