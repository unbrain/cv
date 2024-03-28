<!-- ---
title: Vue组件通信
date: 2018/6/17 20:46:25
tags:
	- vue
	- JavaScript

--- -->
# Vue组件通信

1. 父子组件
2. 爷孙组件
3. 兄弟组件

从这三个方面来分析一下 vue 的组件通信

## 父子通信

父亲给儿子一个数据，儿子通过 props

儿子通过 $emit() 子向父传递信息，有点像发布订阅模式

<!--more-->

```HTML
  <div id="app">
    <hr>
    <button @click="dadcall=!dadcall">爸爸</button>
    <div v-if="soncall">{{message}}</div>
    <hr>
  <son @call-dad="soncall=!soncall" :eat="eat" :dadcall="dadcall"></son>
  
  </div>
```

```javascript
Vue.component('son',{
    props: ['eat', 'dadcall'],
	template:`
    <div>
    <button @click="$emit('call-dad')">儿子</button>
    <div v-if="dadcall">{{eat}}</div>
    </div>`,
})

new Vue({
  el: '#app',
  data: {
    message: '别抽烟',
    eat:"吃饭",
    soncall:false,
    dadcall:false,
  }
})
```

[预览链接](http://jsbin.com/xalirufihi/edit?html,js,output)

[通过 Prop 向子组件传递数据](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE)

[通过事件向父级组件发送消息](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87%E4%BA%8B%E4%BB%B6%E5%90%91%E7%88%B6%E7%BA%A7%E7%BB%84%E4%BB%B6%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF)

## 爷孙通信

```html
  <div id="app">
    <button @click="yeye=!yeye" >爷爷</button>
    <hr>
    <dad :sleep="sleep" :yeye="yeye" @call="yeye=!yeye"></dad>
  
  </div>
```

```javascript
Vue.component('son',{
  props: ['yeye','sleep'],
  template:`
    <div>
      <button @click="$emit('call')">儿子</button>
      <div v-if="yeye">{{sleep}}</div>
    </div>`,
})

Vue.component('dad',{
  props: ['sleep', 'yeye'],
  template:`
  <div>
    <button @click="dad=!dad">爸爸</button>
    <div v-if="yeye">{{sleep}}</div>
    <div v-if="son">{{message}}</div>
    <hr>
    <son :sleep="sleep" :yeye="yeye" @call="$emit('call')"></son>
  </div>`,
})


new Vue({
  el: '#app',
  data: {
    message: '抽烟',
    sleep:"睡觉",
    son:false,
    dad:false,
    yeye:false,
  }
});
```

例子不是很好,但是通过调试可以很好的得出

父组件只能通知子组件而不能通知到子组件其自身的子组件,同样的其自身的子组件也只能通知其父组件而不能通知其父组件的父组件.爷孙组件的通信只能通过父组件作为一个枢纽来进行信息的交换



## 兄弟组件

通过上面的介绍你当然可以此想到兄弟间该如何通信,让他们在同一父组件下,通过父组件为枢纽来进行数据交换



## [组件名的大小写](https://cn.vuejs.org/v2/guide/components-registration.html#%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99)

写代码的时候常常在 template 使用驼峰式命名法导致一直渲染不出却没有报错

定义组件名的方式有两种：

使用 kebab-case
当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

使用 PascalCase
当使用 PascalCase (驼峰式命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

