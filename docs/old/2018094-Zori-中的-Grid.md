<!-- ---
title: Zori 中的 Grid
date: 2018/09/4
tag: 
	- Vue
	- JavaScript
--- -->
# Zori 中的 Grid

## 需求

实现一个 `Vue` 中能使用的栅栏网格，总计每行为 24 份，用户可选择每一列所占份数，左边间隔（可以没有），以及可显示输入每一份之间的间隔（可以没有）。

<!--more-->

## 实现

### 组件

用两个组件 `col.vue` 以及 `row.col` 表示列以及行

### col.vue

用户再输入标签时带上数据 `span` 以及 `offset` 代表份数及左边间隔，使用 `props` 传入，间隔更具传入的数据用 `scss` 进行更改样式

```scss
$class-prefix: span-;
@for $n from 1 through 24{
    &.#{$class-prefix}#{$n}{
        width: ($n/24)*100%;
    }
}
```



本来样式最开始的时候我是写在 `template` 上的，但是一旦数据增加上去的话可读性就送到了影响，就放到 `script` 中，由于 `span` 及 `offset` 是在组件中是会改变的于是使用计算属性，同时我使用了 `ES6` 结构赋值。

## row.vue

行组件代码是比列组件是要少上不少的但是有一个难点，所以理解上是比列组件要复杂点的。

之前有一个需求是可以输入每一块的间隔，由于这个间隔对于每一个行组件中的列组件是一样的，所以我们没必要写在列组件上而是写在行组件上就好了，就好像事件代理一样。但是我们应该如何通过行组件告知列组件他们的间隔（`gutter`）呢？

这就要用到生命周期 `mounted` ，`mounted` 是在 `created` 之后的，产生后挂载。所以我们可以在他们挂载后将 `gutter` 传给他们的子组件

```JavaScript
mounted(){
    this.$children.foreach((vm)=>{
        vm.gutter = this.gutter
    })
}
```



