import { computed, ref } from 'vue'

const TOKEN_KEY = 'wt_todo_token'
const USERNAME_KEY = 'wt_todo_username'

export const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
export const username = ref<string | null>(localStorage.getItem(USERNAME_KEY))

export const isLoggedIn = computed(() => Boolean(token.value))

export function setSession(newToken: string, newUsername: string) {
  token.value = newToken
  username.value = newUsername
  localStorage.setItem(TOKEN_KEY, newToken)
  localStorage.setItem(USERNAME_KEY, newUsername)
}

export function clearSession() {
  token.value = null
  username.value = null
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USERNAME_KEY)
}

export function authHeader(): Record<string, string> {
  const t = token.value ?? localStorage.getItem(TOKEN_KEY)
  return t ? { Authorization: `Bearer ${t}` } : {}
}
