<script setup lang="ts">
import Footer from './components/Footer.vue';
import SnakeContainer from './components/SnakeContainer.vue';

const jumpGit = () => {
  window.open('https://github.com/unbrain', '_blank')
}
</script>

<template>
  <div class="flex">
    <div class="flex flex-col items-start text">
      <div class="hi">Hi,all. I am</div>
      <div class="name">刘朝阳</div>
      <div class="position">> Front-end developer</div>

      <div class="flex flex-col items-start code">
        <div>// complete the game to continue</div>
        <div>// you can also see it on my Github page</div>
        <div class="link" @click="jumpGit">const <span>githubLink</span> = <span
            class="orange">“https://github.com/unbrain”</span></div>
      </div>
    </div>
    <SnakeContainer />
  </div>
  <Footer />
</template>

<style lang="postcss" scoped>
.text {
  margin-right: 130px;
}

.hi {
  font-family: 'Fira Code';
  font-style: normal;
  font-weight: 450;
  font-size: 18px;
  line-height: 24px;
  color: #E5E9F0;
}

.name {
  font-family: 'Fira Code';
  font-style: normal;
  font-weight: 400;
  font-size: 62px;
  line-height: 81px;

  color: #E5E9F0;
}

.position {
  font-family: 'Fira Code';
  font-style: normal;
  font-weight: 450;
  font-size: 32px;
  line-height: 42px;

  color: #4D5BCE;
}

.code {
  margin-top: 80px;
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 21px;
  color: #607B96;

  >div {
    margin-bottom: 10px;
  }

  & .link {
    cursor: pointer;

    & span {
      color: #43D9AD;
    }

    .orange {
      color: #FEA55F;
    }

  }
}</style>
