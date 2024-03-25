<!-- ---
title: Awesome resume
tags:
	- 项目
--- -->
#  Awesome resume
> [预览](https://unbrain.github.io/awesome-resume/)

这个项目灵感来自 [strml.net](http://strml.net/) 不过它的源码不是很懂但是知道大概思路我们可以用纯 js 来实现，代码实现是简单的，可是能想出这样灵感的人是令人敬佩的。

### 代码写在页面上

代码出现在页面上肯定是用 js 修改 html

在 js 中准备好代码 string 

<!--more-->

由于代码是一个字一个字的出现的，肯定时会用到 setInterval 

每一次多取 string 一个字母

```javascript
function writeCode(code){
  let n = 0
  let domCode = document.querySlecelt('.xxx')
  let timer = srtInterval(() => {
    domCode.innerHTML = code.substring(0, n)
    if(n === code.length){
      clearInterval(timer)
    }
    n++
  }, 30)
  
}
```

### 代码高亮

css 仿造 html 一样加在 style 标签中（中文使用注释）

我们当然不需要自己去词法分析（其实是我做不来），网上有现成的

使用 [Prism](http://prismjs.com/)

根据官网使用就好哈，下载的时候记得勾选 markdown 后面需要

Prism 其实是在关键词周围加上 span 标签，而我们应该如何制造一种我们加高亮的假象呢？当然就是先将样式提前修改后面再加上就好了。

后面在代码优化就可以得到

```javascript
function writeCode(precode, code, callback) {
  let pcode = precode || ''
  let Domcode = document.querySelector('#code')
  let n = 0
  let timer = setInterval(() => {
    Domcode.innerHTML = Prism.highlight(pcode + code.substring(0, n), Prism.languages.css, 'css');
    styleTag.innerHTML = result = pcode + code.substring(0, n)
    let now = code.substring(n + 1, n)
    pressKey(now);
    Domcode.scrollTop = Domcode.scrollHeight
    if (n === code.length) {
      window.clearInterval(timer)
      callback && callback.call()
    }
    n++
  }, 30)
}
```

### HTML --> markdown 

当然我们也没必要自己去写

[markedjs](https://github.com/markedjs/marked)

依然是按着官网走就好

### CALLBACK

```javascript
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

由于最近看了回调，所以就在这一次使用了。

不过一般还是不要这样写，至少我实现知道咋回事过段时间这就是天书了hahahahaha

下次用 Promise 改改？
