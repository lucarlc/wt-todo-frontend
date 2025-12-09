<template>
  <section>
    <h2>Meine Todos</h2>

    <!-- Neues Todo anlegen -->
    <form @submit.prevent="onAdd" class="todo-form">
      <input
        v-model="newTitle"
        type="text"
        placeholder="Neues Todo..."
      />
      <button
        type="submit"
        :disabled="newTitle.trim().length === 0 || saving || loading"
      >
        {{ saving ? 'Speichern…' : 'Hinzufügen' }}
      </button>
    </form>

    <p v-if="loading">Lade Todos...</p>
    <p v-else-if="error">Fehler: {{ error }}</p>

    <ul v-else>
      <TodoItem v-for="t in todos" :key="t.id" :todo="t" />
      <li v-if="todos.length === 0">Noch keine Todos vorhanden.</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TodoItem from './ToDoItem.vue'

interface Todo {
  id: number
  title: string
  done: boolean
}

const todos   = ref<Todo[]>([])
const loading = ref(true)
const error   = ref<string | null>(null)

const newTitle = ref('')
const saving   = ref(false)

const API_BASE = import.meta.env.VITE_API_URL

async function loadTodos() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`${API_BASE}/api/v1/todos`)
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
}

async function onAdd() {
  const title = newTitle.value.trim()
  if (!title) {
    return
  }

  saving.value = true
  error.value = null

  try {
    const res = await fetch(`${API_BASE}/api/v1/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, done: false }),
    })

    if (!res.ok) {
      throw new Error('Fehler beim Speichern: ' + res.status)
    }

    const created: Todo = await res.json()
    todos.value.push(created)
    newTitle.value = ''
  } catch (e: any) {
    console.error(e)
    error.value = e.message ?? 'Unbekannter Fehler'
  } finally {
    saving.value = false
  }
}

onMounted(loadTodos)
</script>

<style scoped>
.todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.todo-form input {
  flex: 1;
  padding: 0.35rem 0.5rem;
}

.todo-form button {
  padding: 0.35rem 0.75rem;
  cursor: pointer;
}
</style>
