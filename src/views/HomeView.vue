<template>
  <main>
    <section ref="homePage" id="homePage">
      <div class="home__wrapper">
        <Title />
        <div class="home__info__wrapper">
          <p>
            Minimalistic demo of the latest core project from 42 School.
          </p>
        </div>
        <Button name="Play Demo" @click="handlePlay" />
      </div>
    </section>
  </main>
</template>

<script setup>
/* vue + gsap */
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import router from "../router";

/* components */
import Button from "../components/Button.vue";
import Title from "../components/Title.vue";

/* composables */
import { enterView, leaveView } from "../composables/viewTransitions.js";

const homePage = ref(null);
const exp = window.experience;

const handlePlay = () => {
  window.experience.playDemo = true;
  router.push("/start");
}

onBeforeRouteLeave((to, from, next) => {
  leaveView(homePage.value, next);
});

onMounted(() => {
  enterView(homePage.value);
})
</script>

<style lang="scss">
.home__wrapper {
  position: absolute;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .home__info__wrapper {
    margin-top: 2rem;
    word-spacing: 0.1rem;
    max-width: 300px;
    text-align: center;
    margin-bottom: 3rem;
  }

  button {
    margin-bottom: 1rem;
  }
}
</style>
