<!-- ---
title:  flask vue socket
date: 2019/03/10
tags:	
	- 项目
--- -->
# flask vue socket
![](/img/socket.jpg)

 昨天做 flask 后端与 vue 前端使用 socket 进行一个数据通信。一开始打开 8080 端口就报 cors 错的错，

查资料使用 flask-cors 解决。难受的是后面使用 vue-socket，其实已经能用了，可是我想用下他 vuex 的集成功能，顺便可以在这个项目上熟悉下 vuex，然后就变成了一个天坑。

[![](https://raw.githubusercontent.com/MetinSeylan/Vue-Socket.io/master/docs/logo.png)](https://github.com/MetinSeylan/Vue-Socket.io) 

这个可爱的官方文档给的东西也是给全了的，我肯定照着他敲啊。可是。。。可是他先用了 vue-socket 在介绍如何使用 vuex 集成，我很自然而然的将 vuex 放在了 vue-socket 后面导致用起来没反应，后面先将 vuex 申明成 store 再来 vue.use(VueSocketIO) 就能用了，而我在这个地方停留了一个多小时。。。难受香菇。。。。
