<template>
  <li :style="todo.done ? 'text-decoration: line-through; opacity:.6' : ''">
    {{ todo.title }}
  </li>
</template>
<script setup lang="ts">
interface Todo { id:number; title:string; done:boolean }
defineProps<{ todo: Todo }>()
</script>
