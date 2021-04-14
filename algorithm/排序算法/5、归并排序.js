function mergeFun(left, right) {
  let result = []
  while(left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while(left.length) {
    result.push(left.shift())
  }

  while(right.length) {
    result.push(right.shift())
  }

  return result
}

function mergeSort(arr) {
  // 长度小于等于 1，直接返回
  if (arr.length <= 1) return arr

  // 选取数组长度中值，分割数组
  const mid = Math.floor(arr.length / 2)
  const leftArr = arr.slice(0, mid)
  const rightArr = arr.slice(mid)

  // 继续递归分割左右
  const mergeLeftArr = mergeSort(leftArr)
  const mergeRightArr = mergeSort(rightArr)

  return mergeFun(mergeLeftArr, mergeRightArr)
}

console.log('归并排序', mergeSort([1, 8, 4, 9, 6, 7, 2]))
