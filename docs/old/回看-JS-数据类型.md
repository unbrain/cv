---
title: 回看 JS 数据类型
tags:
	- JavaScript
	- 数据类型
---

JS 数据类型不多，加上 `es6` 的 Symbol 有 7 种，我之前也写了关于 JavaScript 有关数据类型的文章个人觉得当时的总结还不够完善，记忆也不够深刻。前不久重新看了《 JavaScript 高级程序设计》的第三章，决定再次整理下。

## 数据类型
Undefined, Null, Number, String, Boolean, Objecct, Symbol

<!--more-->

### typeof 操作符

两个特殊
"object" --> null
"function" --> 如果这个值是个函数
一个未被声明的变量也是可以 typeof 值为 undefined

### undefined 与 null 

undefined 派生于 null undefined == null 

存在逻辑关系，但用法不同

对于一个变量不存在显示的将其赋值为 undefined

保存对象的变量还未真正的保存对象，就应该明确保存为 null

### boolean

5 个 falsy 值

'' undefined null 0 NaN

### Number

注意：八进制

八进制第一位必须是 0，如果字面量超过 7，那么前导 0 就会被忽略，后面的数值将会当做十进制解析。

#### 浮点数值

浮点数会存在舍入误差，这是基于 IEEE754 数值的的浮点计算通病。

所以不要

```JavaScript
if(0.1 + 0.2 == 0.3){
  console.log('hi')
}else{
  cosole.log(0)
}
//0
```

### 数值范围

`Number.MIN_VALUE` `Number_MAX_VALUE` 大多数的浏览器实现了超过就会变为对应的正负 `Infinity`

### NaN

``` JavaScript
NaN == NaN//false
isNaN(NaN)//true
isNaN(true)//flase true --> 1 
```

### 数值转换

Number() parseInt() parseFloat() 还可以用 +/- 等符号

boolean true 1 false 0

undefined NaN

null 0

number 原来的数就是了

string 

- 只包含数字（包括正负号）转换为十进制（忽略前导 0）
- 包含有效浮点数格式 对应的浮点数（忽略前导 0）
- 包含有效十六进制格式 转换为同等大小的十进制
- '' 0
- 其他 NaN

object valuof() NaN --> toString()

#### 注意

在使用 parseInt() es3 与 es5 有分歧，未消除这困惑，可以为函数提供第二个参数。如果知道要解析的是八进制，就把 8 作为第二个参数。

```JavaScript
var num = parseInt('066', 8)
```

### string

字符一旦创建就不可更改，要改变摸个变量保存的字符串首先要销毁原来的字符串，然后用另一个包含新值的字符串填充该变量。

toString()方法 与 转型函数String()

转型函数 可以 null undefined

### object

- constructor
- hasOwnProperty()
- isPrototypeOf()
- toLocaleString()
- toString
- valueOf()