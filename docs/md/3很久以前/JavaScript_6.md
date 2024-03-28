<!-- ---
title: JavaScript 运动
reward: true
toc: true
tags:
	- blue视频笔记
	- JavaScript
--- -->
# JavaScript 运动
### 运动基础

让 Div 运动起来

速度——物体运动的快慢

运动中的 Bug

不会停止 -->临界值问题

速度取某些值会无法停止

到达位置后再点击还会运动	-->	clearInterval()

重复点击速度加快


<!--more-->


```javascript
window.onload = function () {
	var oBtn = document.getElementById('btn1');
	var oDiv = document.getElementById('div1');
	var timer = null;

	oBtn.onclick = function (){
		clearInterval(timer);	//保证就1个定时器
		timer = setInterval(function () {
			var speed = 1;
			if(oDiv.offsetLeft > 300){
				clearInterval(timer);
			}
			else{
				oDiv.style.left = oDiv.offsetLeft + speed + 'px';
			}
			
		}, 30);

		
	}
```



运动框架

在开始运动时，关闭已有定时器

把运动和停止隔开(if / else)

运动框架实例

例子1：“分享到”侧边栏	-->	`[demo2.html]`

通过目标点，计算速度值

例子2：淡入淡出的图片

用变量存储透明度		-->	`[demo3.html]`

主要是设置 opcity 并为其赋值

### 缓冲运动

逐渐变慢，最后停止

距离越远速度越大

速度由距离决定

速度 = (目标值-当前值) / 缩放系数

例子：缓冲菜单	-->	`[demo4]`

Bug：速度取整	speed > 0 ? Math.ceil(speed) ：Math.floor(speed)

跟随页面滚动的缓冲侧边栏

潜在问题：目标值不是整数时	parseInt();

### 运动终止条件

匀速运动：距离足够近

缓冲运动：两点重合

### 多个物体同时运动

例子：多个 Div，鼠标移入变宽	-->	`[demo5]`

单定时器，存在问题

每个 Div 一个定时器

多物体运动框架

定时器作为物体的属性

参数的传递：物体、目标值

例子：多个 Div 淡入淡出	--> `[demo6]`

所有东西都不能公用

属性与运动对象绑定：速度、其他属性值（如透明度等）

### 任意值运动框架

offset 属性的 Bug

有边框的 Div 变宽

用currentStyle / computedStyle(obj, flase)[name] 代替 offset

原有运动框架的问题

只能让某个值运动起来

如果想让其他值运动起来，要修改程序

扩展的运动框架	--> `[demo7]`

运动属性作为参数

封装 opacity

小数的问题	--> Math.round()	主要是为了适配 IE7

### 图片展示

效果思路

两边的按钮——淡入淡出

大图下拉——层级、高度变化

下方的 li——多物体淡入淡出

下方的 Ul——位置计算

左右按钮

淡入淡出

第一个小问题： 鼠标移到按钮上，按钮会消失

层级问题

按钮和遮罩上都得加上事件

下方 Li 效果

点击切换大图——选项卡

Li 淡入淡出——移入移出

Ul 移动——位置计算

大图片切换

图片层级—— zIndex 一直加1

图片下拉效果(运动框架)

可以改为淡入淡出

加入自动播放

和选项卡一样

另一个问题：ul 开始的宽度并不够， 需要计算后赋值

自己看着敲了一边在默敲一遍，自己的问题还是比较多，细节与思路还是不够。	-->	`[demo9](./demo9.html)`

### 最后运动框架

多个值同时变化

setStyle同时设置多个属性

参数传递

Json的使用

for in 遍历属性

运用到运动框架

检测运动停止

标志变量

例子：伸缩同时淡入淡出的菜单

还有就是链式运动， 依次完成运动，可以参考后面几个 demo 
