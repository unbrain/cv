---
title: 初探 MVC
tags:
	- 编程
	- MVC
---

> **MVC模式**（Model–view–controller）是[软件工程](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B)中的一种[软件架构](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E6%9E%B6%E6%9E%84)模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。
>
> MVC模式最早由[Trygve Reenskaug](https://zh.wikipedia.org/w/index.php?title=Trygve_Reenskaug&action=edit&redlink=1)在1978年提出[[1\]](https://zh.wikipedia.org/wiki/MVC#cite_note-1)，是[施乐帕罗奥多研究中心](https://zh.wikipedia.org/wiki/%E5%B8%95%E7%BE%85%E5%A5%A7%E5%A4%9A%E7%A0%94%E7%A9%B6%E4%B8%AD%E5%BF%83)（Xerox PARC）在20世纪80年代为程序语言[Smalltalk](https://zh.wikipedia.org/wiki/Smalltalk)发明的一种软件架构。**MVC模式**的目的是实现一种动态的程序设计，使后续对程序的修改和扩展简化，并且使程序某一部分的重复利用成为可能。除此之外，此模式通过对复杂度的简化，使程序结构更加直观。软件系统通过对自身基本部分分离的同时也赋予了各个基本部分应有的功能。专业人员可以通过自身的专长分组：
>
> - 控制器（Controller）- 负责转发请求，对请求进行处理。
> - 视图（View） - 界面设计人员进行图形界面设计。
> - 模型（Model） - 程序员编写程序应有的功能（实现算法等等）、数据库专家进行数据管理和数据库设计(可以实现具体的功能)。
>

### 总结一下：

简单来说 MVC 是一种代码设计模式，将代码分成三个部分，使得你的代码容易被理解
1. Controller 监听 Model 变化，Model 一变，Controller 就会去更新 View。
2. Controller 监听用户交互，用户点了提交或修改按钮，Controller 就要去更新 Model。