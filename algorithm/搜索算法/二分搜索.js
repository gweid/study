// 使用二分查找需要有序
function binarySearch(arr, value) {
  let minIdx = 0 // 数组开始的 index
  let maxIdx = arr.length - 1 // 数组结束的 index
  let midIdx // 数组的中间 index
  let ele // 数组中间 index 的取值

  while(minIdx <= maxIdx) {
    midIdx = Math.floor((minIdx + maxIdx) / 2)
    ele = arr[midIdx]

    if (ele > value) {
      maxIdx = midIdx - 1 
    } else if (ele < value) {
      minIdx = midIdx + 1
    } else {
      return midIdx
    }

    return -1
  }
}

console.log('二分搜索结果：', binarySearch([1, 5, 8, 13, 27], 8))



// 使用分而治之的方法实现二分搜索
function binarySearchRecursive(arr, value, minIdx, maxIdx) {
  if (minIdx <= maxIdx) {
    const midIdx = Math.floor((minIdx + maxIdx) / 2)
    const ele = arr[midIdx]
    if (ele < value) {
      binarySearchRecursive(arr, value, midIdx + 1, maxIdx)
    } else if (ele > value) {
      binarySearchRecursive(arr, value, minIdx, midIdx - 1)
    } else {
      return midIdx
    }

    return -1
  }
}

function binarySearchDivide(arr, value) {
  const minIdx = 0
  const maxIdx = arr.length - 1

  return binarySearchRecursive(arr, value, minIdx, maxIdx)
}

console.log('分而治之二分搜索：', binarySearch([1, 5, 8, 13, 27], 8))
