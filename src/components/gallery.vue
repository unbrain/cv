<template>
  <div>
    <div class="container">
      <div id="carousel">
        <figure v-for="(item, index) in project" @click="open(item.link)">
          <img :src="withBase(`/gallery/${item.src}.png`)" alt="" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import { withBase  } from 'vitepress'
const project = [
  { src: "weibo", link: 'https://weibo.com'},
  { src: "chat", link: 'https://api.weibo.com/chat'},
  { src: "creator", link: 'https://me.weibo.com'},
  { src: "lottery", link: 'https://me.weibo.com/operation/lottery' },
  { src: "uploader", link: 'https://weibo.com/upload/channel'},
  { src: "study", link: 'https://me.weibo.com/study' },
  { src: "video", link: 'https://weibo.com/tv' },
  { src: "study", link: 'https://me.weibo.com/study' },
  { src: "video", link: 'https://weibo.com/tv' },
];

const open = (link) => {
  window.open(link, '_blank')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  box-sizing: border-box;
}
*:before,
*:after {
  box-sizing: border-box;
}
html,
body {
}
body {
  /* background-image: radial-gradient(mintcream 0%, lightgray 100%); */
}
h1 {
  display: table;
  margin: 5% auto 0;
  text-transform: uppercase;
  font-family: "Anaheim", sans-serif;
  font-size: 4em;
  font-weight: 400;
  text-shadow: 0 1px white, 0 2px black;
}
.container {
  margin: 4% auto;
  width: 210px;
  height: 140px;
  position: relative;
  perspective: 1000px;
}
#carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  animation: rotation 20s infinite linear;
}
#carousel:hover {
  animation-play-state: paused;
}
#carousel figure {
  display: block;
  position: absolute;
  width: 186px;
  height: 106px;
  left: 10px;
  top: 10px;
  /* background: black; */
  overflow: hidden;
  /* border: solid 1px black; */
}
#carousel figure:nth-child(1) {
  transform: rotateY(0deg) translateZ(288px);
}
#carousel figure:nth-child(2) {
  transform: rotateY(40deg) translateZ(288px);
}
#carousel figure:nth-child(3) {
  transform: rotateY(80deg) translateZ(288px);
}
#carousel figure:nth-child(4) {
  transform: rotateY(120deg) translateZ(288px);
}
#carousel figure:nth-child(5) {
  transform: rotateY(160deg) translateZ(288px);
}
#carousel figure:nth-child(6) {
  transform: rotateY(200deg) translateZ(288px);
}
#carousel figure:nth-child(7) {
  transform: rotateY(240deg) translateZ(288px);
}
#carousel figure:nth-child(8) {
  transform: rotateY(280deg) translateZ(288px);
}
#carousel figure:nth-child(9) {
  transform: rotateY(320deg) translateZ(288px);
}

img {
  -webkit-filter: grayscale(0.1);
  cursor: pointer;
  transition: all 0.5s ease;
}
img:hover {
  -webkit-filter: grayscale(0);
  transform: scale(1.2, 1.2);
}

@keyframes rotation {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>
