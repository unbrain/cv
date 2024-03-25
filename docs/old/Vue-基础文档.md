<!-- ---
title: Vue 基础文档
tags:
	- JavaScript
	- vue
--- -->

# Vue 基础文档

## Vue 实例

### [创建一个 Vue 实例](https://cn.vuejs.org/v2/guide/instance.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-Vue-%E5%AE%9E%E4%BE%8B)

```javascript
var vm = new Vue({
  // 选项
})
```

### [数据与方法](https://cn.vuejs.org/v2/guide/instance.html#%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%96%B9%E6%B3%95)

#### Object.freeze()
`Object.freeze()`，这会阻止修改现有的属性，也意味着响应系统无法再*追踪*变化

<!--more-->

```html
<div id="app">
  <p>{{ foo }}</p>
  <!-- 这里的 `foo` 不会更新！ -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```

```javascript
var obj = {
  foo: 'bar'
}

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```

### [实例生命周期钩子](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

生命周期钩子就好像是为了方便在不同的阶段中选择一个阶段去干该干的事

有 [`created`](https://cn.vuejs.org/v2/api/#created)、[`mounted`](https://cn.vuejs.org/v2/api/#mounted)、[`updated`](https://cn.vuejs.org/v2/api/#updated) 和 [`destroyed`](https://cn.vuejs.org/v2/api/#destroyed)等。

> 生命周期钩子的 `this` 上下文指向调用它的 Vue 实例,所以不要在选项属性上或回调上使用箭头函数

![](./img/lifecycle.png)

## 模板语法

也可以不使用，直接用 render()

### 文本
数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值

通过使用 [v-once 指令](https://cn.vuejs.org/v2/api/#v-once)，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。

### [原始 HTML](https://cn.vuejs.org/v2/guide/syntax.html#%E5%8E%9F%E5%A7%8B-HTML)

```html
<div id="app">
 <p>Using mustaches: {{ rawHtml }}</p>
 <p>Using v-html directive: <span v-html="rawHtml"></span></p>
</div>
```

```javascript
new Vue({
  el: '#app',
  data: {
    rawHtml: '<span style="color:red">Hello Vue.js!</span>'
  }
})
```

> 你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。请只对可信内容使用 HTML 插值，**绝不要**对用户提供的内容使用插值。

### [特性](https://cn.vuejs.org/v2/guide/syntax.html#%E7%89%B9%E6%80%A7)

```html
<div id="app">
 <button v-bind:disabled="isButtonDisabled">Button</button>
</div>
```

```javascript
new Vue({
  el: '#app',
  data: {
  	isButtonDisabled: undefined,
  }
})
```

### 指令

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，`v-bind` 指令可以用于响应式地更新 HTML 特性

另一个例子是 `v-on` 指令，它用于监听 DOM 事件

`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

### [计算属性缓存 vs 方法](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95)

```JavaScript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }，
  methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
})
```

同名的函数是不可以的，开始的时候他会直接找到methods中的函数，就不会找到，computed的同名函数，这是要注意的。

不同的是**计算属性是基于它们的依赖进行缓存的**

计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

我对侦听器的了解感觉还不够

### Class 与 Style 绑定

表达式结果的类型除了字符串之外，还可以是对象或数组。

## 组件基础

组件是可复用的 Vue 实例，且带有一个名字

```JavaScript
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。

[`data` 必须是一个函数](https://cn.vuejs.org/v2/guide/components.html#data-%E5%BF%85%E9%A1%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0)

```javascript
data: function () {
  return {
    count: 0
  }
}
```
