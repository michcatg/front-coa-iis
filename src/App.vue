<script setup>
  import { RouterView } from 'vue-router';
  import NavRepo from './views/layout/NavRepo.vue';
</script>

<template>
  <header>
    <NavRepo />
  </header>
  <RouterView />
</template>

<style scoped></style>
