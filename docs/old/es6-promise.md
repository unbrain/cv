<!-- ---
title: 回看 promise
tags:
	- es6
	- JavaScript
	- callback
	- promise
--- -->
# 回看 promise
## callback

一个函数在另一个函数中调用

```javascript
function fn1(){}
function fn2(fn){fn()}
fn2(fn1)//这就是回调
//call a function
//callback a function
```

<!--more-->

## 回调地狱

回调的嵌套多余 5 层的时候，你就会发现看不懂了...

```JavaScript
writeCode('', css1, () => {
  creatPaper(() => {
    writeCode(css1, css2, () => {
      writeMarkdown(md, () => {
        writeCode(css1+css2, css3, () => {
          document.querySelector('#paper .content').innerHTML = marked(md);
          console.log('over')
        })
      })      
    })
  })
})
```

这是我在我的一个项目中使用的代码，可读性为负

忒酸爽

为了解决回调地狱，以及在不同的库使用回调的方式是未知的需要去记

所以就来了 `Promise`

## Promise

```JavaScript
function get(){
  return new Promise(function(resolve, reject){
    resolve('zhaoyang')
  })
}

function print(info){
  return new Promise(function(resolve, reject){
    console.log(info)
    resolve()
  })
}

function getanother(){
  return new Promise(function(resolve, reject){
    resolve('bamax')
  })
}

get().then(print).then(getanother).then(print)
```

promise 三大金刚 then resolve reject 

## AJAX

```JavaScript
function ajax(url, onsuccess, onerror){
  return new Promise((resolve, reject) =>{
    let xhr = new XMLHttpRequest()
    xhr.open('Get', url, true)
    xhr.onload() = function(){
      resolve(this.responseText)
    }
    xhr.onerror =()=>{reject('err')}
  })
}
function log(name, password){
  return ajax('/log',{name, passname})
}
log('sb','sbsbsb').then(ret=>{
  
}).catch()
```

## Generator

ES6 提供的异步编程解决方案

[阮一峰](http://es6.ruanyifeng.com/#docs/generator)

感觉自己还不能很好地讲出来

yield  next()
