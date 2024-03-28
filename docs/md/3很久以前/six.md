<!-- ---
title:  第六周随笔
date: 2019/03/29
tags:	
	- 随笔
--- -->
# 第六周随笔
### 拼图验证组件实现

最开始对于该组件的计划是

>### 第一天
>
>- canvas 画线切图进行 x 轴偏移(记录 x )  
>- 用户 touchstart touchend 时间差以及 x 轴位移量进行校验 
>- 三次失败后刷新图片
>
>### 第二天
>
>- 在上一次切图的 y 轴上再次切同一形状的图产生混淆增加校验难度（注意 x 轴避免重合）
>- 用户自刷新
>- 用户关闭
>- 移动端以及 pc 的适配
>
>### 未考虑
>
>- 人机识别机制
>- 前端校验安全问题



<!---more-->

后面在实现的过程中发现这个时间计划还是没有达到，达到上面的效果差不多是 3 天，加上后面的优化以及移动端调试花了 近 5 天。

> 问题发现并解决：
>
> - canvas 图片模糊
> - 滑动条优化
> - 滑动后状态提示
> - 检测 y 轴变化(人机识别)
> - 刷新过快问题

#### canvas 宽高设置

一开始就在这里踩坑了。。。图片模糊到自己不愿看

后面重新看了下 mdn [Canvas的基本用法](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

在使用 canvas 的时候，需要设置画布的大小，要使用的是 canvas 的 width 与 height 属性，而不是设置 canvas 的 style 或者CSS样式中的 width 与 height 。

因为在绘制的过程中画布内容的实际大小是根据 canvas 的 width 与 height 属性设置的，而 style 或者CSS设置的width 与 height 只是简单的对画布进行缩放。

所以在写代码是使用了

```javascript
for (let key in this.$refs) {
    this.$refs[key].width = this.inView.width;
    this.$refs[key].height = this.inView.height;
}
```

#### 拼图的绘制

实现有凸起有缺口的拼图形状，使用 canvas 绘制[圆弧](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#%E5%9C%86%E5%BC%A7)。绘制出形状，再填充，后[裁剪](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing#A_clip_example)，再偏移就可以得到，一个离开原始位置的拼图块。这里使用多个 canvas 来实现一个图像的样子来使复杂的东西简单化 [使用多层画布去画一个复杂的场景](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#%E4%BD%BF%E7%94%A8%E5%A4%9A%E5%B1%82%E7%94%BB%E5%B8%83%E5%8E%BB%E7%94%BB%E4%B8%80%E4%B8%AA%E5%A4%8D%E6%9D%82%E7%9A%84%E5%9C%BA%E6%99%AF)

```JavaScript
// 画布 底层
this.ctx.drawImage(img, 0, 0, this.inView.width, this.inView.height);
// 切拼图层
this.drawArc(this.twoCtx, this.clipX, this.blockY, 'clip');
this.twoCtx.drawImage(img, 0, 0, this.inView.width, this.inView.height);
// 画两个假拼图块
this.drawArc(this.thrCtx, this.clipX, this.blockY, 'fill');
this.drawArc(this.thrCtx, this.trickX, this.blockY, 'fill');
// 画移动块层
const ImageData = this.twoCtx.getImageData(this.clipX - 1, this.blockY - 2, this.puzzle.width, this.puzzle.height);
this.fouCtx.putImageData(ImageData, 0, this.blockY - 2);
```

#### 使用 css transition 并且使用 CSS module 会遇到问题

当在 module 中写带上 transition name 的样式会自动加上前缀，这样写的样式就没有用，于是将 transition 样式放在了 index 中（感觉并不是很好的方法）

#### 使用 element.getBoundingClientRect() 获取对于视窗的参数

getBoundingClientRect()  会返回 DOMRect 的对象，当时直接使用 Object.assign 进行拷贝得到了 undefined

搜索可以看到 [Why are properties of this object (DOMRect) inaccessible to standard Javascript functions?](https://stackoverflow.com/questions/42713229/why-are-properties-of-this-object-domrect-inaccessible-to-standard-javascript)

> `Object.assign` and `Object.keys` are working with **own** enumerable properties. `DOMRect`properties are inherited from `DOMRectPrototype` and cannot be accessed by those methods.

当时下面建议使用 lodash。。。以及

> Based on this answer, 

[7vujy0f0hy found](https://stackoverflow.com/questions/42713229/why-are-properties-of-this-object-domrect-inaccessible-to-standard-javascript/42714159?noredirect=1#comment72552916_42714159) the acceptable [solution](https://jsfiddle.net/esheytbu/):
>
> ```
> var ownify = input => 
>                Object.keys(Object.getPrototypeOf(input)).reduce((output,key) => 
>                  Object.assign(output, {[key]: input[key]}), Object.assign({}, input));
> 
> test(ownify(el.getBoundingClientRect())); /* apparently works! */
> ```
>
> (Although it iterates only over one level of inheritance, attributes from deeper levels will be still missing)

我尝试第二个方法，由于其仅迭代一个级别的继承，丢失不少的属性于是放弃。

参考 stackoverflow 使用了 toJSON() 得以解决。[How best to convert a ClientRect / DomRect into a plain Object](https://stackoverflow.com/questions/39417566/how-best-to-convert-a-clientrect-domrect-into-a-plain-object)

过几天再回来看我发现使用 `toJSON()` 并不明智，使用该方法在 chrome 上没有问题，但是当使用移动端 uc 夸克等浏览器会报错

```JavaScript
this.$refs.canvasFir.getBoundingClientRect().toJSON() is not a function
```

当时就无助，相当无助，咋还没这方法了。。。于是查看了下 stackoverflow 写得很清楚。。。

> **Warning:** non-standard behavior (doesn't work in 
[Firefox < 62](https://bugzilla.mozilla.org/show_bug.cgi?id=1186265), including ESR 60 and possibly other browsers other than Chrome)

```
JSON.stringify(this.$refs.canvasFir.getBoundingClientRect()) //{}
```

返回一个空也是没谁了，后面没办法就将 `getBoundingClientRect()` 进行封装了一下

```JavaScript
getBoundingClientRect(element) {
	const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect();
	return { top, right, bottom, left, width, height, x, y }
},
```

#### pc 与移动端兼容 touchmove 与 onmousmove

mdn 写到

>**onmousemove** 属性用来获取或设置当前元素的`mousemove`事件的事件处理函数
>
>```
>element.onmousemove = event handling code
>```
>
>当用户在**当前元素**上移动鼠标时会触发 `mousemove` 事件

如果鼠标移出元素将放弃监听，而 touchmove 则不是这样，所以在 pc 使用鼠标的监听的位置要慎重选择 

#### 移动端调试

移动端调试痛点？——送你五款前端开发利器

尝试了一下以下两种方法，并看了下 mac 与 ios （可惜手上没有）

[vConsole](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FTencent%2FvConsole)

chrome + andriod [谷歌官方文档](https://link.juejin.im/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ftools%2Fchrome-devtools%2Fremote-debugging%2F%3Futm_source%3Ddcc%26utm_medium%3Dredirect%26utm_campaign%3D2016q3)

在调试的过程中发现，chrome 使用该项目没有啥问题，但是使用 uc 等浏览器会发现，左右滑动拼图块将触发浏览器自带的下一页/上一页的情况

于是在组件的监听处加了 `@touchmove.prevent` 发现在夸克浏览器能解决该问题而在 uc 上仍然存在，后面再添加 `@touchstart.prevent` 就能避免，删掉 `@touchmove.prevent` 测发现可以不需要他，猜测他们的上一页与下一页是基于 touchmove 的吧。

#### 刷新

这种会出现请求的，应该出考虑大量请求下会出现的问题，太快会影响用户体验同时对于后端也不够友好。

### 签到优化

上周做这个项目说实在没有对自己负责，自己是不够认真的，有很多问题，出现了没解决，同时不确定的需求没有去问，对于细节的把控不到位，整体感觉比较浮躁，东西很糟糕。这是自己需要花时间去调整，将手上的每一个东西动作到不仅仅是能用就行，而是说他能够给用户一个好的体验，这时需要花时间的，还需要自己去反思自己在工作上时候的态度，如何对自己负责对项目负责。

- 自动签到金币动画优化

之前仅仅是一个 360 的图片自旋转，效果比较糟糕。

学习逐帧动画，并自己使用 ps 对多张图片进行拼接。[How to Use steps() in CSS Animations](https://designmodo.com/steps-css-animations/)

```css
animation: rolls 2s steps(8, start) 1 reverse;
@keyframes rolls {
  to {
    background-position: 0 bottom;
  }
}
```

- 签到条不同签到状态颜色优化
- 全部兑换功能实现
- 提现页实现
