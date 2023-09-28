<script setup lang="ts">
import { SimpleIcon } from 'simple-icons';
const props = defineProps<{ icon: any, unset?: boolean, svgStyle?: any }>()
</script>
<template>
  <span :class="[$style.icon, unset && $style.unset]" v-html="props.icon.svg"></span>
</template>

<style lang="postcss" module>
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

.unset svg {
  margin: 0px !important;
}
</style>
