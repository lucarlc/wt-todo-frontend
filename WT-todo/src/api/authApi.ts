import { setSession } from '../auth/session'

function apiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL as string | undefined
  if (!raw) return ''
  return raw.replace(/\/$/, '')
}

const AUTH_URL = `${apiBaseUrl()}/api/v1/auth`

export interface AuthResponse {
  token: string
  username: string
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || `Request failed: ${res.status}`)
  }
  return (await res.json()) as T
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  const data = await postJson<AuthResponse>(`${AUTH_URL}/login`, { username, password })
  setSession(data.token, data.username)
  return data
}

export async function register(username: string, password: string): Promise<AuthResponse> {
  const data = await postJson<AuthResponse>(`${AUTH_URL}/register`, { username, password })
  setSession(data.token, data.username)
  return data
}
