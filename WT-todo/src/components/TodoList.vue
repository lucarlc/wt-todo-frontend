<template>
  <section class="card">
    <h2>Meine Todos</h2>

    <form class="row" @submit.prevent="onCreate">
      <input v-model="newTitle" placeholder="Neues Todo" />
      <button :disabled="newTitle.trim().length === 0">Hinzufügen</button>
    </form>

    <div class="row tools">
      <select v-model="filter">
        <option value="all">Alle</option>
        <option value="open">Offen</option>
        <option value="done">Erledigt</option>
      </select>

      <input v-model="search" placeholder="Suche" />

      <button class="danger" @click="onClearCompleted" :disabled="todos.filter(t => t.done).length === 0">
        Erledigte löschen
      </button>
    </div>

    <p v-if="loading">Lade Todos...</p>
    <p v-else-if="error">Fehler: {{ error }}</p>

    <ul v-else class="list">
      <ToDoItem
        v-for="t in visibleTodos"
        :key="t.id"
        :todo="t"
        @toggle="onToggleDone"
        @delete="onDelete"
        @save="onSave"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ToDoItem from './ToDoItem.vue'
import { createTodo, deleteCompleted, deleteTodo, getTodos, setTodoDone, updateTodo, type Todo } from '../api/todoApi'

const todos = ref<Todo[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const newTitle = ref('')
const filter = ref<'all' | 'open' | 'done'>('all')
const search = ref('')

const visibleTodos = computed(() => {
  const q = search.value.trim().toLowerCase()

  return todos.value.filter(t => {
    if (filter.value === 'open' && t.done) return false
    if (filter.value === 'done' && !t.done) return false
    if (q && !t.title.toLowerCase().includes(q)) return false
    return true
  })
})

async function load() {
  loading.value = true
  error.value = null
  try {
    todos.value = await getTodos()
  } catch (e: any) {
    error.value = e.message ?? 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
}

onMounted(load)

async function onCreate() {
  const title = newTitle.value.trim()
  if (!title) return

  try {
    const created = await createTodo(title)
    todos.value = [...todos.value, created]
    newTitle.value = ''
  } catch (e: any) {
    error.value = e.message ?? 'Fehler beim Anlegen'
  }
}

async function onToggleDone(todo: Todo) {
  try {
    const updated = await setTodoDone(todo.id, !todo.done)
    todos.value = todos.value.map(t => (t.id === updated.id ? updated : t))
  } catch (e: any) {
    error.value = e.message ?? 'Fehler beim Aktualisieren'
  }
}

async function onSave(todo: Todo, title: string) {
  try {
    const updated = await updateTodo(todo.id, { title, done: todo.done })
    todos.value = todos.value.map(t => (t.id === updated.id ? updated : t))
  } catch (e: any) {
    error.value = e.message ?? 'Fehler beim Speichern'
  }
}

async function onDelete(todo: Todo) {
  try {
    await deleteTodo(todo.id)
    todos.value = todos.value.filter(t => t.id !== todo.id)
  } catch (e: any) {
    error.value = e.message ?? 'Fehler beim Löschen'
  }
}

async function onClearCompleted() {
  try {
    await deleteCompleted()
    todos.value = todos.value.filter(t => !t.done)
  } catch (e: any) {
    error.value = e.message ?? 'Fehler beim Löschen'
  }
}
</script>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 12px; padding: 1rem; }
.row { display:flex; gap:.5rem; margin:.75rem 0; }
.tools { align-items:center; }
.list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:.5rem; }
input, select { flex:1; padding:.5rem .6rem; border-radius:10px; border:1px solid #ccc; }
button { padding:.5rem .8rem; border-radius:10px; border:1px solid #888; cursor:pointer; }
button:disabled { opacity:.5; cursor:not-allowed; }
.danger { border-color:#c33; }
</style>
