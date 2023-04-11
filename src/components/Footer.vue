<script setup lang="ts">
import { siGithub, siSinaweibo, siGmail, siWechat } from 'simple-icons';

const link = {

  weibo: {
    icon: siSinaweibo,
    link: 'https://weibo.com/u/2502739550'
  },
  gmail: {
    icon: siGmail,
    link: 'mailto:marsorsun@gmail.com',
  },
  wechat: {
    icon: siWechat,
    link: 'phone:18349108862',
  },
  github: {
    icon: siGithub,
    link: 'https://github.com/unbrain'
  },
}

const jump = (item: { link: string }) => {
  window.open(item.link, '_blank')
}
</script>

<template>
  <div class="footer flex flex-row justify-between">
    <div class="flex">
      <div class="find">find me in:</div>
      <template v-for="(item, key) in Object.values(link)" :key="key">
        <div class="icon-container" v-if="item.icon.title !== 'GitHub'"><span class="icon" v-html="item.icon.svg"
            @click="jump(item)"></span></div>
      </template>

    </div>
    <div class="flex" @click="jump(link.github)">
      <div class="footer-right">@unbrain</div>
      <span class="icon" v-html="link.github.icon.svg"></span>
    </div>
  </div>
</template>

<style lang="postcss">
.footer {
  border: 1px solid #1E2D3D;
  position: fixed;
  padding: 0 22px;
  bottom: 0;
  left: 0;
  width: 100vw;

  font-family: 'Fira Code';
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 21px;

  & .footer-right {
    padding: 16px 0 16px 16px;
    border-left: 1px solid #1E2D3D;
  }
}

.find {
  padding: 16px;
  border-right: 1px solid #1E2D3D;
}

.icon svg {
  width: 20px;
  height: 20px;
  margin: 16px 7px;
  fill: #607B96;

  &:hover {
    fill: #eee;
    cursor: pointer;
  }
}

.icon-container {
  padding: 0 9px;
  border-right: 1px solid #1E2D3D;
}
</style>
