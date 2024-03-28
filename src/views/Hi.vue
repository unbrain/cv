<script setup lang="ts" scope="this api replaced by slot-scope in 2.5.0+">
import SnakeContainer from "../components/SnakeContainer.vue";
const jumpGit = () => {
  window.open("https://github.com/unbrain", "_blank");
};
</script>

<template>
  <div class="flex container">
    <div class="flex flex-col items-start text">
      <div class="hi">Hi,all. I am</div>
      <div class="name">刘朝阳</div>
      <div class="position">> Front-end developer</div>

      <div class="flex flex-col items-start code">
        <div class="game_continue">// complete the game to continue</div>
        <div>// you can also see it on my Github page</div>
        <div class="link" @click="jumpGit">
          const <span>githubLink</span> =
          <span class="orange">“https://github.com/unbrain”</span>
        </div>
      </div>
    </div>
    <SnakeContainer class="snak_c" />
    <div class="warp1"></div>
    <div class="warp2"></div>
  </div>
</template>

<style lang="postcss" scoped>
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  display: flex;
  place-items: center;
  /* min-width: 320px; */
  /* background: #222738; */
  background: #011627;
  min-height: 100vh;
  width: 100vw;
}
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}
.card {
  padding: 2em;
}

.container {
  display: flex;
  margin-top: 230px;
  /* width: 100vw; */
  text-align: center;
}
.text {
  margin-right: 130px;
  text-align: left;
  word-break: break-all;
}

.hi {
  font-family: "Fira Code";
  font-style: normal;
  font-weight: 450;
  font-size: 18px;
  line-height: 24px;
  color: #e5e9f0;
}

.name {
  font-family: "Fira Code";
  font-style: normal;
  font-weight: 400;
  font-size: 62px;
  line-height: 81px;
  color: #e5e9f0;
}

.position {
  font-family: "Fira Code";
  font-style: normal;
  font-weight: 450;
  font-size: 32px;
  line-height: 42px;

  color: #4d5bce;
}

.code {
  margin-top: 80px;
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 21px;
  color: #607b96;
  > div {
    margin-bottom: 10px;
  }

  & .link {
    cursor: pointer;

    & span {
      color: #43d9ad;
    }

    .orange {
      color: #fea55f;
    }
  }
}
@media only screen and (max-width: 800px) {
  .text {
    align-items: start;
    margin-right: 0px;
  }
  .position {
    font-size: 20px;
    line-height: 26px;
  }
  .game_continue {
    display: none;
  }
  .container {
    position: relative;
  }
  .warp1 {
    position: absolute;
    width: 100%;
    height: 100%;
    left: -50px;
    /* top: 112px; */
    background: #43d9ad;
    opacity: 0.4;
    filter: blur(87px);
    transform: rotate(-94.3deg);
  }

  .warp2 {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 173px;
    /* top: 30px; */
    background: #4d5bce;
    opacity: 0.4;
    filter: blur(87px);
    transform: rotate(13.51deg);
  }
}
</style>

<style>
:root {
  font-family: "Fira Code";
}

@font-face {
  font-family: "Fira Code";
  src: url("./assets/FiraCode-Light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
@media only screen and (max-width: 800px) {
  .snak_c {
    /* visibility: hidden */
    display: none;
  }
}
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
