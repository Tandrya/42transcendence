<template>
    <div class="unsupported__infos">
        <p>This demo can only be played on computers with a screen size of at least 13 inches.</p>
    </div>
</template>

<style lang="scss" scoped>
.unsupported__infos {
    position: fixed;
    z-index: 99;
    width: 100vw;
    height: 100vh;
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