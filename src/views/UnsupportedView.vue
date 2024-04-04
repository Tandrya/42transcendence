<template>
    <div class="unsupported__infos">
        <p>This demo can only be played on computers with a screen size of at least 13 inches.</p>
    </div>
</template>

<script setup>
/* Vue elements */
import { ref, onMounted } from "vue";
import router from "../router";

const incorrectDevice = ref(window.innerWidth < 1170 || 'ontouchstart' in window);

const handleResize = () => {
    incorrectDevice.value = window.innerWidth < 1170 || 'ontouchstart' in window;
    if (!incorrectDevice.value) {
        window.location.href = '/';
    }
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
.unsupported__infos {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;

    p {
        text-align: center;
        max-width: 280px;
    }
}
</style>