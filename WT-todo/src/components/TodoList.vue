<template>
  <section>
    <h2>Meine Todos</h2>

    <p v-if="loading">Lade Todos...</p>
    <p v-else-if="error">Fehler: {{ error }}</p>

    <ul v-else>
      <TodoItem v-for="t in todos" :key="t.id" :todo="t" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TodoItem from './TodoItem.vue'

interface Todo { id: number; title: string; done: boolean }

const todos  = ref<Todo[]>([])
const loading = ref(true)
const error   = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/todos`)
    if (!res.ok) {
      throw new Error('Fehler beim Laden: ' + res.status)
    }
    todos.value = await res.json()
  } catch (e: any) {
    console.error(e)
    error.value = e.message ?? 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
})
</script>
