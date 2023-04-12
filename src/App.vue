<script setup lang="ts">
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Nav></Nav>
  <router-view></router-view>
  <Footer />
</template>

<style lang="postcss" scoped></style>
