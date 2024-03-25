<!-- ---
title: JavaScript 中的函数
reward: true
toc: true
tags:
	- JavaScript
--- -->

# JavaScript 中的函数

### 函数的 5 种声明方式

1. 具名函数 `function x(){}`

2. 匿名函数 

   ```javascript
   var a
   a = function (){}
   ```
<!--more-->
3. 结合1， 2

   ```javascript
   var a = function x(){}
   ```

4. 构造函数 ` window.Function('x', 'y', 'return x+y')`

5. 箭头函数（语法糖）

   ```javascript
   //1.基本格式
   (x,y) => {
     n = (x * y) / 2
     return n
   }
   //2.如果是直接return
   (x, y) => (x*y) / 2
   //3.只有一个参数可以不加 ()
   x => x*x
   ```

### 函数的 `name` 属性

个人的感觉 `name` 将 `JS` 的不一致性体现的淋漓尽致，总是出乎你的意料

```javascript
function x(){}
undefined
x.name
"x"
var f1 = function (){}
undefined
f1.name
"f1"
var f2 = function f3(){}
undefined
f2.name
"f3"
var f4 = new Function()
undefined
f4.name
"anonymous"
```



### 函数的本质

函数其实是一种特殊的 `Object`，可以反复调用该代码块

```javascript
var f = function (){}
f.prototype
/**{constructor: ƒ}
constructor:ƒ ()
arguments:null
caller:null
length:0
name:"f"
prototype:{constructor: ƒ}
__proto__:ƒ ()
apply:ƒ apply()
arguments:(...)
bind:ƒ bind()
call:ƒ call()
caller:(...)
constructor:ƒ Function()
length:0
name:""
toString:ƒ toString()
__proto__:Object**/
```

### this 与 arguments

在调用函数时大家都会理所当然的使用，`f()` 类似这样的方式，但是我们还可以用`f.call(this, arguments)` 这样的方式

```javascript
var f = function (x, y){
	return x+y
}
undefined
f(2, 3)
//5
f.call(undefined, 2, 3)
//5
f.call(undefined, 5, 3)
//8
```

this 若为 undefined 一般的话是会被看成 window

```javascript
var f = function (x, y){
	console.log(this)
	console.log(arguments)
}
undefined
f(2, 3)
//VM1021:2 Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//VM1021:3 Arguments(2) [2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
undefined
f.call(undefined, 2, 3)
//VM1021:2 Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//VM1021:3 Arguments(2) [2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

但在严格模式下就是 undefined

```javascript
var f = function (x, y){
	'use strict'
	console.log(this === undefined)
	console.log(arguments)
}
//undefined
f.call(undefined, 2, 3)
//VM1046:3 true
//VM1046:4 Arguments(2) [2, 3, callee: (...), Symbol(Symbol.iterator): ƒ]
//undefined
var f = function (x, y){
	
	console.log(this === window)
	console.log(arguments)
}
//undefined
f.call(undefined, 2, 3)
//VM1081:3 true
//VM1081:4 Arguments(2) [2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

### 变量提升

时刻谨记变量提升四个字，题目会经常在这个地方坑人

```javascript
var a = 2
var f = function(){
  console.log(a)
  var a = 3
}
//请问 log 出什么
```

其实只要记住变量提升那么这道题就会迎刃而解，相当于

```javascript
var a = 2
var f = function(){
  var a
  console.log(a)
  a = 3
}
```

自然就是 `undefined`, 若有人想的是 2，那可能误以为是

其实还与作用域有关系

```javascript
var a = 2 
var f = function(){
	console.log(a)
}
f()
```



### 闭包

闭包在我看来就好像 Java 的私有属性，为了防止外部对重要数据的直接修改导致不必要的数据变化自然而然使用的手段，其实就是对变量作用域的灵活应用。

```javascript
function foo(){
  var local = 1
  function bar(){
    local++
    return local
  }
  return bar
}

var func = foo()
func()
```





参考：

+ [函数](http://javascript.ruanyifeng.com/grammar/function.html)
+ [JS 中的闭包是什么？](https://zhuanlan.zhihu.com/p/22486908?refer=study-fe)
+ [学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
