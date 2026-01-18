<template>
  <section class="card">
    <h2>Registrierung</h2>

    <form class="form" @submit.prevent="onSubmit">
      <label>
        Username
        <input v-model="u" autocomplete="username" />
      </label>

      <label>
        Passwort
        <input v-model="p" type="password" autocomplete="new-password" />
      </label>

      <label>
        Passwort wiederholen
        <input v-model="p2" type="password" autocomplete="new-password" />
      </label>

      <button :disabled="loading || !u.trim() || !p.trim()">Account erstellen</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <p class="hint">
      Schon registriert? <RouterLink to="/login">Login</RouterLink>
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { register } from '../api/authApi'

const router = useRouter()

const u = ref('')
const p = ref('')
const p2 = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  if (p.value !== p2.value) {
    error.value = 'Passwoerter stimmen nicht ueberein'
    return
  }

  loading.value = true
  error.value = null
  try {
    await register(u.value, p.value)
    await router.push('/')
  } catch (e: any) {
    error.value = (e?.message ?? 'Registrierung fehlgeschlagen').toString()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 12px; padding: 1rem; max-width: 560px; margin: 2rem auto; }
.form { display: flex; flex-direction: column; gap: .75rem; }
label { display: flex; flex-direction: column; gap: .25rem; font-size: .95rem; }
input { padding: .5rem .6rem; border-radius: 10px; border: 1px solid #ccc; }
button { padding: .55rem .8rem; border-radius: 10px; border: 1px solid #888; cursor: pointer; }
button:disabled { opacity: .5; cursor: not-allowed; }
.error { color: #b00; margin-top: .75rem; }
.hint { margin-top: .75rem; font-size: .95rem; }
</style>