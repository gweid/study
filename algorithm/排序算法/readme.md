## 排序算法

常见的 6 种排序算法

- 冒泡排序
- 快速排序
- 选择排序
- 插入排序
- 计数排序
- 归并排序


这 6 种排序的时间复杂度：

![](../..//imgs/img20.png)



### 冒泡排序

冒泡排序主要的思想：就是临近两两相比较。

时间复杂度是 O(n^2)

#### 实现思路

假设按照从小到大排序

1. 比较相邻的元素，前者比后者大的话，两者交换位置
2. 对每一对相邻元素做相同操作，从开始第一对到最后一对，**这样子最后的元素就是最大元素**
3. 针对 n 个元素重复以上步骤，每次循环排除当前最后一个
4. 重复步骤 1~3，直到排序完成

#### 动画图解

冒泡排序

![](../../imgs/img21.gif)

#### 代码演示

```js
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
```



### 快速排序

时间复杂度：O(nlogn)

#### 实现思路

1. 在数据集之中，选择一个元素作为"基准"（pivot）
2. 所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边
3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止

#### 代码演示

```js
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

  return quickSort(left).concat([pivot], quickSort(right))
}

console.log('快速排序', bubbleSort([1, 8, 4, 9, 6, 7, 2]))
```

