<!-- ---
title:  CSS 文字对齐
date: 2018/3/18 20:46:25
tags: 
	- CSS 
	- 笔试面试题
--- -->

# CSS 文字对齐

### 在进行制作表单的时候为了使得让中文更加的顺眼可能会有让不同长度的文字左右对齐的需求就像这样

![](/img/csstrick01.png)

<!--more-->

### HTML

先将文字放好

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
  <div>
    <span>姓名</span><br>
    <span>联系方式</span>
  </div>
  
</body>
</html>
```

### 	CSS

```css
div {
  border: 1px solid green;
}

span {
  border: 1px solid red;
  width: 5em;
  display: inline-block;
  
  text-align: justify;
  overflow: hidden;
  line-height: 20px;
  height: 20px;
}

span::after {
  content: '';
  width: 100%;
  display: inline-block;
}
```

就可以得到上图的样式，就可以将 border 删掉了。其实 CSS 感觉只要是将方法记住，而其中的道理的话就真的要好好的去记忆文档。
