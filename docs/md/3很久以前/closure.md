<!-- ---
title:  啥是闭包
date: 2018/3/16 20:46:25
tags: 
	- 笔试面试题
	- JavaScript

--- -->

# 啥是闭包

闭包这个名词可能是在还没了解计算机领域常常听见的，那就可以说他是一个比较常用到的一种技巧而被圈外的人所知道，仅仅是名字比较高深但其实认真一看也不过是**「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。**

<!--more-->

> 在[计算机科学](https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)中，**闭包**（英语：Closure），又称**词法闭包**（Lexical Closure）或**函数闭包**（function closures），是引用了自由变量的函数。这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造它的环境也不例外。所以，有另一种说法认为`闭包是由函数和与其相关的引用环境组合而成的实体`。闭包在运行时可以有多个实例，不同的引用环境和相同的函数组合可以产生不同的实例。（wiki）

说实话闭包这个名词看上去高大上，其实有很多的人在不知道这个概念的时候就已经悄悄的使用过了而且还可能是经常使用，只是不知道大家把这样的方法叫做闭包。

闭包就好是一种巧妙的设计，程序员为了方便调用而使用的，它通过分析上下文，来简化用户的调用，让用户在不知晓的情况下，达到他的目的。在程序语言中，闭包就是一种语法糖，它以很自然的形式，把我们的目的和我们的目的所涉及的资源全给自动打包在一起，以某种自然、尽量不让人误解的方式让人来使用。

```javascript
//常见闭包代码
function init(){
  var x = 20
  function printX(){
    x--
    console.log(x)
  }
  return printX
}

var fun = init()
fun()
```

闭包从 MDN 上可以看到很多的用法但是我个人看来最常用的是为了`隐藏变量`（私有化），使用闭包这个手段是非常方便的。



1. 就是函数作用域的简单调用，内部函数可以访问函数外的变量。
2. 函数当做值来赋值，当作参数传给别的函数，也可以把函数当作一个值 return

### 参考资料

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

- [wiki](https://zh.wikipedia.org/wiki/%E9%97%AD%E5%8C%85_)

- [知乎](https://www.zhihu.com/question/34210214)

- [什么是闭包，我的理解](http://www.cnblogs.com/xiaotie/archive/2011/08/03/2126145.html)

- [ How do JavaScript closures work?](https://stackoverflow.com/questions/111102/how-do-javascript-closures-work/111111#111111)

- [JS 中的闭包是什么？](https://zhuanlan.zhihu.com/p/22486908?refer=study-fe)

  ​		
