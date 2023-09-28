<script setup lang="ts">
import { siVuedotjs, SimpleIcon } from "simple-icons";
import weibo from "../assets/weibo.png";
import Icon from "../components/Icon.vue";
interface Project {
  name: string;
  subTitle?: string;
  picture: string;
  icon: string | SimpleIcon;
  desc: string;
  link: string;
}

const arr: Project[] = [
  {
    name: "PC微博",
    subTitle: "// _ui-animations",
    picture: weibo,
    icon: siVuedotjs,
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    link: "https://weibo.com",
  },
  {
    name: "PC微博",
    subTitle: "// _ui-animations",
    picture: "image.png",
    icon: "vue",
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    link: "https://weibo.com",
  },
  {
    name: "PC微博",
    subTitle: "// _ui-animations",
    picture: "image.png",
    icon: "vue",
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    link: "https://weibo.com",
  },
];
</script>

<template>
  <div class="flex">
    <div v-for="(item, index) in arr" :key="index">
      <div class="title">
        {{ item.name }} <span>{{ item.subTitle }}</span>
      </div>
      <div class="gar">
        <div class="icon">
          <Icon :icon="item.icon" :unset="true" />
        </div>
        <img :src="item.picture" />
        <div class="desc">
          <div class="text">{{ item.desc }}</div>
          <div class="button">view-project</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.title {
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: #5565e8;
  & span {
    color: #607b96;
  }
}

.gar {
  margin-top: 15px;
  border-radius: 15px;
  overflow: hidden;
  background: #011221;
  border: 1px solid #1e2d3d;
  width: 300px;
  position: relative;
  & .icon {
    position: absolute;
    top: 19px;
    right: 19px;
    padding: 5px;
    background: #86E1F9;
  }
  & .desc {
    padding: 24px 31px 31px;
    text-align: left;
    & .text {
      font-weight: 450;
      font-size: 16px;
      line-height: 150%;
      color: #607b96;
    }
    & .button {
      text-align: left;
      display: inline-block;
      margin-top: 21px;
      padding: 10px 14px;
      background: #1c2b3a;
      border-radius: 8px;
    }
  }
}
</style>
