<!-- ---
title:  邀请老铁项目总结
date: 2019/03/10
tags:	
	- 项目
	- 随笔
--- -->
# 邀请老铁项目总结

### `vscode` 的基本配置

尽管自己大多数的时候是在使用 `vscode` 敲代码，但是对于其的配置没有过比较深的认识，带我的小姐姐很贴心地给了我很好的参考资料

[能让你开发效率翻倍的 VSCode 插件配置（上）](https://juejin.im/post/5a08d1d6f265da430f31950e)

[能让你开发效率翻倍的 VSCode 插件配置（中）](https://juejin.im/post/5ad13d8a6fb9a028ce7c0721)

在里面最喜欢的就是 [Settings Sync](https://link.juejin.im/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DShan.code-settings-sync)，基于 `gist`，可以备份我们的一些配置，插件，当我们换了个环境也能快速的搭建我们自己喜欢的敲代码的环境。

由于自己对于一些插件的不熟悉，就踩了坑。由于不了解  `EditorConfig for VS Code` 而自己又在项目中添加了 ` .editorconfig`，且自己使用了 `vscode` 的自动保存功能，导致代码刚刚敲完停顿一下就自动换行了，了解了 `insert_final_newline (on save)` 这句的意义修改 `vscode` 自动保存的机制就完美避开了。
<!--more-->

不过自己还是需要更多地了解 [Microsoft Visual Studio Code 中文手册](https://jeasonstudio.gitbooks.io/vscode-cn-doc/content/)

### Vue 项目的搭建

大概秋招过后对于前端的知识就开始比较懈怠了，`vue cli3` 出来后都没有去尝试过，当时搭项目还是用的 `vue cli2` 照着 `taskcenter` 项目进行的配置。其实项目是能跑的，就是其中一些插件没有使用过，导致出了些问题，而自己对于其中的与案例并不了解所以糊里糊涂的。 主要知识点是 [`css`](https://cli.vuejs.org/zh/guide/css.html) 相关的

* [postcss](<https://postcss.org/)
* [css module](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

刚开始使用 `CSS module` 就把自己放在坑里了。还问了带我的小姐姐我是不是哪里写错了，小姐姐看了代码说我是个天坑，我将好好地 `module` 写成了 `moudle` 当时还感觉自己拼的没问题，感到尴尬，所以说敲代码还是要细心，不过有个插件在这种时候就很有用，[Code Spell Checker](https://link.juejin.im/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dstreetsidesoftware.code-spell-checker) 对于我这种英语烂的人，会提醒我是不是这个单词拼错了，很是方便。项目使用 `动态 rem` 而我用不想用 sass 用函数来解决，使用 `postcss` 很自然的搜索到了 `postcss-pxtorem`，而我当时直接将 `vue cli2` 下的 `.postcssrc.js` 迁移到 `vue-cli3` 下直接使用，发现没有效果（但是官网说的是能用  [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config) 可能是我少了啥吧），后面看换成在根创建 `vue.config.js` 

```javascript
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-pxtorem")({
                        // 把px单位换算成rem单位
                        rootValue: 16, // 换算的基数(设计图750的根字体为32)
                        selectorBlackList: ["weui", "mu"], // 忽略转换正则匹配项
                        propList: ["*"]
                        //......
```

还有一种就是直接在 `package.json`  搜索 `postcss` 在其插件下添加要使用的插件后 `npm i` 

### Vue 知识点

#### [深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html) 

官方文档中这一节应该是最最重要的，之前也是看了很多遍，但是自己其实了解的并不深入所以嘿嘿嘿忘光光。自己之前写的 [面向对象程序设计](https://unbrain.github.io/2018/08/03/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E4%B8%80%EF%BC%89/) 中写了

#### 对象的属性类型

> - 数据属性
>   `[[Configurable]]` `[[Enumerable]]` `[[Writable]]` `[[Value]]`
> - 访问器属性
>   `[[Get]]` `[[Set]]` `[[Configurable]]` `[[Enumerable]]`
>   访问器属性必须通过 Object.defineProperty() 来进行定义
>   定义多个属性使用 Object.defineProperties()
>   Vue 的响应式就离不开访问器属性，但是 Object.defineProperty() 这东西又支持的 IE9+，IE8部分支持这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因。
>   [如何监听 js 中变量的变化?](https://www.zhihu.com/question/44724640)
>   读取属性的特性使用 Object.getOwnPropertyDescriptor()

那天一起实习的问我为啥她给对象赋值而 Vue 并没有检测到，当时也没有一下反应过来，直到看到一个空对象

> Vue **不能检测到对象属性的添加或删除**。由于 Vue 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 Vue 转换它，这样才能让它是响应的。使用 `Vue.set(object, key, value)` 方法将响应属性添加到嵌套的对象上。

顺便注意 Vue 中 `Array` 不能检测到数组修改 `length`，以及用索引来设置一个项。

#### [实例生命周期钩子](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

 对生命周期的了解不够，当时我做滚播的时候需要去获取文本的宽度，而我用的是 `beforeCreate` 以至于报错，在后面我使用 `json-server` 来 mock 数据时又再一次使用了 `beforeCreate` 而一般是使用 `created` 比较好。 [`created`](https://cn.vuejs.org/v2/api/#created) 钩子可以用来在一个实例被创建之后执行代码。

#### [进入/离开 & 列表过渡](https://cn.vuejs.org/v2/guide/transitions.html)

写滚播组件小姐姐鼓励让我用更多的方法去实现，开始没有使用 Vue 提供的 `transition` 封装组件，而是使用 `refs` 去获取宽高做一个垂直水平的不定长的数据无缝滚播，当时代码个人觉得使用 method 在 JavaScript 中去控制了 CSS 耦合性较高，后面看别人开源项目的代码改成使用 computed 绑定 `style` 来解决。后面自己也使用了 `transition-group` 实现了较为相同的效果。不过后面小姐姐让我试试 push shift 来实现，然后我就踩坑了。按照官方文档写的样式动出来的效果让我怀疑了人生不值得啊。

```css
.lists {
  width: 154px;
}
.list-enter {
  transition: 2s ease;
  transform: translateY(100%);
}
.list-leave-to {
  transition: 2s ease;
  transform: translateY(-100%);
}
```

 效果：

![](/img/t1.gif)

这不行啊，照着官方弄出来的样子[列表的排序过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E7%9A%84%E6%8E%92%E5%BA%8F%E8%BF%87%E6%B8%A1)

```css
.lists {
  width: 154px;
  transition: 2s ease;
}

.list-enter {
  transform: translateY(100%);
}
.list-leave-to {
  transform: translateY(-100%);
}

.list-leave-active {
  position: absolute;
}
```

改成这样就好了，我也是不知道咋说了。但是仍然有问题

![](/img/t2.gif)

 到顶了应该往上往下是如何想的亲，我明明设置了你出去的时候可是 `translateY(-100%)` 你为啥不听话？？？后面想他可能是到头了

```javascript
const a = this.currArr.shift();
this.currArr.push(a);
```

 就好像轮播图他到顶的时候你不给他个假数据他是会一下越到开始，那个他填个假数据? 不过我使用了 `setTimeout` 让 `push` 延迟执行，就能运行了。

#### 一些细节

- 模板语言一般能使用 `v-text` 就不用双括号
- `v-for ` 的 `key` 不要给 `item`，说不定他哪天变成了 `object` 了呢。
- 不使用相对路径，用 `'@/'`
- 数据能放 `data ` 就放 `data` 与函数解耦

### CSS

css 的知识点一直是蛮多，需要自己多用，判断不同的环境下使用什么样的解决方案才是最优的，css 是前端的一个石头需要下功夫。最近在项目上去学习了如何适配 iphone x 这样的异形屏，在视网膜屏下如何去实现 1px 以及兼容问题。同时自己对于浏览器的一些机制不够了解也踩了些坑，比如 chrome pc 上默认最小字号为 12px等等，对 css 的继承弄的也不是很清晰了[CSS Inheritance, The Cascade And Global Scope: Your New Old Worst Best Friends](https://www.smashingmagazine.com/2016/11/css-inheritance-cascade-global-scope-new-old-worst-best-friends/)。使用 `iconfont` 当时就有一个坑，我想改变 svg 的颜色，但是用 `fill：color` 没有用，查资料才知道要先去色才能使用 `fill`。


###  代码规范

自己以前都是自己写自己的代码，对于可读性是毫不关心的，命名如何简单如何来，恩，反正我自己的代码我自己都不想看。实习才认识到代码可读性的重要，代码语义化，去 `github` 看别人好的开源代码命名都是非常的清晰明了的，这样有助于维护，至少你没有让来看你代码的人去猜测你到底写的是啥，接手你代码的人不会骂你妈妈。团队中样式代码的顺序

> 展示类--定位类--结构类--文本结构类--文本类--动画变形

* [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
* [Principles of writing consistent, idiomatic CSS](https://github.com/necolas/idiomatic-css)

感觉自己写的 `CSS` 还要好好规范，自己以前写代码尽管知道 `mixin` 但是对于自己的代码分析不够清晰，也没有想着去用像

```css
diplay： flex；
jiustify-content：center；
align-items： center；
```

宁愿自己写上个几十遍也不用 `mixin`，这些习惯都是要尽快改的，用着 `postcss` 这样的工程化语言不减少机械的工作我用他干嘛。之前尽管也了解 `resetcss` 及 `normalize`，这段时间自己着去也尝试用了。

`JavaScript` 的编程规范，由于是团队合作，写的是上线项目，不像是平常怎么方便怎么来，代码更加严格是对自己负责也是对项目负责，好的编码习惯真的很重要，不然打开命令行，`eslint` 全线飘红，真的难受。

* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## 总结

这次的 `demo` 让我更加贴近一个真正的上线项目他将经过的流程，会使用到的方法，问题如何解决，如何规避。同时也看到自身很多的不足，基础的知识慢慢在忘记，新的知识又不够了解，要走的路要学习的东西还有很多，希望自己不要浮躁，实在一点的同时能够快速成长汲取知识。对于拿到设计稿来做自己是比较生疏的，不够了解流程，对于如何与设计师交流，对于设计稿中的不合理的地方要敢于质疑，实现成本较高的时候用较为容易的方案替代，以及对于颜色要永远相信自己的眼睛，因为导出的时候可能出错，对于我这种不会欣赏的人我觉得未来有必要了解 UI/UX  设计。自己对于时间的把控还不够，不能估计出自己实现一个项目要花多长时间，这是在实习中应该尽快解决的问题。在平时的实践中，要多尝试，多去用没有使用过的东西，开阔眼界的同时，说不定哪天吹牛逼就用上了呢？尽管每一次开始用新东西的时候都有一堆坑在等着你，但是发现问题解决问题是一种很有成就感的事，前提是你解决了。。。写代码是件容易的事，但是写的明了简洁，可维护，可扩展是需要我多多实践以及思考的。如何将复杂的东西简单化，重复的事情不重做（Don't Repeat Yourself），这些东西是我知道却还没能做到的也是需要加强的。非常感谢带我的小姐姐这些天的悉心指导，小姐姐真的很细心也很机智，很多我想不到的解决方案她都能很快给我指一条清晰的路，很愧疚的是让她看了我那肮脏的代码，严重怀疑我代码加重了她的病情。
