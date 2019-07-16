// 基础版本当在可视范围内的时候就展示图片
import throttle from './utils/throttle'
class lazyLoad {
    constructor () {
        const imgs = document.getElementsByTagName('img')
        // this.imgs = Array.from([...imgs])
        this.imgs = imgs
        this.init()
    }

    // 方法一计算高度判断是否在视口内部
    viewImage2 () {
        let windowHeight = window.scrollY + window.innerHeight
        this.imgs.forEach(img => {
            if (img.offsetTop < windowHeight) {
                const realURL = img.getAttribute('data-src')
                // 版本一 为了表现明显点加个定时器
                setTimeout(() => {
                    img.src = realURL
                }, 200)
            } 
        })
    }

    // 方法二利用API判断是否在视口内
    viewImage () {
        // start observing
        for (let img of this.imgs) {
            const intersectionObserver = new IntersectionObserver(function(entries) {
                // If intersectionRatio is 0, the target is out of view
                // and we do not need to do anything.
                for(let entry of entries) {
                    if (entry.intersectionRatio <= 0) return
                    else {
                        const img = entry.target
                        const realURL = img.dataset.src
                        img.src = realURL
                    }
                }
            });
            intersectionObserver.observe(img)
        }
    }
    init () {
        let that = this
        // 版本一
        // window.onscroll = function () {
        //     that.viewImage()
        // }

        // 版本二
        // window.onscroll = throttle(function () {
        //     that.viewImage()
        // }, 500)
        // 版本3
        // that.viewImage()

        // 版本4 兼容低版本浏览器
        if ('IntersectionObserver' in window) {
            that.viewImage()
        } else {
            window.onscroll = throttle(function () {
                that.viewImage2()
            }, 500)
        }
    }
}

new lazyLoad()
