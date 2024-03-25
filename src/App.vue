<script setup lang="ts">
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import { theme } from 'ant-design-vue'
</script>

<template>
  <a-config-provider :theme="{
    algorithm: theme.darkAlgorithm
  }">
    <Nav></Nav>
    <div class=" container">
      <router-view></router-view>
    </div>
    <Footer />
  </a-config-provider>
</template>

<style lang="postcss" scoped>
.container {}
</style>
