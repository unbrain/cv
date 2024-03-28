<!-- ---
title: webpack 初识
date: 2018/6/1 20:46:25
toc: true
tags:
	- webpack
	- 编程
--- -->
# webpack 初识

## 为啥要用 webpack
### [sass](https://github.com/sass/node-sass)

为了更快更方便的编写 css 代码你是有可能使用 sass 等等，但是很明显的你不可能在 html 中直接的应用 sass，你必使用进行了转译才可以啊。

```shell
node-sass input output
```

但是每一次更改都要重新转译很麻烦，所以一般就是

```shell
node-sass input output -w
```

以上 intput output 都是原文件地址。

<!--more-->

注意点：我是在 linux 系统上的，大家按照官网做就好，但是你要知道这是一个玄学。

### [babel](https://babeljs.cn/)

有了 babel 你可以畅快的敲代码而不管 ie 是否兼容，babel 会帮你完成的。

```shell
./node_modules/.bin/babel src -d lib
```

src 原地址 lib 目的地址，对 shell 不熟悉的我懵逼了几分钟，要花点时间看看 shell 了。

为了自动化的编程当然要监视是否进行了更改啊

```shell
./node_modules/.bin/babel src -d lib -w
```

不过当时是有问题的，通过 google 在 stackoverflow 解决

好了看到这两个小东西是不是感觉自己的时间会大大减少啊，小吊的样子，但是如果开很多的监视窗口是不是会觉得很烦啊

这个时候就有了 webpack 当然他前面还有 gulp 等自动化工具，可惜屎了，我想想webpack 这个玄学的东西很有可能也后不久了。

## [webpack](https://github.com/webpack/webpack)

玄学的东西

别看中文文档，至少你的看看英文的再看中文有没有大的区别，至少我看的时候差别不是一般的大。

然后就可以 google 搜索 webpack sass/babel 你就会得到 sass loader 和 babel loader 按着 github 官方文档走没啥问题的。

每次 webpack 会自动帮你完成之前你要自己完成的步骤，你可以这样

```shell
npx webpack -w
```

如果你看到 bundle.js 中的代码为一行是因为 webpack 4 的模式默认为生产者模式，你只要改成开发者模式即可。
