<!-- ---
title: 浅谈 JS 数据
reward: true
toc: true
tags:
	- JavaScript
--- -->
# 浅谈 JS 数据

### JS 中数据类型有七种　number null undefined string boolean object symbol(es6) 今天就来看看他们的一些平常会用到的东西

> [JavaScript 历史](http://javascript.ruanyifeng.com/introduction/history.html)

<!--more-->

这七种不包括 Array Funtion 这两种其实就是　object

### 注意事项

#####１．number

- 八进制: `011` (es5新增　0o11　语法)

##### ２．string

- 多行代码

  ```javascript
    var s = '12345' +
                '67890' // 无回车符号
    或
    var s = `12345
    67890` // 含回车符号
    //其实还可以但不推荐,因为若在\后面有' '就会报错且不易发现
    var longString = 'Long \
  	string';
  ```


##### ３．undefined 与 null

就连 JS 之父都说这是他当初没有设计好的地方

不过一般情况下会对一个未赋值的对象，就用 null

对于不是对象的数据类型没有赋值，就是 undefined

### typeof 操作符 

```javascript
typeof String
//"function"
typeof 'hello'
//"string"
typeof 1
//"number"
typeof true
//"boolean"
typeof {}
//"object"
typeof null
//"object"
var a = null
//undefined
typeof a
//"object"
var b = Symbol()
//undefined
typeof b
//"symbol"
```

需要注意的就是 null 和 function, function并不是一个类型

### 数据转换

可以说在 code 的世界中有很大一部分的事情就是在将数据的格式进行转换

###### 任意类型转 String

有三种 `String()` `.toString()` 与最方便的 `''+1/true...`

```javascript
String(1)
//"1"
String({})
//"[object Object]"
String({
key: '99',
})
//"[object Object]"
(1).toString()
//"1"
1 + ''
//"1"
null + ''
//"null"
undefined + ''
//"undefined"
```

需要注意的是 null/undefined 是没有 `toString()` 方法的，会报错

##### 任意类型转数字

1. Number(x)
2. parseInt(x, 10) [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
3. parseFloat(x) [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
4. x - 0
5. +x

```javascript
var a = '1'
//undefined
Number(a)
//1
parseInt(a)
//1
parseInt(a, 10)
//1
parseFloat(a)
//1
a - 0
//1
+a
//1
```

##### 任意类型转布尔

1. Boolean(x)
2. !!x
3. [五个 Falsy 值](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)`nul undefined NaN '' 0`

### 面试题

```javascript
var a = 1
var b = a
b = 2
请问 a 显示是几？  
```

```javascript
var a = {name: 'a'}
var b = a
b = {name: 'b'}
请问现在 a.name 是多少？
```

```javascript
var a = {name: 'a'}
var b = a
b.name = 'b'
请问现在 a.name 是多少？
```

```javascript
var a = {name: 'a'}
var b = a
b = null
请问现在 a 是什么？
```

主要是画内存图，分清楚 `Heap` 和 ` Stack` ，像复杂类型一般都是放到 `Stack`中的比如对象。

### 垃圾回收

JavaScript 的 gc 个人觉得与Java 是很像的，至少表面上看都是当不被引用的时候就会被当做垃圾然后就会等待垃圾车的到来。

### 深复制与浅复制

这是一个浅拷贝的例子

```javascript
var a = {name: 'frank'}
var b = a
b.name = 'b'
a.name === 'b' // true
```

因为我们对 b 操作后，a 也变了

什么是深拷贝了，就是对 Heap 内存进行完全的拷贝。

```javascript
var a = {name: 'frank'}
var b = deepClone(a) // deepClone 还不知道怎么实现
b.name = 'b'
a.name === 'a' // true
```
