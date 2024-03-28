<!-- ---
title:  AJAX
date: 2018-04-22 
tags: 
	- JavaScript
--- -->

# AJAX

正是由于 AJAX 的出现才导致前端的快速发展，异步 JavaScript 和 XML，不过经过发展现在不再使用 XML 而使用 JSON 这门轻量级数据语言。

### XMLHttpRequest 对象

```javascript
let request = new XMLHttpRequest()
```

<!--more-->

### XMLHttpRequest 实例的属性

##### readyState

> - 0，对应常量`UNSENT`，表示XMLHttpRequest实例已经生成，但是`open()`方法还没有被调用。
> - 1，对应常量`OPENED`，表示`send()`方法还没有被调用，仍然可以使用`setRequestHeader()`，设定HTTP请求的头信息。
> - 2，对应常量`HEADERS_RECEIVED`，表示`send()`方法已经执行，并且头信息和状态码已经收到。
> - 3，对应常量`LOADING`，表示正在接收服务器传来的body部分的数据，如果`responseType`属性是`text`或者空字符串，`responseText`就会包含已经收到的部分信息。
> - 4，对应常量`DONE`，表示服务器数据已经完全接收，或者本次接收已经失败了



##### onreaadystatechange

> `onreadystatechange`属性指向一个回调函数，当`readystatechange`事件发生的时候，这个回调函数就会调用，并且XMLHttpRequest实例的`readyState`属性也会发生变化。
>
> 另外，如果使用`abort()`方法，终止XMLHttpRequest请求，`onreadystatechange`回调函数也会被调用。

##### response

response 属性为只读

##### responseType

指定服务器返回的数据类型

>""：字符串（默认值）
>
>“arraybuffer”：ArrayBuffer对象
>
>“blob”：Blob对象
>
>“document”：Document对象
>
>“json”：JSON对象
>
>“text”：字符串

text类型适合大多数情况，而且直接处理文本也比较方便，document类型适合返回XML文档的情况，blob类型适合读取二进制数据，比如图片文件。

##### responseText

返回从服务器接收到的字符串，属性只读，若请求不成功或数据不完整，属性等于 `null`

##### responseXML

接受 `Document` 对象

#####  status

表示请求到的状态码

> 200, OK，访问正常
>
> 301, Moved Permanently，永久移动
>
> 302, Move temporarily，暂时移动
>
> 304, Not Modified，未修改
>
> 307, Temporary Redirect，暂时重定向
>
> 401, Unauthorized，未授权
>
> 403, Forbidden，禁止访问
>
> 404, Not Found，未发现指定网址
>
> 500, Internal Server Error，服务器发生错误

##### statusText

返回一个字符串，包含整个状态信息，就比如 `200 OK`

##### timeout

表示一段时间后，若请求没有结果，就自动终止，若为 `0` 就表示你没有时间限制

##### 事件监听接口

> XMLHttpRequest第一版，只能对`onreadystatechange`这一个事件指定回调函数。该事件对所有情况作出响应。 XMLHttpRequest第二版允许对更多的事件指定回调函数。
>
> onloadstart 请求发出
>
> onprogress 正在发送和加载数据
>
> onabort 请求被中止，比如用户调用了`abort()`方法
>
> onerror 请求失败
>
> onload 请求成功完成
>
> ontimeout 用户指定的时限到期，请求还未完成
>
> onloadend 请求完成，不管成果或失败
>
> 注意，如果发生网络错误（比如服务器无法连通），`onerror`事件无法获取报错信息，所以只能显示报错。

##### withCredentials

表示跨域请求，用户信息（比如Cookie和认证的HTTP头信息）是否会包含在请求之中，默认为 `false`。

### XMLHttpRequest 实例的方法

##### abort()

用来终止已经发出的HTTP请求

##### getAllResponseHeaders()

方法返回服务器发来的所有HTTP头信息。格式为字符串，每个头信息之间使用`CRLF`分隔，如果没有受到服务器回应，该属性返回`null`

##### getResponseHeader()

方法返回HTTP头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，则该属性为`null`

##### open()

对象的`open`方法用于指定发送HTTP请求的参数，它的使用格式如下，一共可以接受五个参数

> `method`：表示HTTP动词，比如“GET”、“POST”、“PUT”和“DELETE”。
>
> `url`: 表示请求发送的网址。
>
> `async`: 格式为布尔值，默认为`true`，表示请求是否为异步。如果设为`false`，则`send()`方法只有等到收到服务器返回的结果，才会有返回值。
>
> `user`：表示用于认证的用户名，默认为空字符串。
>
> `password`：表示用于认证的密码，默认为空字符串。

##### send()

方法用于实际发出HTTP请求。如果不带参数，就表示HTTP请求只包含头信息，也就是只有一个URL，典型例子就是GET请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是POST请求。

##### setRequestHeader()

方法用于设置HTTP头信息。该方法必须在`open()`之后、`send()`之前调用。如果该方法多次调用，设定同一个字段，则每一次调用的值会被合并成一个单一的值发送。

##### overrideMimeType()

该方法用来指定服务器返回数据的MIME类型。该方法必须在`send()`之前调用。

传统上，如果希望从服务器取回二进制数据，就要使用这个方法，人为将数据类型伪装成文本数据。


### XMLHttpRequest实例的事件

##### readyStateChange

readyState 属性的值发生改变，就会触发 readyStateChange 事件

##### progress

上传文件时，XMLHTTPRequest对象的upload属性有一个progress，会不断返回上传的进度。

##### load error abort loadend 

`load`事件表示服务器传来的数据接收完毕，`error`事件表示请求出错，`abort`事件表示请求被中断。`abort`、`load`和`error`这三个事件，会伴随一个`loadend`事件，表示请求结束，但不知道其是否成功。


### 原生 JS 写 AJAX

```javascript
let xhr = new XMLHttpReauest()
xhr.open('post', 'http://baidu.com')
xhr.send()
xhr.onreadystatchange = () => {
    if(xhr.readyState === 4) {
        if(xhr.status >= 200 && xhr.status < 400){
            let string = xhr.responseText
            let object = window.JSON.parse(string)
        }
    }
}
```
