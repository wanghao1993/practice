const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class myPromise {
    constructor(executor) {
        this._status = PENDING
        this._resolveQueue = []
        this._rejectQueue = []

        let _resolve = (val) => {
            if (this._status !== PENDING) return

            this._status = FULFILLED
            while(this._resolveQueue.length) {
                const callback = this._resolveQueue.shift()
                callback(val)
            }
        }

        let _reject = (val) => {
            if (this._status !== PENDING) return

            this._status = REJECTED
            while(this._rejectQueue.length) {
                const callback = this._rejectQueue.shift()
                callback(val)
            }
        }

        executor(_resolve, _reject)
    }
    then(resolveFn, rejectFn){
        // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
        typeof resolveFn !== 'function' ? resolveFn = value => value : null
        typeof rejectFn !== 'function' ? rejectFn = error => error : null
        return new myPromise((resolve, reject) => {
            const fulfilledFn = value => {
                console.log(value)
                try {
                    let x = resolveFn(value)
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                    reject(error)
                }
            }

            const rejectedFn  = error => {
                try {
                  let x = rejectFn(error)
                  x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                  reject(error)
                }
            }
            switch (this._status) {
                // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
                case PENDING:
                  this._resolveQueue.push(fulfilledFn)
                  this._rejectQueue.push(rejectedFn)
                  break;
                // 当状态已经变为resolve/reject时,直接执行then回调
                case FULFILLED:
                  fulfilledFn(this._value)    // this._value是上一个then回调return的值(见完整版代码)
                  break;
                case REJECTED:
                  rejectedFn(this._value)
                  break;
            }
        })
    }
}

exports.myPromise = myPromise