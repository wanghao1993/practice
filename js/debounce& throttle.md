#### 最近在面试，记录一下面试过程中遇到的问题
1.节流(throttle)和防抖(debounce)是什么？请描述使用场景

    节流：就是指连续触发事件但是在 n 秒中只执行一次函数；
    例如：经常碰到的mousemove或者scroll事件，触发频率是非常高的
```js
    var n = 1
    window.onscroll = function () {console.log(n++)}
```
    节流通常有两种实现方式
```js
    1.时间戳版
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
    2.定时器版本
    function throttle2(func, wait) {
        var timeout = null
        return function() {
            var now = new Date()
            var context = this
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null
                    func.apply(context)
                }, wait)
            }
        }
    }

```