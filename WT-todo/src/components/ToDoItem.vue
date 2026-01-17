<template>
  <li class="item">
    <input type="checkbox" :checked="todo.done" @change="$emit('toggle', todo)" />

    <div class="content">
      <div v-if="!editing" :class="{ done: todo.done }">{{ todo.title }}</div>

      <input
        v-else
        v-model="draft"
        @keyup.enter="save"
        @keyup.esc="cancel"
      />
    </div>

    <div class="actions">
      <button v-if="!editing" @click="startEdit">Bearbeiten</button>
      <button v-else @click="save">Speichern</button>
      <button v-if="editing" @click="cancel">Abbrechen</button>
      <button class="danger" @click="$emit('delete', todo)">Löschen</button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Todo } from '../api/todoApi'

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{
  (e: 'toggle', todo: Todo): void
  (e: 'delete', todo: Todo): void
  (e: 'save', todo: Todo, title: string): void
}>()

const editing = ref(false)
const draft = ref(props.todo.title)

watch(
  () => props.todo.title,
  (v) => {
    if (!editing.value) draft.value = v
  }
)

function startEdit() {
  editing.value = true
  draft.value = props.todo.title
}

function cancel() {
  editing.value = false
  draft.value = props.todo.title
}

function save() {
  const title = draft.value.trim()
  if (!title) return
  editing.value = false
  emit('save', props.todo, title)
}
</script>

<style scoped>
.item { display:flex; align-items:center; gap:.75rem; border:1px solid #eee; border-radius:12px; padding:.6rem .7rem; }
.content { flex:1; }
.done { text-decoration: line-through; opacity:.7; }
.actions { display:flex; gap:.4rem; }
button { padding:.35rem .55rem; border-radius:10px; border:1px solid #888; cursor:pointer; }
.danger { border-color:#c33; }
input[type="text"] { width: 100%; }
</style>
