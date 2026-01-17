export interface Todo {
  id: number
  title: string
  done: boolean
}

function apiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL as string | undefined
  if (!raw) return ''
  return raw.replace(/\/$/, '')
}

const TODOS_URL = `${apiBaseUrl()}/api/v1/todos`

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(TODOS_URL)
  if (!res.ok) throw new Error(`GET todos failed: ${res.status}`)
  return (await res.json()) as Todo[]
}

export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch(TODOS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, done: false })
  })
  if (!res.ok) throw new Error(`POST todo failed: ${res.status} ${await res.text()}`)
  return (await res.json()) as Todo
}

export async function updateTodo(id: number, data: { title: string; done: boolean }): Promise<Todo> {
  const res = await fetch(`${TODOS_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`PUT todo failed: ${res.status} ${await res.text()}`)
  return (await res.json()) as Todo
}

export async function setTodoDone(id: number, done: boolean): Promise<Todo> {
  const res = await fetch(`${TODOS_URL}/${id}/done`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done })
  })
  if (!res.ok) throw new Error(`PATCH todo failed: ${res.status} ${await res.text()}`)
  return (await res.json()) as Todo
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${TODOS_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`DELETE todo failed: ${res.status} ${await res.text()}`)
}

export async function deleteCompleted(): Promise<void> {
  const res = await fetch(`${TODOS_URL}/completed`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`DELETE completed failed: ${res.status} ${await res.text()}`)
}
