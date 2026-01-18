<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { clearSession, isLoggedIn, username } from './auth/session'

const router = useRouter()

function logout() {
  clearSession()
  router.push('/login')
}
</script>

<template>
  <main class="app">
    <nav class="nav">
      <RouterLink to="/" v-if="isLoggedIn">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>

      <span class="spacer"></span>

      <template v-if="isLoggedIn">
        <span class="user">{{ username }}</span>
        <button class="link" @click="logout">Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </template>
    </nav>
    <RouterView />
  </main>
</template>

<style scoped>
.app { max-width: 560px; margin: 2rem auto; padding: 0 1rem; }
.nav { display:flex; gap:.75rem; margin-bottom:1rem; font-size:.95rem; align-items:center; }
.spacer { flex: 1; }
.user { font-size:.9rem; opacity:.8; }
.link { background:none; border:none; padding:0; cursor:pointer; text-decoration:underline; font: inherit; }
</style>
