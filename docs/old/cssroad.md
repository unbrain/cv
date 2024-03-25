<!-- ---
title:  CSS 套路
date: 2018/6/13 12:46:25
tags: 
	- CSS

--- -->

# CSS 套路

CSS 总是会出现我们意想不到的结果，在这里记录一些会用到的小技巧来加深自己的记忆与理解。

<!--more-->

- 浮动过后在父级加 clearfix

  ```css
  .clearfix {
  	clear:both;
  	content: '';
  	display:block;
  }
  ```

- 一般不写宽高

- 写宽的话多用 `max-width` 以便自适应

- `margin`可能导致撑出去(a 比 div 高)，用`display：block`

- 多写一个 div 来设置 `margin`可以防止 width 变宽

- 对于绝对定位子集`position：absolute`，那么记得给父级一个`position：relative`

- css 三角形

  ```css
  .triangle {
    border: 10px solid black;
    boder-top-color:red;
  }
  /*就可以看到三角形，可以设置某一边的宽，把颜色变透明来得到想要的三角形*/
  ```

  ​
