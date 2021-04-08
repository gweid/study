function selectSort(arr) {
  const len = arr.length
  let idx = 0

  for(let i = 0; i < len - 1; i++) {
    idx = i
    for(let j = i; j < len; j++) {
      if (arr[idx] > arr[j]) {
        idx = j
      }
    }
    if (idx !== i) {
      [arr[i], arr[idx]] = [arr[idx], arr[i]]
    }
  }

  return arr
}

console.log('选择排序', selectSort([1, 8, 4, 9, 6, 7, 2]))
