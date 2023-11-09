<script setup lang="ts">
interface sheetList {
  title: string,
  list: any
}
const props = defineProps<{ sheet?: sheetList }>()

const curlist = {
  title: 'personal-info',
  list: [{
    title: 'bio',
    list: [],
    load: false
  }, {
    title: 'interests',
    list: [],
    load: false
  }, {
    title: 'education',
    list: [],
    load: false
  }]
}
</script>

<template>
  <div>
    <div class="title">
      {{ curlist.title }}
    </div>
    <div v-for="(item, index) in curlist.list" :key="index">
      {{ item.title }}
    </div>
  </div>
</template>


<style lang="postcss" scoped>
.title {
  margin: 10px 15px;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
}
</style>
