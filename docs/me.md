<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import {withBase} from 'vitepress'

const members = [
  {
    avatar: '/img/WechatIMG203.jpg',
    links: [
      { icon: 'github', link: 'https://github.com/unbrain' },
    ]
  },
]
</script>

<div class="margin: 0">
<VPTeamMembers
    :members="members"
  />
</div>
