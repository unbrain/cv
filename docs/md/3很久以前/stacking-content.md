<!-- ---
title: 堆叠顺序
date: 2018/5/17 20:46:25
toc: true
tags:
	- CSS
--- -->
# 堆叠顺序
就好像一个`div`他的`background`的颜色是会在`border`下面的，可以通过设置`rgba`来验证

1. background
2. boder
3. 块级
4. 浮动
5. 内联
6. z-index: 0（定位才有效）
7. z-index(+)

<!--more-->

### 堆叠上下文

只要满足以下的条件

> - 根元素 (HTML),
> - z-index 值不为 "auto"的 绝对/相对定位，
> - 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex，
> - [`opacity`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity) 属性值小于 1 的元素（参考 [the specification for opacity](http://www.w3.org/TR/css3-color/#transparency)），
> - [`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 属性值不为 "none"的元素，
> - [`mix-blend-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode) 属性值不为 "normal"的元素，
> - [`filter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)值不为“none”的元素，
> - [`perspective`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)值不为“none”的元素，
> - [`isolation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/isolation) 属性被设置为 "isolate"的元素，
> - `position: fixed`
> - 在 [`will-change`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change) 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考 [这篇文章](http://dev.opera.com/articles/css-will-change-property/)）
> - [`-webkit-overflow-scrolling`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-overflow-scrolling) 属性被设置 "touch"的元素

[MDN stacking content](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)

[张鑫旭](http://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
