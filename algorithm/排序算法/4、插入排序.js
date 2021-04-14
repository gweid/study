function insertSort(arr) {
  const len = arr.length

  for (let i = 0; i < len; i++) {
    let j = i
    let temp = arr[i] // 保存当前位置的值
    while(j >= 0 && arr[j - 1] > temp) {
      
      // 如果前面的比自己大，那么前面的移到自己的位置
      arr[j] = arr[j - 1]
      j--
    }
    // 前面的没有比自己大的，那么可以确定自己的位置，把那个位置的值替换成自己
    arr[j] = temp
  }

  return arr
}

console.log('插入排序', insertSort([1, 8, 4, 9, 6, 7, 2]))
