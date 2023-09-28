<script setup>
import { Menu, MenuItem, Dropdown } from "ant-design-vue";
import { reactive, watch, h } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import "ant-design-vue/dist/reset.css";
const state = reactive({
  collapsed: false,
  selectedKeys: ["1"],
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});

const props = defineProps({
  item: {
    type: Array,
  },
});

const items = reactive([
  {
    key: "sub2",
    icon: () => h(AppstoreOutlined),
    label: "更多组成",
    title: "更多组成",
    children: [],
  },
]);
items[0].children = props.item.map((item, index) => {
  return {
    key: index,
    label: item,
    title: item,
  };
});

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);
</script>

<template>
  <!-- <Menu
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="state.collapsed"
    :items="items"
  ></Menu> -->

  <Dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      更多组成
      <DownOutlined />
    </a>
    <template #overlay>
      <Menu>
        <MenuItem v-for="item in items[0].children" :key="index">
          <a href="javascript:;">{{ item.title }}</a>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
