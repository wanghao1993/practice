function throttle(func, wait) {
    var pre = 0
    return function() {
        var now = new Date()
        var context = this
        if (now - pre > wait) {
            func.apply(context)
            pre = now
        }
    }
}

export default throttle
