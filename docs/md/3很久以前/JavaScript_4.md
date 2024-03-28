<!-- ---
title: 定时器的使用
reward: true
toc: true
tags:
	- blue视频笔记
	- JavaScript
--- -->
# 定时器的使用

### 开启定时器

setInterval	间隔型
setTimeout	延时型
两种定时器的区别

<!--more-->
#### 停止定时器

clearInterval
clearTimeout

### 数码时钟

获取系统时间

Date对象

getHours、getMinutes、getSeconds

年	getFullYear()	月	getMonth()	日	getDate()	星期	getDay()

显示系统时间

字符串连接

空位补零

设置图片路径

charAt 方法（兼容问题）



```javascript
function toD(time){//空位补零
			if(time < 10)
			{
				time = '0'+time;
			}else{
				time = ''+ time;
			}

			return time;//忘记return
		}

		window.onload = function (){
			var aImg = document.getElementsByTagName('img');			
			function timer(){
				var oD = new Date;
				var str = toD(oD.getHours()) + toD(oD.getMinutes()) + toD(oD.getSeconds());

				for(var i = 0; i < aImg.length; i++){
					//aImg[i].src = "img/"+str[i]+".png";	低版本 IE7 不支持
					aImg[i].src = "img/"+str.charAt(i)+".png";
				}
			}

			timer();
			setInterval(timer, 1000);

		}
```



### 延时提示框

移入显示，移出隐藏

移出延时隐藏

简化代码

合并两个相同的 mouseover 和 mouseout

```javascript
window,onload = function (){
			var oDiv1 = document.getElementById('div1');
			var oDiv2 = document.getElementById('div2');
			var timer = null;

			oDiv1.onmouseover = oDiv2.onmouseover = function () {
				clearTimeout(timer);
				oDiv2.style.display = 'block';
			}
			oDiv1.onmouseout = oDiv2.onmouseout = function () {
				timer = setTimeout(function(){
					oDiv2.style.display = 'none';
				},500);
			}
		}
```

### 无缝滚动

效果演示

物体运动基础

让 Div 移动起来

offsetLeft / offsetRight / offsetWidth 的作用

用定时器让物体连续移动

让 ul 一直向左移动

复制 li

innerHTML 和+=

修改 ul 的 width

滚动过界后，重设位置

判断过界

改变滚动方向

修改 speed

修改判断条件

鼠标移入暂停

移入关闭定时器

移出重新开启定时器



```javascript
window.onload = function (){
	var oDiv = document.getElementById('div1');
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var oBtn1 = document.getElementById('btn1');
	var oBtn2 = document.getElementById('btn2');
	var aLi = oUl.getElementsByTagName('li');
	var speed = 2;

	oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
	oUl.style.width = aLi.length * aLi[0].offsetWidth +'px';

	function move(){
		if(oUl.offsetLeft <  -oUl.offsetWidth/2){
			oUl.style.left = 0 +'px';
		}
		if(oUl.offsetLeft >  0){
			oUl.style.left = -oUl.offsetWidth/2+'px';
		}
		oUl.style.left = oUl.offsetLeft + speed +'px';
	}

	var timer = setInterval(move,30);

	oDiv.onmouseover = function(){clearInterval(timer);};
	oDiv.onmouseout = function(){timer = setInterval(move,30);};

	oBtn1.onclick = function (){
		speed = 2;
	};

	oBtn2.onclick = function (){
		speed = -2;
	};
```

