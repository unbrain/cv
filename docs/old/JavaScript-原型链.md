<!-- ---
title: JavaScript 原型链
tags:
	- JavaScript
	- prototype
--- -->
# JavaScript 原型链

![](/img/proto.png)
<!--more-->

```javascript
function Person(name){
  this.name = name
}

Person.prototype.say = 'fuck prototype'

var one = new Person('小三')
var two = new Person('小吴')

one.name
one.say
two.name
two.say
```

看图可知

```JavaScript
one.__proto__ === Person.prototype
Person.prototype.__proto__ === Object.prototype

Person.__proto__ === Function.prototype
Function.__proto__ === Function.prototype
Object.__proto__ === Function.prototype

Function.prototype.__proto__ === Object.prototype

Object.prototype.__proto__ === null
```

总结

- 当 new 一个函数的时候会创建一个对象，`被创建对象.__proto__ === 函数.prototype`
- 一切函数都是由 Function 这个函数创建的，`被创建函数.__proto__ === Function.prototype`
- 一切函数的原型对象都是由 Object 这个函数创建的，`Object.prototype === 一切函数.prototype.__proto__`
