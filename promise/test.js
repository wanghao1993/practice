const myPromise =  require('./mypromise').myPromise

new Promise((resolve, reject) => {
    console.log(1)
    new Promise((resolve) => {
        console.log(2)
        setTimeout(() => {
            console.log(3)
            resolve(7)
        }, 1)
    })
}).then(() => {
    console.log(4)
}).then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})



