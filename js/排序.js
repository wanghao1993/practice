// 冒泡排序
function bubbleSort(arr) {
    var len = arr.length
    for (var i = 0; i < len - 1; i++) {
        for (var j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]] // es交换值
            }
        }
    }
    return arr
}
bubbleSort([3,1,2])

// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) {
        return
    }
    var len = arr.length
    var middle = arr.splice(Math.floor(len / 2), 1)[0]
    var left = []
    var right = []
    for (var i = 0; i < len; i++) {
        if (arr[i] < middle) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([middle], quickSort(right))
}