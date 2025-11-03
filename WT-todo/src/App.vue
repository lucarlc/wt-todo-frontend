<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <main class="app">
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </main>
</template>

<style scoped>
.app { max-width: 560px; margin: 2rem auto; padding: 0 1rem; }
.nav { display:flex; gap:.75rem; margin-bottom:1rem; font-size:.95rem; }
</style>
