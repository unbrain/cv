<!-- ---
title:  第八周随笔
date: 2019/04/12
tags:	
	- 随笔
--- -->

# 第八周随笔

[css中background-color:transparent与opacity:0有什么区别？](<https://www.zhihu.com/question/20330932>)

[circle ripple](<https://codepen.io/search/pens?q=circle%20ripple&page=1&order=popularity&depth=everything>)

[滚轮兼容](<https://github.com/alvarotrigo/fullPage.js/blob/master/src/fullpage.js>)

```javascript
function addMouseWheelHandler(){
    var prefix = '';
    var _addEventListener;

    if (window.addEventListener){
        _addEventListener = "addEventListener";
    }else{
        _addEventListener = "attachEvent";
        prefix = 'on';
    }

     // detect available wheel event
    var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
              'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox


    if(support == 'DOMMouseScroll'){
        document[ _addEventListener ](prefix + 'MozMousePixelScroll', MouseWheelHandler, false);
    }

    //handle MozMousePixelScroll in older Firefox
    else{
        document[ _addEventListener ](prefix + support, MouseWheelHandler, false);
    }
}

```

<!--more-->



[JS滚轮事件(mousewheel/DOMMouseScroll)了解](<https://www.zhangxinxu.com/wordpress/2013/04/js-mousewheel-dommousescroll-event/>)

 pc 的触控板为了用户滑动后看着更加优雅有一个惯性。win10 这个时间大概在 2s 左右, 但是我只想他只滑动一次，这个东西个人尝试 `prevent` 并没有啥用。本来就是滚动（使用鼠标滚动常常也会一次就触发好几次 mousewheel），对于这个我开始使用的节流（在一段时间内某时间只能被触发一次，），大概一秒能触发一次对用户还是比较友好地，但是当使用触控板我不得不将时间拉到 2s 甚至更多这是我不愿意的，这对用户来说很不流畅，怎么办，使用防抖动（在一个时间间隔内这一事件被多次触发只当作触发一次，这与节流有啥区别呢？在该时间段内再次触发会导致计时器时间重置，也就是说如果你一直在规定的时间段内触发那么该函数只会执行一次）

[实例解析防抖动（Debouncing）和节流阀（Throttling)](<http://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/>)

```javascript
//鼠标滚轮滑动逻辑
wheel(e) {
  const changeScroll = () => {
    const sd = e.wheelDelta || -e.detail;
    if (sd > 0) {
      this.listUp();
    } else {
      this.listDown();
    }
  };
  this.immediate(changeScroll, 500);
},
//防抖动
immediate(func, wait) {
  if (this.scrollActive) {
    func();
  }
  this.scrollActive = false;
  clearTimeout(this.timer);
  this.timer = setTimeout(() => {
    this.scrollActive = true;
  }, wait);
},
```

由于希望在执行滚动的时候就立即执行向上/下翻页，于是加入一个 `srcollActive`, 并在等待时间超过后修改 `scrollActive` 的值这样就能完成对电脑触摸板的一个兼容。



 [plupload get start](<https://github.com/moxiecode/plupload/wiki/Getting-Started>) [demo](<https://github.com/moxiecode/plupload/blob/master/examples/custom.html>)

``` javascript
/public/js/index.html

<script type="text/javascript" alt="plupload.full.min.js">
<script>

/src/assets/js/createfileuploader.js
//主要配置 config 在此文件
var fileUploader = new plupload.Uploader(config);
fileUploader.init();

/src/mixin/fileupload.js
//混入文件于 text.vue 

```
