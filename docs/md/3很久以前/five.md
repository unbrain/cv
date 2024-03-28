<!-- ---
title: 第五周 
date: 2019/03/21
tags:	
	- 随笔
--- -->

# 第五周

新的项目使用 vue cli3 搭建，适配选折的是根据 vw 进行适配，写还是写 px 只是使用了 postcss 的相关插件

```json
  "postcss": {
    "plugins": {
      "postcss-import": {},
      "postcss-mixins": {},
      "postcss-aspect-ratio-mini": {},title:  flask vue socket
date: 2019/03/10
tags:	
	- 项目
      "postcss-write-svg": {},
      "postcss-cssnext": {},
      "postcss-px-to-viewport": {
        "viewportWidth": 375,
        "viewportHeight": 667,
        "unitPrecision": 3,
        "selectorBlackList": [
          ".ignore",
          ".hairlines"
        ],
        "minPixelValue": 1,
        "mediaQuery": false
      }
    }
  },
```

<!--more-->

最主要的就是 `postcss-px-to-viewport`，使用插件有两个坑，第一个是使用的 `postcss-write-svg` 将其写在了 `postcss-mixins` 的前面哎

报错是 Cannot read property 'forEach' of undefined 等一大窜当时就蒙了，这是啥报错，我当时感觉自己啥都没有干啊，就只是添加了一个插件就报错，删除这个插件了就没事，一度觉得是别人的插件有问题，幻想着可以提 issue。。。后面想到在之前使用 `vue-socket` 由于使用顺序而导致踩坑想到是一部是插件使用是的顺序问题，果然将其放在 `postcss-mixins` 后问题完美解决。

第二个是 `postcss-url` 自己当时搭建项目是参考了大漠的 [如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html) 于是和自然是用了这个插件，但是当时并不知道他会干嘛。于是我就与之前在一样在 css 中使用 url 便出现了问题，

![](/img/1553169554723.png)

平常这样写是能够渲染出来的，可是现在去 chrome 看会看到一片空白，看样式

![](/img/1553169573583.png)

当时就尝试着把双引号去

![](/img/1553169588894.png)

发现可以了渲染出图片当时就没有去管了，后面回想起来就觉得很奇怪，当时也没想到是 postcss 插件的问题，觉得是在 vue build 中 cli2 与 cli3 有啥区别，就在项目全局搜索了 png/url 等一些东西就发现了 `postcss-url` 这个东西把它删掉就算是解决了。

[background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size) 



![](/img/1553169169425.png)

对于小于 12px 的字体很自然的在 chrome 浏览器不再变小，这是 chrome 默认的（可以更改的）。但是在 chrome 该如何适配呢？首选当然是使用 transform。（zoom 依旧会受到 12px 的限制）

![](/img/1553169307071.png)

可以看到蓝色区域莫名的多出来了，这是因为scale只能引起重绘，而没有引起重排，所以页面外元素布局是不会改变，自身的样式会重新绘制。那要如何才让他不占位置？脱离文档流。

![](/img/1553169420514.png)

这样看似乎解决了这个问题？来我们把字加长点

![](/img/1553169465186.png)

这好像不太对劲，添上 white-space: no-wrap

![](/img/1553169480025.png)

似乎解决，但是如果再次加长就。。。

![](/img/1553169507173.png)

感觉这是能想到最后的了，一般这么小的字是不可能超过一行的，字太小对于用户不友好。当字太小的时候不要选择去实现它，让我们拿着刀区找设计师就对了。。。



[vue ast](https://github.com/vuejs/vue/blob/v2.1.10/flow/compiler.js#L63-L142)

[vnode数据结构](https://github.com/vuejs/vue/blob/v2.1.10/src/core/vdom/vnode.js#L23-L50)

[解析vue2.0的diff算法](https://github.com/aooy/blog/issues/2)
