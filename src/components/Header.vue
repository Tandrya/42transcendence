<template>
    <div class="header" ref="headerRef">
        <a href="https://github.com/Tandrya" target="_blank">
            <Logo />
        </a>
    </div>
</template>

<script setup>
/* vue + gsap */
import { onMounted, ref } from "vue";
import gsap from 'gsap'

/* components */
import Logo from "./Logo.vue";
import router from "../router";

const headerRef = ref(null)

onMounted(() => {
    gsap.from(headerRef.value, {
        autoAlpha: 0,
        duration: 1,
        ease: "expo.inOut"
    })
})
</script>

<style lang="scss">
.header {
    z-index: 2;
    position: absolute;
    left: 2rem;
    top: 2rem;
}
</style>