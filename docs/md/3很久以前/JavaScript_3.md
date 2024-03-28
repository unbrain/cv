<!-- ---
title: 深入 JavaScript
reward: true
toc: true
tags:
	- blue视频笔记
	- JavaScript
--- -->
# 深入 JavaScript
### 函数返回值

函数返回值

什么是函数返回值

函数的执行结果

可以没有return

一个函数应该只返回一种类型的值

<!--more-->

### 函数传参

- 可变参（不定参）：arguments

参数的个数可变，参数数组

例子1：求和

```javascript
function sum(){
		var num = 0;

		for(var i = 0; i < arguments.length; i++){
			num += arguments[i];
		}

		return num;
	}

	alert(sum(1, 9, 8, 9));
```

求所有参数的和

例子2：CSS函数

```javascript
	function css(obj, name, value){
		if(arguments.length == 2)
		{
			return obj.style[name];
		}else{
		obj.style[name] = value;
		}
	}
	
	window.onload = function (){
		var oDiv = document.getElementById('div1');

		alert(css(oDiv, 'width'));
		css(oDiv, 'background', 'green');
	}
```
判断arguments.length

给参数取名，增强可读性

- 取非行间样式(不能用来设置)：

初探 JavaScript 魅力我们就知道 style 只能获取行间样式

obj.currentStyle[attr]	//但许多不兼容 firefox

getComputedStyle(obj,false)[attr]

```javascript
	window.onload = function () {
		var oDiv = document.getElementById('div1');
		
		if(oDiv.currentStyle){//IE
			alert(oDiv.currentStyle.width);
		}else{//ff chrome
			alert(getComputedStyle(oDiv,false).width);
		}
	}
```

复合样式：background，boder

单一样式：width

getComputedStyle 只能取单一样式

### 数组基础

数组的使用

定义

var arr=[12, 5, 8, 9];

var arr=new Array(12, 5, 8, 9);

没有任何差别，[]的性能略高，因为代码短

数组的属性

length

既可以获取，又可以设置

例子：快速清空数组

```
var arr = [1, 2, 4, 5];

arr.length = 0;
```

数组使用原则：数组中应该只存一种类型的变量

### 添加、删除元素

数组的方法

添加

push(元素)，从尾部添加

unshift(元素)，从头部添加

删除

pop()，从尾部弹出

shift()，从头部弹出

### 插入、删除

splice

```javascript
var arr = [1, 2, 3, 4, 5, 6]

arr.splice(2, 3);	//1, 2, 6
arr.splice(2, 0);	//1, 2, 3, 4, 5, 6
arr.splice(2, 0, 'a');	//1, 2, a, 4, 5, 6
arr.splice(2, 1, 'a');	//1, 2, a, 5, 6
```

splice(开始, 长度,元素…)

先删除，后插入

删除

splice(开始,长度)

插入

splice(开始, 0, 元素…)

替换

### 排序、转换

排序
```javascript
	// var arr = ['as', 'wer', 'oui']

	// alert(arr.sort());	//as,oui,wer
	var arr = [1, 11, 98, 65, 5, 6];

	//alert(arr.sort());	//1,11,5,6,65,98 比较的字符串
	
	alert(arr.sort(function (n1, n2) {
		return n1 -n2;
	}));

```
sort([比较函数])，排序一个数组

排序一个字符串数组

排序一个数字数组

转换类

concat(数组2)

```javascript
var a =[1, 2, 3];
var b =[1, 2, 3];

alert(a.concat(b));	//1, 2, 3, 1, 2, 3
```

连接两个数组

join(分隔符)

```javascript
var a =[1, 2, 3];

alert(a.join('-'));	//1-2-3
```

用分隔符，组合数组元素，生成字符串

字符串split

