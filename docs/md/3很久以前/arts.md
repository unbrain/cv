<!-- ---
title:  终？
date: 2019/05/09
tags:	
	- 随笔
--- -->

#  终？

![](/img/end.jpg)

时日如飞，三个月的时间即将而至，我的实习也到了尾声。

这段时间很快，比我刚开始想象的快多了，我也如愿以偿的逃离了想逃离的东西。

没有鸡汤 just for fun

<!--more-->

### 二维码

[二维码的生成细节和原理](<https://coolshell.cn/articles/10590.html>)

[【科普文】二维码的[生成]和[扫码]](<https://juejin.im/post/58eb05ffb123db1ad06615c9>)

两个思考：

为啥几乎都是黑白色的

二维码中间有图片为啥还能用

###  fontface 小图标

看到 fontfamily："wbficonregular" *!important*; ？？？黑人问号脸，这是啥啊

[font-face](<https://www.zhangxinxu.com/wordpress/2017/03/css3-font-face-src-local/>)

### [vue 事件修饰符](<https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6>)

修饰符是可以串联的

```javascript
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

### Git 工作流

#### Git协同工作流

这段时间写的线上代码多了些，对 git 使用也有了一个更深的了解

中心式协同工作流

这应该是自己一个人敲代码的时候最常使用的方式了，他就像 svn 一样

- git pull origin master 先同步远程代码
- 修改后 git commit
- git push origin master 到远程这样其他同学就可以看到你的代码了

但是第三不在多人合作下是有可能 push 失败，因为别人提交了，你需要 git pull

- 先把本地提交的代码放在一边
- 下载服务器的改动
- 把之前的改动与新的改动一个个 commit

有冲突你必须先解决冲突

#### 功能分支协同工作流

上面的方法是可行的，可是这几天写代码我也是感到了痛苦。如果项目的人再多一点我觉得很有可能是要出问题的。对代码的干扰相当严重。因此有了功能分支，像我就把新需求群二维码就拉了一个 qrcode

- git checkout -b qrcode
- 共同开发这个功能的程序员就在这分支工作，add，commit
- git push -u orgin qrcode
- git pull --rebase 其他程序员来拿到分支的代码

我觉得开发的时候能提交就尽快提交，不然太久可能冲突就太多了。。。

#### GitFlow 协同工作流

在不停开发新代码的同时，维护线上代码中

- 我们需要一个分支是干净的，可以发布代码，是可以发布到生产环境的

我之前有一个分支就是可以直接到测试环境的，然后写代码就一直在那个分支写，后面只上部分功能的时候就傻了。自己手里就没有了一个可以发布代码的测试环境。。。管理好代码的一致性还是非常重要的

![](/img/gitflow.png)

我只是希望我是右边。。。对 git 的理解还是太浅了。。。

### 代码规范

当拿到 webchat 提交几次代码我就深深体会到代码团队规范多么重要，之前的还把 eslint 禁用了。。。

### 计划

ARTS 每周完成一次

（Algorithm）一个 leetcode 的算法题

（Review）阅读并点评至少一篇英文技术文章

（Technique）学习至少一个技术技巧

（Share ）分享一篇有观点和思考的技术文章

