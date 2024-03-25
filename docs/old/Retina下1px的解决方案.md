<!-- ---
title:  Retina 下 1px 的解决方案
date: 2019/03/15
tags:	
	- 项目
	- 随笔
--- -->
# Retina 下 1px 的解决方案

移动端适配一直是前端必须解决的问题，使用动态 rem 或者是根据 vw 进行 px 转换可以对局大部分现有机型适配，但是视网膜屏下的细线需要进行另外一些适配，不然 1px 会看起来更粗，因为像素被拆分，这样是不友好滴，看大漠从 2015 年到 2018 年的移动端适配过程你可以看到这孩子不容易啊。。。

<!--more-->

[视网膜New iPad与普通分辨率iPad页面的兼容处理](https://www.zhangxinxu.com/wordpress/2012/10/new-pad-retina-devicepixelratio-css-page/) （张鑫旭）

下面是大漠的对于移动端适配的方案及思考

[使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)

[再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)

 [再谈Retina下1px的解决方案](https://www.w3cplus.com/css/fix-1px-for-retina.html)

[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

同时自己看了下自己公司移动端的画面，ios  系统在不同的 `window.devicePixelRatio`   下 1 对应的是 1px，2 对应的是 .5px， 3 对应出的是 0.359375px。

```css3
.f-weibo.card9 {
    border-bottom: 1px solid #e6e6e6
}

.iosx3 .f-weibo.card9 {
    border-bottom: .36px solid #e6e6e6
}

.iosx2 .f-weibo.card9 {
    border-bottom: .5px solid #e6e6e6
}
```

使用 javascript  做 useragent 检测实用类名，不过这是对 ios 8+ 以上才有的适配

```js
<script>
    !function(e) {
        var a, i = navigator.userAgent.toLowerCase(), n = document.documentElement, t = parseInt(n.clientWidth);
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || i.indexOf("like mac os x") > 0) {
            var s = /os [\d._]*/gi
              , o = i.match(s);
            a = (o + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".")
        }
        var r = a + "";
        "undefined" != r && r.length > 0 && (a = parseInt(r),
        a >= 8 && (375 == t || 667 == t || 320 == t || 568 == t || 480 == t) ? n.className = "iosx2" : (a >= 8 && 414 == t || 736 == t) && (n.className = "iosx3")),
        /(Android)/i.test(navigator.userAgent) && (n.className = "android")
    }(window);
</script>
```

其中公司的一个 ui 组件中写道（也就是使用 meta 标签来进行修改）

在 Android端采取的 viewport 缩放的方式实现Hairline，这个或许会引发一些问题，比如你必须在业务中使用非 `px` 单位 。根据微博客户端特性预制了背景以及组件比例适配关系，这个也许你不需要。这些都可以在option中设置，例如：

```
Vue.use(xxxUI, { hairline: false, weibo: false });
```

xxxUI css 提供了一些常用的混合方法，方便开发时代码简化。base目录中的mixins.css是样式混合集。每个.vue文件中，调用global.css中包含了这个混合集，可以直接使用已提供的混合。

后面再看了下移动端对于安卓的一些适配，咋眼一看，都是 1px，嘿嘿嘿，原来这么轻松可以不适配，仔细一看我错了

```css
.m-panel {
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid;
    background: #fff
}

.android .m-panel {
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-color: transparent;
    border-style: solid;
    -o-border-image: url(data:image/svg+xml;utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%226%22%20height=%226%22%20viewBox=%220%200%206%206%22%3E%3Cpath%20fill=%22none%22%20stroke=%22silver%22%20stroke-width=%22.5%22%20stroke-miterlimit=%2210%22%20d=%22M.3.3h5.5v5.5H.3z%22/%3E%3C/svg%3E) 2 repeat;
    border-image: url(data:image/svg+xml;utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%226%22%20height=%226%22%20viewBox=%220%200%206%206%22%3E%3Cpath%20fill=%22none%22%20stroke=%22silver%22%20stroke-width=%22.5%22%20stroke-miterlimit=%2210%22%20d=%22M.3.3h5.5v5.5H.3z%22/%3E%3C/svg%3E) 2 repeat;
}
```

对于安卓的适配使用了 border-image 用 svg 来进行适配

[postcss-write-svg](https://github.com/jonathantneal/postcss-write-svg) 配合这个插件使用 postcss 写 1px 非常方便但是对于圆角的不能使用该方法解决

我自己在使用的时候直线都是使用 postcss-write-svg  来实现，而对于圆角，使用 device-pixel-ratio 来对视网膜屏进行筛选并用伪类对需要的进行 transform
