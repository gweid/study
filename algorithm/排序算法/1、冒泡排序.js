function bubbleSort(arr) {
  const len = arr.length

  for (let i = 0; i < len; i++) {
    let flag = true

    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        flag = false;
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }

    // 这个 flag 的含义是：如果`某次循环`中没有交换过元素，那么意味着排序已经完成
    if (flag) break
  }

  return arr
}

console.log('冒泡排序', bubbleSort([1, 8, 4, 9, 6, 7, 2]))
