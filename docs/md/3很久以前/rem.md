<!-- ---
title:  第二周知识记录
date: 2019/02/27
tags:	
	- 随笔
--- -->
# 第二周知识记录
**webkit-text-size-adjust: none** 已经对桌面 chrome 无效

[中文版Chrome浏览器不支持12px以下字体的解决方案](https://blog.csdn.net/freshlover/article/details/9746821)

[vue使用rem实现 移动端屏幕适配](https://www.cnblogs.com/zanguixuan/p/9811167.html)

### vscode 配置

vutur 插件会自动修改 ‘ 为 ” 修改其配置可以杜绝

setting-->extensions-->vutur

format html --> js-beautiful-html

frmat js --> vscode-typescript

这几天使用 vscode 感觉写代码及其难受，每次打完一行代码回车本来缩进是对的但是就一小会儿它自动就跳到了行头，毫无体验感。然后没办法一个插件一个插件得看发现罪魁祸首是 `EditorConfig for VS Code` 

```
indent_style
indent_size
tab_width
end_of_line (on save)
insert_final_newline (on save)
trim_trailing_whitespace (on save)<--保存时修剪尾随空格
```

其实主要是我的 vscode 使用了自动保存，所以就。。。然后修改为切换窗体保存就好了。

<!--more-->

### 一些样式解决方案

第一次对设计稿并不熟习所以坑是比较多的

一般使用使用 `视网膜@2X` 这样会比较好因为 iphone6/7/8 宽都为 375px 而我们的设计稿一般是 750px 的。使用其数据配合动态 rem 能够适配绝大多数的手机。

当使用 fixed 布局时注意其已经脱离了正常文档流，控制其宽度为固定值能减少 bug 出现。 

最好不要去设置高，能用 margin 或 padding 撑起来就行

当使用像 white-space 的样式时可能由于 margin padding 导致 bug 使用 div 嵌套包裹.

postcss 由于它是一个计算属性，它也适用于 `:class` 的 object/array 语法：

```html
<template>
  <div>
    <p :class="{ [$style.red]: isRed }">
      Am I red?
    </p>
    <p :class="[$style.red, $style.bold]">
      Red and bold
    </p>
  </div>
</template>
```

### 一些 js 问题

vue 动态绑定 img src 属性时需要注意该路径使用原文件的相对路径会发生错误，使用 require(src) 解决问题

vue复制到剪切板功能 [vue-clipboard2](https://github.com/Inndy/vue-clipboard2)

[JavaScript复制内容到剪贴板](https://juejin.im/post/5a94f8eff265da4e9b593c29)

当一个 vue 组件绑定了多个值的时候最好用一个对象来包含这些值，以免一个组件绑定了很多值，影响维护

#### 写一个 toast 组件

希望能够通过 `this.$toast('msg')` 的方式来创建，使用[插件](https://cn.vuejs.org/v2/guide/plugins.html)

```javascript
//pulgin.js
import Toast from './components/fin/toast.vue';

export default {
  install(v) {
    const Vue = v;
    Vue.prototype.$toast = (msg, toastOptions) => {
      // 在 Vue 中 创建 dom 节点
      const Constructor = Vue.extend(Toast);
      const toast = new Constructor({
        propsData: toastOptions
      });
      // solts 要在 mount 前面不然 msg 不显示
      toast.$slots.default = msg;
      toast.$mount();
      document.body.appendChild(toast.$el);
    };
  },
};
```

toast 创建后需要自动的销毁

```JavaScript
export default {
  name: 'toast',
  props: {
    autoClose: { type: Boolean, default: true },
    closeDelay: { type: [Number, String], default: 2 },
    enableHtml: { type: Boolean, default: false },
  },
  mounted() {
    this.updateStyles();
    if (this.autoClose) { setTimeout(() => { this.close(); }, this.closeDelay * 1000); }
  },
  methods: {
    updateStyles() {
      this.$nextTick(() => {
        if (!this.autoClose) {
          this.$refs.line.style.height =
            `${this.$refs.toast.getBoundingClientRect().height}px`;
        }
      });
    },
    close() {
      this.$el.remove();
      this.$destroy();
    },
  },
};
```



#### 滚播消息使用 vue 自带[进入/离开 & 列表过渡](https://cn.vuejs.org/v2/guide/transitions.html)

tranfrom 在 chrome 有可能下导致抖动及字体模糊

### scroll 穿透解决

当遮罩层出现时，记录当前文档在垂直方向已滚动的像素值，改动根节点样式 `overflow:hidden, height: 100vh`, 当关闭遮罩层时恢复样式并将屏幕滑动到之前记录的值。这是比较有效的方案，其他的方案试过都会有一定的 bug，如果当遮罩层里没有滚动使用 `@touchmove.prevent` 也还是不错，但是在本次 demo 中还有一个滚动所以使用这个还是比较好的。

```JavaScript
export default {
  data: function () {
    return {
      pageScrollYoffset: 0, // 保存滚动条位置
    };
  },
  methods: {
    getScrollTop() { // 获取滚动条位置
      this.pageScrollYoffset = window.pageYOffset;
    },
  },
  watch: {
    showRule(newVal) {
      this.getScrollTop();
      if (newVal === true) {
        const cssStr = 'overflow-y: hidden; height: 100vh;';
        document.body.style.cssText = cssStr;
      } else {
        const cssStr = 'overflow-y: auto; height: auto;';
        document.body.style.cssText = cssStr;
      }
      this.$root.$el.scrollTop = this.pageScrollYoffset;
    }
  },
};
```

 mdn 上写道

`pageYOffset` 属性是 `scrollY` 属性的别名：

```
window.pageYOffset == window.scrollY; // 总是返回 true
```

为了跨浏览器兼容，请使用 `window.pageYOffset` 代替 `window.scrollY`。另外，旧版本IE（<9）两个属性都不支持，必须使用其他的非标准属性。完整的兼容性代码如下：

```
var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
```

### 团队代码样式规范

```
display//展现类
position//定位类
top right bottom left
z-index
width//结构类
height
margin
padding
background
borde
overflow
text-align//文本结构类
line-height
font-size//文本类
font-weight
color
transform//变形和动画
transition
```



vim 

全选ggvG

全选复制ggyg



适配问题

vue router 使用

flex  导致渐变
