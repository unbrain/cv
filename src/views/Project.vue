<script setup lang="ts">
import { siVuedotjs, SimpleIcon } from "simple-icons";
import weibo from "../assets/weibo.png";
import me from "../assets/me.jpg";
import creator from "../assets/creator.jpg";
import webchat from "../assets/webchat.jpg";
import Icon from "../components/Icon.vue";
import Menu from '../components/Menu.vue';

interface Project {
  name: string;
  subTitle?: string;
  picture: string;
  icon: string | SimpleIcon;
  desc: string;
  link: string;
  item?: Array<string>;
}

const arr: Project[] = [
  {
    name: "PC微博",
    subTitle: "",
    picture: weibo,
    icon: siVuedotjs,
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    link: "https://weibo.com",
    item: ['发布器', '视频/音频上传', '消息夹子', 'feed卡片', '定时发博', '...等等主要业务场景'],
  },
  {
    name: "pc微博创作者中心",
    subTitle: "",
    picture: me,
    icon: siVuedotjs,
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    link: "https://me.weibo.com/",
    item: ['抽奖中心', '视频管理', '定时微博管理', '众测平台', '...等等主要业务场景'],
  },
  {
    name: "pc微博消息箱",
    subTitle: "",
    picture: webchat,
    icon: siVuedotjs,
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    link: "https://m.weibo.cn/c/wbox?id=qgb2672tlf",
    item: ['重构', '主要组件的拆分', '...等等主要业务场景'],
  },
  {
    name: "创作者中心",
    subTitle: "",
    picture: creator,
    icon: siVuedotjs,
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    link: "https://m.weibo.cn/c/wbox?id=qgb2672tlf",
    item: ['所有业务', '主要组件的拆分', '同构方案实现', '...等等主要业务场景'],
  },
];

const openProject = (item: Project) => {
  window.open(item.link, "_blank");
};
</script>

<template>
  <div class="grid justify-items-center grid-cols-3 pcontainer">
    <div v-for="(item, index) in arr" :key="index" >
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
          <div class="button" @click="openProject(item)">查看</div>
        </div>
        <Menu :item="item.item"/>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.pcontainer {
  padding-top: 300px;
  padding-bottom: 60px;
  /* padding: 60px 0; */
}
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
  padding-bottom: 15px;
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
    background: #86e1f9;
  }
  & img {
    display: inline-block;
    object-fit: cover;
    height: 167px;
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
      cursor: pointer;
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
