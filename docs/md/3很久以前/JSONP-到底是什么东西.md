<!-- ---
title:  JSONP 到底是什么东西
data: 2018/8//13
tags: 
	- JSONP 
	- JavaScript
--- -->

# JSONP 到底是什么东西


![](/img/json.jpg)
前几个月的时候我写了一篇博客来描述 `What's JSONP` 现在回去看当时写的东西可真是一坨...，怪不得面试的时候人家深入问的时候就开始支支吾吾了，动态创建 `<script>`，只能 `POST` 等也许你都知道可是他的来龙去脉你都了解了么?

<!--more-->

[浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

阮一峰老师可以说将很多的内容都汇总在一起了，把整个跨域的问题都很广阔的讲了一遍，把阮一峰老师的 `JSONP` 看完了以后似懂非懂啊，知道那么一回事可是到的是咋样的心中却没有底。

## 简单的服务器与浏览器交流

- node.js
- index.html
- amount.txt

服务器会根据浏览器的请求来返回 `index.html` 该文件含有从 `amount.txt` 中读到的数据(糖果数目)。用户在浏览器上每点击一次吃一颗糖果浏览器会发出一个 `POST` 请求，服务器就会将 `amount.txt` 中的数据减 1。这样用户更改了数据在下一次请求的时候就能得到正确的数据。我么回来看一下代码。

### node.js

```javascript
var http = require('http')
var fs = require('fs')
var url = require('url')

var port = 8080
var server = http.createServer(function (request, response) {
  //查询路径分析
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method
  //路由
  if (path === '/') {
    var string = fs.readFileSync('./index.html', 'utf8')
    var data = fs.readFileSync('./amount.txt', 'utf8')
    string = string.replace('{{amount}}', data)
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)

    response.end()
  } else if (path === '/pay' && method.toUpperCase() === 'POST') {
    var data = fs.readFileSync('./amount.txt', 'utf8')
    var nd = data - 1
    fs.writeFileSync('./amount.txt',nd)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('404')
    response.end()
  }
})

server.listen(port)
console.log('监听 ' + 'http://localhost:' + port)
```

### index.html

```html
<body>
  <h1>还剩{{amount}}颗糖</h1>
  <form action="/pay" method="post">
    <input type="submit" value="吃一颗">
  </form>
</body>
```

### amount.txt

```
1000
```

## 图片 Ping

上一个简单的服务器与浏览器的交流可以简单地理解他们是如何运行的，但是有一个弱点那就是每一次的请求后需要刷新页面才能看到正确的数据。那该如何是好呢?我们都知道像 `<img>` `<link>` `<script>` 等这些标签都是带有 `src` 会向服务器发起 `GET` 请求的那我们能不能在这上面做文章呢?

让我们来看下代码

### node.js

```javascript
else if (path === '/pay') {
    var data = fs.readFileSync('./amount.txt', 'utf8')
    var nd = data - 1
    fs.writeFileSync('./amount.txt', nd)
    response.setHeader('Content-Type', 'image/jpg')
    response.statusCode = 200
    response.write(fs.readFileSync('./cap.jpg'))
    response.end()
  }
```

### index.html

```html
<body>
  <h1>还剩<span id="amount">{{amount}}</span>颗糖</h1>
  <button id="button">吃一颗</button>
</body>
<script>
  button.addEventListener('click', (e)=>{
    let img = document.createElement('img')
    img.src = '/pay'
    img.onload = function(){
      alert('吃了一颗')
      amount.innerText -= 1
    }
    img.onerror = function () {
      alert('没吃到')
      
    }
  })
</script>
```

这样就实现了无刷新且更改了服务器上的数据，可是每一次你都返回图片就很揪心，多浪费对吧，所也就有了 `JSONP`

## JSONP

我们动态创建一个 `<script>` 并把让他放到 `<body>` 中，我们在服务器中返回 `application/javascript` 并写上我们要给的东西，代码如下

## node.js

```javascript
else if (path === '/pay') {
    var data = fs.readFileSync('./amount.txt', 'utf8')
    var nd = data - 1
    fs.writeFileSync('./amount.txt', nd)
    response.setHeader('Content-Type', 'application/javascript')
    response.statusCode = 200
    response.write("alert('又在吃糖')")
    response.end()
  } 
```

### index.html

```html
<script>
  button.addEventListener('click', (e)=>{
    let js = document.createElement('script')
    js.src = '/pay'
    document.body.appendChild(js)
    js.onload = function(){
      alert('吃了一颗')
      amount.innerText -= 1
    }
    js.onerror = function () {
      alert('没吃到')
    }
  })
</script>
```

先说下跨域，为何能跨域呢？因为在 `script.src` 是可以去请求别的网站上的资源的(防盗链就另外说)，所以说使用 `GET ` 不安全。既然可以访问任意 `src` 就是可以跨域了啥。

这样我们就往成了一个很不错的浏览器与服务器交互但是还有问题啊，后端对于前端了解的太多了，前后端耦合性太大，服务器如果要这样去关心浏览器要干啥他不得忙的一批对吧，那应该何去解决呢？

### node.js

```javascript
if(path === '/pay'){
  let amount = fs.readFileSync('./amount.txt', 'utf8')
  amount--
  fs.writeFileSync('./db', amount)
  response.setHeader('Content-type', 'application/javascript')
  response.write(`
	${query.callback}.call('undefined', 'success')
`)
  response.end()
}
```



### html

```html
<script>
button.addEventListener(button.addEve 'click', (e) => {
  let script = document.creatElement('script')//动态script
  let functionName = 'marsorsun' + parseInt(Math.radom()*1000000, 10)//函数名随机
  window[functionName] = function(){
    amount.innerText = amount.innerText - 1
  }
  script.src = '/pay?callback=' + functionName
  document.body.appendChild(script)
  script.onload = function(e){//success
    e.currentTarget.remove()//从页面中移除<script>
    delete window[functionName]//干掉随机数
  }
  script.onerror = function() {
    e.currentTarget.remove()
  }
})
<script>
```

可以看下《JavaScript高级程序设计》P587 配合我的后台代码看就可也理解了。

