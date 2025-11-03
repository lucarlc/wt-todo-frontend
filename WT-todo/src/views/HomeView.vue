<template>
  <section class="home">
    <TodoList />
  </section>
</template>

<script setup lang="ts">
import TodoList from '../components/TodoList.vue'
</script>

<style scoped>
.home { max-width: 560px; margin: 2rem auto; font-family: system-ui; }
</style>
