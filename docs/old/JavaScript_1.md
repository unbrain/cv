<!-- ---
title: 初探 JavaScript 魅力
reward: true
toc: true
tags:
	- blue视频笔记
	- JavaScript
--- -->

#  初探 JavaScript 魅力

### 1. 什么是 JavaScript 

使页面能与用户进行交互

### 2.  实现一个例如在是否选择记住密码的时候鼠标移入与移出时的一个 div 的显示与隐藏。 
<!--more-->
需要：

鼠标的移入移出(onmouseover, onmouseout)

显示隐藏(display: block, none)

注意: 我个人的错误代码
```javascript
document.getElementById('div1').style.display = block;
```
此时在浏览器运行会报错，因为浏览器会将 block 看为一个变量而不是字面量，若想将其看成字面量需要在其左右加上 '' 就能解决问题。
用代码解释字面量与变量
```javascript
var num = '123';//num为变量
alert(123);//报错，未定义变量
alert('123');//这里的123就是字面量，提示123
alert(num);//提示123
```

### 3.  初识函数与变量

变量就好似尚方宝剑代表着皇帝
```
//函数
function function_name(argument){
    //body…
}
```
使用函数的好处就是当发现有大量代码的重用进行观察并组合，同时有不同参数进行传参解决就好
```javascript
		// oB1.onclick = function toY() {
		// 	// body...
		// 	oDiv.style.background = "yellow";
		// }

		// oB2.onclick = function toG() {
		// 	// body...
		// 	oDiv.style.background = "green";
		// }

		// oB3.onclick = function toB() {
		// 	// body...
		// 	oDiv.style.background = "Black";
		// }
		//长得像，进行观察，进行合并，便于重用，少写代码		---->		函数传参
		
		function setColor(color){
			oDiv.style.background = color;
		}
```
### 4. 实现页面换肤

思路: 用多个 CSS 实现换肤

总结: id 可以加在任何标签，甚至能改变 href。HTML 中如何写 JavaScript 就如何写。但有唯一一个例外就是 class 需要写成 className，因为 class 是 JavaScript 中的关键字

### 5. 考虑优先级问题

在用 .style 修改样式我们检查元素可知道不论是获取还是修改都是在操作行间样式。但是写代码会有时修改了 .style 又修改 .className 这时我们可能在两个中有修改了 background 那么 class 的优先级小于 style，但是很有可能我们并不会注意这一点所以建议只使用其中一种，避免 bug 的出现。
参考[demo9](demo9.html)

### 6. 获取一组元素 getElementsByTagName 实现对一组 div 进行颜色的改变

```javascript
	var aDiv = document.getElementsByTagName('div')
	//alert(aDiv.length);
    //aDiv.style.background = 'green';错误的 不会改变颜色
	//由于是数组需要遍历来修改样式
	
	for(var i = 0; i < aDiv.length; i++){
		aDiv[i].style.background = 'green';
	}

	// var j = 0;

	// while(j < aDiv.length){
	// 	aDiv[j].style.background = 'green';
    // 	j++;
	// }
```


### 7. 用 this 及 index(索引值) 解决问题
```javascript
    	for (var i = 0; i < aBtn.length; i++) {
    		aBtn[i].flag = i;//记录当前i
    		aBtn[i].onclick = function (){
    			for (var i = 0; i < aBtn.length; i++){
    				aBtn[i].className = '';
    				aDiv[i].style.display = 'none';
    			}
    			this.className = 'active';
    			aDiv[this.flag].style.display = 'block';
    		}
    	}
```
---


