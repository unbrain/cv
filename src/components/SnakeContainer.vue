<script setup lang="ts">
import Snake from "./Snake.vue";
</script>

<template>
  <div class="snake">
    <div class="warp1"></div>
    <div class="warp2"></div>
    <div class="flex ">
      <Snake />
      <div class="show flex items-start">
        <div class="code">
          // use keyboard <br />// arrows to play
          <div class="flex flex-col items-center dir">
            <div class="dir-box">&#9650;</div>
            <div class="flex">
              <div class="dir-box">&#x25c0;</div>
              <div class="dir-box">&#9660;</div>
              <div class="dir-box">&#9654;</div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <div class="icon icon1"></div>
    <div class="icon icon2"></div>
    <div class="icon icon3"></div>
    <div class="icon icon4"></div>
  </div>
</template>

<style scoped>
.snake {
  position: relative;
  padding: 35px 30px;
  box-sizing: border-box;
  background: linear-gradient(150.26deg,
      rgba(23, 85, 83, 0.7) 1.7%,
      rgba(67, 217, 173, 0.091) 81.82%);
  border: 1px solid #0c1616;
  box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(32px);
  border-radius: 8px;
}

.wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.warp1 {
  position: absolute;
  width: 100%;
  height: 100%;
  left: -50px;
  top: -112px;
  background: #43D9AD;
  opacity: 0.4;
  filter: blur(87px);
  transform: rotate(-94.3deg);
}

.warp2 {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 173px;
  top: 30px;
  background: #4D5BCE;
  opacity: 0.4;
  filter: blur(87px);
  transform: rotate(13.51deg);
}

.icon {
  position: absolute;
  width: 13px;
  height: 13px;
  background: radial-gradient(73.08% 73.08% at 50% 26.92%,
      #196c6a 15.1%,
      #114b4a 100%);
  border-radius: 50%;
  box-shadow: 2px 2px 4px #0d4341, inset 0px 1px 2px #1a8277;
}

.icon1 {
  left: 12px;
  top: 12px;
}

.icon2 {
  right: 12px;
  top: 12px;
}

.icon3 {
  left: 12px;
  bottom: 12px;
}

.icon4 {
  right: 12px;
  bottom: 12px;
}

.flex {
  display: flex;
  position: relative;
  z-index: 1;
}

.code {
  background: rgba(1, 20, 35, 0.19);
  border-radius: 8px;
  padding: 15px 13px;
  width: 186px;
  font-weight: 450;
  font-size: 14px;
  line-height: 18px;
}

.show {
  margin-left: 24px;
}

.dir-box {
  margin-top: 2px;
  width: 50px;
  height: 30px;
  line-height: 30px;
  background: #010c15;
  border: 1px solid #1e2d3d;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
}
.dir {
  margin-top: 80px;
}
</style>
