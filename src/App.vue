<script setup lang="ts">
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Nav></Nav>
  <div class=" container">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<style lang="postcss" scoped>
.container {

}
</style>
