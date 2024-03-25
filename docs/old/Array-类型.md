<!-- ---
title:  Array 类型 
date: 2018/10/27
tags:	
	- JavaScript
--- -->
# Array 类型 
![](/img/array.jpg)

`Array` 恐怕是除了 `Object` 外在 `JavaScript` 中最常用的类型了。

<!--more-->

## 创建数组

```JavaScript
var arr0 = new Array()
var arr1 = new Array(20)//length 为 20
var arr2 = new Array('a', 'b', 'c')//包含三个字符串的数组
```

给构造函数一个值也是可以创建数组的，但有点复杂，如果是数值，会按照该数值创建给定项数的数组，其他类型参数则是会创建包含该值的只有一项的数组，这看起来有点小尴尬但是在 `ES6` 中就解决了这个问题。

其次还可以省略 `new` 操作符

另外一种是我们更加常用的数组字面量表示法，

```JavaScript
var arr0 = ['1', '2', '3']
var arr1 = [, ,] //不要在最后加 , 这样会创建 2 个或 3 个 项的数组
```

- 注意： 数组的 `length` 属性他不是只读的，因此我们可以通过改变 `length` 来改变数组

```JavaScript
var arr = ['1', '2', '3'] 
arr.length = 2
alert(arr[2])//undefined
```

利用 `length` 属性可以方便的从数组末尾添加与删除

## 检测数组

```javascript
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[Object Array]'
}
---
if(arr instanceof Array){
   // 
}
---
Array.isArray()
```

## 改变数组方法

- 栈方法 `push()` `pop()` 
- 队列方法 `shift()` `unshift()`
- 重排序方法 `sort()` `reverse()`
- 操作方法 `splice()`
- 位置方法 `indexOf()` `lastIndexOf()`
- 迭代方法 `every()` `filter()` `forEach()` `map()` `some()`
- 归并方法 `reduce()`

## 不改变数组方法

- 操作方法 `concat()` `slice()` 
- 转换方法 `toSring()` `valueof()` `toLocaleString()` `join()`

## ES6 数组的扩展

### 扩展运输算符（ ... ）

```javascript
console.log(...[1, 2, 3])// 1 2 3
console.log(1, ...[1, 2])// 1 2 3
```

由于扩展运算符可以展开数组

```JavaScript
\\ ES5
Math.max.apply(undefined, [1, 2, 3])
\\ ES6
Math.max(...[1, 2, 3])
```

合并数组

```JavaScript
\\ ES5
[1, 2].concat(more)
\\ ES6
[1, 2, ...more]
```

与解构赋值相结合

```JavaScript
const [first, ...last] = [1, 2, 3, 4]
first // 1
last // [2, 3, 4]
```

字符串

```JavaScript
[...'he'] // ['h', 'e']
```

### Array.from()

```javascript
let arrlike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}
// ES5
var arr1 = [].slice.call(arrlick) // ['a', 'b', 'c']
// ES6
let arr2 = Array.from(arrlike) // ['a', 'b', 'c']
```

将两类对象：类似数组的对象与可遍历对象转为真正的数组

### Array.of()

```javascript
Array.of(1, 2, 3) // [1, , 2, 3]
Array.of(3) // [3]
```

弥补数组构造函数的不足

### copyWithin()

Array.prototype.copyWithin(target, start = 0, end = this.length)

- target(必选)：从该位置开始替换
- start(可选)：从该位置开始读数据，默认为0，负数表示倒数
- end(可选)：到该位置停止，默认为数组长度，负数为倒数
- 三个数为数值，不是则自动转化为数值

```JavaScript
[1, 2, 3, 4, 5].copyWithin(0, 3) // [5, 4, 3, 4, 5]
```

### find() findIndex()

```javascript
[1, 2, 3, -5].find(n => n < 0) // -5
[1, 2, 3, -5].findIndex(n => n < 0) // 3
```

可以发现 `NaN` 弥补了 `indexof` 的不足

### fill()

```javascript
[1, 2, 3].fill(7) // [7, 7, 7]
[1, 2, 3].fill(7, 1, 2) // [1, 7, 3]
```

用来填充非常方便

### entries() keys() values()

对键值对，键名，键值的遍历

### includes

```javascript
[1, NaN, 3].includes(NaN) // true
```

参考：

- 《JavaScript高级程序设计》

- ES6 标准入门》
