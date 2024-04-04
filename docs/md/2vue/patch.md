
# 双端对比 patch

从左开始对比

两个 child 不相等(从左往右比对)

两个 child 不相等(从右往左比对)

point （代表 c1, c2 开始相似节点结束的位置）

e1 代表 c1 从尾部遍历的结束位置

e2 代表 c2 从尾部遍历的结束位置

point > e1 && point <= e2

也就是说新增了 vnode

point > e2 && point <= e1

这种情况的话说明新节点的数量是小于旧节点的数量的
那么我们就需要把多余的 remove


左右两边都比对完了，然后剩下的就是中间部位顺序变动的

我梦当然可以讲这部分 c1 全部 remove c2 全部 patch 来进行实现

这个时候需要使用最长子序列来减少 dom 操作

判断是否发生移动 做插入， 删除 操作

```javascript
  function patchKeyedChildren(c1, c2, container, parentComponent, parentAnchor) {
    const len1 = c1.length
    const len2 = c2.length
    let point = 0

    function isSameVnode(n1, n2) {
      return n1.type === n2.type && n1.key === n2.key
    }
    while (point < len1 && point < len2) {
      const n1 = c1[point]
      const n2 = c2[point]

      if (isSameVnode(n1, n2)) {
        patch(n1, n2, container, parentComponent, parentAnchor)
        point++
      }
      else {
        break
      }
    }

    let e1 = len1 - 1; let e2 = len2 - 1
    while (point <= e1 && point <= e2) {
      const n1 = c1[e1]
      const n2 = c2[e2]

      if (isSameVnode(n1, n2))
        patch(n1, n2, container, parentComponent, parentAnchor)
      else
        break
      e1--
      e2--
    }
    if (point > e1 && point <= e2) {
      const nextPos = e2 + 1
      const anchor = nextPos < len2 ? c2[nextPos].el : null

      while (point <= e2) {
        patch(null, c2[point], container, parentComponent, anchor)
        point++
      }
    }
    else if (point <= e1 && point > e2) {
      while (point <= e1) {
        hostRemove(c1[point].el)
        point++
      }
    }
    else {
      // 中间对比
      const toBePatch = e2 - point + 1
      let patched = 0
      const keyToNewIndexMap = new Map()
      const newIndexToOldIndexMap = Array.from({ length: toBePatch }).fill(0) as number[]
      let move = false
      let maxIndex = 0
      for (let i = point; i < len2; i++)
        keyToNewIndexMap.set(c2[i].key, i)

      for (let i = point; i <= e1; i++) {
        const prevChild = c1[i]
        const newIndex = keyToNewIndexMap.get(prevChild.key)
        if (patched >= toBePatch) {
          hostRemove(prevChild.el)
          continue
        }

        if (newIndex !== undefined) {
          if (newIndex >= maxIndex)
            maxIndex = newIndex
          else
            move = true
          patch(prevChild, c2[newIndex], container, parentComponent, null)
          newIndexToOldIndexMap[newIndex - point] = i + 1
          patched++
        }
        else { hostRemove(prevChild.el) }
      }

      const increasingNewIndexSequence = move ? getSequence(newIndexToOldIndexMap) : []
      let j = increasingNewIndexSequence.length - 1
      for (let i = toBePatch - 1; i >= 0; i--) {
        const nextIndex = point + i
        const nextChild = c2[nextIndex]
        const anchor = nextIndex + 1 < len2 ? c2[nextIndex + 1].el : null
        if (newIndexToOldIndexMap[i] === 0) { patch(null, nextChild, container, parentComponent, anchor) }
        else if (move) {
          if (j < 0 || i !== increasingNewIndexSequence[j])
            hostInsert(nextChild.el, container, anchor)
          else
            j--
        }
      }
    }
  }
```


## 最递增长子序列

```javascript


function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI)
          u = c + 1
        else
          v = c
      }
      if (arrI < arr[result[u]]) {
        if (u > 0)
          p[i] = result[u - 1]

        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
```
