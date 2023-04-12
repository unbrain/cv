<script setup lang="ts">
import { ref } from 'vue';
import { siGnubash } from 'simple-icons';
import Icon from './Icon.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const site = {
  title: '',
  router: '/'
}

interface Item {
  title?: string
  text?: string,
  router: string
}

const items = [{ text: '你好', router: 'hi' }, { text: '关于我', router: 'about' }, { text: '项目', router: 'project' }]

const cur = ref(0);

const go = (item: Item, index: number) => {
  cur.value = index;
  router.push({ path: item.router })
}

</script>

<template>
  <div class="flex nav justify-between">
    <div class="flex ">
      <div class="flex justify-center items-center mar line site" @click="go(site, 0)">
        <Icon :icon="siGnubash" :unset="true" />{{ site.title }}
      </div>
      <div class="mar line item" v-for="(item, index) in items" :key="index" @click="go(item, index)">{{ item.text }}
        <div class="cur" v-if="cur === index"></div>
      </div>
    </div>
    <div class="mar line1">联系我</div>
  </div>
</template>

<style lang="postcss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #1E2D3D;

  & .site {
    width: 311px;
  }

  & .item {
    position: relative;
    width: 121px;
    cursor: pointer;
  }

  & .mar {
    padding: 18px 22px;
  }

  & .line {
    border-right: 1px solid #1E2D3D;
  }

  & .line1 {

    border-left: 1px solid #1E2D3D;

  }

  & .cur {
    position: absolute;
    height: 3px;
    background: #ff8200;
    width: 121px;
    bottom: 0;
    left: 0;
  }
}
</style>
