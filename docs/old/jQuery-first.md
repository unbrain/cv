<!-- ---
title:  初探 jQuery
tags: 
	- jQuery
	- JavaScript

--- -->
# 初探 jQuery
### jQuery 可以说是大部分网站都会使用到的库了 [builtwith](https://trends.builtwith.com/javascript)

今天从简单的地方入手去模拟 `jQuery` 的实现，但还不是真的实现原理，但是可以帮助我们去理解学习 `jQuery` ，其实程序员都是害怕麻烦的，有这么多的库就是为了让自己尽可能的少打代码，所以就将完成复杂过程的代码封装起来，在下一次用的时候只需要给出参数就能复用之前的代码使得自己不去干重复而无意义的事情，但是呢作为初学者直接就去使用 `jQuery` 看上去并无大碍，但一般就不会看到他最本质的东西。所以模拟来实现一个`jQuery`

<!--more-->

### 需求

```javascript
window.jQuery = ???
window.$ = jQuery

var $div = $('div')
$div.addClass('red') // 可将所有 div 的 class 添加一个 red
$div.setText('hi') // 可将所有 div 的 textContent 变为 hi
```



### 分析

1. `$('div')` 可以看出我们需要出入一个参数（jQuery 会自动判断为选择器还是节点）
2. 我们需要在该函数封装两个方法`addClass()` `setText()`
3. 考虑到 div 可能不止一个需要用一个对象来保存多个节点

### `jQuery` 函数

根据传入参数的类型来判断如何初始化节点对象

```javascript
window.jQuery = function(node){
  let nodes = {}//声明一个空对象节点
  if(typeof node === 'string'){
    let arr = document.querySelectorAll(node)
    for(let i = 0; i < arr.length; i++){
        nodes[i] = arr[i]
      }
      nodes.length = arr.length
  }else if(typeof node === 'Node'){
    nodes[0] = node
    nodes.length = 1
  }
  
  return nodes
}

window.$ = jQuery//给他弄一个名字让大家都不会弄重的名字
```



### `addClass()` 函数

使用 `classList.add()`

```javascript
nodes.addClass = function(style){
    if(typeof style === 'string'){
      for(let i =0; i < nodes.length; i++){
        nodes[i].classList.add(style)
      }
    }
  }

```



### `setText()` 函数

更改 `textContext` 属性

```javascript
  nodes.setText = function(message){
    for(let i =0; i < nodes.length; i++){
        nodes[i].textContent = message
      }
  }
```



### 效果

![](/img/jQueryfirst.png)

### 小结

其实 jQuery 也就是一个对象，只是他单独封装他的属性与方法，将 DOM 的方法与属性隐藏得更深了一点，使用起来更方便更强大，兼容性更强。

### 思考

> ```html
> <div id=x></div>
> ```
>
> ```javascript
> var div = document.getElementById('x')
> var div = ('#x')
> ```
>
> 请说出 `div` 和 `$div` 的联系和区别。

`document.getElementById()`返回的是 `DOM` 对象，而 `$()` 返回的是 `jQuery` 对象
`div ` 和 `$div` 的联系是：
只要 `$(div) `就可以把 `div `变成` $div`
两种转换方式将一个`jQuery`对象转换成 `DOM ` 对象：[index]和.get(index);
只要 $div[0] 与 $div.get(0) 就能$div 变成 div
div 和 $div 的区别是：
div 的属性和方法有`appendChild(),cloneNode(),contains(),hasChildNodes(),insertBefore(),isEqualNode(),isSameNode(),removeChild(),replaceChild(),normalize()`
$div 的 属性和方法有 `add,addBack,addClass,after,ajaxComplete,ajaxError,ajaxSend,ajaxStart,ajaxStop,ajaxSuccess,andSelf,animate,append,appendTo...`
