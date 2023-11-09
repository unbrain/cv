<script setup lang="ts">
import Icon from './Icon.vue';
import SelectSheet from './SelectSheet.vue';
import { siIterm2, siNintendoswitch, siLighthouse } from 'simple-icons'

const iconList = [siIterm2, siLighthouse, siNintendoswitch]
</script>
<template>
  <div class="side flex">
    <div class=" flex flex-col icon-show">
      <Icon v-for="(item, index) in iconList" :key="index" :icon="item" />
    </div>
    <SelectSheet />
  </div>
</template>


<style lang="postcss" scoped>
.side {
  height: 100%;
}

.icon-show {
  border-right: 1px solid #1E2D3D;
}
</style>
