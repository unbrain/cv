<!-- ---
layout: home
--- -->

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import gallery from '../../../src/components/gallery.vue';
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
<div style="margin-top: 150px">
</div>

# 你好呀，有缘人

欢迎来到我的小站，我是一名程序员，19 年毕业到现在现在都在微博从事前端相关的工作。

熟练使用 Vue.js 敏捷开发方法，具备 5 年的前端开发经验。热衷于解决复杂的技术问题，探索未知并具备不错的编码和调试能力。在微博前端项目组的多个大型项目中担任核心开发者，成功交付高质量的软件解决方案。具备良好的团队合作和沟通能力，能够与不同背景的团队成员紧密合作及不错的抗压能力。

- 对 Vue.js 原理有较深理解有自己实现，并熟练使用其全家桶

- 熟练使用 Vite、EsLint 等构建工具

- 熟悉 http 协议，以及浏览器缓存策略

- 熟练使用 git 版本管理工具，及 gitlab ci 构建工具

- 熟悉前端常用性能优化手段，有 PC 、H5、小程序等多端经验

- 熟悉 Node.js 开发，并在企业级项目中有一定实践


若有幸能交个朋友，点击顶部导航联系我哈～

[查看我的简历](https://rxresu.me/unbrain/cv)

<div style="margin-top: 150px">
<!-- <gallery /> -->
</div>
