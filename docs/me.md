---
layout: home
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import gallery from '../src/components/gallery.vue';
import { withBase, useData } from 'vitepress'
const members = [
  {
    avatar: withBase('/avatar.jpg'),
    name: '刘朝阳',
    links: [
      { icon: 'github', link: 'https://github.com/unbrain' },
    ]
  },
]
</script>

<style>
.member {
  display: flex;
  /* align-items: center; */
  justify-content: center;
}
</style>


<div class="member">
  <VPTeamMembers
      :members="members"
    />
</div>

# 你好呀，有缘人

欢迎来到我的小站，我是一名程序员，19 年毕业到现在现在都在微博从事前端相关的工作。

常用技术栈是 Vue.js 搭配 Vite 等相关工具链。服务端应用到生产环境的只有 node， 主要是 Egg.js 做胶水层，安全校验以及部分缓存会使用 ioredis。

是微博 PC 主站，微博 PC 创作者中心，微博 PC 消息箱的主要开发者。移动端主要做微博小程序相关，创作者中心，抽奖平台等等。

最近打算换一个工作环境，环境点击顶部导航联系我哈～




<gallery />
