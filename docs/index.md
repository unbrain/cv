---
layout: home
---
<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import {withBase} from 'vitepress'
import Home from '../src/views/Hi.vue'
const members = [
  {
    avatar: '../src/assets/WechatIMG203.jpg',
    links: [
      { icon: 'github', link: 'https://github.com/unbrain' },
    ]
  },
]
</script>
<Home />


