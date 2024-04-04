<template>
  <button @click="onClick" :style="{ width: buttonWidth }">
    {{ name }}
  </button>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  buttonWidth: {
    type: String,
    default: '200px'
  }
});
</script>

<style scoped lang="scss">
button {
  cursor: pointer;
  color: #fff;
  height: 2.375rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  transition: all 0.5s ease-in-out;
  background-color: transparent;
  border: #ffffff81 solid 0.5px;

  &:hover {
    background-color: #e8e8e850;
    border-color: white;
  }
}
</style>