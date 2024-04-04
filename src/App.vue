<template>
  <Unsupported v-if="incorrectDevice" />
  <div id="loading-screen" ref="loadingScreen"
    style="position: fixed; height: 100vh; width: 100vw; z-index: 99; background-color:  rgb(0, 0, 0);"
    v-if="loading && !incorrectDevice">
    <div style="position: fixed; left: 50%; top:50%; transform: translate(-50%, -50%); font-weight: 200; ">
      <span class="page__title__primary loading__count reveal-loading" style="color: white;">0%</span>
    </div>
  </div>
  <Header />
  <RouterView />
  <canvas ref="canvas" id="gl"></canvas>
  <section id="scoreBoard"></section>
</template>

<script setup>
/* Vue Elements + gsap */
import { RouterView } from 'vue-router'
import { ref, onMounted } from "vue";
import router from "./router";
import gsap from 'gsap';

/* Components */
import Header from "./components/Header.vue"
import Unsupported from "./components/Unsupported.vue"

/* Experience */
import Experience from "./Experience/Experience.js";

/* Composables */
import { initLoadingScreen, introAnimation } from "./composables/loadingScreen.js";

let experience = ref(null);
const canvas = ref(null);
const loadingScreen = ref(null);
const loading = ref(true);
const unsupported = ref(false);
const incorrectDevice = ref(window.innerWidth < 1170 || 'ontouchstart' in window);

const handleResize = () => {
  incorrectDevice.value = window.innerWidth < 1170 || 'ontouchstart' in window;
  window.location.reload();
};

onMounted(() => {
  if (!incorrectDevice.value) {
    experience = new Experience(canvas.value);
    initLoadingScreen(document.querySelector('.loading__count'), 0, 100, 2500, () => {
      introAnimation(loading, loadingScreen, experience);
    });
  }

  window.addEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
#loadingScreen {
  position: absolute;
  z-index: 99;
  height: 100vh;
  width: 100vw;
  background-color: #000;
}
</style>