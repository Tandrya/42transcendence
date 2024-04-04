<template>
    <section ref="inGamePage" id="inGamePage">
        <div id="giveUpWrapper">
            <Button name="Quit" buttonWidth="100px" @click="leaveGame" />
        </div>
        <div id="scoreBoard" ref="scoreBoard">
            <span class="score__title">Score</span>
            <span class="score__value">{{ scorePaddleOne }} - {{ scorePaddleTwo }}</span>
        </div>
    </section>
</template>

<script setup>
/* vue + gsap */
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { onBeforeRouteLeave } from 'vue-router';
import router from '../router';

/* components */
import Button from '../components/Button.vue';

/* composables */
import { enterGame, leaveGame, opacityGame } from '../composables/sceneTransitions.js'
import { enterView, leaveView } from "../composables/viewTransitions.js";

const exp = ref(window.experience);
const inGamePage = ref(null);
const scorePaddleOne = ref(exp.value.localGame.scorePaddleOne);
const scorePaddleTwo = ref(exp.value.localGame.scorePaddleTwo);

onBeforeRouteLeave((to, from, next) => {
    opacityGame(
        exp.value.ball,
        exp.value.paddle,
        exp.value.field,
        0.0,
        0.0
    );
    leaveView(inGamePage.value, next);
})

onMounted(() => {
    if (window.experience.playDemo == undefined) {
        router.push('/');
        return;
    }

    exp.value.localGame.scorePaddleOne = 0;
    exp.value.localGame.scorePaddleTwo = 0;

    gsap.from(inGamePage.value, {
        autoAlpha: 0,
        duration: 1,
        ease: "expo.inOut"
    })

    enterGame(exp.value);
})
</script>

<style lang="scss" scoped>
#giveUpWrapper {
    position: absolute;
    bottom: 3rem;
    right: 4rem;
}

#scoreBoard {
    position: absolute;
    bottom: 3rem;
    left: 4rem;
    letter-spacing: 0.2rem;

    .score__title {
        margin-right: 1rem;
    }
}
</style>