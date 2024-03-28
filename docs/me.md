---
layout: home
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import gallery from '../src/components/gallery.vue';

const members = [
  {
    avatar: '/img/avatar.jpg',
    links: [
      { icon: 'github', link: 'https://github.com/unbrain' },
    ]
  },
]
</script>
<gallery />
<div class="margin: 0">
<VPTeamMembers
    :members="members"
  />
</div>
