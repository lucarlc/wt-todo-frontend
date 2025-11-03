<template>
  <section>
    <h2>Meine Todos</h2>
    <ul>
      <TodoItem v-for="t in todos" :key="t.id" :todo="t" />
    </ul>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'
interface Todo { id:number; title:string; done:boolean }
const todos = ref<Todo[]>([
  { id:1, title:'Milestone 1 abschließen', done:false },
  { id:2, title:'Repo-Link mailen',        done:false },
  { id:3, title:'Demo vorbereiten',        done:true  },
])
</script>
