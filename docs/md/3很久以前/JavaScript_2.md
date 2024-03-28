<!-- ---
title: JavaScript 基础
reward: true
toc: true
tags:
	- blue视频笔记
	- JavaScript
--- -->

# JavaScript 基础

### JavaScript 组成

ECMAScript: 翻译 解释器	——> 几乎没有兼容问题

BOM 	——> 没有兼容问题（完全不兼容）	

DOM	——> 几乎没有兼容问题

<!--more-->

### 变量的类型
```javascript
var a = 12;
alert(typeof a);	//number

a = '123';
alert(typeof a);	//string

a = true;
alert(typeof a);	//blooean

a = function ();
alert(typeof a);	//function

a = document;
alert(typeof a);	//object

var b;
alert(typeof b);	//undefined
//1.真的未定义
//2.定义了，但是是空的
```
可以看出 JavaScript 很灵活
建议：一个变量应该只存放一种类型的数据

### 类型转换
实现：求和功能
需要：强制类型转换：parseInt()	-->	转换整数	parseFloat()	-->	转换浮点数
```javascript
	//parseInt('12abc');	//12
	//parseInt('12abc12');	//12
	//parseInt('abc');	//NaN
	//parseInt('zxc');	//NaN
	//parseInt('abc') == parseInt('zxc');	//flase	NaN 和 NaN 是否相等
	//isNaN(parseInt('abc'));	//true
	//parseInt(12) + parseInt('abc');	//NaN
```
隐式类型转换
```javascript
var a = 5;
var b = '5';
alert(a == b);	//true	先转换在比较
alert(a === b);	//false	不转换就比较

var a = '12';
var b = '6';
alert(a + b);	//126	1.字符串连接	2.求和（转换在加）	先简后繁
alert(a - b);	//6	1.数字相减
```

### 变量的作用域及闭包

局部变量	全局变量
闭包的初步理解
```javascript
//子函数用到了父函数的变量
function aaa(){//父函数
  var a = 12;
  
  function bbb(){//子函数
    alert(a);
  }
  
  bbb();
}
```

### 命名规范
可读性	规范性
匈牙利命名法
--> 类型前缀 a(Array) b(boolean) fn(function) re(RegExp)...
--> 首字母大写

### 运算符
取模	实现：隔行变色	秒转时间
```javascript
var s = 180;

alert(parseInt(s/60)+'m '+parseInt(s%60)+'s');
```

### 流程控制
三元运算符 ?:
break 中断	continue 继续（中断当前）
真： true 非零 非空 document
假： undefined

### Json

```javascript
	var json ={a: 12, b: 8, c: 7}
	alert(json['a']);	//12
	alert(json.a);	//12
	alert(json.length);	//undefined

	for (var i in json){
		alert(json[i]);//12 8 7
	}
```

循环：

数组 --> 正常循环

Json --> for in
