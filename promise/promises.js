const promise = new Promise((resolve, reject) => {
    if (false) {
        resolve(1)
    } else {
        reject(2)
    }
})

console.log(promise.then(res => {console.log(res)}))