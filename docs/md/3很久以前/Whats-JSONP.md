<!-- ---
title:  What's JSONP
data: 2018/4//29
tags: 
	- JSONP 
	- JavaScript
--- -->
#  What's JSONP

### wiki 上解释到 JSONP is JSON with padding 

其实个人看来啥也没说啊。stackoverflow上还是有不错的解释。我在这里会解释我看来的 JSONP

<!--more-->

现有两个人想进行数据交互，他们是

请求方：网站1的前端程序员（浏览器）

响应方：网站2的后端程序猿（服务器）

JSONP 就是为解决服务器与客服端跨源（网站1到网站2）通信，简单实用



1. 请求方动态创建 script， src 指向响应方，传递查询参数 `?callback=xxx`

2. 响应方根据查询参数 callback, 构造出

   xxx.call(undefined, 'msg')

   xxx('msg')这样的响应

3. 浏览器接到响应就会去执行 xxx('msg')

4. 请求方就知道了他要的数据了

```javascript
button.addEventListener('click', (e) => {
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
```

```javascript
//后端代码
if(path === '/pay'){
  let amount = fs.readFileSync('./db', 'utf8')//db中就一个数100
  amount--
  fs.writeFileSync('./db', amount)
  response.setHeader('Content-type', 'application/javascript')
  response.write(`
	${callback}.call('undefined', 'success')
`)
  response.end()
}
```

```javascript
//jQuery 直接简单到你看不懂
$.ajax({
 url: "http://jack.com:8002/pay",
 dataType: "jsonp",
 success: function( response ) {
     if(response === 'success'){
     amount.innerText = amount.innerText - 1
     }
 }
 })

 $.jsonp()
```



参考：

-  [Can anyone explain what JSONP is, in layman terms?](https://stackoverflow.com/questions/3839966/can-anyone-explain-what-jsonp-is-in-layman-terms)

-  [阮一峰：浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

-  [JSONP - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-hans/JSONP)
