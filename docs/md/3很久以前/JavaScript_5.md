<!-- ---
title: DOM 操作
reward: true
toc: true
tags:
	- blue视频笔记
	- JavaScript
--- -->
# DOM 操作

### DOM节点

childNodes	 nodeType 节点类型	-->3文本节点 	-->1元素节点

获取子节点

children	子节点

parentNode	父节点


<!--more-->

例子：点击链接，隐藏整个li

offsetParent	获取元素在页面上相对谁定位

首尾子节点

有兼容性问题	-->	nodeType	

firstChild、firstElementChild 

lastChild 、lastElementChild

兄弟节点

有兼容性问题

nextSibling、nextElementSibling

previousSibling、previousElementSibling



### 操纵元素属性

元素属性操作

第一种：oDiv.style.display=“block”;

第二种：oDiv.style[“display”]=“block”;

第三种：Dom方式

DOM方式操作元素属性

获取：getAttribute(名称)

设置：setAttribute(名称, 值)

删除：removeAttribute(名称)



### DOM元素灵活查找

用className选择元素

如何用className选择元素

选出所有元素

通过className条件筛选

封装成函数

### 创建、插入和删除元素

创建DOM元素

createElement(标签名)		创建一个节点	document.createElement('li');

appendChild(节点)			追加一个节点	父级.apppendChild(子节点)

例子：为ul插入li

插入元素

insertBefore(节点, 原有节点)	在已有元素前插入	oUl.insertBefore(oLi, aLi[0]);

例子：倒序插入li

删除DOM元素

removeChild(节点)			删除一个节点	oUl.removeChild(this.parentNode);

例子：删除li



### 文档碎片

文档碎片可以提高DOM操作性能(理论上)

文档碎片原理

document.createDocumentFragment()	//但是现在几乎不用这个  低级浏览器	几乎无用



### 表格应用 

tBodies、tHead、tFoot、rows、cells

```
// alert(aTb.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML);
alert(aTb.tBodies[0].rows[0].cells[1].innerHTML);
```

隔行变色

鼠标移入高亮

添加、删除一行

### DOM方法的使用

搜索	---->	主要是后端

版本1：基础版本——字符串比较

版本2：忽略大小写——大小写转换

版本3：模糊搜索——search的使用

版本4：多关键词——split

高亮显示、筛选	background / display

```
window.onload =function(){
	var oTb = document.getElementById('table1');
	var oT1 = document.getElementById('text1');
	var oBtn1 = document.getElementById('btn1');

	oBtn1.onclick = function (){
		for(var i = 0; i < oTb.tBodies[0].rows.length; i++){
			var search = oT1.value.toLowerCase();
			var oldText = oTb.tBodies[0].rows[i].cells[1].innerHTML.toLowerCase();
			var arr = search.split(' ');
			oTb.tBodies[0].rows[i].style.background = '';

			for(var j = 0; j < arr.length; j++){
				if( oldText.search(arr[j]) != -1){
					oTb.tBodies[0].rows[i].style.background = 'green';
				}
			}	
		}
	}
}
```



排序

移动Li	appendChild(); //1.从原有父级删掉2.添加到新的父级

元素排序：转换——排序——插入

```javascript
window.onload =function(){
	var oTb = document.getElementById('table1');
	var oBtn1 = document.getElementById('btn1');

	oBtn1.onclick = function (){
		var arr = [];

		for(var i = 0; i < oTb.tBodies[0].rows.length; i++){
			arr[i] = oTb.tBodies[0].rows[i];
		}

		arr.sort(function (num1, num2){
			var n1 = parseInt(num1.cells[0].innerHTML);
			var n2 = parseInt(num2.cells[0].innerHTML);

			return (n1 - n2);
		});

		for (var i in arr){
			oTb.tBodies[0].appendChild(arr[i]);
		}
	}
	
}
```



### 表单应用 

表单基础知识

什么是表单

向服务器提交数据，比如：用户注册

action		提交到哪里 

表单事件

onsubmit	提交时发生

onreset		重置时发生

表单内容验证

阻止用户输入非法字符		阻止事件

输入时、失去焦点时验证		onkeyup、onblur

提交时检查				onsubmit

*后台数据检查*
