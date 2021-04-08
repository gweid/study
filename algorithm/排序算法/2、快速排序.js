function quickSort(arr) {
  if (arr.length <= 1) return arr

  const pivotIdx = Math.floor(arr.length / 2)
  const pivoit = arr.splice(pivotIdx, 1)[0]

  const left = []
  const right = []

  for(let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] < pivoit) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([pivoit], quickSort(right))
}

console.log('快速排序', quickSort([1, 8, 4, 9, 6, 7, 2]))
