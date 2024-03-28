<!-- ---
title: 简聊 JavaScript call apply 与 bind
date: 2018/4/28 20:46:25
tags:
	- 笔试面试题
	- JavaScript
--- -->
#  简聊 JavaScript call apply 与 bind
### 语法

```javascript
function.call(thisArg, arg1, arg2, ...)//在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。

func.apply(thisArg, [argsArray])//同上

fun.bind(thisArg[, arg1[, arg2[, ...]]])

//thisArg当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效。
```



<!--more-->

### call 与 apply

从语法上就可以看出出两个是比较相似的

- 都可以来改变函数的this对象的指向
- 不过一个是依次传入参数值，一个传入一个数组

```javascript
function people() {}
people.prototype = {
    who: 'i',
    say: function() {
        console.log(this.who + ' love you');
    }
}
var ali = new people;
ali.say();//i love you
lisi = {
	who: 'lisi'
}
ali.say.call(lisi)//lisi love you
ali.say.apply(lisi)//lisi love you
ali.say.call(ali)//i love you
```

所以，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法，但是其他的有，我们可以借助call或apply用其它对象的方法来操作。

```javascript
var a = function (x, y){
	return x + y
}
undefined
a.call(this, 1, 2)//3
a.call(undefined, 1, 2)//3
a.apply(this, [1, 2])//3
```

JavaScript 中，某个函数的参数数量是不固定的，因此要说适用条件的话，当你的参数是明确知道数量时用 call 。而不确定的时候用 apply，然后把参数 push 进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个数组来遍历所有的参数。

### bind

> bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的[`call`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)属性）。当**新函数**被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。一个绑定函数也能使用[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。(mdn)

觉得 mdn 上的例子很好了就直接抄下来

```javascript
this.x = 9
var modle = {
  x: 81,
  getX: function(){return this.x}
}
modle.getX()//返回 81
var newX = modle.getX
newX()//9,this 指向全局
//创建新函数，将this绑定到modle对象
var nextX = newX.bind(modle)
nextX()//81
```





可以看到bind并不是立即执行的

### 三者比较

```javascript
var obj = {
    x: 8,
};
var foo = {
    getX: function() {
        return this.x;
    }
}
console.log(foo.getX.bind(obj)());  //8
console.log(foo.getX.call(obj));    //8
console.log(foo.getX.apply(obj));   //8
```



- apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
- apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
- apply 、 call 、bind 三者都可以利用后续参数传参；
- bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

### 面试题

定义一个 log 方法，让它可以代理 console.log 方法

```javascript
//常见方式
function log(msg)　{
  console.log(msg);
}
//apply
function log(){
  console.log.apply(this, arguments)
}
```



##### 参考

-  [Function.prototype.call() - JavaScript - MDN - Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

-  [Function.prototype.apply() - JavaScript - MDN - Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

-  [Function.prototype.bind() - JavaScript - MDN - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

-  [深入浅出 妙用Javascript中apply、call、bind](http://www.cnblogs.com/coco1s/p/4833199.html)
