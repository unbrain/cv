<script setup>
import Reactive from "../blog/Reactive.md";
import 'prismjs/themes/prism-tomorrow.min.css'
import 'github-markdown-css/github-markdown-dark.css'

console.log(Reactive);
</script>

<template>
  <Reactive></Reactive>
</template>

<style>
.markdown-body {
  top: 0px;
  position: absolute;
  left: 0;
  color-scheme: dark;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  padding: 80px;
  color: #c9d1d9;
  background-color: #0d1117;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}
</style>
