<!-- ---
title: HTTP 入门
tags:
	- 编程 
	- HTTP
--- -->
#  HTTP 入门
> This is for everyone				                                                               
>
> —[Tim Berners-Lee](https://zh.wikipedia.org/wiki/%E8%92%82%E5%A7%86%C2%B7%E4%BC%AF%E7%BA%B3%E6%96%AF-%E6%9D%8E#cite_note-OlympicsTweet-15)（下文简称为Lee）

当你习惯了一件事情你每一天都要去用它，若你能去了解他形成的原因的时候你定会感慨创造他的人是如此的了不起进而由衷的崇拜与感激。

<!--more-->

### 历史

Lee 在[欧洲核子研究组织](https://zh.wikipedia.org/wiki/%E6%AD%90%E6%B4%B2%E6%A0%B8%E5%AD%90%E7%A0%94%E7%A9%B6%E7%B5%84%E7%B9%94)上班，发现大家的电脑的系统都不一样，而为了方便大家的通信他想到来制定一种协议来是大家发送的信息在不同的地方得到相同的显示效果。进而有了 HTTP,HTML, 他弄出了第一台服务器，浏览器及第一个网页。并在 2017 获得图灵奖。

### URL(Uniform Resource Locator)

就是大家常说的网址，有了 URL 我们可以获取想要得到的信息。

[超文本传输协议](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)（[HTTP](https://zh.wikipedia.org/wiki/HTTP)）的统一资源定位符将从因特网获取信息的五个基本元素包括在一个简单的地址中：

1. 传送协议。（http/https）
2. 层级URL标记符号(为[//],固定不变)
3. 访问资源需要的凭证信息（可省略）
4. 服务器。（通常为[域名](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D)，有时为[IP地址](https://zh.wikipedia.org/wiki/IP%E5%9C%B0%E5%9D%80)）
5. 端口号。（以数字方式表示，若为HTTP的默认值“:80”可省略）
6. 路径。（以“/”字符区别路径中的每一个目录名称）
7. 查询。（GET模式的窗体参数，以“?”字符为起点，每个参数以“&”隔开，再以“=”分开参数名称与数据，通常以UTF8的URL编码，避开字符冲突的问题）
8. 片段。以“#”字符为起点[[2\]](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%AE%9A%E4%BD%8D%E7%AC%A6#cite_note-2)

以*http://zh.wikipedia.org:80/w/index.php?title=Special:%E9%9A%8F%E6%9C%BA%E9%A1%B5%E9%9D%A2* 为例, 其中：

1. **http**，是协议；
2. **zh.wikipedia.org**，是服务器；
3. **80**，是服务器上的网络[端口号](https://zh.wikipedia.org/w/index.php?title=%E7%AB%AF%E5%8F%A3%E5%8F%B7&action=edit&redlink=1)；
4. **/w/index.php**，是路径；
5. **?title=Special:%E9%9A%8F%E6%9C%BA%E9%A1%B5%E9%9D%A2**，是询问。

大多数[网页浏览器](https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E6%B5%8F%E8%A7%88%E5%99%A8)不要求用户输入[网页](https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5)中“**http://**”的部分，因为绝大多数网页内容是超文本传输协议文件。同样，“**80**”是超文本传输协议文件的常用端口号，因此一般也不必写明。一般来说用户只要键入统一资源定位符的一部分（**zh.wikipedia.org/wiki/Special:%E9%9A%8F%E6%9C%BA%E9%A1%B5%E9%9D%A2**）就可以了。

由于超文本传输协议允许服务器将浏览器重定向到另一个网页地址，因此许多服务器允许用户省略网页地址中的部分，比如 **www**。从技术上来说这样省略后的网页地址实际上是一个不同的网页地址，浏览器本身无法决定这个新地址是否通，服务器必须完成重定向的任务。

#### URN,URI,URL

URI可被视为定位符（URL），名称（URN）或两者兼备。[统一资源名](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%90%8D)（URN）如同一个人的名称，而[统一资源定位符](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%AE%9A%E4%BD%8D%E7%AC%A6)（URL）代表一个人的住址。换言之，URN定义某事物的身份，而URL提供查找该事物的方法。(URL 是 URI 最常见的形式)

### DNS（**D**omain **N**ame **S**ystem）

通过 DNS 我们可以获取查询网址的 IP 地址，因为 IP 地址实在是难以记住而网址大多比较容易记忆

![](/img/dns.png)

### HTTP(**HyperText Transfer Protocol**)

超文本传输协议在我看来其实就是客户端向服务器发起请求资源，而服务器则应答并返回该资源，为了使资源可用而使用了 HTTP。

```shell
$ curl -v baidu.com  
* Rebuilt URL to: baidu.com/
*   Trying 111.13.101.208...
* TCP_NODELAY set
* Connected to baidu.com (111.13.101.208) port 80 (#0)
> GET / HTTP/1.1
> Host: baidu.com
> User-Agent: curl/7.52.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< Date: Thu, 08 Feb 2018 03:05:13 GMT
< Server: Apache
< Last-Modified: Tue, 12 Jan 2010 13:48:00 GMT
< ETag: "51-47cf7e6ee8400"
< Accept-Ranges: bytes
< Content-Length: 81
< Cache-Control: max-age=86400
< Expires: Fri, 09 Feb 2018 03:05:13 GMT
< Connection: Keep-Alive
< Content-Type: text/html
< 
<html>
<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">
</html>

```

[explainshell](https://www.explainshell.com/)

我们还可以通过 Google 浏览器的 Network 查看

### 面试题

##### 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好）

```
    注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句，
    而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、
    到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；

    详细版：
  	1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
  	2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
      3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
  	4、进行HTTP协议会话，客户端发送报头(请求报头);
      5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
      6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;
  	7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
      8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
      9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
      10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。

    简洁版：
  	浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；
  	服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
  	浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；
  	载入解析到的资源文件，渲染页面，完成。
```

##### http状态码有那些？分别代表是什么意思？

```
  	简单版
  	[
  		100  Continue	继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
  		200  OK 		正常返回信息
  		201  Created  	请求成功并且服务器创建了新的资源
  		202  Accepted 	服务器已接受请求，但尚未处理
  		301  Moved Permanently  请求的网页已永久移动到新位置。
  		302 Found  		临时性重定向。
  		303 See Other  	临时性重定向，且总是使用 GET 请求新的 URI。
  		304  Not Modified 自从上次请求后，请求的网页未修改过。

  		400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
  		401 Unauthorized 请求未授权。
  		403 Forbidden  	禁止访问。
  		404 Not Found  	找不到如何与 URI 相匹配的资源。

  		500 Internal Server Error  最常见的服务器端错误。
  		503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
  	]

    完整版
    1**(信息类)：表示接收到请求并且继续处理
  	100——客户必须继续发出请求
  	101——客户要求服务器根据请求转换HTTP协议版本

    2**(响应成功)：表示动作被成功接收、理解和接受
  	200——表明该请求被成功地完成，所请求的资源发送回客户端
  	201——提示知道新文件的URL
  	202——接受和处理、但处理未完成
  	203——返回信息不确定或不完整
  	204——请求收到，但返回信息为空
  	205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
  	206——服务器已经完成了部分用户的GET请求

    3**(重定向类)：为了完成指定的动作，必须接受进一步处理
  	300——请求的资源可在多处得到
  	301——本网页被永久性转移到另一个URL
  	302——请求的网页被转移到一个新的地址，但客户访问仍继续通过原始URL地址，重定向，新的URL会在response中的Location中返回，浏览器将会使用新的URL发出新的Request。
  	303——建议客户访问其他URL或访问方式
  	304——自从上次请求后，请求的网页未修改过，服务器返回此响应时，不会返回网页内容，代表上次的文档已经被缓存了，还可以继续使用
  	305——请求的资源必须从服务器指定的地址得到
  	306——前一版本HTTP中使用的代码，现行版本中不再使用
  	307——申明请求的资源临时性删除

    4**(客户端错误类)：请求包含错误语法或不能正确执行
  	400——客户端请求有语法错误，不能被服务器所理解
  	401——请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
  	HTTP 401.1 - 未授权：登录失败
  	　　HTTP 401.2 - 未授权：服务器配置问题导致登录失败
  	　　HTTP 401.3 - ACL 禁止访问资源
  	　　HTTP 401.4 - 未授权：授权被筛选器拒绝
  	HTTP 401.5 - 未授权：ISAPI 或 CGI 授权失败
  	402——保留有效ChargeTo头响应
  	403——禁止访问，服务器收到请求，但是拒绝提供服务
  	HTTP 403.1 禁止访问：禁止可执行访问
  	　　HTTP 403.2 - 禁止访问：禁止读访问
  	　　HTTP 403.3 - 禁止访问：禁止写访问
  	　　HTTP 403.4 - 禁止访问：要求 SSL
  	　　HTTP 403.5 - 禁止访问：要求 SSL 128
  	　　HTTP 403.6 - 禁止访问：IP 地址被拒绝
  	　　HTTP 403.7 - 禁止访问：要求客户证书
  	　　HTTP 403.8 - 禁止访问：禁止站点访问
  	　　HTTP 403.9 - 禁止访问：连接的用户过多
  	　　HTTP 403.10 - 禁止访问：配置无效
  	　　HTTP 403.11 - 禁止访问：密码更改
  	　　HTTP 403.12 - 禁止访问：映射器拒绝访问
  	　　HTTP 403.13 - 禁止访问：客户证书已被吊销
  	　　HTTP 403.15 - 禁止访问：客户访问许可过多
  	　　HTTP 403.16 - 禁止访问：客户证书不可信或者无效
  	HTTP 403.17 - 禁止访问：客户证书已经到期或者尚未生效
  	404——一个404错误表明可连接服务器，但服务器无法取得所请求的网页，请求资源不存在。eg：输入了错误的URL
  	405——用户在Request-Line字段定义的方法不允许
  	406——根据用户发送的Accept拖，请求资源不可访问
  	407——类似401，用户必须首先在代理服务器上得到授权
  	408——客户端没有在用户指定的饿时间内完成请求
  	409——对当前资源状态，请求不能完成
  	410——服务器上不再有此资源且无进一步的参考地址
  	411——服务器拒绝用户定义的Content-Length属性请求
  	412——一个或多个请求头字段在当前请求中错误
  	413——请求的资源大于服务器允许的大小
  	414——请求的资源URL长于服务器允许的长度
  	415——请求资源不支持请求项目格式
  	416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
  	417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求长。

    5**(服务端错误类)：服务器不能正确执行一个正确的请求
  	HTTP 500 - 服务器遇到错误，无法完成请求
  	　　HTTP 500.100 - 内部服务器错误 - ASP 错误
  	　　HTTP 500-11 服务器关闭
  	　　HTTP 500-12 应用程序重新启动
  	　　HTTP 500-13 - 服务器太忙
  	　　HTTP 500-14 - 应用程序无效
  	　　HTTP 500-15 - 不允许请求 global.asa
  	　　Error 501 - 未实现
    HTTP 502 - 网关错误
    HTTP 503：由于超载或停机维护，服务器目前无法使用，一段时间后可能恢复正常
```







文章只是随便说说，定有不对之处，谅解。

参考：

- [HTTP 协议入门](http://www.ruanyifeng.com/blog/2016/08/http.html)
- [前端开发面试题](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers)
- [超文本传输协议](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)
- [统一资源定位符](https://zh.wikipedia.org/w/index.php?title=%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%AE%9A%E4%BD%8D%E7%AC%A6&action=edit&section=0&summary=/*%20%E9%A6%96%E6%AE%B5%20*/%20)
