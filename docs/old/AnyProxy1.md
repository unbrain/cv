<!-- ---
title: AnyProxy 上手
date: 2019/01/19
tags:
	- 编程
	- anyproxy
--- -->

# AnyProxy 上手

![](/img/anyproxy.png)

上一篇我浅显的介绍了 `anyproxy`，但是为了获取到请求头的数据我得打开 `127.0.0.1:8002` 去筛选后去复制他的请求头，一两次无所谓，可是这里面的一些东西是会过期的，我该如何解放我自己呢，当时我自己写爬微信的东西就是 `ctrl+c/v` 看了 [weixin_crawler](https://github.com/wonderfulsuccess/weixin_crawler) 下 `proxy.js` 才有了头绪。其实在 [官方文档](http://anyproxy.io/cn/) 都写的很明白，但是自己并没去更深的了解。

<!--more-->

其实主要局势使用 `anyproxy` 提供的二次开发 `rule` 模块。定义自己的处理逻辑。

开始的时候就有一个 `hash` 

```javascript
var interest_url = {
    "load_more": "https://mp.weixin.qq.com/mp/profile_ext?action=getmsg", //更多历史消息
    "getappmsgext": "https://mp.weixin.qq.com/mp/getappmsgext?", //阅读消息
    "appmsg_comment": "https://mp.weixin.qq.com/mp/appmsg_comment?action=getcomment", //评论信息
    "content": "https://mp.weixin.qq.com/s?", //文章正文html
}
```

他们的用处注释已经很清楚了，其实就是先去点击微信然后看他发出了那些请求得到了什么分析出链接用处，阅读消息个人觉得是最有用的，点赞，阅读量等很有价值。

作者在存储 `redis` 时设置了过期时间。

其他的代码都很好理解，就是自己打的时候肯定还要不停的修改，可以说作者 `js`  还是玩的很不错。
